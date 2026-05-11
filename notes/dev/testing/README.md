---
title: 测试
---

# 测试

:::tip

- QPS=VU/RT
- VU=QPS&times;RT
- RT=VU/QPS

:::

- QPS=Concurrency/ResponseTime
- Concurrency=VU - Virtual User
- ResponseTime=Latency
- e.g. 1000/100ms = 10 QPS
- 反之:
  - 3000/0.5=6000 VU - 期望 QPS 3000, latency 0.5ms, 需要 6000 并发
  - 1500/0.5=3000 VU - 期望 QPS 1500, latency 0.5ms, 需要 3000 并发

---

- DAU - Daily Active User - 日活跃用户 - 日活
- DAU -> UV - 日活跃用户推导并发
  - 峰值时间段
  - 单次时常
  - 使用间隔
- UX -> RT - 用户体验决定响应时间
  - 区分业务场景
    - 即时响应(<100ms)
      - 搜索自动补全、按钮点击反馈等交互
    - 流畅响应(100-300ms)
      - 页面和内容加载
      - 前端静态，组件加载初始化
      - 乐观更新
    - 可接受的响应(300-1000ms)
      - 一般后台操作,如提交表单
    - 过长响应(>1000ms)
      - 用户会感到延迟,影响体验。
  - 交互接口考虑 100-300ms
  - 一般接口考虑 500ms
- 参考
  - [Latency](../../devops/concept/latency.md)

# Load Test

- virtual users (VUs) - 模拟用户并发场景
- requests per second - RPS/QPS - 模拟原始的请求，真实的吞吐量
- Latency - 响应时间
- Availability - 可用性
- SLOs - Service Level Objectives - 服务水平目标
- SLIs - Service Level Indicators - 服务水平指标
- SLAs - Service Level Agreements - 服务水平协议

**Why load test**

- 验证预期流量下的可靠性
- 发现系统问题，探测系统上线

---

- https://k6.io/docs/testing-guides/api-load-testing/

## 测试类型

| en                  | cn         | notes                                                        |
| ------------------- | ---------- | ------------------------------------------------------------ |
| Acceptance testing  | 验收测试   | 验证系统是否满足业务需求，通常由最终用户执行 (UAT)           |
| API testing         | 接口测试   | 针对服务端 API 进行的测试，验证请求参数、响应数据及业务逻辑  |
| Automated testing   | 自动化测试 | 使用工具或脚本自动执行测试用例，替代人工操作以提高效率和频率 |
| Benchmark testing   | 基准测试   | 运行标准化测试建立性能基线，常用于不同版本或系统间的性能对比 |
| Black-box testing   | 黑盒测试   | 不关注内部代码实现，仅验证系统外部输入与输出结果是否符合预期 |
| Breakpoint testing  | 断点测试   | 逐步增加负载，发现系统的瓶颈                                 |
| Dial Test           | 拨测       | 分布式模拟用户发起请求，验证网络与功能                       |
| End-to-End testing  | 端到端测试 | 模拟真实场景，从头到尾完整验证系统工作流 (E2E)               |
| Functional testing  | 功能测试   | 验证系统各项功能是否按照需求规范正常工作                     |
| Gray-box testing    | 灰盒测试   | 结合外部黑盒操作与内部架构知识（如数据库或接口交互）进行测试 |
| Integration testing | 集成测试   | 验证多个模块或组件联合工作时的交互与接口连通性               |
| Load testing        | 负载测试   | 典型负载验证系统功能                                         |
| Performance testing | 性能测试   | 测试系统在特定负载下的响应时间、吞吐量和资源利用率           |
| Probing             | 主动探测   | 主动发送探测请求，检查服务连通性与状态                       |
| Regression testing  | 回归测试   | 验证代码修改后原有功能是否正常，确保未引入新 Bug             |
| Smoke testing       | 冒烟测试   | 最小负载验证系统核心功能                                     |
| Soak testing        | 浸泡测试   | 长时间负载，验证系统在什么节点出现降级                       |
| Spike testing       | 峰值测试   | 突发负载验证系统功能                                         |
| Stress testing      | 压力测试   | 峰值负载验证系统极限与容错                                   |
| System testing      | 系统测试   | 对完整的集成系统进行全面测试                                 |
| Unit testing        | 单元测试   | 验证软件中最小可测试单元（如函数、类）的代码逻辑             |
| White-box testing   | 白盒测试   | 深入系统内部代码逻辑，基于代码执行分支和运行路径进行验证     |

### 监控相关概念 (Monitoring)

拨测和主动探测常用于生产环境，延伸出以下监控体系：

- **Synthetic Monitoring** (综合监控/合成监控)
  - 脚本化、模拟用户行为的方式来持续监控应用。
  - 具备分布式、数据采集分析等特点。
  - **主要用于**: 性能监控、可用性保障、体验提升、网络优化和早期故障发现。
  - **Uptime / Availability Monitoring** (可用性监控): 侧重于服务在线状态的监控。
  - _示例_: [GCP Uptime checks](https://cloud.google.com/monitoring/uptime-checks/introduction)
- **RUM (Real User Monitoring)** (真实用户监控)
  - 收集和分析真实用户的实际交互与体验数据。
  - _对比_: RUM 是采集真实用户行为，而拨测 (Probing) 等属于模拟的合成 (Synthetic) 测试。

## 盒模型测试 (Box Testing Models)

根据对系统内部实现逻辑的了解程度，测试方法通常划分为以下三种“盒”模型：

- **白盒测试 (White-box Testing)**
  - **概念**：测试人员完全了解系统的内部代码结构、算法和逻辑。测试用例是基于代码内部的运行路径设计的。
  - **特点**：又称透明盒、结构测试。侧重于代码级别的内部正确性验证。
  - **常见应用**：单元测试 (Unit Testing)、代码覆盖率分析、静态代码检查。
- **黑盒测试 (Black-box Testing)**
  - **概念**：测试人员把系统看作一个打不开的黑盒子，完全不关心内部的代码实现，只关心“输入什么”和“输出什么”。
  - **特点**：又称功能测试、数据驱动测试。侧重于验证系统是否满足业务需求和规格说明。
  - **常见应用**：功能测试 (Functional Testing)、UI 测试、端到端测试 (E2E Testing)、大部分的验收测试 (UAT)。
- **灰盒测试 (Gray-box Testing)**
  - **概念**：介于白盒和黑盒之间。测试人员了解部分系统内部结构（如数据库表设计、API 接口定义、架构组件等），但执行测试时主要还是通过外部接口或界面操作。
  - **特点**：结合了黑盒的业务视角和白盒的内部架构知识，能够更精准地设计边界用例和定位问题。
  - **常见应用**：接口测试 (API Testing)、集成测试 (Integration Testing)。例如：在测试时不仅验证接口返回的 JSON 结果是否符合预期（黑盒视角），还会去查验底层数据库的记录是否被正确更新（利用白盒知识）。

## avg vs median

- 平均延时(avg)
  - 全局的平均响应时间
  - 容易受极值影响
- 中位数延时(median)
  - 典型的响应时间
  - 除异常情况的干扰
