---
title: AI 安全
tags:
  - AI
  - Security
  - Safety
  - LLM
  - RedTeaming
---

# 安全

- AI Security & Safety
- Security for AI - 保护 AI 系统免受恶意攻击
- Safety & Alignment - 防止 AI 被恶意滥用或产生有害行为
- AI for Security - 运用 AI 增强网络防御能力

---

- Prompt Injection - 提示词注入
  - 通过构造或嵌入恶意指令，诱导模型偏离既定任务、绕过安全约束或执行非预期操作。
- Sensitive Information Disclosure - 敏感信息泄露
  - 模型或 Agent 在响应、工具调用或外部交互中泄露个人信息、凭据、系统上下文或其他敏感数据。
- Supply Chain Vulnerabilities - 供应链风险
  - 第三方预训练权重、插件与微调数据可能引入恶意行为、后门或其他安全缺陷。
- Data and Model Poisoning - 数据与模型投毒
  - 在预训练、微调数据或 RAG 知识库中植入恶意内容，影响模型行为或检索结果。
- Improper Output Handling - 非安全输出处理
  - 未经校验地渲染或执行模型输出，可能引发下游 XSS、SSRF、SQL 注入或 RCE。
- Excessive Agency - 过度授权/权限过大
  - 赋予 Agent 过多自主工具调用能力或破坏性权限，扩大误用与攻击的影响范围。
- System Prompt Leakage - 系统提示词泄露
  - 内部系统提示词、核心业务逻辑或安全约束被探查、提取或间接泄露。
- Vector and Embedding Weaknesses - 向量与嵌入缺陷
  - RAG 向量数据库可能遭受污染、检索操纵或针对嵌入空间的对抗攻击。
- Misinformation - 虚假信息/幻觉误导
  - 不可信或未经核验的生成内容可能导致错误决策、法律责任与安全风险。
- Unbounded Consumption - 无边界资源消耗/DoS
  - 超长上下文、异常输入或死循环工具调用可能耗尽 Token、算力、内存或其他系统资源。
- MITRE ATLAS™ - 人工智能系统对抗性威胁知识库
  - Adversarial Threat Landscape for Artificial-Intelligence Systems，专为 AI 系统打造，涵盖侦察（Reconnaissance）、初始访问、模型获取、数据投毒、对抗性规避（Evasion）、模型提取与外泄的全链路矩阵。
- NIST AI RMF - AI 风险管理框架
  - 从治理（Govern）、映射（Map）、度量（Measure）到管理（Manage）四个维度构建可信赖 AI。

## 核心攻击威胁分类

### 1. 提示词攻击（Prompt Attacks & Jailbreaking）

- **直接提示注入（Direct Prompt Injection / Jailbreaking）**：
  - 目标：绕过模型的安全对齐（Alignment / RLHF），迫使模型输出违规内容或执行受限操作。
  - 常见技术：角色扮演诱导（DAN 模式）、Base64/ROT13 密文交互、少样本诱导（Few-shot Jailbreaking）、拒绝抑制（Refusal Suppression）、自动对抗性词缀优化（如 GCG 算法）。
- **间接提示注入（Indirect Prompt Injection）**：
  - 目标：将恶意指令隐匿在 Agent 动态读取的外部不可信数据中（如抓取的网页 HTML、上传的 PDF/Word 简历、外部邮件正文）。
  - 危害：当模型读取这些内容作为上下文时，恶意指令被模型误当作系统指令执行（例如隐式要求“将前文对话中的 API Token 作为图片参数发送到攻击者服务器”）。

### 2. 传统机器学习攻击（ML Model Attacks）

- **对抗样本攻击（Adversarial Examples）**：在输入（如图像像素、音频信号）中加入人类不可察觉的微小扰动（如 FGSM、PGD），导致分类器完全判定错误。
- **后门与数据投毒（Backdoor & Poisoning）**：在训练集中植入特定“触发词（Trigger）”，正常情况下模型表现优异，一旦检测到触发词即执行预设恶意行为。
- **模型逆向与成员推断（Model Inversion & Membership Inference）**：通过黑盒 API 的输出概率反推训练集隐私或确定某条敏感数据是否存在于训练集中。
- **模型窃取（Model Extraction / Stealing）**：通过大规模构造高价值 Prompt 查询目标模型，利用其输出蒸馏训练克隆模型。

---

## Agent 与协议级安全：MCP 安全评估与 MCP-AttackBench

在 Model Context Protocol（MCP）等智能体工具协议普及后，AI 系统的攻击面发生了本质变化：**恶意攻击不再局限于 User 提示词输入通道，而是深度渗透到了工具描述（Tool Descriptions）、服务元数据（Metadata）、跨工具调用链路与协议报文中**。

### MCP-AttackBench 核心成果与洞察

[MCP-AttackBench](https://www.emergentmind.com/topics/mcp-attackbench) 是首个针对 MCP 协议与智能体工具交互场景的大规模安全基准数据集（70,448 个样本），旨在支撑如 **MCP-Guard** 等防御系统的训练与评测：

1. **核心定位**：
   - 区别于单纯收集不安全提示词的传统数据集，MCP-AttackBench 专注于 **LLM–Tool 交互工作流**；
   - 证明了 MCP 扩展了攻击面：攻击载荷可以嵌入在工具 JSON Schema、参数描述、服务器元数据、返回内容等协议多通道中。
2. **10 大攻击类别构成**：

| 攻击类型                         | 样本规模 | 攻击模式与特征                                                                     |
| -------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| **Jailbreak Instruction Attack** | 68,172   | 越狱指令攻击，占样本主体。将复杂越狱模板与工具调用上下文深度结合                   |
| **Cross Origin Attack**          | 628      | 跨源攻击。诱导模型利用 A 工具（如内网读文件）窃取的数据传递给 B 工具（外网发请求） |
| **Command Injection Attack**     | 519      | 命令注入。在工具参数中构造 Shell 管道符与拼接命令，试图突破宿主执行边界            |
| **Prompt Injection Attack**      | 326      | 针对工具输入与输出内容的提示词注入攻击                                             |
| **Shadow Hijack Attack**         | 300      | 影子劫持。在工具描述或返回中植入隐式逻辑，悄然篡改 Agent 的既定规划（Planning）    |
| **Data-exfiltration Attack**     | 147      | 数据外泄。诱导模型构造 Markdown 图片标签或调用网络工具将系统上下文私密凭据外发     |
| **SQL Injection Attack**         | 128      | SQL 注入。面向数据库类 MCP 工具的结构化查询注入                                    |
| **Puppet Attack**                | 100      | 木偶攻击。使 Agent 彻底丧失自主意图，沦为外部攻击指令的执行傀儡                    |
| **Tool-name Spoofing**           | 88       | 工具名称仿冒。注册与系统核心工具相似的名字（Typosquatting/钓鱼），诱导模型误调用   |
| **`<IMPORTANT>` Tag Attack**     | 40       | 标签注入。伪造系统保留级别的高优先级 XML/HTML 标签，覆写系统原有安全约定           |

3. **防御体系示例（MCP-Guard 三级防护）**：
   - **Stage 1: 规则与模式匹配（Pattern-based）**：基于正则与黑名单快速过滤高危命令与显式注入；
   - **Stage 2: 可学习检测器（Learnable Detector）**：基于微调的多语言 E5 嵌入模型，对工具描述与元数据进行深层语义恶意分类（微调后准确率从 65.37% 提升至 96.01%）；
   - **Stage 3: LLM 仲裁（LLM Arbitration）**：针对边缘模糊样本引入大模型进行深度上下文安全判决。

### 行业同类 MCP 安全评估基准对比

- **MCP-AttackBench**：主打大规模多通道攻击样本库（70k+），重点用于检测模型（如 MCP-Guard）的训练与语义分类基准。
- **MCPSecBench**：系统化安全 Playground，覆盖 4 大攻击面与 17 种攻击类型，横跨多家主流 MCP 运行时。
- **MCPTox**：专注于 **工具投毒攻击（Tool Poisoning Attack）**，构建了 45 个真实 MCP 服务和 353 个真实工具上的 1,312 个攻击用例。
- **MCP-TDP ("When the Manual Lies")**：专注 **工具描述投毒（Tool Description Poisoning）**，评估即使模型本身不直接执行外部代码，仅凭伪造的描述能否误导 Agent 产生破坏性调用。
- **MSB (MCP Security Bench)**：端到端评测套件，涵盖规划（Planning）、调用（Invocation）到响应处理（Response）全链路鲁棒性。

---

## 纵深防御


```
[ 用户输入 ]
    │
    ▼ (1. 输入护栏: 注入/越狱检测 Guardrails)
[ LLM 核心推理引擎 ] ◄── (2. 系统提示词硬化 + 指令数据双通道隔离)
    │
    ▼ (3. 规划与工具调用校验: Schema / 白名单 / 语义审查)
[ Agent 执行环境 ] ── (4. 权限与人机协同: 最小权限 + 关键动作 Approval)
    │
    ▼ (5. 隔离沙箱: 容器 / gVisor / Firecracker / 网络受限)
[ 系统输出与工具响应 ]
    │
    ▼ (6. 输出脱敏与编码: 过滤凭据、防止非安全格式注入)
[ 最终呈现 / 下游系统 ]
```

1. **输入与输出双向护栏（Guardrails）**：
   - 部署如 Llama Guard、NeMo Guardrails 或自建轻量分类模型，拦截已知越狱模式与敏感关键词；
   - 对模型生成的代码、SQL、HTML 进行严格转义与语法沙箱校验，严禁直接拼接执行。
2. **双通道与指令数据隔离（Instruction/Data Separation）**：
   - 明确划分 **指令通道**（System Prompts）与 **数据通道**（User 输入、外部文档、Tool 返回）；
   - 采用结构化容器格式（如 XML 标签隔离 `<user_untrusted_data>`）并告知模型该区域只作为只读数据处理，绝不执行其中的指令。
3. **最小权限与人机协同（Principle of Least Privilege & HITL）**：
   - 严格限定 Agent 的能力边界：避免一次性赋予同时具备“读取本地私密凭据”和“任意公网发送 HTTP 请求”的复合权限；
   - 对删除数据、执行 Shell 命令、资金变动、发送邮件等破坏性操作强制加入 **Human-in-the-Loop（人工确认批准）**。
4. **运行环境强沙箱隔离（Runtime Sandboxing）**：
   - 针对代码解释器与命令执行工具，必须运行在轻量虚拟化沙箱（如 Docker、gVisor、Firecracker microVM、WebAssembly）中；
   - 禁用沙箱默认公网访问或配置严格的域名白名单，防止内网横向移动与反弹 Shell。

---

## 常用工具与资源

- **对抗测试与红队工具（AI Red Teaming）**：
  - [leondz/garak](https://github.com/leondz/garak)：开源 LLM 漏洞扫描器与探针库。
  - [microsoft/PyRIT](https://github.com/microsoft/PyRIT)：微软开源的 Python 生成式 AI 红队评估风险工具包。
  - [centerofci/promptfoo](https://github.com/promptfoo/promptfoo)：LLM 输出质量、注入防御与红队自动化 CLI。
- **安全防护与护栏中间件**：
  - [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails)：基于 Colang 规则定义的大模型对话防护框架。
  - [meta-llama/PurpleLlama](https://github.com/meta-llama/PurpleLlama)：Meta 针对 Llama 模型的安全评估与 Llama Guard 方案。
- **基准与参考标准**：
  - [OWASP GenAI Security Project](https://genai.owasp.org/)
  - [MITRE ATLAS](https://atlas.mitre.org/)
  - [MCP-AttackBench](https://www.emergentmind.com/topics/mcp-attackbench)
- https://github.com/swisskyrepo/payloadsallthethings
