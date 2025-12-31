---
title: Dayflow
tags:
  - Suvillance
---

# Dayflow

- [JerryZLiu/Dayflow](https://github.com/JerryZLiu/Dayflow)
  - MIT, Swift, macOS
  - 定时截屏，定时调用模型统计
- 2k 上下文足够

# Configuration & Prompts

## Category

Dayflow 会根据你提供的分类标题和描述来组织你的活动。

建议在描述中尽可能提供详细信息，以帮助 Dayflow 更好地理解你的工作流和习惯。
此步骤为可选，稍后也可以自定义或添加分类。

### Work

Career, school, or productivity-focused activities (projects, emails, assignments, video calls, learning skills, etc.)

### Personal

Purposeful non-work activities or life tasks (paying bills, fitness tracking, meal planning, personal research, creative hobbies, etc.)

### Distraction

Passive consumption or aimless browsing (scrolling feeds, watching random videos, clicking through news, mindless games, etc.)

### Entertainment

Movie, Youtube, Netflix

# 中文配置

## 工作 - Work

与职业、学校或提升生产力相关的活动（项目管理、邮件处理、作业、视频会议、学习新技能等）
和 fusion, llm, thirdparty adapter, ppio 等相关的软件开发、编码、学习等。

## 个人 - Personal

有目的的非工作活动或生活事务（支付账单、健康/运动追踪、餐食计划、个人研究、创意爱好等）；
和 wener、jcbs、xld、zhensi 等相关的程序编程。

## 干扰 - Distraction

被动消耗内容或无目的浏览（刷信息流、随意看视频、点击新闻、无脑游戏等）

## 娱乐 - Entertainment

观影、Youtube、Netflix

## Timeline summary

```text
总结书写指南：
- 以第一人称视角书写，但不要使用“我”（类似个人日志）
- 最多2-3句话
- 包含具体细节（应用名称、检索内容等）
- 语言自然，表达生活化
- 总是使用中文返回说明和描述，专有名词应该保留使用英文
- 应该包含工作的 项目、主题 而不只是工作的内容

优秀示例：
“管理 Mac 系统偏好设置，重点关注软件更新和辅助功能设置。在 Chrome 浏览器中搜索 iPhone 无线充电信息，同时查看 Twitter 和 Slack 消息。”

“配置 GitHub Actions 流水线以实现自动化测试。临时查看了一下 Slack，打断工作，随后继续调试部署问题。”

“在 Chrome 浏览器中查阅关于 React 性能优化的文章，聚焦 useMemo 用法技巧。在不同文档标签页间切换，并在 Notion 里记录组件重渲染笔记。”

“更新 Xcode 项目依赖并解决 SwiftUI 视图的构建错误。在模拟器上测试 app，同时回复客户关于时间线变更的消息。”

“一边刷 Instagram 和 TikTok，一边听 Spotify 播放列表。回复 WhatsApp 上关于周末计划的私人消息。”

“在旅游网站搜索度假目的地并比较机票价格。查看不同城市的天气预报并阅读相关游记。”

错误示例：
- “用户做了一些电脑相关的操作”（太笼统，视角错误，绝不提及用户）
- “我在电脑前做了不同的任务”（使用了“我”，不够具体）
- “在多个应用和网站上花了些时间”（描述泛泛，无具体内容）
```

## Card title

```text
标题书写指南：
像给朋友发消息一样写，保持口语化、简短（5-8字为宜，越短越好）。
只突出一个最主要的活动；如果确实有第二个同等重要的动作，可以用“和/同时/一边……一边……”或破折号自然连接（绝不要用逗号罗列）。
要以“动词+对象”或“应用+动作”起头，可加一个补充细节（应用、媒介或主题）；涉及两个活动时，要明确这两件事都占主要比重，不能给人列清单的感觉。
要具体描述在应用或网站做了什么，绝不能只罗列工具名称或打开的窗口。
⚠️ 只能用摘要里有的细节，绝不凭空补充内容。

优秀示例：
“VS Code 调试认证流程”
“刷 YouTube 游戏圈八卦视频”
“审核 Figma 设计稿”
“部署时用 Slack 补看消息”
“调整 React hooks 做仪表盘”

反例（含说明）：

✗ “写 React、看直播、刷推特”
错在：列出三项没有突出重点，思路不明确。

✗ “用户参与视频通话、软件更新和系统设置浏览”
错在：太长（11个词），使用了较正式的“参与”，还把“用户”写出来，没有口语感。

✗ “随便浏览，回了 Slack”
错在：重复“浏览”，具体浏览内容不明确，表达不自然。

✗ “（调试 & 编码）用户时间分配”
错在：奇怪的括号表达，生硬的“时间分配”，用了“用户”，不口语。

✗ “做电脑任务和应用操作”
错在：太泛泛的说法，“做任务”太懒，几乎能描述任何电脑操作。

✗ “GitHub Desktop + 终端日志”
错在：只罗列工具，没有交代具体行为或意图。
```
