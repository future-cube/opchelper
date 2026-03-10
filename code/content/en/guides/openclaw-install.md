---
title: "OpenClaw install and initialization (with safety checks)"
description: "Follow official docs to install OpenClaw, verify it runs, and start safely with isolation + minimal permissions."
tags: ["openclaw", "installation", "security", "workflow"]
updatedAt: "2026-03-10"
---

Official docs:
- https://docs.openclaw.ai/
- Install: https://docs.openclaw.ai/install/

Safe defaults for solo operators:
- Use a dedicated working folder (don’t run in your main project repo first).
- Avoid exposing secrets (`.env`, keys, browser cookies).
- Start with read-only workflows (collect/summarize) before allowing edits/exec.

Note: per the official install page, the CLI binary name is typically `claw`. Follow the latest install doc for your platform:
- https://docs.openclaw.ai/install/

Next:
- `/en/guides/openclaw-quickstart`
- `/en/guides/openclaw-workflows`
