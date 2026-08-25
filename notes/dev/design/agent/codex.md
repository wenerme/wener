---
title: Codex Agent Design
tags:
  - Agent
  - Coding
---

# Codex

- [openai/codex](https://github.com/openai/codex)
  - Apache-2.0, Rust, Coding Agent
  - OpenAI 的 coding agent，提供 CLI、IDE 集成、App 与 app-server/exec-server 协议边界。

Codex 将 user turn 放入 thread，由 turn loop 构造上下文、请求模型、调用工具，并把结果回填到后续上下文和 rollout history。

## Runtime

```text
client
  │ submit turn
  ▼
thread / session
  │
  ▼
turn loop
  ├── build context
  ├── model response
  ├── tool calls
  ├── approval / sandbox
  ├── update history
  └── emit events
```

- Session 使用 Submission Queue 接收 turn，使用 Event Queue 输出进度和结果。
- `run_turn()` 负责单个 turn 的模型请求、工具调用、上下文更新、hook、skill 和 compact 编排。
- Rollout history 是可恢复的运行记录，不等同于模型当前可见的完整上下文。

## Instructions

- Base instructions、developer instructions、environment、tools、skills 和 plugins 作为不同上下文来源组合到模型输入中。
- `AGENTS.md` 从 project root 到当前 working directory 依次加载；`AGENTS.override.md` 用于本地覆盖。
- untrusted project 不加载 project instructions，只保留 host 提供的用户指令。
- Skill 通过 manifest 和资源标识加载；skill 内容本身不会自动获得额外工具或文件权限。

## Tools

```ts
type ToolResult = unknown;

/** 编码工作区工具。 */
interface BuiltinTools {
  exec_command(input: {
    command: string;
    workdir?: string;
    timeout_ms?: number;
    shell?: string;
    environment_id?: string;
  }): ToolResult;

  write_stdin(input: {
    session_id: string;
    chars?: string;
    yield_time_ms?: number;
    max_output_chars?: number;
    environment_id?: string;
  }): ToolResult;

  apply_patch(input: { patch: string; environment_id?: string }): ToolResult;

  view_image(input: { path: string; detail?: 'low' | 'high' | 'auto'; environment_id?: string }): ToolResult;

  /** 任务计划；按功能开关启用。 */
  update_plan(input: {
    plan: Array<{
      step: string;
      status: 'pending' | 'in_progress' | 'completed';
    }>;
  }): ToolResult;

  /** 向用户提出结构化问题；按功能开关启用。 */
  request_user_input(input: {
    questions: Array<{
      id: string;
      header: string;
      question: string;
      options?: Array<{
        label: string;
        description?: string;
      }>;
    }>;
  }): ToolResult;

  request_permissions(input: { permissions: string[]; reason?: string }): ToolResult;

  get_context_remaining(input: {}): ToolResult;
  new_context(input: {}): ToolResult;

  wait_for_environment(input: { environment_id?: string }): ToolResult;

  send_user_message_async(input: { message: string }): ToolResult;

  list_mcp_resources(input: { server?: string }): ToolResult;

  list_mcp_resource_templates(input: { server?: string }): ToolResult;

  read_mcp_resource(input: { server?: string; uri: string }): ToolResult;

  /** 搜索并加载延迟暴露的工具。 */
  tool_search(input: { query?: string; namespaces?: string[] }): ToolResult;

  list_available_plugins_to_install(input: {}): ToolResult;

  request_plugin_install(input: { plugin?: string; source?: string }): ToolResult;

  /** 测试或实验工具；按模型能力启用。 */
  test_sync_tool(input: {
    sleep_before_ms?: number;
    sleep_after_ms?: number;
    barrier?: {
      id: string;
      participants: number;
      timeout_ms?: number;
    };
    wait_for_git_enrichment?: boolean;
  }): ToolResult;
}

/** 以 clock namespace 暴露的工具。 */
interface ClockTools {
  curr_time(input: {}): ToolResult;
  sleep(input: { duration_ms: number }): ToolResult;
}

/** MCP server 工具名称由 server 和 tool 动态决定。 */
interface McpTools {
  [toolName: string]: (input: Record<string, unknown>) => ToolResult;
}

/** Hosted web search 工具：web.run。 */
interface WebTools {
  run(input: {
    search_query?: Array<{
      q: string;
      recency?: number;
      domains?: string[];
    }>;
    image_query?: Array<{
      q: string;
      recency?: number;
      domains?: string[];
    }>;
    open?: Array<{
      ref_id: string;
      lineno?: number;
    }>;
    click?: Array<{
      ref_id: string;
      id: number;
    }>;
    find?: Array<{
      ref_id: string;
      pattern: string;
    }>;
    screenshot?: Array<{
      ref_id: string;
      pageno: number;
    }>;
    finance?: Array<{
      ticker: string;
      type: "equity" | "fund" | "crypto" | "index";
      market?: string;
    }>;
    weather?: Array<{
      location: string;
      start?: string;
      duration?: number;
    }>;
    sports?: Array<{
      tool?: "sports";
      fn: "schedule" | "standings";
      league:
        | "nba"
        | "wnba"
        | "nfl"
        | "nhl"
        | "mlb"
        | "epl"
        | "ncaamb"
        | "ncaawb"
        | "ipl";
      team?: string;
      opponent?: string;
      date_from?: string;
      date_to?: string;
      num_games?: number;
      locale?: string;
    }>;
    time?: Array<{
      utc_offset: string;
    }>;
    response_length?: "short" | "medium" | "long";
  }): ToolResult;
}

/** Hosted 图像生成工具：image_gen.imagegen。 */
interface ImageGenerationTools {
  imagegen(input: {
    prompt: string;
    referenced_image_paths?: string[];
    num_last_images_to_include?: number;
  }): ToolResult;
}

/** Multi-agent v1 和 v2 工具。 */
interface CollaborationTools {
  spawn_agent(input: { task: string; model?: string; agent_type?: string }): ToolResult;

  send_input(input: { agent_id: string; message: string }): ToolResult;

  resume_agent(input: { agent_id: string }): ToolResult;

  wait_agent(input: { agent_id: string }): ToolResult;

  close_agent(input: { agent_id: string }): ToolResult;

  send_message(input: { agent_id: string; message: string }): ToolResult;

  followup_task(input: { agent_id: string; task: string }): ToolResult;

  interrupt_agent(input: { agent_id: string }): ToolResult;

  list_agents(input: {}): ToolResult;
}

/** Code Mode 对外暴露的工具。 */
interface CodeModeTools {
  exec(source: string): ToolResult;
  wait(input: {
    cell_id: string;
    yield_time_ms?: number;
    max_tokens?: number;
    terminate?: boolean;
  }): ToolResult;
}

/** 已知的可选扩展工具。 */
interface ExtensionTools {
  'skills.list'(input: { authority: 'orchestrator' | 'executor'; cursor?: string }): ToolResult;

  'skills.read'(input: { package: string; resource?: string; cursor?: string }): ToolResult;

  'memories.list'(input: { path?: string; cursor?: string; max_results?: number }): ToolResult;

  'memories.read'(input: { path: string; line_offset?: number; max_lines?: number }): ToolResult;

  'memories.search'(input: {
    queries: string[];
    match_mode?: 'any' | 'all_on_same_line' | { type: 'all_within_lines'; line_count: number };
    path?: string;
    cursor?: string;
    context_lines?: number;
    case_sensitive?: boolean;
    normalized?: boolean;
    max_results?: number;
  }): ToolResult;

  'memories.add_ad_hoc_note'(input: { filename: string; note: string }): ToolResult;
}

/** 持久化 thread goal 工具；使用 default namespace。 */
interface GoalTools {
  get_goal(input: {}): ToolResult;

  create_goal(input: { objective: string; token_budget?: number }): ToolResult;

  update_goal(input: { status: 'complete' | 'blocked' }): ToolResult;
}
```

## Sandbox And Approval

```ts
type SandboxPolicy =
  | { type: 'danger-full-access' }
  | { type: 'read-only'; filesystem: unknown; network: unknown }
  | { type: 'workspace-write'; writable_roots: string[]; network: unknown }
  | { type: 'external-sandbox'; executor: 'external' };

type AskForApproval = 'never' | 'on-request' | 'unless-trusted' | { type: 'granular'; rules: unknown[] };
```

- sandbox 定义执行环境的文件系统和网络边界；approval 定义何时需要用户授权。
- 获得 approval 不自动扩大 sandbox；`ExternalSandbox` 表示隔离由外部 executor 提供和强制。
- 工具权限不能只依赖工具描述中的自然语言，必须由 policy、guardian 或 executor 处理。

## Compact And Persistence

- compact 使用 summarization prompt 生成摘要 checkpoint，并替换 live model history。
- pre-turn/manual compact 和 mid-turn compact 对 initial context、summary 和最后一条 user message 的排列要求不同。
- rollout 的物理压缩只减少持久化体积；context compact 会改变后续 inference 使用的 live history。

## Design Notes

- Thread/rollout 是 durable execution trace，当前 context 是受 token 上限控制的模型输入投影。
- `AGENTS.md`、Skills、plugins、tool specs、sandbox policy 和 approval policy 各自拥有独立 authority。
- app-server/exec-server 是公开协议 surface；experimental 方法、字段和 raw response item 不应假定兼容性。

## References

- [Codex Documentation](https://developers.openai.com/codex)
- [Codex Skills](https://developers.openai.com/codex/skills)
