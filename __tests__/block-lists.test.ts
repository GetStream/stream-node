import { beforeAll, describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from './create-test-client';
import { StreamClient } from '../src/StreamClient';
import { CreateBlockListRequest } from '../src/gen/models';

describe('block lists CRUD API', () => {
  let client: StreamClient;
  let blockList: CreateBlockListRequest;

  beforeAll(() => {
    client = createTestClient();
    blockList = {
      name: 'streamnodetest-F1' + uuidv4(),
      words: ['Ricciardo should retire'],
    };
  });

  it('create', async () => {
    const response = await client.createBlockList({
      ...blockList,
    });

    expect(response).toBeDefined();
  });

  it('list', async () => {
    const listResponse = await client.listBlockLists();

    expect(
      listResponse.blocklists.find((b) => b.name === blockList.name),
    ).toBeDefined();

    const getResponse = await client.getBlockList({ name: blockList.name });

    expect(getResponse.blocklist?.name).toBe(blockList.name);
  });

  it('update', async () => {
    const response = await client.updateBlockList({
      name: blockList.name,
      words: [...blockList.words, 'R1cciardo should retire'],
    });

    expect(response).toBeDefined();

    const updatedBlockList = await client.getBlockList({
      name: blockList.name,
    });

    expect(updatedBlockList.blocklist?.words.length).toBe(2);
  });

  it('delete', async () => {
    const response = await client.deleteBlockList({ name: blockList.name });
    expect(response).toBeDefined();
  });
});
