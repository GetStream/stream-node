import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { v4 as uuidv4 } from "uuid";
import {
  StreamClient,
  VideoLayoutSettingsNameEnum,
  VideoOwnCapability,
  VideoRecordSettingsRequestModeEnum,
  VideoRecordSettingsRequestQualityEnum,
} from "../";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe("call types CRUD API", () => {
  let client: StreamClient;
  const callTypeName = `calltype${uuidv4()}`;

  beforeAll(() => {
    client = new StreamClient(apiKey, secret);
  });

  it("create", async () => {
    const createResponse = await client.video.createCallType({
      name: callTypeName,
      settings: {
        audio: { mic_default_on: true, default_device: "speaker" },
        screensharing: {
          access_request_enabled: false,
          enabled: true,
        },
        geofencing: {
          names: ["european_union"],
        },
      },
      notification_settings: {
        enabled: true,
        call_notification: {
          apns: {
            title: "{{ user.display_name }} invites you to a call",
          },
          enabled: true,
        },
        session_started: {
          enabled: false,
        },
      },
      grants: {
        admin: [
          VideoOwnCapability.SEND_AUDIO,
          VideoOwnCapability.SEND_VIDEO,
          VideoOwnCapability.MUTE_USERS,
        ],
        user: [VideoOwnCapability.SEND_AUDIO, VideoOwnCapability.SEND_VIDEO],
      },
    });

    expect(createResponse.name).toBe(callTypeName);
    expect(createResponse.settings.audio.mic_default_on).toBe(true);
    expect(createResponse.settings.audio.default_device).toBe("speaker");
    expect(createResponse.grants.admin).toBeDefined();
    expect(createResponse.grants.user).toBeDefined();
    expect(createResponse.settings.geofencing.names).toEqual([
      "european_union",
    ]);
    expect(createResponse.settings.screensharing.access_request_enabled).toBe(
      false
    );
    expect(createResponse.settings.screensharing.enabled).toBe(true);
    expect(createResponse.notification_settings.enabled).toBe(true);
    expect(createResponse.notification_settings.session_started.enabled).toBe(
      false
    );
    expect(createResponse.notification_settings.call_notification.enabled).toBe(
      true
    );
    expect(
      createResponse.notification_settings.call_notification.apns.title
    ).toBe("{{ user.display_name }} invites you to a call");
  });

  it("read", async () => {
    const readResponse = await client.video.listCallTypes();

    expect(readResponse.call_types[callTypeName]).toContain({
      name: callTypeName,
    });
  });

  it("update", async () => {
    const updateResponse = await client.video.updateCallType(callTypeName, {
      settings: {
        audio: { mic_default_on: false, default_device: "earpiece" },
        recording: {
          mode: VideoRecordSettingsRequestModeEnum.DISABLED,
          // FIXME OL: these props shouldn't be required to be set when recording is disabled
          audio_only: false,
          quality: VideoRecordSettingsRequestQualityEnum._1080P,
        },
      },
    });

    expect(updateResponse.settings.audio.mic_default_on).toBeFalsy();
    expect(updateResponse.settings.audio.default_device).toBe("earpiece");
    expect(updateResponse.settings.recording.mode).toBe(
      VideoRecordSettingsRequestModeEnum.DISABLED
    );
  });

  it("update layout options", async () => {
    const layoutOptions = {
      "logo.image_url":
        "https://theme.zdassets.com/theme_assets/9442057/efc3820e436f9150bc8cf34267fff4df052a1f9c.png",
      "logo.horizontal_position": "center",
      "title.text": "Building Stream Video Q&A",
      "title.horizontal_position": "center",
      "title.color": "black",
      "participant_label.border_radius": "0px",
      "participant.border_radius": "0px",
      "layout.spotlight.participants_bar_position": "top",
      "layout.background_color": "#f2f2f2",
      "participant.placeholder_background_color": "#1f1f1f",
      "layout.single-participant.padding_inline": "20%",
      "participant_label.background_color": "transparent",
    };

    const response = await client.video.updateCallType(callTypeName, {
      settings: {
        recording: {
          mode: VideoRecordSettingsRequestModeEnum.AVAILABLE,
          audio_only: false,
          quality: VideoRecordSettingsRequestQualityEnum._1080P,
          layout: {
            name: VideoLayoutSettingsNameEnum.SPOTLIGHT,
            options: layoutOptions,
          },
        },
      },
    });

    expect(response.settings.recording.layout.name).toBe(
      VideoLayoutSettingsNameEnum.SPOTLIGHT
    );
    Object.keys(layoutOptions).forEach((key) => {
      expect(response.settings.recording.layout.options![key]).toEqual(
        (layoutOptions as any)[key]
      );
    });
  });

  it("delete", async () => {
    try {
      await client.video.deleteCallType({ name: callTypeName });
    } catch (e) {
      // the first request fails on backend sometimes
      // retry it
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      await client.video.deleteCallType({ name: callTypeName });
    }

    await expect(() =>
      client.video.getCallType({ name: callTypeName })
    ).rejects.toThrowError();
  });
});
