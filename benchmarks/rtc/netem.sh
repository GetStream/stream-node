#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage:" >&2
  echo "  sudo $0 show [iface]" >&2
  echo "  sudo $0 clear [iface]" >&2
  echo "  sudo $0 apply <loss-1pct|loss-5pct|cap-1mbps|rtt-200ms> [iface]" >&2
  echo "  sudo $0 recovery <control-dir> <repeats> [iface]" >&2
  exit 2
}

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "netem requires Linux; this host is $(uname -s)" >&2
  exit 1
fi
if [[ "${EUID}" -ne 0 ]]; then
  echo "netem requires root; rerun with sudo" >&2
  exit 1
fi

COMMAND="${1:-}"
[[ -n "${COMMAND}" ]] || usage
shift

default_iface() {
  ip -o route show default | awk '{print $5; exit}'
}

resolve_iface() {
  local explicit="${1:-}"
  local selected="${explicit:-${IFACE:-}}"
  if [[ -z "${selected}" ]]; then
    selected="$(default_iface)"
  fi
  if [[ -z "${selected}" ]]; then
    echo "could not detect the default interface; pass one explicitly or set IFACE" >&2
    exit 1
  fi
  echo "${selected}"
}

clear_qdisc() {
  local iface="$1"
  if tc qdisc show dev "${iface}" | awk '($2 == "netem" || $2 == "tbf") && / root / { found=1 } END { exit !found }'; then
    tc qdisc del dev "${iface}" root
  fi
}

apply_profile() {
  local profile="$1"
  local iface="$2"
  clear_qdisc "${iface}"
  case "${profile}" in
    loss-1pct)
      tc qdisc add dev "${iface}" root netem loss 1%
      ;;
    loss-5pct)
      tc qdisc add dev "${iface}" root netem loss 5%
      ;;
    cap-1mbps)
      tc qdisc add dev "${iface}" root tbf rate 1mbit burst 32kbit latency 50ms
      ;;
    rtt-200ms)
      tc qdisc add dev "${iface}" root netem delay 200ms
      ;;
    outage)
      tc qdisc add dev "${iface}" root netem loss 100%
      ;;
    *)
      echo "unknown netem profile: ${profile}" >&2
      exit 2
      ;;
  esac
  tc qdisc show dev "${iface}"
}

wait_for_file() {
  local path="$1"
  local timeout_seconds="$2"
  local deadline=$((SECONDS + timeout_seconds))
  while [[ ! -f "${path}" ]]; do
    if (( SECONDS >= deadline )); then
      echo "timed out waiting for ${path}" >&2
      return 1
    fi
    sleep 0.05
  done
}

case "${COMMAND}" in
  show)
    IFACE_NAME="$(resolve_iface "${1:-}")"
    tc qdisc show dev "${IFACE_NAME}"
    ;;
  clear)
    IFACE_NAME="$(resolve_iface "${1:-}")"
    clear_qdisc "${IFACE_NAME}"
    tc qdisc show dev "${IFACE_NAME}"
    ;;
  apply)
    PROFILE="${1:-}"
    [[ -n "${PROFILE}" ]] || usage
    IFACE_NAME="$(resolve_iface "${2:-}")"
    apply_profile "${PROFILE}" "${IFACE_NAME}"
    ;;
  recovery)
    CONTROL_DIR="${1:-}"
    REPEATS="${2:-}"
    [[ -n "${CONTROL_DIR}" && "${REPEATS}" =~ ^[1-9][0-9]*$ ]] || usage
    [[ -d "${CONTROL_DIR}" ]] || {
      echo "control directory does not exist: ${CONTROL_DIR}" >&2
      exit 1
    }
    IFACE_NAME="$(resolve_iface "${3:-}")"
    trap 'clear_qdisc "${IFACE_NAME}"' EXIT INT TERM
    clear_qdisc "${IFACE_NAME}"
    for ((cycle = 0; cycle < REPEATS; cycle += 1)); do
      CYCLE_DIR="${CONTROL_DIR}/cycle-${cycle}"
      wait_for_file "${CYCLE_DIR}/ready.pid" 180
      IFS= read -r NODE_PID < "${CYCLE_DIR}/ready.pid"
      [[ "${NODE_PID}" =~ ^[1-9][0-9]*$ ]] || {
        echo "invalid Node PID in ${CYCLE_DIR}/ready.pid" >&2
        exit 1
      }
      kill -0 "${NODE_PID}"
      apply_profile outage "${IFACE_NAME}"
      kill -USR1 "${NODE_PID}"
      wait_for_file "${CYCLE_DIR}/reconnecting" 120
      clear_qdisc "${IFACE_NAME}"
      kill -USR2 "${NODE_PID}"
      wait_for_file "${CYCLE_DIR}/complete" 120
    done
    clear_qdisc "${IFACE_NAME}"
    trap - EXIT INT TERM
    tc qdisc show dev "${IFACE_NAME}"
    ;;
  *)
    usage
    ;;
esac
