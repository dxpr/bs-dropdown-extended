# Contributing

## Git Workflow

1. **Never force push to `1.x`** - This is the main branch. Force pushing rewrites history and can lose work.

2. **Use feature branches** - Create a branch for your work:
   ```
   git checkout -b fix/description
   git checkout -b feature/description
   ```

3. **Create Pull Requests** - All changes to `1.x` should go through a PR for review.

4. **Keep commits atomic** - Each commit should be a single logical change.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: restructure code without changing behavior
```

## Before Submitting

1. Run `npm run build` to ensure CSS/JS compiles
2. Test your changes in `index.html`
3. Keep PRs focused - one feature or fix per PR
