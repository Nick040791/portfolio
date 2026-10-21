# Project Guidelines & Development Workflow

## Git Working Tree & Branching Strategy

For all new features, bug fixes, or enhancements:
1. **Always Use Git Working Trees**:
   - Never develop directly on `main`.
   - Create a dedicated working tree for every feature or fix using:
     ```bash
     git worktree add -b <branch-type>/<name> ../<branch-name> [base-branch]
     ```
   - Standard branch prefixes:
     - `feature/<description>` for new capabilities
     - `fix/<description>` for bug fixes
     - `refactor/<description>` for restructuring/cleanup
     - `docs/<description>` for documentation updates

2. **Conventional Commit Standards**:
   - Write clear, atomic commits using Conventional Commits:
     - `feat:` for new features
     - `fix:` for bug fixes
     - `refactor:` for code changes that neither fix a bug nor add a feature
     - `style:` for UI/formatting improvements
     - `docs:` for documentation updates
     - `test:` for adding or updating tests
     - `chore:` for build, dependency, or configuration updates

3. **Branching & Merging Lifecycle**:
   - Develop and test inside the working tree.
   - Verify with `npm run build` prior to committing.
   - Push branches to remote with tracking: `git push -u origin <branch-name>`.
   - Merge or open Pull Requests cleanly into the target branch (`dev` or `main`).
   - Clean up working trees when completed:
     ```bash
     git worktree remove ../<branch-name>
     ```
