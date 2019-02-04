# Contributing

You want do something for this repo? Nice and easy! And of course: you are the best!

## Contents

- [Run tests](#run-tests)
- [Build the library](#build-the-library)
- [Commit changes](#commit-changes)
- [Recommended workflow for release](#recommended-workflow-for-release)

---

Clone the repo and ...

## Run tests

To lint the application and run all the tests use:

```shell
npm test
```

## Build the library

If you want to build the application you can run

```shell
npm run build
```

## Commit changes

**This repo is is Commitizen-friendly!** ([read more][czcli])

Checkout a new branch, the naming convention is:

`[feature|fix|refactor|chore]/change-name`

e.g.:

```shell
git checkout -b feature/restore-alea-state
```

Add your changes and run `npm run commit` to start the commitizen cli
to create a proper commit message.

Push the changes and your feature branch and create a "Merge Request" on
GitHub.

## Recommended workflow for release

1. Make changes
2. Commit those changes with `npm run commit`
3. Make sure all tests turn green
4. Create a new release with `npm run release`
5. Push your release `git push --follow-tags origin master`
6. Publish: `NPM_CONFIG_OTP=XXXXXX npm publish` (replace `XXXXXX` with a valid 2FA token)
7. **Done!**

For more information on building a release see [https://github.com/conventional-changelog/standard-version][sv]

[czcli]: http://commitizen.github.io/cz-cli/
[sv]: https://github.com/conventional-changelog/standard-version
