import { beforeAll, describe, expect, it } from 'vitest';
import { StreamClient } from '../';
import { createTestClient } from './create-test-client';

describe('webhooks', () => {
  let client: StreamClient;

  beforeAll(async () => {
    client = createTestClient();
  });

  it('verify webhook - call.session_participant_joined', async () => {
    const body = `{"type":"call.session_participant_joined","created_at":"2023-11-14T14:49:14.142187951Z","call_cid":"default:esJPeexho8md","session_id":"25a5b332-36f4-42c5-9fcb-a654bcaa2f3f","participant":{"user":{"id":"zita_szupera","name":"Zita Szupera","image":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s96-c","custom":{"imageUrl":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s120"},"role":"user","teams":[],"created_at":"2023-05-22T12:44:57.422509Z","updated_at":"2023-11-14T14:49:12.471772Z"},"user_session_id":"6245918f-461b-4d4f-b3f8-ed083e3cf867","role":"user","joined_at":"2023-11-14T14:49:14.142179098Z"}}`;
    const validSignature =
      '72b2a8f814b840e457882fd9968ac7f4210b23273461ab95365e9bf49fca12d8';
    const invalidSignature =
      '5d7fd77f8c3f92fc017a09775527716d22357f73d9d362435a7ed2a72d8c1a66';

    let isValid = client.verifyWebhook(body, validSignature);

    expect(isValid).toBe(true);

    isValid = client.verifyWebhook(body, invalidSignature);

    expect(isValid).toBe(false);
  });

  it('verify webhook - call.session_participant_left', async () => {
    const body = `{"type":"call.session_participant_left","created_at":"2023-11-14T14:49:17.231445173Z","call_cid":"default:esJPeexho8md","session_id":"25a5b332-36f4-42c5-9fcb-a654bcaa2f3f","participant":{"user":{"id":"zita_szupera","name":"Zita Szupera","image":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s96-c","custom":{"imageUrl":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s120"},"role":"user","teams":[],"created_at":"2023-05-22T12:44:57.422509Z","updated_at":"2023-11-14T14:49:12.471772Z"},"user_session_id":"6245918f-461b-4d4f-b3f8-ed083e3cf867","role":"user","joined_at":"2023-11-14T14:49:17.231436648Z"}}`;
    const validSignature =
      '676dfafc03d08eeb9928af04169fd76a4a2efe8267f9f375bdd340c562fed37a';
    const invalidSignature =
      '5d7fd77f8c3f92fc017a09775527716d22357f73d9d362435a7ed2a72d8c1a66';

    let isValid = client.verifyWebhook(body, validSignature);

    expect(isValid).toBe(true);

    isValid = client.verifyWebhook(body, invalidSignature);

    expect(isValid).toBe(false);
  });

  it('verify webhook - user.updated', async () => {
    const body = `{"type":"user.updated","user":{"id":"federico_guerinoni","role":"user","created_at":"2023-05-26T07:53:03.611031Z","updated_at":"2023-11-13T09:50:24.444759Z","last_active":"2023-11-10T15:27:36.208436Z","banned":false,"online":true,"name":"Federico Guerinoni","image":"https://lh3.googleusercontent.com/a/AGNmyxbj_VkTg2cbpxA0oODYVSvU4xLQihvT5ZBM7pdw=s96-c"},"created_at":"2023-11-13T09:50:24.447224815Z","members":[]}`;
    const validSignature =
      '35be5bf8e58170a042da724bba7d6b933d3f29ec85e6696ef1cf001e7c097fb8';
    const invalidSignature =
      '5d7fd77f8c3f92fc017a09775527716d22357f73d9d362435a7ed2a72d8c1a66';

    let isValid = client.verifyWebhook(body, validSignature);

    expect(isValid).toBe(true);

    isValid = client.verifyWebhook(body, invalidSignature);

    expect(isValid).toBe(false);
  });

  it('verify webhook - channel.created', async () => {
    const body = `{"type":"channel.created","cid":"videocall:esJPeexho8md","channel_id":"esJPeexho8md","channel_type":"videocall","channel":{"id":"esJPeexho8md","type":"videocall","cid":"videocall:esJPeexho8md","created_at":"2023-11-14T14:49:12.81875Z","updated_at":"2023-11-14T14:49:12.81875Z","created_by":{"id":"zita_szupera","role":"user","created_at":"2023-05-22T12:44:57.422509Z","updated_at":"2023-11-14T14:49:12.471772Z","last_active":"2023-11-13T09:49:44.789879Z","banned":false,"online":false,"name":"Zita Szupera","image":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s96-c","imageUrl":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s120"},"frozen":false,"disabled":false,"config":{"created_at":"2023-02-16T15:06:02.355424Z","updated_at":"2023-04-03T16:20:57.360607Z","name":"videocall","typing_events":true,"read_events":true,"connect_events":true,"search":true,"reactions":true,"replies":false,"quotes":true,"mutes":true,"uploads":true,"url_enrichment":true,"custom_events":true,"push_notifications":true,"reminders":false,"mark_messages_pending":false,"message_retention":"infinite","max_message_length":5000,"automod":"disabled","automod_behavior":"flag","blocklist_behavior":"flag","commands":[{"name":"giphy","description":"Post a random gif to the channel","args":"[text]","set":"fun_set"},{"name":"ban","description":"Ban a user","args":"[@username] [text]","set":"moderation_set"},{"name":"unban","description":"Unban a user","args":"[@username]","set":"moderation_set"},{"name":"mute","description":"Mute a user","args":"[@username]","set":"moderation_set"},{"name":"unmute","description":"Unmute a user","args":"[@username]","set":"moderation_set"}]}},"user":{"id":"zita_szupera","role":"user","created_at":"2023-05-22T12:44:57.422509Z","updated_at":"2023-11-14T14:49:12.471772Z","last_active":"2023-11-13T09:49:44.789879Z","banned":false,"online":false,"name":"Zita Szupera","image":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s96-c","imageUrl":"https://lh3.googleusercontent.com/a/AAcHTtd__ATa58lPX-VAwJ46QU5arELhguPwTxoh9yzTaM_adw=s120"},"created_at":"2023-11-14T14:49:12.828267423Z","request_info":{"type":"client","ip":"89.134.25.76","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36","sdk":"stream-chat-javascript-client-browser-8.13.0"}}`;
    const validSignature =
      '6de7226ece892e191326906fea40473ae7f65aaa7426a13dddab517ab9338e41';
    const invalidSignature =
      '5d7fd77f8c3f92fc017a09775527716d22357f73d9d362435a7ed2a72d8c1a66';

    let isValid = client.verifyWebhook(body, validSignature);

    expect(isValid).toBe(true);

    isValid = client.verifyWebhook(body, invalidSignature);

    expect(isValid).toBe(false);
  });
});
