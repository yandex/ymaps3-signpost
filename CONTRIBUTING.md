# Contributing

Use Node.js 24 and install dependencies from the lockfile:

```sh
nvm use
npm ci
```

For builds, examples and JS API integration tests, set `APIKEY` in an untracked
`.env` file. Obtain a key at https://developer.tech.yandex.ru/ and allow the referrer you
use locally (for example, `http://yandex.localhost/`). Set `REFERRER` accordingly.

```sh
npm start
npm run lint
npm run build
REFERRER=http://yandex.localhost/ npm test
npm pack --dry-run
```

Building the package makes no JS API requests, but the shared webpack configuration
in the currently installed CLI still requires a nonempty `APIKEY`. CI supplies it
from GitHub Secrets. `REFERRER` is used by integration tests, not the build.

## GitHub Actions

- `.github/workflows/tests.yml` runs the `build` job on pushes to main and pull
  requests targeting main: install, lint, build, JS API integration tests and
  package inspection. Tests are required; missing credentials fail CI. Fork pull
  requests do not receive repository secrets and cannot pass this workflow as-is.
  Configure the required status check as `build`, with GitHub Actions as its source.
- `.github/workflows/release.yml` releases version tags without a `v` prefix, such
  as `0.0.3`. A manual run must also select a tag matching `package.json`.
  The tagged commit must belong to the history of main. A release always requires
  passing integration tests with a real `APIKEY`.

Configure the GitHub Actions secrets `APIKEY` and `REFERRER` using a referrer
allowed for the key (for example, `http://yandex.localhost/`). No npm publish token
is required.

## Enable npm publishing

Keep the migration PR unmerged until npm trusted publishing and the integration
test secrets are configured. Merging to main runs CI but does not publish;
publishing requires a version tag or a manual run against a matching tag.

An npm maintainer must configure the existing `@yandex/ymaps3-signpost` package:

- Provider: GitHub Actions
- Organization: `yandex`
- Repository: `ymaps3-signpost`
- Workflow filename: `release.yml` (not the full path)
- Environment: leave empty; this workflow does not declare an environment
- Allow direct `npm publish`

Use npm >=11.5.1; Node 24 includes a compatible npm version. Configure trust when
ready to release: its first successful publish must happen within two days.
See https://docs.npmjs.com/trusted-publishers for the current requirements.

After configuring trust and test secrets, merge the migration PR. Disable the
old repository's publisher before pushing the first new release tag. Publish a
new version; existing npm versions cannot be replaced. Verify the published
package and provenance before archiving the old repository or removing its
remaining publishing credentials.

## Release a version

Work from a clean `main` branch, with `origin` pointing to
`git@github.com:yandex/ymaps3-signpost.git`, then run:

```sh
npm run bump
```

This increments the patch version, commits only the manifests, creates the
matching version tag and atomically pushes main with only that new tag. It
refuses a dirty checkout or a different branch. Do not use `git push --tags`
when importing historical tags.

Stable versions publish to npm `latest`. Explicitly prepared prerelease tags
publish to `next`; a prerelease does not replace `latest`. Git tags identify
source commits; npm dist-tags identify installation channels.
