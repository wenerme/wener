---
tags:
- Agent
---

# Page Agent

- [alibaba/page-agent](https://github.com/alibaba/page-agent)
- PageController

## Tools

PageAgent 每一步会把当前可用工具合并为一个供模型调用的 Macro Tool；模型通过 `action` 选择其中一个具体工具。工具的输入由 Zod schema 校验，执行函数绑定到 `PageAgentCore` 实例，并应响应取消信号。

```ts
/**
 * 实际发送到 LLM provider 的唯一原生 function tool。
 *
 * tool_choice 被固定为 AgentOutput，且 parallel_tool_calls 为 false；
 * 因此模型每个 step 必须调用一次 AgentOutput，并且只能选择一个 action。
 */
interface AgentOutput {
  /** 对上一步目标的结果判断。 */
  evaluation_previous_goal?: string
  /** 供后续 step 使用的简短工作记忆。 */
  memory?: string
  /** 下一步立即要完成的目标。 */
  next_goal?: string
  /** 当前可用内部 action 中的恰好一个；运行时由 Zod union 校验。 */
  action: AgentAction
}

/**
 * AgentAction 不是固定的 TypeScript interface：
 * 它由当前 Agent 实例的内置工具、启用条件和 customTools 动态生成。
 */
type AgentAction =
  | { done: BuiltinTools['done'] }
  | { wait: BuiltinTools['wait'] }
  | { ask_user: BuiltinTools['ask_user'] }
  | { click_element_by_index: BuiltinTools['click_element_by_index'] }
  | { input_text: BuiltinTools['input_text'] }
  | { select_dropdown_option: BuiltinTools['select_dropdown_option'] }
  | { scroll: BuiltinTools['scroll'] }
  | { scroll_horizontally: BuiltinTools['scroll_horizontally'] }
  | { execute_javascript: BuiltinTools['execute_javascript'] }

interface ToolContext {
  /** 当前任务的取消信号；长时间操作需要主动检查或传递该信号。 */
  signal: AbortSignal
}

interface PageAgentTool<TParams = unknown> {
  /** 供模型理解工具用途的描述。 */
  description: string
  /** 工具参数的运行时校验 schema。 */
  inputSchema: z.ZodType<TParams>
  /** 返回供后续推理使用的文本结果。 */
  execute(
    this: PageAgentCore,
    args: TParams,
    context: ToolContext,
  ): Promise<string>
}

/**
 * 运行时内部 action registry，不会被逐个作为 provider 的原生 tools 暴露。
 * 其中 ask_user 和 execute_javascript 默认不一定出现在实际 AgentAction 中。
 */
interface BuiltinTools {
  /** 结束任务，返回面向用户的最终文本及成功状态。 */
  done: { text: string; success?: boolean }
  /** 等待页面或异步数据稳定，等待时间限制为 1 至 10 秒。 */
  wait: { seconds?: number }
  /** 向用户请求补充信息；仅在配置 onAskUser 回调时可用。 */
  ask_user: { question: string }
  /** 点击由当前 DOM 快照标记的交互元素。 */
  click_element_by_index: { index: number }
  /** 点击并向输入控件写入文本。 */
  input_text: { index: number; text: string }
  /** 根据可见选项文本选择下拉框值。 */
  select_dropdown_option: { index: number; text: string }
  /** 滚动页面或指定可滚动元素；pixels 优先于 num_pages。 */
  scroll: {
    down?: boolean
    num_pages?: number
    pixels?: number
    index?: number
  }
  /** 横向滚动页面或指定可滚动元素。 */
  scroll_horizontally: { right?: boolean; pixels: number; index?: number }
  /** 在当前页面执行 JavaScript；仅在显式启用实验配置时可用。 */
  execute_javascript: { script: string }
}

interface PageAgentToolConfig {
  /**
   * 新增或覆盖同名内置工具；值为 null 时从当前 Agent 实例移除该工具。
   */
  customTools?: Record<string, PageAgentTool | null>
  /** 是否暴露具备任意页面脚本执行能力的实验性工具。默认 false。 */
  experimentalScriptExecutionTool?: boolean
  /** ask_user 的交互回调；未提供时该工具会被禁用。 */
  onAskUser?: (question: string, context: ToolContext) => Promise<string>
}
```

基于元素索引的工具依赖最新的 DOM 树快照。页面状态采集会更新该快照并生成简化 HTML；在未完成索引前调用点击、输入、选择或指定元素滚动会失败。`execute_javascript` 可使用 `async/await`，且作用域内提供 `signal`，但它绕过了受限的 DOM 操作接口，应只在确有必要时开启。
