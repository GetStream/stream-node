import "dotenv/config";
import { beforeAll, describe, expect, it } from "vitest";
import { CreateDeviceRequest, CreateDeviceRequestPushProviderEnum, StreamClient, UpsertPushProviderRequest, UserObjectRequest } from "..";
import { v4 as uuidv4 } from "uuid";
import { DeletePushProviderTypeEnum, PushProviderRequest } from "../src/gen/chat";

const apiKey = process.env.STREAM_API_KEY!;
const secret = process.env.STREAM_SECRET!;

describe('devices and push', () => {
    let client: StreamClient;
    const user = {
        id: "stream-node-test-user",
        role: "admin",
    };
    const device: CreateDeviceRequest = {
        id: uuidv4(),
        push_provider: CreateDeviceRequestPushProviderEnum.FIREBASE,
        push_provider_name: 'firebase',
        user_id: user.id
    }
    const pushProvider: PushProviderRequest = {
        name: 'test-push-provider',
        type: 'xiaomi' as any as number,
        xiaomi_app_secret: '',
        xiaomi_package_name: ''
    }

    beforeAll(async () => {
        client = new StreamClient(apiKey, secret);
        await client.updateUsers({
            users: {
              [user.id]: { ...user },
            },
        });
    });

    it('create device', async () => {
        expect(async () => await client.createDevice(device)).not.toThrowError();
    });

    it('list devices', async () => {
        const response = await client.listDevices({userId: user.id});

        expect(response.devices.find(d => d.id === device.id)).toBeDefined();
    })

    it('delete device', async () => {
        const response = await client.deleteDevice({id: device.id, userId: user.id});

        expect(response).toBeDefined();
    })

    it('create push provider', async () => {
        // Can't properly test upsert without valid credentials
        await expect(() => client.upsertPushProvider(pushProvider)).rejects.toThrowError('Stream error code 4: UpsertPushProvider failed with error: "xiaomi credentials are invalid"');
    });

    it('list push provider', async () => {
        const response = await client.listPushProviders();

        expect(response.push_providers).toBeDefined();
    });

    it('test push provider', async () => {
        const response = await client.checkPush({user_id: user.id});

        expect(response).toBeDefined();
    })

    // TODO: can't test delete because we can't upsert
    // it('delete push provider', async () => {
    //     const response = await client.deletePushProvider({name: pushProvider.push_provider!.name, type: DeletePushProviderTypeEnum.FIREBASE});
    // });
});