# Skill: Frontend Quality Review

Purpose:
- Review TS/React changes against the four principles: Readability / Predictability / Cohesion / Coupling.

Trigger:

- Code review request
- Refactoring design
- New component design validation

Review Procedure:

1. Confirm the purpose of the change and its user impact first.
2. Evaluate each of the four principles for violations.
3. Classify issues as `BLOCK / WARN / NOTE`.
4. Record evidence for each issue (location / reproduction / impact).
5. Provide Before/After examples where needed.

Judgment Criteria:

- Readability: Can it be read top-to-bottom without mental context jumps?
- Predictability: Does the name / signature alone reveal the behavior?
- Cohesion: Does code that changes together live together?
- Coupling: Is the blast radius of a change contained?

Trade-off Rules:

- High bug risk → prioritize predictability and cohesion.
- Low risk → duplication of ≤3 similar lines is acceptable to preserve readability.
