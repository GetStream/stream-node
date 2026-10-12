/**
 * Optional push provider credentials (repo root .env). Push snippets that need real
 * credentials go in `describe.skipIf(!hasFirebaseCredentials)(...)`, so the suite still
 * runs without them. The tests only call the API and check the response / settings;
 * they don't check that notifications arrive.
 */

/** Firebase service account JSON (the file contents, as one line). */
export const firebaseCredentials =
  process.env.DOCS_PUSH_FIREBASE_CREDENTIALS ?? '';

export const hasFirebaseCredentials = firebaseCredentials !== '';
