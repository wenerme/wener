---
tags:
  - Design
  - Interface
---

# Design Service Interface

:::tip

- 资源方法使用「动词 + 单数资源名」，例如 `listModel`、`getModel`。是列表还是单个结果由动词和返回类型表达，便于搜索和生成。
- 能力方法按语义命名，例如 `generateMessage`、`countTokens`，不受资源名规则约束。

:::

## 接口约定

- 按调用方要完成的操作命名。上游路由、鉴权和请求编码属于 Adapter；换协议不应该要求调用方重写业务输入。
- `input` 使用 `XyzRequest` 表达业务输入，`options` 放调用控制，例如 `signal?: AbortSignal`。取消要传到上游请求和流读取；取消等待不代表上游操作已经撤销。
- 一次性结果返回 `Promise<Result>`；流式结果返回 `AsyncIterable<Part>`。如果是同一操作的两种消费方式，复用请求类型，用两个方法区分返回契约，不用 `stream: boolean` 切换返回类型。
- 在边界校验运行时数据。共享类型只承诺可稳定映射的字段；缺少能力时明确报错，不静默换协议或丢弃调用方约束。

## Model Service

- `generateMessage` / `streamMessage` 共用 `GenerateMessageRequest`。`Message` 是输出单位，可包含文本、音频等不同类型的内容。

```ts
type ModelServiceRequestOptions = Readonly<{
  signal?: AbortSignal;
}>;

type GetModelRequest = { id: string };

type ModelInfo = {
  id: string;
  title?: string;
  description?: string;
  ownedBy?: string;
  createdAt?: number; // Unix 时间戳，秒

  apis?: ApiType[];
  inputs?: string[]; // 输入模态，例如 text、image、audio
  outputs?: string[]; // 输出模态，例如 text、audio、embedding
  contextWindow?: number; // Token
  maxOutputTokens?: number;
  supportedParameters?: string[];

  // supported_endpoint_types?: string[]; // New API
  // endpoints OpenRouter
};

interface IModelService {
  generateMessage(input: GenerateMessageRequest, options?: ModelServiceRequestOptions): Promise<ModelMessageResult>;
  streamMessage(input: GenerateMessageRequest, options?: ModelServiceRequestOptions): AsyncIterable<ModelStreamPart>;

  embed(input: EmbedRequest, options?: ModelServiceRequestOptions): Promise<ModelEmbedResult>;
  rerank(input: RerankRequest, options?: ModelServiceRequestOptions): Promise<ModelRerankResult>;
  decide(input: DecideRequest, options?: ModelServiceRequestOptions): Promise<ModelDecideResult>;

  generateImage(input: GenerateImageRequest, options?: ModelServiceRequestOptions): Promise<ModelImageResult>;
  editImage(input: EditImageRequest, options?: ModelServiceRequestOptions): Promise<ModelImageResult>;
  countTokens(input: CountTokensRequest, options?: ModelServiceRequestOptions): Promise<ModelTokenCountResult>;

  listModel(input?: ListModelRequest, options?: ModelServiceRequestOptions): Promise<ModelListResult>;
  getModel(input: GetModelRequest, options?: ModelServiceRequestOptions): Promise<ModelInfo>;
}
```

- OpenAI 的 [Model 对象](https://developers.openai.com/api/reference/python/resources/models/methods/list) 提供 `id`、`created`、`owned_by` 等基础字段；端点支持看模型文档，不在该对象里。
- OpenRouter 的[模型目录](https://openrouter.ai/docs/api/api-reference/models/list-all-models-and-their-properties) 用 `endpoints` 列出请求路径，另有 `architecture.input_modalities` / `output_modalities`、`context_length` 和 `supported_parameters`。[模型端点详情](https://openrouter.ai/docs/api/api-reference/endpoints/list-all-endpoints-for-a-model) 则按具体供应商端点展开。
- [New API](https://github.com/QuantumNous/new-api/blob/main/controller/model.go) 在 OpenAI 风格的模型目录里扩展了 `supported_endpoint_types`。接入时由 Adapter 将端点类型或请求路径映射成 `apis`。

## ModelProviderRegistry

- `listProvider` / `getProvider`：查 Provider 目录，只返回 `ModelProviderInfo`，不暴露含凭据的 `ModelProviderConf`。
- `ModelProviderInfo.name` 是当前 Registry 内的查找键，不是数据库 ID。上游地址、鉴权头和路径覆盖留在内部；模型列表通过 `IModelService.listModel()` 查询。
- `getModelService`：已知 Provider 时，直接取得对应的 `IModelService`。
- `resolveModel`：只知道模型名时，按可选的 Provider 和 `ApiType` 筛选，取注册顺序中的首个匹配项。模型显式声明 `api` 或 `apis` 时用模型配置，否则继承 Provider 配置。
- `resolveLanguageModel` / `resolveImageModel`：返回可直接传给 [AI SDK](https://ai-sdk.dev/docs/reference/ai-sdk-core/provider-registry) 的模型对象，而不是目录元数据。
- 接口为设计提案。现有实现的 `add` / `prepend` / `reset` 管理配置和优先级，`load` / `loadImage` 加载 SDK 模型，属于内部实现。

```ts
type ModelProviderInfo = Readonly<{
  name: string;
  title?: string;
  description?: string;
  /** Provider 层声明的协议；模型可单独覆盖。 */
  apis: readonly ApiType[];
}>;
/** 内部配置；不作为 Provider 目录的返回类型。 */
type ModelProviderConf = {
  name?: string; // 省略时取 baseUrl 的 host
  title?: string;
  description?: string;
  baseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
  api?: ApiType; // 默认协议
  apis?: ApiType[];
  endpoints?: Partial<Record<ApiType, string>>; // 同源的上游路径覆盖
  models?: Record<string, ModelProviderModelConf>; // 以目录模型 ID 为键
};

type ModelProviderModelConf = Omit<ModelInfo, 'id'> & {
  api?: ApiType;
  upstreamModelName?: string; // 省略时使用目录模型 ID
};

type GetProviderRequest = { name: string };
type GetModelServiceRequest = { provider: string };

type ResolveModelRequest = {
  model: string;
  provider?: string;
  api?: ApiType;
};

type ResolvedModel = {
  provider: ModelProviderInfo;
  model: ModelInfo;
};

interface IModelProviderRegistry {
  listProvider(): ModelProviderInfo[];
  getProvider(input: GetProviderRequest): ModelProviderInfo | undefined;

  resolveModel(input: ResolveModelRequest): ResolvedModel | undefined;
  resolveLanguageModel(input: ResolveModelRequest): LanguageModel | undefined;
  resolveImageModel(input: ResolveModelRequest): ImageModel | undefined;
  getModelService(input: GetModelServiceRequest): IModelService | undefined;
}
```

# FAQ

## message vs content

- message - 消息
  - chat 这种感觉的场景
  - 有 role 的概念
  - 内部有 content
- content - 内容
  - 任意输入输出
  - 过于宽泛
