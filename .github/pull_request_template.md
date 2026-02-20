# Pull Request Template

## Summary
- High-level change summary for reviewers.

## Related Issue
- Closes #

## Spec-Driven Artifacts
- Spec: `.agent/specs/<feature>-spec.md` (APPROVED required)
- Plan: `.agent/specs/<feature>-plan.md` (APPROVED required)
- Tasks: `.agent/specs/<feature>-tasks.md` (APPROVED required)

## Reviewer Quick View
- Primary packages/apps touched:
- User-visible behavior changes:
- New or changed public interfaces (API/routes/config/types):
- Breaking change: Yes / No (if Yes, explain briefly)

## Interface & Contract Changes
- Added:
- Modified:
- Removed:
- Migration needed: Yes / No

## Verification Log
- [ ] `pnpm install`
- [ ] `pnpm turbo build`
- [ ] Local smoke checks completed
- [ ] (If applicable) Vercel Preview smoke test completed

### Key Output (only critical lines)
```bash
# paste key output lines
```

## Post-Merge Production Check (same issue, no separate issue)
- Record location (issue comment URL):
- Result: Pass / Fail
- If fail, follow-up issue:

## Risks / Follow-ups (for human decision)
- Remaining risks:
- Follow-up issues:

## Review Checklist
- [ ] Branch name follows `issues/<number>-<type>-<description>`
- [ ] Scope matches related issue and approved artifacts
- [ ] `.agent` and `docs` updates are included when required
- [ ] No unrelated changes included
