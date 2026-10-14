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

/**
 * The sample Firebase service account JSON of the platform docs ("Upload your
 * credentials" on `platform/03-events-and-notifications/03-push-providers.md`), as one
 * string. Push snippets pass it where the docs have a credentials placeholder (through a
 * COPY variable). If the API rejects it, the snippet needs real credentials: skip it.
 */
export const sampleFirebaseCredentials = JSON.stringify({
  type: 'service_account',
  project_id: 'your-project-id',
  private_key_id: 'key-id',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com',
  client_id: 'client-id',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
});
