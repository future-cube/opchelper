---
title: "Codex CLI: quickstart for real repositories"
description: "A practical guide: official references, guardrails, and a safe workflow for repo changes."
tags: ["codex", "openai", "coding", "cli", "agent"]
updatedAt: "2026-03-10"
---

Goal: treat Codex as a **controlled teammate**, not a magic button.

## Official references

- Help Center: `https://help.openai.com/en/collections/10467008-codex`
- Product page: `https://openai.com/codex`
- Repo (if you use the open-source CLI): `https://github.com/openai/codex`

## Guardrails first

- Exclude secrets (`.env`, keys, credentials) and build outputs.
- Start with minimal permissions: read → plan → you approve → write.
- Work in small, reversible steps with clear diffs and verification commands.

Next: Directory `/en/directory`

