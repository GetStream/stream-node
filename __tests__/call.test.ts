import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { createTestClient } from "./create-test-client";
import { StreamCall } from "../src/StreamCall";
import { StreamClient } from "../src/StreamClient";
import {
  VideoRecordSettingsRequestModeEnum,
  VideoRecordSettingsRequestQualityEnum,
} from "../src/gen/video";

describe("call API", () => {
  let client: StreamClient;
  const callId = `call${uuidv4()}`;
  let call: StreamCall;

  beforeAll(async () => {
    client = createTestClient();

    call = client.video.call("default", callId);

    await client.upsertUsers({
      users: {
        john: { name: "John", id: "john" },
      },
    });
  });

  it("create", async () => {
    const response = await call.create({
      data: {
        created_by_id: "john",
        settings_override: {
          geofencing: {
            names: ["canada"],
          },
          screensharing: {
            enabled: false,
          },
        },
        custom: {
          color: "blue",
        },
      },
    });

    expect(response.call.created_by.id).toBe("john");
    expect(response.call.settings.geofencing.names).toEqual(["canada"]);
    expect(response.call.settings.screensharing.enabled).toBe(false);
    expect(response.call.custom.color).toBe("blue");
  });

  it("update", async () => {
    const response = await call.update({
      settings_override: {
        audio: { mic_default_on: true, default_device: "speaker" },
        screensharing: { enabled: true, access_request_enabled: true },
      },
      custom: { color: "red" },
    });

    expect(response.call.settings.audio.mic_default_on).toBe(true);
    expect(response.call.custom.color).toBe("red");
  });

  it("RTMP address", async () => {
    const resp = await call.get();

    // userId of existing user
    const userId = "jane";
    await client.upsertUsers({
      users: {
        [userId]: {
          id: userId,
        },
      },
    });
    const token = client.createToken(userId);
    const rtmpURL = resp.call.ingress.rtmp.address;
    const streamKey = token;

    expect(rtmpURL).toBeDefined();
    expect(streamKey).toBeDefined();
  });

  it("query calls", async () => {
    let response = await client.video.queryCalls();

    let calls = response.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);

    const queryCallsReq = {
      sort: [{ field: "starts_at", direction: -1 }],
      limit: 2,
    };
    response = await client.video.queryCalls(queryCallsReq);

    calls = response.calls;
    expect(calls.length).toBe(2);

    response = await client.video.queryCalls({
      ...queryCallsReq,
      next: response.next,
    });

    expect(response.calls.length).toBeLessThanOrEqual(2);

    response = await client.video.queryCalls({
      filter_conditions: { backstage: { $eq: false } },
    });

    expect(response.calls.length).toBeGreaterThanOrEqual(1);
  });

  it("query calls - ongoing", async () => {
    const response = await client.video.queryCalls({
      filter_conditions: { ongoing: { $eq: true } },
    });

    // Dummy test
    expect(response.calls).toBeDefined();
  });

  it("query calls - upcoming", async () => {
    const mins30 = 1000 * 60 * 60 * 30;
    const inNext30mins = new Date(Date.now() + mins30);
    const response = await client.video.queryCalls({
      filter_conditions: {
        starts_at: { $gt: inNext30mins.toISOString() },
      },
    });

    // Dummy test
    expect(response.calls).toBeDefined();
  });

  describe("recording", () => {
    it("enable call recording", async () => {
      let response = await call.update({
        settings_override: {
          recording: {
            mode: VideoRecordSettingsRequestModeEnum.DISABLED,
            audio_only: true,
          },
        },
      });
      let settings = response.call.settings.recording;

      expect(settings.mode).toBe(VideoRecordSettingsRequestModeEnum.DISABLED);

      response = await call.update({
        settings_override: {
          recording: {
            mode: VideoRecordSettingsRequestModeEnum.AVAILABLE,
          },
        },
      });

      settings = response.call.settings.recording;
      expect(settings.mode).toBe(VideoRecordSettingsRequestModeEnum.AVAILABLE);

      response = await call.update({
        settings_override: {
          recording: {
            audio_only: false,
            quality: VideoRecordSettingsRequestQualityEnum._1080P,
            mode: VideoRecordSettingsRequestModeEnum.AUTO_ON,
          },
        },
      });

      settings = response.call.settings.recording;
      expect(settings.audio_only).toBe(false);
      expect(settings.quality).toBe(
        VideoRecordSettingsRequestQualityEnum._1080P
      );
    });

    it("start recording", async () => {
      // somewhat dummy test, we should do a proper test in the future where we join a call and start recording
      await expect(() => call.startRecording()).rejects.toThrowError(
        'Stream error code 4: StartRecording failed with error: "cannot record inactive call"'
      );
    });

    it("stop recording", async () => {
      // somewhat dummy test, we should do a proper test in the future
      await expect(() => call.stopRecording()).rejects.toThrowError(
        'Stream error code 4: StopRecording failed with error: "call is not being recorded"'
      );
    });

    it("query recordings", async () => {
      // somewhat dummy test, we should do a proper test in the future
      const response = await call.listRecordings();

      expect(response.recordings).toBeDefined();
    });

    describe("streaming", () => {
      it("enable backstage mode", async () => {
        const response = await call.update({
          settings_override: {
            backstage: {
              enabled: true,
            },
          },
        });

        expect(response.call.settings.backstage.enabled).toBe(true);
      });

      it("go live", async () => {
        const response = await call.goLive();

        expect(response.call.backstage).toBe(false);
      });

      it("stop live", async () => {
        const response = await call.stopLive();

        expect(response.call.backstage).toBe(true);
      });
    });
  });
});
