---
title: "GitHub Copilot / VS Code Copilot Chat: Starter workflow"
description: "Solo-operator approach: keep scope tight, require verifiable outputs (diffs + build/test)."
tags: ["copilot", "github", "vscode", "ai-coding"]
updatedAt: "2026-03-10"
---

GitHub Copilot (including Copilot Chat inside VS Code) is great for **small, verifiable changes**: code reading, refactors, tests, and documentation. For solo operators, the key is to **treat it like a junior teammate**: you set boundaries, require evidence, and never ship blind.

## 1) What to use it for

- **Read code faster:** ask for entry points, data flow, and “where to start reading”.
- **Small diffs:** one function / one file / one route.
- **Tests & verification:** ask for a test plan and commands with expected output.
- **Docs & SOPs:** turn manual steps into repeatable checklists.

## 2) Rules for safe output

1. **Never paste secrets** (API keys, tokens, private URLs) into chat.
2. **Prefer minimal diffs** and request a patch-style output.
3. **Require verification commands** (build/test/lint) and the expected result.
4. **If the change is risky, ask for a rollback plan** first.

## 3) Prompt templates

### A) Codebase reading (no changes)

```text
Please explain this repository:
1) key entry points
2) data flow / call chain
3) where I should start reading

Constraints:
- read-only, do NOT modify files
- be concrete: list filenames and important functions
```

### B) Fix a bug (minimal patch)

```text
Here is the error: ...
Please:
1) identify the root cause
2) propose the smallest fix as a unified diff
3) provide verification commands (and expected results)
```

### C) Write an SOP

```text
Turn the following manual steps into a repeatable SOP:
...
Output:
- checklist format
- "common failure modes" section
- "how to rollback" section
```

## 4) Official references

- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [VS Code Copilot Chat docs](https://code.visualstudio.com/docs/copilot/chat/chat-ask-mode)

## 5) Next steps

- AI coding tools map: [`/en/guides/ai-coding-tools-map`](/en/guides/ai-coding-tools-map)
- AI tools directory: [`/en/directory`](/en/directory)
