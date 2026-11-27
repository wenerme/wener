---
title: 让 Agent 更好地在项目里工作
slug: make-agent-work-with-project
tags:
  - Thoughts
---

# 让 Agent 更好地在项目里工作

Everyone can vibe code, every agent can finish the job, but at what cost?

<!-- more -->

## Code in my way

现在所有的 Coding 模型都能很好地完成 Wish coding，但是传统工程师区别于 vibe coder 的核心点应该在于 code in my way。

Code in my way 通常表现为

- 设计
- 架构
- 规则
- 依赖
- 风格
- 环境

通常 vibe coder 会关注到

- 体验
- 界面

也就是说传统软件工程师会对所有不可见的内容也有要求和感知。

我认为这是非常好的，至少我个人是有这样的要求。在有了 AI 辅助编码后，我就更能关注

- 设计
- 架构

以前的技术债现在还起来非常容易，在设计的这个过程中是享受的，现在纯粹设计架构后，会更喜欢去思考和尝试，这在以前付出的代价是不可接受的。

## Project Harness

为了让 Agent 更好地按照我的想法来推进和实现，我通常至少会做 Project level harness：

- Formatter
- Linter
- Testing
- Command driven testing
- Agent facing usage testing

所有的这些都是为了给 Agent 确定性的反馈，辅助其在编码过程中符合一定的基础要求和规范。

## Project Context

项目维度的上下文也容易周期性地更新和维护，通常会形成：

```
.agents/
  docs/
  skills/
  adr/
  logs/YYYY-MM-DD/
```

在长周期工作后，能越来越丝滑。这些内容不一定是需要提交的，它承载了个人对项目的认知和理解。

Project 上下文比想象的重要，即便不提交（例如 `.agents`）。举例来说：

**PR Agent vs 本地上下文 Agent Review**

- PR Agent
  - 仅可见 diff 修改
  - 只依赖项目里已经包含的 skills、docs 等信息
  - 给出显而易见的一些问题
- 本地上下文 Agent Review
  - 个人偏好
  - 能基于不同人的偏好发现不同的问题
  - 能更好地沉淀历史知识

## Project Loop

现在 Vibe coding 后，补充测试用例、单元测试相关逻辑都能有相对长远的收益，这把以前的 best practice 都能搬进现实。
以前依靠自己做 project 的 chore 工作，现在都能 delegate 给 agent 定时任务去完成了。

如果大部分 hard work 都外包给 agent 后，我想能更多地去关注

- reusable
  - 虽然说现在都是 AI coding，但是多次重复开发必然会产生一些有价值的基础设施
  - 这些基础设施的复用能把设计等相关的思考固化下来
- component
  - 形成 building block
- domain design
  - 形成领域复用抽象概念
- consistency
  - 跨项目复用，结构信息一致

除了能调整自己的关注点以外，Agent 整体的 Project 自动流程也能跑起来。

例如

- 持续 testing，提交 issue，增加测试覆盖
- 持续观测线上问题、日志，解决问题
- 持续观测 issues，解决问题，创建 MR

Project Scope 的 Loop 价值很容易体现，但是前期的基础工作也比较重要。

---

上下文管理是一个通用概念，不只存在于 Project 里；但在 Project 场景下，除了做好上下文管理，还必须把 Project Harness 建好。
