---
title: Memory
---

# Memory

- [campfirein/byterover-cli](https://github.com/campfirein/byterover-cli)
  - ELv2, TypeScript, React, Ink
  - 为 AI 编码 Agent（如 Cursor, Claude Code）提供持久、结构化的记忆和上下文管理。采用 Daemon 架构，支持 Git 风格的上下文版本控制。
- [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)
  - MIT, Python, PostgreSQL
  - 仿生记忆架构系统，将记忆分为事实（Facts）、经验（Experience）和心智模型（Mental Models）。支持语义、关键词、图和时间维度的并行检索。
- [NeoVertex1/nuggets](https://github.com/NeoVertex1/nuggets)
  - MIT, Python
  - 基于全息减少表示（Holographic Reduced Representations, HRR）的记忆引擎。通过向量叠加存储事实，实现亚毫秒级的联想检索。
- [plastic-labs/honcho](https://github.com/plastic-labs/honcho)
  - AGPL-3.0, Python, PostgreSQL
  - 专注于“辩证推理”的记忆库。它在后台通过 LLM 提取观察结果，并构建用户与 Agent 的动态模型，支持持久的跨会话状态。
- [mem0ai/mem0](https://github.com/mem0ai/mem0)
  - Apache-2.0, Python
  - 被称为“AI 的个性化记忆层”。它能够根据用户偏好和历史交互自我演进，提供高度个性化的上下文。
- [volcengine/OpenViking](https://github.com/volcengine/OpenViking)
  - AGPL-3.0, C++, Go, Python
  - 字节跳动火山引擎推出的开源上下文数据库。采用文件系统范式（`viking://` URIs），支持分层加载（L0/L1/L2）以优化 Token 成本。
- [RetainDB/retaindb](https://github.com/RetainDB/retaindb)
  - Apache-2.0, JS/TS, Python, Go
  - 提供持久的、基于用户的记忆基础设施。它作为一个中间层拦截 LLM 调用，注入相关的用户特定上下文，支持低延迟检索。
- [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory)
  - MIT, TypeScript, Next.js, Cloudflare
  - 个人知识库和 AI 记忆工具，允许用户存储书签、内容，并使用 AI 进行查询和组织，被称为“AI 的第二大脑”。
- https://github.com/NevaMind-AI/memU
- MemGPT/Letta
- Fastio
- Cognee
- LangMem

---

**Eval**

- LoCoMo
  - https://github.com/Backboard-io/Backboard-Locomo-Benchmark
- LongMemEval

---

- MEMORY.md
  - 记录 Agent 学习到的事实、长期知识和项目背景
  - hermes 2,200 chars (~800 tokens)
- USER.md
  - 存储用户的偏好、习惯、指令风格等个性化信息
  - hermes 1,375 chars (~500 tokens)
- SOUL.md
  - 定义 Agent 的性格、价值观、核心规则和自省记录

---

- https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
  - add
  - replace
  - remove

# Dream

OpenClawDreams

工作机制（三段式睡眠 pipeline）：

- 浅度睡眠（Light Sleep）：在用户闲时，扫描当天的原始对话、日志和 RAG 检索痕迹，去除重复信息，生成一个“候选项列表”（此时不修改核心文档）。
- 深度睡眠（Deep Sleep）：通过 6 个加权信号和 3 层阈值进行严格筛选（看某些信息是否被多次提及、是否真正重要）。只有通过考核的记忆，才会被合并写入长期的核心文件（如 MEMORY.md）。
- REM（快速眼动期）：进行模式识别、自主合成（Synthetic Synthesis）和超现实叙事生成。智能体通过自我反思当天表现，去寻找那些隐藏的关联，并更新自己的运行指南。


---

- https://docs.openclaw.ai/concepts/dreaming

# FAQ

- 长期、短期记忆
- 隔离 - 全局，局部
- 噪音处理
- rollup
