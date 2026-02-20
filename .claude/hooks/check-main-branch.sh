#!/bin/bash
# PreToolUse hook — blocks git commit/push on the main branch.
# Receives tool input JSON via stdin.

input=$(cat)

cmd=$(echo "$input" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(d.get('tool_input', {}).get('command', ''))
" 2>/dev/null)

if echo "$cmd" | grep -qE "git (commit|push)"; then
    branch=$(git branch --show-current 2>/dev/null)
    if [ "$branch" = "main" ]; then
        echo "BLOCKED: main 브랜치에서 git commit/push 불가." >&2
        echo "최신화된 메인 브랜치로 부터 이슈 브랜치를 먼저 생성하세요: git checkout -b issues/<number>-<type>-<description>" >&2
        echo "전체 규칙: .agent/skills/git-workflow.md" >&2
        exit 1
    fi
fi

exit 0
