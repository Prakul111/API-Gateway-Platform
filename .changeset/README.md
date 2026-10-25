# Changesets in this Monorepo

This repository uses [Changesets](https://github.com/changesets/changesets) to manage changelogs, package versioning, and publishing.

## How to add a change

Whenever you or an AI agent add a feature, fix a bug, or make a breaking change:

1. Run:

   ```bash
   pnpm changeset
   ```

   Or create a markdown file in `.changeset/<unique-name>.md` directly.

2. Follow the prompt to choose:
   - Which packages are affected (e.g., `web`, `docs`, `@repo/ui`)
   - The type of change: `patch` (bug fixes), `minor` (features), or `major` (breaking changes)
   - A summary message describing what changed

3. Commit the generated `.changeset/<unique-name>.md` file alongside your code.

## How to release / generate CHANGELOGs

To bump versions and update all package `CHANGELOG.md` files:

```bash
pnpm version-packages
```

This consumes the `.changeset/*.md` files and updates package versions and changelogs automatically.
