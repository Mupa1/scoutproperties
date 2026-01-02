# Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run pre-commit checks before allowing commits.

## What Runs Before Commits

The pre-commit hook automatically runs:

1. **Linting** (both client and server)
   - Server: ESLint
   - Client: ESLint with auto-fix

2. **Tests** (both client and server)
   - Client: All Vitest tests
   - Server: All Jest tests (if MongoDB is running locally)

## Behavior

- ✅ **If all checks pass**: Commit proceeds normally
- ❌ **If any check fails**: Commit is blocked, you must fix the errors first

## Skipping the Hook (Not Recommended)

If you absolutely need to skip the pre-commit hook (e.g., for a WIP commit), you can use:

```bash
git commit --no-verify -m "your message"
```

⚠️ **Warning**: Only use `--no-verify` for work-in-progress commits. Never skip hooks for commits you plan to push, as CI will also fail.

## MongoDB for Server Tests

Server tests require MongoDB to be running. The hook will:
- ✅ Run server tests if MongoDB is available
- ⚠️ Skip server tests if MongoDB is not running (with a warning)

To run server tests locally, ensure MongoDB is running:
- Using Docker: `docker compose -f docker-compose.dev.yml up mongodb -d`
- Or start MongoDB manually

## Troubleshooting

If the pre-commit hook fails:

1. **Linting errors**: Run `yarn lint:all` to see all errors, then fix them
2. **Test failures**: Run `yarn test:all` to see which tests are failing
3. **MongoDB not available**: Start MongoDB if you want to run server tests locally

