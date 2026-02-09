---
title: Claude Flow
tags: [ai, agent, mcp, claude]
---

# Claude Flow

- [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow)
  - MIT, TypeScript
  - **定位**: Enterprise AI Orchestration Platform for Claude Code.
  - **核心**: 基于 MCP (Model Context Protocol) 的 Headless 代理编排工具。
- Claude Code 2.1.32 有了内置的实验性 TeamMate

```bash
npx claude-flow@alpha init --v3-mode

claude mcp list

npx claude-flow --agent coder --task ""


npx claude-flow@v3alpha agent spawn -t coder --name my-coder

# Initialize project with wizard
npx claude-flow@v3alpha init --wizard

# Start daemon with background workers
npx claude-flow@v3alpha daemon start

# Spawn an agent with specific type
npx claude-flow@v3alpha agent spawn -t coder --name my-coder

# Initialize swarm with V3 mode
npx claude-flow@v3alpha swarm init --v3-mode

# Search memory (HNSW-indexed, 150x faster)
npx claude-flow@v3alpha memory search -q "authentication patterns"

# Run security scan
npx claude-flow@v3alpha security scan --depth full

# Performance benchmark
npx claude-flow@v3alpha performance benchmark --suite all
```
