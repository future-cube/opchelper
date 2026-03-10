---
title: "Cursor: a safe starter guide (.cursorignore and project rules)"
description: "Control what Cursor can read and index, then add project rules for consistent outcomes."
tags: ["cursor", "editor", "ide", "rules", "security"]
updatedAt: "2026-03-10"
---

Start by controlling context:
- Cursor docs: `https://docs.cursor.com/`
- Ignore files: `https://docs.cursor.com/context/ignore-files`

Minimum `.cursorignore` suggestions:
```
.env
**/*.pem
**/*.key
node_modules/
dist/
.nuxt/
.output/
```

Then add project rules: preferred language, change scope, verification commands, and "small commits" policy.

