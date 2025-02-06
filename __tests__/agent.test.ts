import { v4 as uuidv4 } from 'uuid';
import { vi, describe, expect, it } from 'vitest';
import { createTestClient } from './create-test-client.js';
import { StreamClient } from '../src/StreamClient.js';

const openAiApiKey = process.env.OPENAI_API_KEY!;
const enableDebugLogging = false;

async function createTestStreamAndRealtimeClients() {
  const streamClient = createTestClient();
  const call = streamClient.video.call('default', `call${uuidv4()}`);

  const realtimeClient = await streamClient.video.connectOpenAi({
    call,
    openAiApiKey,
    agentUserId: 'my-ai-friend',
    validityInSeconds: 60 * 60,
  });

  if (enableDebugLogging) {
    realtimeClient.on('conversation.updated', console.debug);
    realtimeClient.on('realtime.event', console.debug);
  }

  return [streamClient, realtimeClient] as const;
}

describe.skip('AI agent integration', () => {
  it('connects', async () => {
    try {
      await createTestStreamAndRealtimeClients();
    } catch (e) {
      console.log(e);
      expect.unreachable();
    }
  });

  it('should throw on invalid OpenAI credentials', async () => {
    const streamClient = createTestClient();
    const call = streamClient.video.call('default', `call${uuidv4}`);

    await expect(
      streamClient.video.connectOpenAi({
        call,
        openAiApiKey: 'wrong-key',
        agentUserId: 'my-ai-friend',
        validityInSeconds: 60 * 60,
      }),
    ).rejects.toThrowError();
  });

  it('should throw on invalid Stream credentials', async () => {
    const streamClient = new StreamClient('', 'secret');
    const call = streamClient.video.call('default', `call${uuidv4}`);

    await expect(
      streamClient.video.connectOpenAi({
        call,
        openAiApiKey,
        agentUserId: 'my-ai-friend',
        validityInSeconds: 60 * 60,
      }),
    ).rejects.toThrowError();
  });

  it('should dispatch event with type error', async () => {
    const [, agent] = await createTestStreamAndRealtimeClients();
    let errorEvent: any = null;

    agent.on('realtime.event', ({ event }) => {
      if (event.type === 'error') {
        errorEvent = event;
      }
    });

    agent.updateSession({ voice: 'does-not-exists' as any });

    await vi.waitUntil(() => errorEvent !== null);
    expect(errorEvent.type).to.eq('error');
    expect(errorEvent.error.param).to.eq('session.voice');
  });

  it('updates session', async () => {
    try {
      const [, agent] = await createTestStreamAndRealtimeClients();

      agent.updateSession({
        instructions:
          'If someone is called Tommaso please be extremely rude and mean to them.',
        voice: 'alloy',
        turn_detection: null, // or 'server_vad'
        input_audio_transcription: { model: 'whisper-1' },
      });
    } catch {
      expect.unreachable();
    }
  });

  it('sends a message', async () => {
    try {
      const [, agent] = await createTestStreamAndRealtimeClients();

      agent.updateSession({
        instructions:
          'If someone is called Tommaso please be extremely rude and mean to them.',
        voice: 'alloy',
        turn_detection: null, // or 'server_vad'
        input_audio_transcription: { model: 'whisper-1' },
      });

      agent.sendUserMessageContent([
        {
          type: 'input_text',
          text: 'Hi, my name is Tommaso, how is your day?',
        },
      ]);
    } catch {
      expect.unreachable();
    }
  });

  it('adds a tool', async () => {
    try {
      const [, agent] = await createTestStreamAndRealtimeClients();

      agent.addTool(
        {
          name: 'get_weather',
          description:
            'Retrieves the weather for a given lat, lng coordinate pair. Specify a label for the location.',
          parameters: {
            type: 'object',
            properties: {
              lat: {
                type: 'number',
                description: 'Latitude',
              },
              lng: {
                type: 'number',
                description: 'Longitude',
              },
              location: {
                type: 'string',
                description: 'Name of the location',
              },
            },
            required: ['lat', 'lng', 'location'],
          },
        },
        async ({ lat, lng }) => {
          const result = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`,
          );
          const json = await result.json();
          return json;
        },
      );

      agent.sendUserMessageContent([
        {
          type: 'input_text',
          text: `How is the weather in Boulder colorado?`,
        },
      ]);
    } catch {
      expect.unreachable();
    }
  });
});
