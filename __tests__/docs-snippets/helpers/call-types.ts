import { vi } from 'vitest';
import type { StreamClient } from '../../../index';
import type { Cleanup } from './cleanup';
import { uniqueId } from './ids';
import { retry } from './wait';

/** A new call type isn't known to every API node right away. */
const isCallTypeMissing = (error: unknown) =>
  String(error).includes('does not exist');

/** Waits until a new call type can be read back several times in a row. */
export const waitForCallType = async (client: StreamClient, name: string) => {
  for (let i = 0; i < 5; i++) {
    await retry(() => client.video.getCallType({ name }), {
      retryIf: isCallTypeMissing,
    });
  }
};

/**
 * Creates a `uniqueId` call type, waits until it can be read back, and registers it on
 * `cleanup.callTypes` (deleted after `cleanup.calls`). Use it for fences that change a
 * built-in call type (COPY-map `"default"` to it). Calls into the new type can still
 * fail with "call type does not exist" on some API nodes for a while:
 * `retryOnCallTypeMissing`.
 */
export const createCallType = async (
  client: StreamClient,
  cleanup: Cleanup,
  name = uniqueId('call-type'),
) => {
  await client.video.createCallType({ name });
  cleanup.callTypes.push(name);
  await waitForCallType(client, name);
  return name;
};

/**
 * For fences that create a call type themselves: wraps `client.video.createCallType`
 * so every type it creates is registered on `cleanup.callTypes` and awaited until it
 * can be read back. Call before the region; restore with `vi.restoreAllMocks()`.
 */
export const trackCallTypeCreates = (
  client: StreamClient,
  cleanup: Cleanup,
) => {
  const original = client.video.createCallType.bind(client.video);
  return vi
    .spyOn(client.video, 'createCallType')
    .mockImplementation(async (request) => {
      const response = await original(request);
      cleanup.callTypes.push(request.name);
      await waitForCallType(client, request.name);
      return response;
    });
};

/** Retries a call into a just-created call type while API nodes answer "does not exist". */
export const retryOnCallTypeMissing = <T>(fn: () => Promise<T>) =>
  retry(fn, {
    interval: 2000,
    retryIf: (error) => String(error).includes('call type does not exist'),
  });
