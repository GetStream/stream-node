import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { StreamError } from '../../../../../index';
import { getServerClient } from '../../../helpers/clients';
import { Cleanup } from '../../../helpers/cleanup';
import { uniqueId } from '../../../helpers/ids';
import { retry } from '../../../helpers/wait';

const DOCS = 'moderation/_default/04-configuration/05-evaluations.md';

const TERMINAL = ['completed', 'error', 'cancelled'];

describe(DOCS, () => {
  const client = getServerClient();
  const cleanup = new Cleanup(client);
  // The docs' "chat:messaging" policy, test-owned (a channel-level chat policy).
  const configKey = `chat:messaging:${uniqueId('evals')}`;
  // The docs' "Hate-speech sample" set name (names are unique per app).
  const setName = uniqueId('hate-speech-sample');
  // A set with pasted rows, the docs' "pts_..." set for get / run / delete.
  const rowsSetName = uniqueId('evals-rows');
  const rowTexts = ['hello there', 'buy cheap pills now'];
  let setId = '';
  let runId = '';
  // Evaluation sets have server-assigned ids and aren't covered by the leak check.
  const createdSetIds: string[] = [];

  const isNotFound = (error: unknown) =>
    error instanceof StreamError && error.metadata.responseCode === 404;

  beforeAll(async () => {
    await client.moderation.upsertConfig({
      key: configKey,
      ai_text_config: { rules: [{ label: 'SPAM', action: 'flag' }] },
    });
    cleanup.add(() => client.moderation.deleteConfig({ key: configKey }));
    cleanup.add(async () => {
      for (const id of createdSetIds) {
        await client.moderation
          .deletePolicyTestSet({ id })
          .catch((error: unknown) => {
            if (!isNotFound(error)) throw error;
          });
      }
    });

    const { set } = await client.moderation.createPolicyTestSet({
      name: rowsSetName,
      config_key: configKey,
      rows: rowTexts.map((text) => ({ text })),
    });
    if (!set) throw new Error('evaluation set not created');
    createdSetIds.push(set.id);
    setId = set.id;
  });

  afterAll(async () => {
    await cleanup.run();
    // Leak check for evaluation sets: none of this file's sets may be left.
    const { sets } = await client.moderation.listPolicyTestSets();
    expect(sets.filter((s) => [setName, rowsSetName].includes(s.name))).toEqual(
      [],
    );
  });

  it('creates an evaluation set', async () => {
    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="Create an evaluation set" tab="Node.js" index=1
    // COPY: setName="Hate-speech sample", configKey="chat:messaging"
    const response = await client.moderation.createPolicyTestSet({
      name: setName,
      config_key: configKey,
      seed: { labels: [], limit: 100 },
    });
    // #endregion snippet

    const { set } = response;
    if (set) createdSetIds.push(set.id);
    expect(set).toMatchObject({ name: setName, config_key: configKey });
    // Seeded from the newest moderated production content.
    expect(set?.rows?.length).toBeGreaterThan(0);
    expect(set?.rows?.length).toBeLessThanOrEqual(100);
    expect(set?.row_count).toBe(set?.rows?.length);
  });

  it('gets an evaluation set', async () => {
    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="Get an evaluation set" tab="Node.js" index=1
    // COPY: setId="pts_..."
    const response = await client.moderation.getPolicyTestSet({ id: setId });
    // #endregion snippet

    expect(response.set).toMatchObject({
      id: setId,
      name: rowsSetName,
      config_key: configKey,
    });
    expect(response.set?.rows?.map((row) => row.text)).toEqual(rowTexts);
    // No run yet: no baseline.
    expect(response.recent_runs ?? []).toEqual([]);
    expect(response.baseline_run_id).toBeUndefined();
  });

  it('starts a run', async () => {
    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="Start a run" tab="Node.js" index=1
    // COPY: setId="pts_..."
    const response = await client.moderation.startPolicyTestRun({ id: setId });
    // #endregion snippet

    expect(response.run).toMatchObject({
      set_id: setId,
      config_key: configKey,
      rows_total: rowTexts.length,
    });
    expect(['pending', 'running', ...TERMINAL]).toContain(response.run?.status);
    runId = response.run?.id ?? '';
    expect(runId).not.toBe('');
  });

  it('gets a run and its results', async () => {
    // Poll until the run is terminal, as the docs describe.
    await retry(async () => {
      const { run } = await client.moderation.getPolicyTestRun({ id: runId });
      if (!TERMINAL.includes(run?.status ?? '')) {
        throw new Error(`run ${runId} still ${run?.status}`);
      }
    });

    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="Get a run (and results)" tab="Node.js" index=1
    // COPY: runId="ptr_..."
    const response = await client.moderation.getPolicyTestRun({ id: runId });
    // #endregion snippet

    expect(response.run).toMatchObject({
      id: runId,
      set_id: setId,
      status: 'completed',
      rows_total: rowTexts.length,
      rows_completed: rowTexts.length,
    });
    expect(response.results?.map((r) => [r.row_index, r.message_text])).toEqual(
      rowTexts.map((text, i) => [i, text]),
    );
    // Rows without expectations on the baseline run are unscored.
    expect(response.results?.every((r) => !r.scored)).toBe(true);

    // The first completed run is the set's baseline.
    const { baseline_run_id } = await client.moderation.getPolicyTestSet({
      id: setId,
    });
    expect(baseline_run_id).toBe(runId);
  });

  // The generated `listPolicyTestSets()` takes no arguments (TS2554), so
  // `limit` isn't sent: the API returns its default page size.
  it('lists evaluation sets', async () => {
    // @ts-expect-error SDK issue: generated listPolicyTestSets() takes no arguments, so limit is not sent
    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="List evaluation sets" tab="Node.js" index=1
    const response = await client.moderation.listPolicyTestSets({ limit: 50 });
    // #endregion snippet

    const listed = response.sets.find((set) => set.id === setId);
    expect(listed).toMatchObject({ name: rowsSetName, config_key: configKey });
    // `last_run` saves a request per set for the last-run status.
    expect(listed?.last_run).toMatchObject({ id: runId, status: 'completed' });
  });

  it('deletes an evaluation set', async () => {
    // #region snippet docs="moderation/_default/04-configuration/05-evaluations.md" heading="Delete an evaluation set" tab="Node.js" index=1
    // COPY: setId="pts_..."
    await client.moderation.deletePolicyTestSet({ id: setId });
    // #endregion snippet

    await expect(
      client.moderation.getPolicyTestSet({ id: setId }),
    ).rejects.toMatchObject({ code: 16, metadata: { responseCode: 404 } });
  });
});
