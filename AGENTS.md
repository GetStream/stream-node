Guidance for AI coding agents (Copilot, Cursor, Aider, Claude, etc.) working in this repository. Human readers are welcome, but this file is written for tools.

### Repository purpose

This repo hosts Stream's Node.js SDK in TypeScript. It provides:
• A comprehensive client for Stream's Chat, Video, and Feeds (v3) APIs
• Server-side SDK for building chat, video calling, and activity feeds
• Support for all Stream services: Chat, Video, Feeds (v3), and Moderation

Agents should prioritize backwards compatibility, API stability, and high test coverage when changing code.

### Tech & toolchain

• Language: TypeScript (Node.js)
• Package managers: Yarn (primary)
• Minimum Node.js: 18.0.0 or newer (see package.json engines)
• Runtime targets: Node.js 18+, Node.js 20+, Node.js 22+, Bun 1+
• CI: GitHub Actions (assume PR validation on build + tests + lint)
• Linters & docs: ESLint + Prettier

### Project layout (high level)

src/
gen/ # Generated API clients and models
chat/ # Chat API client and models
video/ # Video API client and models
feeds/ # Feeds API client and models
moderation/ # Moderation API client and models
common/ # Common API utilities
models/ # API request and response models for all supported products
utils/ # Utility functions (token creation, rate limiting)
StreamClient.ts # Main client class
StreamChatClient.ts # Chat-specific client
StreamVideoClient.ts # Video-specific client
StreamFeedsClient.ts # Feeds-specific client
StreamModerationClient.ts # Moderation-specific client
**tests**/ # Test files
\*.test.ts # Test files for each module

Use the closest folder's patterns and conventions when editing.

### Local setup (Node.js)

1.  Ensure Node.js 18+ is installed
2.  Install dependencies: `yarn install`
3.  Build the project: `yarn build`
4.  Run tests: `yarn test`

### Alternative: Package consumer check

If you need to validate as a package consumer:

1.  Create a throwaway sample project.
2.  Add to package.json:

```json
{
  "dependencies": {
    "@stream-io/node-sdk": "^0.6.5"
  }
}
```

3.  Install and test the integration.

### Available Scripts

Common npm/yarn scripts in this repo include:
• `build` - Build the TypeScript project to dist/
• `test` - Run tests with Vitest
• `test:bun` - Run tests with Bun
• `lint` - Run ESLint
• `lint:fix` - Run ESLint with auto-fix
• `prettier:fix` - Run Prettier to format code
• `generate:open-api` - Regenerate API clients from OpenAPI specs

Agents should check package.json scripts before running commands.

### Build & test commands (CLI)

Use yarn/npm for day-to-day work; use CLI for CI parity & agent automation.

Build the project:

```bash
yarn build
```

Run all tests:

```bash
yarn test
```

Run tests with Bun:

```bash
yarn test:bun
```

Run linting:

```bash
yarn lint
```

Format code:

```bash
yarn prettier:fix
```

Linting & formatting
• ESLint and Prettier are configured for this project. Run before committing:

```bash
yarn lint
yarn prettier:fix
```

• Respect .eslintrc and .prettierrc configurations. Do not suppress rules broadly; justify and scope exceptions.
• The project uses lint-staged with Husky for pre-commit hooks.

Commit / PR conventions
• Use conventional commit format for commit messages.
• Keep PRs small and focused; include tests.
• Follow the project’s “zero warnings” policy—fix new warnings and avoid introducing any.
• Ensure public API changes include docs and migration notes.

Testing policy
• Add/extend tests in the **tests**/ folder with .test.ts suffix.
• Cover:
• Core API clients and models (StreamClient, StreamChatClient, etc.)
• Utility functions (token creation, rate limiting)
• Generated API clients and their interactions

Security & credentials
• Never commit API keys or customer data.
• Example code must use obvious placeholders (e.g., YOUR_STREAM_KEY).
• If you add scripts, ensure they fail closed on missing env vars.

Compatibility & distribution
• Maintain compatibility with supported Node.js versions listed in package.json engines (Node.js 18+).
• Don't introduce third-party deps without discussion.
• Validate yarn integration and ensure the package works in both CommonJS and ES modules.
• Test compatibility with Bun runtime when making changes.

When in doubt
• Mirror existing patterns in the nearest module.
• Prefer additive changes; avoid breaking public APIs.
• Ask maintainers (CODEOWNERS) through PR mentions for modules you touch.

⸻

Quick agent checklist (per commit)
• Build the project: `yarn build`
• Run tests: `yarn test`
• Run linting: `yarn lint`
• Format code: `yarn prettier:fix`
• Add/adjust tests
• No new warnings or linting errors

End of machine guidance. Edit this file to refine agent behavior over time; keep human-facing details in README.md and docs.
