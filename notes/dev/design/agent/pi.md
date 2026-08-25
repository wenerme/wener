---
title: PI Agent Design
---

# PI
- [earendil-works/pi](https://github.com/earendil-works/pi)
  - Pi 是一个由 agent loop、模型适配层、工具系统、扩展系统和交互界面组成的 coding agent harness。

## Runtime

```ts
interface AgentContext {
  systemPrompt: string;
  messages: Message[];
  tools?: AgentTool[];
}

interface Agent {
  prompt(message: string): Promise<void>;
  continue(): Promise<void>;
  abort(): void;
  subscribe(listener: (event: AgentEvent) => void): () => void;
}

```

- `AgentContext` 保存一次模型请求可见的系统提示词、消息和工具集合。
- agent loop 负责模型流式响应、工具调用、工具结果回填、steering/follow-up 消息和 turn 生命周期。
- `Agent` 对外提供 prompt、continue、abort 和事件订阅；调用方通过事件观察 assistant message、tool execution 和 agent 状态变化。

## System Prompt

```ts
interface BuildSystemPromptOptions {
  /** 自定义系统提示词；提供后替换默认提示词主体。 */
  customPrompt?: string;
  /** 当前模型可使用的内置工具名称。 */
  selectedTools?: string[];
  /** 按工具名称提供可选的简短说明。 */
  toolSnippets?: Record<string, string>;
  /** 附加到系统提示词中的指南。 */
  promptGuidelines?: string[];
  /** 追加到系统提示词末尾的内容。 */
  appendSystemPrompt?: string;
  /** 当前工作目录。 */
  cwd: string;
  /** 预加载的上下文内容。 */
  contextFiles?: Array<{ path: string; content: string }>;
  /** 预加载的技能内容。 */
  skills?: Skill[];
}

function buildSystemPrompt(options: BuildSystemPromptOptions): string {
  const {
    customPrompt,
    selectedTools,
    toolSnippets,
    promptGuidelines,
    appendSystemPrompt,
    cwd,
    contextFiles: providedContextFiles,
    skills: providedSkills,
  } = options;
  const promptCwd = cwd.replace(/\\/g, "/");
  const appendSection = appendSystemPrompt ? `\n\n${appendSystemPrompt}` : "";
  const contextFiles = providedContextFiles ?? [];
  const skills = providedSkills ?? [];

  if (customPrompt) {
    let prompt = customPrompt;
    if (appendSection) prompt += appendSection;

    if (contextFiles.length > 0) {
      prompt += "\n\n<project_context>\n\n";
      prompt += "Project-specific instructions and guidelines:\n\n";
      for (const { path, content } of contextFiles) {
        prompt += `<project_instructions path="${path}">\n${content}\n</project_instructions>\n\n`;
      }
      prompt += "</project_context>\n";
    }

    const hasRead = !selectedTools || selectedTools.includes("read");
    if (hasRead && skills.length > 0) prompt += formatSkillsForPrompt(skills);

    return `${prompt}\nCurrent working directory: ${promptCwd}\n`;
  }

  const tools = selectedTools ?? ["read", "bash", "edit", "write"];
  const visibleTools = tools.filter((name) => toolSnippets?.[name]);
  const toolsList = visibleTools.length > 0
    ? visibleTools.map((name) => `- ${name}: ${toolSnippets![name]}`).join("\n")
    : "(none)";

  const guidelinesList: string[] = [];
  const seenGuidelines = new Set<string>();
  const addGuideline = (guideline: string): void => {
    if (seenGuidelines.has(guideline)) return;
    seenGuidelines.add(guideline);
    guidelinesList.push(guideline);
  };

  const hasBash = tools.includes("bash");
  const hasPowerShell = tools.includes("powershell");
  const hasGrep = tools.includes("grep");
  const hasFind = tools.includes("find");
  const hasLs = tools.includes("ls");
  const hasRead = tools.includes("read");

  if ((hasBash || hasPowerShell) && !hasGrep && !hasFind && !hasLs) {
    if (hasBash && hasPowerShell) {
      addGuideline("Use bash or PowerShell for file operations like listing, searching, and finding files");
    } else if (hasPowerShell) {
      addGuideline("Use PowerShell for file operations like listing, searching, and finding files");
    } else {
      addGuideline("Use bash for file operations like ls, rg, find");
    }
  }

  for (const guideline of promptGuidelines ?? []) {
    const normalized = guideline.trim();
    if (normalized) addGuideline(normalized);
  }
  addGuideline("Be concise in your responses");
  addGuideline("Show file paths clearly when working with files");

  let prompt = `You are an expert coding assistant operating inside pi, a coding agent harness. You help users by reading files, executing commands, editing code, and writing new files.

Available tools:
${toolsList}

In addition to the tools above, you may have access to other custom tools depending on the project.

Guidelines:
${guidelinesList.map((guideline) => `- ${guideline}`).join("\n")}

Pi documentation (read only when the user asks about pi itself, its SDK, extensions, themes, skills, or TUI):
- Main documentation: ${getReadmePath()}
- Additional docs: ${getDocsPath()}
- Examples: ${getExamplesPath()} (extensions, custom tools, SDK)
- When reading pi docs or examples, resolve docs/... under Additional docs and examples/... under Examples, not the current working directory
- When asked about: extensions (docs/extensions.md, examples/extensions/), themes (docs/themes.md), skills (docs/skills.md), prompt templates (docs/prompt-templates.md), TUI components (docs/tui.md), keybindings (docs/keybindings.md), SDK integrations (docs/sdk.md), custom providers (docs/custom-provider.md), adding models (docs/models.md), pi packages (docs/packages.md), environment variables (docs/environment-variables.md)
- When working on pi topics, read the docs and examples, and follow .md cross-references before implementing
- Always read pi .md files completely and follow links to related docs (e.g., tui.md for TUI API details)`;

  if (appendSection) prompt += appendSection;

  if (contextFiles.length > 0) {
    prompt += "\n\n<project_context>\n\n";
    prompt += "Project-specific instructions and guidelines:\n\n";
    for (const { path, content } of contextFiles) {
      prompt += `<project_instructions path="${path}">\n${content}\n</project_instructions>\n\n`;
    }
    prompt += "</project_context>\n";
  }

  if (hasRead && skills.length > 0) prompt += formatSkillsForPrompt(skills);

  return `${prompt}\nCurrent working directory: ${promptCwd}`;
}
```

- 默认提示词由工具列表、工具使用指南、项目上下文和技能内容组成。
- `customPrompt` 替换默认提示词主体，但仍可追加上下文和技能。
- 只有当前工具集合中包含 `read` 时，技能内容才会自动注入默认提示词。
- 工具只在 `selectedTools` 中启用；工具有定义不代表当前 agent 一定能调用它。

```ts
function buildCodingAgentHarnessSystemPrompt(input: {
  cwd: string;
  tools: readonly CodingAgentHarnessTool[];
  activeToolNames: readonly string[];
  systemPromptOptions?: Omit<BuildSystemPromptOptions, "cwd" | "selectedTools" | "toolSnippets" | "promptGuidelines">;
}): string {
  const activeTools = input.activeToolNames.flatMap((name) =>
    input.tools.find((tool) => tool.name === name) ?? [],
  );
  const toolSnippets = Object.fromEntries(activeTools.flatMap((tool) => {
    const snippet = tool.promptSnippet?.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    return snippet ? [[tool.name, snippet]] : [];
  }));
  const promptGuidelines = activeTools.flatMap((tool) => tool.promptGuidelines ?? []);

  return buildSystemPrompt({
    ...input.systemPromptOptions,
    cwd: input.cwd,
    selectedTools: activeTools.map((tool) => tool.name),
    toolSnippets,
    promptGuidelines,
  });
}
```

- Harness 以 `activeToolNames` 为准过滤工具；未启用的工具既不进入 `Available tools`，也不贡献工具指南。
- 每个工具的 `promptSnippet` 会压缩为一行；`promptGuidelines` 按工具汇集，随后由 `buildSystemPrompt` 去重并追加全局基础指南。
- Agent Session 在工具集刷新、`reload()` 或扩展资源重新发现时重建 base system prompt；上下文文件和技能在这些重建路径中重新装载，临时的 system prompt override 不会改变该 base prompt 的装配规则。

## Tools

```ts
interface AgentToolResult<TDetails> {
  /** 回填给模型的文本或图片内容。 */
  content: Array<TextContent | ImageContent>;
  /** 提供给 UI、日志和调用方的结构化信息。 */
  details: TDetails;
  /** 工具自身的用量信息，不参与主模型上下文用量统计。 */
  usage?: Usage;
  /** 当前工具结果产生后可新增的工具名称。 */
  addedToolNames?: string[];
  /** 当前工具 batch 完成后是否请求停止 agent。 */
  terminate?: boolean;
}

type ToolCallResult<TDetails = unknown> = Promise<AgentToolResult<TDetails>>;

type AgentToolUpdateCallback<TDetails = any> = (partialResult: AgentToolResult<TDetails>) => void;

/** Pi 内置 coding tools。 */
interface BuiltinTools {
  read(input: {
    path: string;
    offset?: number;
    limit?: number;
  }): ToolCallResult;

  bash(input: {
    command: string;
    timeout?: number;
  }): ToolCallResult;

  powershell(input: {
    command: string;
    timeout?: number;
  }): ToolCallResult;

  edit(input: {
    path: string;
    edits: Array<{
      oldText: string;
      newText: string;
    }>;
  }): ToolCallResult;

  write(input: {
    path: string;
    content: string;
  }): ToolCallResult;

  grep(input: {
    pattern: string;
    path?: string;
    glob?: string;
    ignoreCase?: boolean;
    literal?: boolean;
    context?: number;
    limit?: number;
  }): ToolCallResult;

  find(input: {
    pattern: string;
    path?: string;
    limit?: number;
  }): ToolCallResult;

  ls(input: {
    path?: string;
    limit?: number;
  }): ToolCallResult;
}

/** 默认 coding agent 使用的工具集合。 */
type CodingTools = Pick<BuiltinTools, "read" | "bash" | "edit" | "write">;

/** 只读 agent 使用的工具集合。 */
type ReadOnlyTools = Pick<BuiltinTools, "read" | "grep" | "find" | "ls">;

/** Extension 注册的自定义工具定义。 */
interface ToolDefinition<TParams extends TSchema = TSchema, TDetails = unknown, TState = any> {
  name: string;
  label: string;
  description: string;
  promptSnippet?: string;
  promptGuidelines?: string[];
  parameters: TParams;
  constrainedSampling?: false | ConstrainedSamplingConfig;
  renderShell?: "default" | "self";
  prepareArguments?: (args: unknown) => Static<TParams>;
  executionMode?: "sequential" | "parallel";
  execute(
    toolCallId: string,
    params: Static<TParams>,
    signal: AbortSignal | undefined,
    onUpdate: AgentToolUpdateCallback<TDetails> | undefined,
    ctx: ExtensionContext,
  ): Promise<AgentToolResult<TDetails>>;
  renderCall?: (...args: unknown[]) => unknown;
  renderResult?: (...args: unknown[]) => unknown;
}

interface ExtensionTools {
  registerTool(tool: ToolDefinition): void;
}

/** pi-subagents 提供的顶层工具。 */
interface PiSubagentsTools {
  Agent(input: {
    prompt: string;
    description: string;
    subagent_type: string;
    model?: string;
    thinking?: "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
    max_turns?: number;
    run_in_background?: boolean;
    resume?: string;
    session_file?: string;
    isolated?: boolean;
    inherit_context?: boolean;
    isolation?: "worktree";
    /** 仅在 Scheduling 功能启用时加入；传入后改为延迟执行。 */
    schedule?: string;
  }): ToolCallResult;

  get_subagent_result(input: {
    agent_id: string;
    wait?: boolean;
  }): ToolCallResult;

  steer_subagent(input: {
    agent_id: string;
    message: string;
  }): ToolCallResult;
}

/** 允许嵌套委派时，注入到子 Agent 的同名受限工具。 */
interface NestedPiSubagentsTools {
  Agent(input: {
    prompt: string;
    description: string;
    subagent_type: string;
    model?: string;
    thinking?: string;
    max_turns?: number;
    run_in_background?: boolean;
    resume?: string;
    isolated?: boolean;
    inherit_context?: boolean;
    isolation?: "worktree";
  }): ToolCallResult;

  get_subagent_result(input: {
    agent_id: string;
    wait?: boolean;
  }): ToolCallResult;

  steer_subagent(input: {
    agent_id: string;
    message: string;
  }): ToolCallResult;
}
```

- `read`：读取文件内容，也可以处理模型支持的图片。
- `bash`：执行 Bash 命令。
- `powershell`：执行 PowerShell 命令；输入字段与 `bash` 相同。
- `edit`：使用精确的 `oldText` / `newText` 替换编辑文件；同一调用可以包含多个互不重叠的 edits。
- `write`：创建文件或完整重写文件。
- `grep`：按正则或字面量搜索文件内容，支持 glob、大小写、上下文行和结果数量限制。
- `find`：按 glob pattern 查找文件。
- `ls`：列出目录内容。
- 内置工具可以使用自定义 operations 将实际文件或命令操作委托给其他执行环境；这不改变模型可见的工具输入合同。
- Extension 通过 `registerTool()` 增加自定义工具。自定义工具可以流式报告部分结果，也可以提供自定义调用和结果渲染。

## Tool Events

```ts
type ToolEvent =
  | {
      type: "tool_execution_start";
      toolCallId: string;
      toolName: string;
      args: unknown;
    }
  | {
      type: "tool_execution_update";
      toolCallId: string;
      toolName: string;
      args: unknown;
      partialResult: unknown;
    }
  | {
      type: "tool_execution_end";
      toolCallId: string;
      toolName: string;
      result: unknown;
      isError: boolean;
    };
```

- 工具调用会产生 start、可选的 update 和 end 事件。
- 工具可声明 sequential 或 parallel execution mode；未声明时使用 agent loop 的默认策略。
- 工具异常应转换为 error tool result，并通过正常事件和消息生命周期回填给模型。

## Compact

```ts
interface ContextSummary {
  goal: string[];
  constraints: string[];
  progress: {
    done: string[];
    inProgress: string[];
    blocked: string[];
  };
  decisions: string[];
  nextSteps: string[];
  criticalContext: string[];
}

function compactContext(messages: Message[]): Promise<ContextSummary>;
```

- compact 将长对话压缩成结构化 checkpoint，供后续 agent 继续工作。
- 摘要保留目标、约束、进度、决策、下一步和关键上下文。
- compact 改变模型后续可见的消息投影，不等同于删除或压缩底层运行记录。

## Extension Surface

```ts
interface ExtensionAPI {
  registerTool(tool: ExtensionTool): void;
  registerCommand(command: ExtensionCommand): void;
  registerShortcut(shortcut: ExtensionShortcut): void;
  registerEventListener(listener: ExtensionEventListener): void;
}
```

- Extension 可以注册工具、命令、快捷键和事件监听器。
- tool registry 会合并内置工具、SDK custom tools 和 extension tools，再按当前 active tool 设置筛选。
- 工具定义、当前 active tools 和模型实际可见的 tools 是三个不同层次。
