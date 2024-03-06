# :recycle: Contributing

We welcome code changes that improve this library or fix a problem, please make sure to follow all best practices and add tests if applicable before submitting a Pull Request on Github. We are very happy to merge your code in the official repository. Make sure to sign our [Contributor License Agreement (CLA)](https://docs.google.com/forms/d/e/1FAIpQLScFKsKkAJI7mhCr7K9rEIOpqIDThrWxuvxnwUq2XkHyG154vQ/viewform) first. See our license file for more details.

## Getting started

### Install dependencies

```shell
$ yarn install
```

### Run tests

```shell
$ yarn test
```

## Linting and code formatting

We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting. We enforce formatting with pre-commit hook, linting with CI. If your IDE has integration with these tools, it's recommended to set them up.

## Commit message convention

Since we're autogenerating our [CHANGELOG](./CHANGELOG.md) and version bump, we need to follow a specific commit message convention on the `main` branch.

The recommended approach is to use "Squash and merge" and make sure the **PR title** follows the [conventional commits format](https://www.conventionalcommits.org/). Here's how a usual PR title looks like for a new feature: `feat: allow provided config object to extend other configs`. A bugfix: `fix: prevent racing of requests`. We have a CI action to make sure the PR title follows the necessary format.

If you don't want to squash your commits, make sure that your commits follow the above format.

## Generating code from Open API

### Commands

Checkout the [protocol](https://github.com/GetStream/protocol) or [chat](https://github.com/GetStream/chat) reporisitories and run one of the following commands:

```shell
# if you have protocol repo:
$ yarn generate:open-api
# if you have chat repo
$ yarn generate:open-api:dev
```

If you want to update only chat or video you need to define the `PRODUCT` env variable like this:

```shell
$ PRODUCT=video yarn generate:open-api
$ PRODUCT=chat yarn generate:open-api:dev
```

### Fix issues in chat code

If you have updated the generated chat code you'll have to fix the following issues manually in the generated code:

- Add `/** @ts-expect-error */ ` (make sure to use this exact comment format otherwise they will be missing from `d.ts` files) for imports for `ImageSizeRequest`, `OnlyUserIDRequest` in the `gen/chat/FilesApi.ts` and `gen/chat/MessagesApi.ts` files
- Add `/** @ts-expect-error */ ` (make sure to use this exact comment format otherwise they will be missing from `d.ts` files) for duplicate exports in `gen/chat/index.ts`
- Fix the query param serizalization in the `gen/chat/MessagesApi.ts` file's `getManyMessagesRaw` function. This is the correct serialization:

```typescript
if (requestParameters.ids) {
  queryParameters["ids"] = requestParameters.ids.join(",");
}
```

### Validate that the generated code works

To check your work, run the following commands:

```
yarn start
yarn test
```

If these commands run fine, we're good to go.

## Release (for Stream developers)

Releasing this package involves two GitHub Action steps:

- Whenever a new feature/fix is pushed to `main` a release PR is created ([example PR](https://github.com/GetStream/stream-node/pull/8)). That PR will be automatically updated on pushes to `main`.
- When you're ready to release, merge the release PR

Once the PR is merged, it automatically kicks off another job which will release the pacakge to npm.
