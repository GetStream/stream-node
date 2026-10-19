import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { getServerClient } from '../../../../helpers/clients';
import { Cleanup } from '../../../../helpers/cleanup';
import { uniqueId } from '../../../../helpers/ids';

const DOCS = 'activity-feeds/v3-latest/_default/06-features/02-bookmarks.md';

const client = getServerClient();
const cleanup = new Cleanup(client);

describe(DOCS, () => {
  /** A `uniqueId` user with its own user feed (bookmarks go away with the user). */
  const createUser = async (name: string) => {
    const id = uniqueId(name);
    cleanup.users.push(id);
    cleanup.feeds.push(`user:${id}`);
    await client.upsertUsers([{ id }]);
    return id;
  };

  /** A new activity in `userId`'s user feed. */
  const createActivity = async (userId: string, text = 'setup') => {
    const { activity } = await client.feeds.addActivity({
      feeds: [`user:${userId}`],
      type: 'post',
      text,
      user_id: userId,
    });
    return activity;
  };

  /** A folder of `userId`, created by bookmarking a setup activity into it. */
  const createFolder = async (userId: string, name: string) => {
    const activity = await createActivity(userId);
    const { bookmark } = await client.feeds.addBookmark({
      activity_id: activity.id,
      user_id: userId,
      new_folder: { name },
    });
    const id = bookmark.folder?.id;
    if (!id) throw new Error('setup folder has no id');
    return id;
  };

  afterEach(() => vi.restoreAllMocks());
  afterAll(() => cleanup.run());

  it('adds and updates bookmarks', async () => {
    const userId = await createUser('bookmarker');
    const activityId = (await createActivity(userId)).id;
    const folderId = await createFolder(userId, 'existing');
    const oldFolderId = folderId;
    const newFolderId = await createFolder(userId, 'target');

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/02-bookmarks.md" heading="Adding Bookmarks" tab="Node.js" index=1
    // COPY: activityId="activity_123", userId="<user_id>", folderId="folder_456", oldFolderId="<old folder id>", newFolderId="<new folder id>"
    // Adding a bookmark to a new folder
    const bookmark = await client.feeds.addBookmark({
      activity_id: activityId,
      user_id: userId,
    });

    // Adding to an existing folder
    const bookmarkWithFolder = await client.feeds.addBookmark({
      activity_id: activityId,
      folder_id: folderId,
      user_id: userId,
    });

    // Update a bookmark (without a folder initially) - add custom data and move it to a new folder
    const updatedBookmark = await client.feeds.updateBookmark({
      activity_id: activityId,
      new_folder: {
        name: 'New folder name',
        custom: {
          icon: '📂',
        },
      },
      custom: {
        color: 'blue',
      },
      user_id: userId,
    });

    // Update a bookmark - move it from one existing folder to another existing folder
    const movedBookmark = await client.feeds.updateBookmark({
      activity_id: activityId,
      folder_id: oldFolderId,
      new_folder_id: newFolderId,
      user_id: userId,
    });
    // #endregion snippet

    expect(bookmark.bookmark).toMatchObject({ activity_id: activityId });
    expect(bookmark.bookmark.folder).toBeUndefined();
    expect(bookmarkWithFolder.bookmark).toMatchObject({
      activity_id: activityId,
      folder: { id: folderId },
    });
    expect(updatedBookmark.bookmark).toMatchObject({
      activity_id: activityId,
      folder: { name: 'New folder name', custom: { icon: '📂' } },
      custom: { color: 'blue' },
    });
    expect(movedBookmark.bookmark).toMatchObject({
      activity_id: activityId,
      folder: { id: newFolderId },
    });
  });

  it('removes a bookmark and reads bookmarks from the feed', async () => {
    const saraId = await createUser('sara');
    const testUser2 = { id: await createUser('test-user-2') };
    const activityId = (await createActivity(saraId)).id;
    for (const user_id of [saraId, testUser2.id]) {
      await client.feeds.addBookmark({ activity_id: activityId, user_id });
    }
    const serverClient = client;
    const feed = client.feeds.feed('user', saraId);
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/02-bookmarks.md" heading="Removing Bookmarks" tab="Node.js" index=1
    // COPY: saraId="sara"
    // Removing a bookmark
    await serverClient.feeds.deleteBookmark({
      activity_id: activityId,
      user_id: testUser2.id,
    });

    // When you read a feed we include the bookmark
    const response = await feed.getOrCreate({ user_id: saraId });
    console.log(response.activities[0].own_bookmarks);
    console.log(response.activities[0].bookmark_count);
    // #endregion snippet

    const [first] = response.activities;
    expect(first.id).toBe(activityId);
    // Only Sara's bookmark is left.
    expect(first.bookmark_count).toBe(1);
    expect(first.own_bookmarks).toMatchObject([{ user: { id: saraId } }]);
    expect(log.mock.calls).toEqual([
      [first.own_bookmarks],
      [first.bookmark_count],
    ]);
  });

  it('queries bookmarks', async () => {
    const userId = await createUser('bookmarker');
    const folderId = await createFolder(userId, 'folder');
    const activities = [
      await createActivity(userId, 'a'),
      await createActivity(userId, 'b'),
    ];
    for (const activity of activities) {
      await client.feeds.addBookmark({
        activity_id: activity.id,
        user_id: userId,
      });
    }
    const activityId = activities[0].id;

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/02-bookmarks.md" heading="Querying Bookmarks" tab="Node.js" index=1
    // COPY: userId="<user id>", activityId="activity_123", folderId="folder_456"
    // Query bookmarks
    const firstPage = await client.feeds.queryBookmarks({
      filter: {
        user_id: userId,
      },
      limit: 2,
    });

    // Get next page
    const secondPage = await client.feeds.queryBookmarks({
      filter: {
        user_id: userId,
      },
      limit: 2,
      next: firstPage.next,
    });

    // Query by activity ID
    const response = await client.feeds.queryBookmarks({
      filter: {
        user_id: userId,
        activity_id: activityId,
      },
    });

    // Query by folder ID
    const folderResponse = await client.feeds.queryBookmarks({
      filter: {
        user_id: userId,
        folder_id: folderId,
      },
    });
    // #endregion snippet

    // Three bookmarks: one in the folder, two without a folder.
    expect(firstPage.bookmarks).toHaveLength(2);
    expect(secondPage.bookmarks).toHaveLength(1);
    expect(
      [...firstPage.bookmarks, ...secondPage.bookmarks].map(
        (b) => b.activity_id,
      ),
    ).toEqual(expect.arrayContaining(activities.map((a) => a.id)));
    expect(response.bookmarks.map((b) => b.activity_id)).toEqual([activityId]);
    expect(folderResponse.bookmarks).toMatchObject([
      { folder: { id: folderId } },
    ]);
  });

  it('queries bookmark folders', async () => {
    const userId = await createUser('bookmarker');
    for (const name of ['project a', 'project b', 'project c', 'other']) {
      await createFolder(userId, name);
    }

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/02-bookmarks.md" heading="Querying Bookmark Folders" tab="Node.js" index=1
    // COPY: userId="<user id>"
    // Query bookmark folders
    const firstPage = await client.feeds.queryBookmarkFolders({
      filter: {
        user_id: userId,
      },
      limit: 2,
    });

    // Get next page
    const secondPage = await client.feeds.queryBookmarkFolders({
      filter: {
        user_id: userId,
      },
      limit: 2,
      next: firstPage.next,
    });

    const response = await client.feeds.queryBookmarkFolders({
      filter: {
        user_id: userId,
        folder_name: {
          $contains: 'project',
        },
      },
      limit: 2,
    });
    // #endregion snippet

    // Newest first: every folder, then the first two "project" folders.
    expect(
      [...firstPage.bookmark_folders, ...secondPage.bookmark_folders].map(
        (f) => f.name,
      ),
    ).toEqual(['other', 'project c', 'project b', 'project a']);
    expect(response.bookmark_folders.map((f) => f.name)).toEqual([
      'project c',
      'project b',
    ]);
  });

  it('manages bookmark folders', async () => {
    const userId = await createUser('bookmarker');
    const activity = await createActivity(userId);

    // #region snippet docs="activity-feeds/v3-latest/_default/06-features/02-bookmarks.md" heading="Delete bookmark folder" tab="Node.js" index=1
    // COPY: userId="<user_id>"
    const bookmark = (
      await client.feeds.addBookmark({
        activity_id: activity.id,
        user_id: userId,
        new_folder: {
          name: 'Breakfast recipes',
          custom: {
            icon: '🍳',
          },
        },
      })
    ).bookmark;

    const updatedFolder = (
      await client.feeds.updateBookmarkFolder({
        folder_id: bookmark.folder?.id ?? '',
        name: 'Sweet Breakfast Recipes',
        custom: {
          icon: '🥞',
        },
      })
    ).bookmark_folder;

    await client.feeds.deleteBookmarkFolder({
      folder_id: updatedFolder.id,
    });
    // #endregion snippet

    expect(bookmark.folder).toMatchObject({
      name: 'Breakfast recipes',
      custom: { icon: '🍳' },
    });
    expect(updatedFolder).toMatchObject({
      id: bookmark.folder?.id,
      name: 'Sweet Breakfast Recipes',
      custom: { icon: '🥞' },
    });
    // Deleting the folder deletes its bookmarks too.
    const { bookmarks } = await client.feeds.queryBookmarks({
      filter: { user_id: userId },
    });
    expect(bookmarks).toEqual([]);
    const { bookmark_folders } = await client.feeds.queryBookmarkFolders({
      filter: { user_id: userId },
    });
    expect(bookmark_folders).toEqual([]);
  });
});
