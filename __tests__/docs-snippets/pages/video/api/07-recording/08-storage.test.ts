import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  createCallType,
  retryOnCallTypeMissing,
} from '../../../../helpers/call-types';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';
import { deleteExternalStorageIfExists } from '../../../../helpers/server';
import { joinCallAsUser } from '../../../../helpers/video';

const DOCS = 'video/api/07-recording/08-storage.md';

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);

  const johnId = uniqueId('john');

  /**
   * External storages are app-wide and not in the leak check: every storage
   * this file creates gets a `uniqueId` name, is deleted in cleanup and
   * checked for in `afterAll`.
   */
  const storageNames: string[] = [];
  const storageName = (name: string) => {
    const id = uniqueId(name);
    storageNames.push(id);
    return id;
  };

  const listStorages = async () =>
    (await client.listExternalStorage()).external_storages;

  beforeAll(async () => {
    cleanup.users.push(johnId);
    await client.upsertUsers([{ id: johnId }]);
    cleanup.add(async () => {
      // Storages of skipped tests were never created.
      for (const name of storageNames) {
        await deleteExternalStorageIfExists(client, name);
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await cleanup.run();
    const left = Object.keys(await listStorages()).filter((name) =>
      storageNames.includes(name),
    );
    if (left.length > 0) {
      throw new Error(`LEAK: external storages ${left.join(', ')}`);
    }
  });

  // The placeholder AWS keys are accepted on create, but the check fails with
  // code 4 (2026-10-16).
  it.skip('BLOCKED: CheckExternalStorage failed with error: "InvalidAccessKeyId: The AWS Access Key Id you provided does not exist in our records."', async () => {
    const myS3 = storageName('my-s3');
    const myCallType = await createCallType(client, cleanup);

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="Use your own storage" tab="Node.js" index=1
    // COPY: myS3="my-s3", myCallType="my-call-type"
    // 1. create a new storage with all the required parameters
    await client.createExternalStorage({
      bucket: 'my-bucket',
      name: myS3,
      storage_type: 's3',
      path: 'directory_name/',
      aws_s3: {
        s3_region: 'us-east-1',
        s3_api_key: 'my-access-key',
        s3_secret: 'my-secret',
      },
    });

    // 2. (Optional) Check storage configuration for correctness
    // In case of any errors, this will throw a ResponseError.
    await client.checkExternalStorage({
      name: myS3,
    });

    // 3. update the call type to use the new storage
    await client.video.updateCallType({
      name: myCallType,
      external_storage: myS3,
    });
    // #endregion snippet

    const callType = await client.video.getCallType({ name: myCallType });
    expect(callType.external_storage).toBe(myS3);
  });

  // The placeholder S3 storage is accepted by every start; the uploads fail
  // later, which this test doesn't wait for.
  it('starts transcription and recordings with a named storage', async () => {
    const myStorage = storageName('my-storage');
    await client.createExternalStorage({
      bucket: 'my-bucket',
      name: myStorage,
      storage_type: 's3',
      aws_s3: { s3_region: 'us-east-1' },
    });
    const storageCallType = await createCallType(client, cleanup);
    const call = client.video.call(storageCallType, uniqueId('call'));
    cleanup.calls.push(call.cid);
    await retryOnCallTypeMissing(() =>
      call.getOrCreate({
        data: { created_by_id: johnId, members: [{ user_id: johnId }] },
      }),
    );
    // Egress needs a call session: join over REST (see AGENTS.md).
    await retryOnCallTypeMissing(() => joinCallAsUser(call, johnId));
    cleanup.add(() => call.stopTranscription().catch(() => undefined));
    for (const recording_type of ['composite', 'individual', 'raw'] as const) {
      cleanup.add(() =>
        call.stopRecording({ recording_type }).catch(() => undefined),
      );
    }
    // Calls into the new call type can still hit nodes that don't know it.
    const originalTranscription = client.video.startTranscription.bind(
      client.video,
    );
    const startTranscription = vi
      .spyOn(client.video, 'startTranscription')
      .mockImplementation((request) =>
        retryOnCallTypeMissing(() => originalTranscription(request)),
      );
    const originalRecording = client.video.startRecording.bind(client.video);
    const startRecording = vi
      .spyOn(client.video, 'startRecording')
      .mockImplementation((request) =>
        retryOnCallTypeMissing(() => originalRecording(request)),
      );
    const updateCallType = vi.spyOn(client.video, 'updateCallType');

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="Multiple storage providers and default storage" tab="Node.js" index=1
    // COPY: storageCallType="my-call-type", myStorage="my-storage"
    // update the call type to use Stream-managed storage for recordings
    await client.video.updateCallType({
      name: storageCallType,
      external_storage: 'stream-s3',
    });

    // specify my-storage storage when starting call transcribing
    await call.startTranscription({
      transcription_external_storage: myStorage,
    });

    // specify my-storage storage for composite recording
    await call.startRecording({
      recording_type: 'composite',
      recording_external_storage: myStorage,
    });

    // specify my-storage storage for individual recording
    await call.startRecording({
      recording_type: 'individual',
      recording_external_storage: myStorage,
    });

    // specify my-storage storage for raw recording
    await call.startRecording({
      recording_type: 'raw',
      recording_external_storage: myStorage,
    });
    // #endregion snippet

    expect(startTranscription).toHaveBeenCalledWith({
      type: call.type,
      id: call.id,
      transcription_external_storage: myStorage,
    });
    expect(
      startRecording.mock.calls.map(([r]) => [
        r.recording_type,
        r.recording_external_storage,
      ]),
    ).toEqual([
      ['composite', myStorage],
      ['individual', myStorage],
      ['raw', myStorage],
    ]);
    const { call: data } = await call.get();
    // With the placeholder storage the transcriber doesn't come up:
    // `transcribing` stays false (without a storage it is true right away).
    expect(data.egress.individual_recording).toBeTruthy();
    expect(data.egress.raw_recording).toBeTruthy();
    const callType = await (updateCallType.mock.results[0].value as ReturnType<
      typeof client.video.updateCallType
    >);
    // `stream-s3` is the default storage: it reads back as no
    // `external_storage` at all (2026-10-16).
    expect(callType.name).toBe(storageCallType);
    expect(callType.external_storage).toBeUndefined();
  });

  it('creates an Amazon S3 storage', async () => {
    const myS3 = storageName('my-s3');

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="Code example" tab="Node.js" index=1
    // COPY: myS3="my-s3"
    await client.createExternalStorage({
      name: myS3,
      storage_type: 's3',
      bucket: 'my-bucket',
      path: 'directory_name/',
      aws_s3: {
        s3_api_key: 'my-access-key',
        s3_region: 'us-east-1',
        s3_secret: 'my-secret',
      },
    });
    // #endregion snippet

    expect((await listStorages())[myS3]).toMatchObject({
      name: myS3,
      type: 's3',
      bucket: 'my-bucket',
      path: 'directory_name/',
    });
  });

  it('creates an S3 compatible storage with a custom endpoint', async () => {
    const myS3 = storageName('my-s3');

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="S3 Compatible Storage (Minio)" tab="Node.js" index=1
    // COPY: myS3="my-s3"
    await client.createExternalStorage({
      name: myS3,
      storage_type: 's3',
      bucket: 'my-bucket',
      path: 'directory_name/',
      aws_s3: {
        s3_api_key: 'my-access-key',
        s3_region: 'us-east-1',
        s3_secret: 'my-secret',
        s3_custom_endpoint_url: 'https://s3.us-east-1.amazonaws.com',
      },
    });
    // #endregion snippet

    expect((await listStorages())[myS3]).toMatchObject({
      name: myS3,
      type: 's3',
      bucket: 'my-bucket',
      path: 'directory_name/',
    });
  });

  // The GCS service account is validated on create (2026-10-16).
  it.skip('BLOCKED: CreateExternalStorage failed with error: "invalid gcs credentials"', async () => {
    const myGcs = storageName('my-gcs');

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="Code example" tab="Node.js" index=2
    // COPY: myGcs="my-gcs"
    await client.createExternalStorage({
      bucket: 'my-bucket',
      name: myGcs,
      storage_type: 'gcs',
      path: 'directory_name/',
      gcs_credentials: 'content of the service account file',
    });
    // #endregion snippet

    expect((await listStorages())[myGcs]).toMatchObject({ type: 'gcs' });
  });

  it('creates an Azure Blob Storage storage', async () => {
    const myAbs = storageName('my-abs');

    // #region snippet docs="video/api/07-recording/08-storage.md" heading="Code example" tab="Node.js" index=3
    // COPY: myAbs="my-abs"
    await client.createExternalStorage({
      name: myAbs,
      storage_type: 'abs',
      bucket: 'my-bucket',
      path: 'directory_name/',
      azure_blob: {
        abs_account_name: '...',
        abs_client_id: '...',
        abs_client_secret: '...',
        abs_tenant_id: '...',
      },
    });
    // #endregion snippet

    expect((await listStorages())[myAbs]).toMatchObject({
      name: myAbs,
      type: 'abs',
      bucket: 'my-bucket',
      path: 'directory_name/',
    });
  });
});
