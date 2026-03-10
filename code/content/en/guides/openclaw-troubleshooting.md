---
title: "OpenClaw troubleshooting: install, permissions, and “agent drift”"
description: "A practical checklist to debug common issues: missing command, permission prompts, unstable outputs, and rollback strategy."
tags: ["openclaw", "troubleshooting", "security", "workflow"]
updatedAt: "2026-03-10"
---

Principles:
- reproduce in an empty folder first
- keep changes small and reversible
- require verification steps (build/test) before merging

If the CLI is not found:
- check `command -v claw` (the binary name is typically `claw` per official install docs)
- verify `PATH`
- follow the latest install guide: https://docs.openclaw.ai/install/

Next: `/en/guides/openclaw-install`
