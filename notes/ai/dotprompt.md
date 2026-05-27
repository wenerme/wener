---
title: dotprompt
---

# dotprompt

- [google/dotprompt](https://github.com/google/dotprompt)
  - Executable GenAI prompt templates
  - 使用 Handlebars 模板
  - `*.prompt`


**适合**

- 需要多语言一致 prompt 资产标准（TS/Python/Go/Rust/Java）。
- 需要 prompt 与 model 参数、输入输出 schema 同步维护。
- 需要模板复用（partial/helper）与可插拔 resolver。

**不适合**

- 直接当成企业 prompt studio（审批、发布、回滚、审计、RBAC）。
- 直接承担多租户治理与发布编排。
- 直接承担实验分析闭环（A/B 指标和评估系统在外层）。

---

```md
---
model: googleai/gemini-2.5-pro
input:
  schema:
    text: string
output:
  format: json
  schema:
    name?: string, the full name of the person
    age?: number, the age of the person
    occupation?: string, the person's occupation
---

Extract the requested information from the given text. If a piece of information
is not present, omit that field from the output.

Text: {{text}}
```

- my_prompt.prompt
  - my_prompt.VARIANT.prompt


```go
type PromptMetadata struct {
	HasMetadata
	// The name of the prompt.
	Name string `json:"name,omitempty"`
	// The variant name for the prompt.
	Variant string `json:"variant,omitempty"`
	// The version of the prompt.
	Version string `json:"version,omitempty"`
	// A description of the prompt.
	Description string `json:"description,omitempty"`
	// The name of the model to use for this prompt, e.g. `vertexai/gemini-3.0-pro`
	Model string `json:"model,omitempty"`
	// Number of tool max turns
	MaxTurns int `json:"maxTurns,omitempty"`
	// Names of tools (registered separately) to allow use of in this prompt.
	Tools []string `json:"tools,omitempty"`
	// Definitions of tools to allow use of in this prompt.
	ToolDefs []ToolDefinition `json:"toolDefs,omitempty"`
	// Model configuration. Not all models support all options.
	Config ModelConfig `json:"config,omitempty"`
	// Configuration for input variables.
	Input PromptMetadataInput `json:"input"`
	// Defines the expected model output format.
	Output PromptMetadataOutput `json:"output"`
	// This field will contain the raw frontmatter as parsed with no additional
	// processing or substitutions. If your implementation requires custom
	// fields they will be available here.
	Raw map[string]any `json:"raw,omitempty"`
	// Fields that contain a period will be considered "extension fields" in the
	// frontmatter and will be gathered by namespace. For example, `myext.foo:
	// 123` would be available at `parsedPrompt.ext.myext.foo`. Nested
	// namespaces will be flattened, so `myext.foo.bar: 123` would be available
	// at `parsedPrompt.ext["myext.foo"].bar`.
	Ext map[string]map[string]any `json:"ext,omitempty"`
}
```
