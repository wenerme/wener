---
title: Gherkin
---

# Gherkin

- [cucumber/gherkin](https://github.com/cucumber/gherkin)
  - MIT, Go/Java/JS/Python/Ruby/Rust/C/...
  - Gherkin parser
- [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)

Gherkin 是一个面向业务的领域特定语言（DSL），主要用于行为驱动开发（BDD）。它使用自然语言来描述软件的行为，使得非技术人员（业务人员、产品经理）和开发人员、测试人员都能理解。执行 Gherkin 的著名工具有 Cucumber、SpecFlow、Behave 等。

## 关键字 (Keywords)

- **Feature** (功能): 描述软件的一个功能模块。
- **Rule** (规则): (可选) 描述 Feature 中的业务规则，其下可以包含多个 Scenario。
- **Scenario / Example** (场景 / 示例): 描述功能的一个具体实例或使用情况。
- **Given** (假如): 设置场景的前置条件或初始状态（Arrange）。
- **When** (当): 描述触发场景的操作或事件（Act）。
- **Then** (那么): 描述预期的结果或输出（Assert）。
- **And / But** (并且 / 但是): 用于连接多个 Given, When 或 Then 步骤，使语句更通顺。
- **Background** (背景): 在同一个 Feature / Rule 下，所有 Scenario 执行前都会先执行的公共步骤（减少重复）。
- **Scenario Outline / Scenario Template** (场景大纲 / 场景模板): 用于参数化场景，结合 `Examples` 使用不同的数据集运行同一场景。
- **Examples / Scenarios** (示例 / 场景): 为 `Scenario Outline` 提供数据表格。
- `"""` (Doc Strings): 用于多行字符串。
- `|` (Data Tables): 用于数据表格。
- `@` (Tags): 用于分类和过滤（例如 `@smoke`, `@fast`）。

## 示例 (Example)

```gherkin
@auth @fast
Feature: 登录功能
  为了保护用户隐私
  作为系统用户
  我希望只有提供正确的凭据才能登录系统

  Background:
    Given 系统中存在一个用户名为 "user1"，密码为 "password123" 的活跃用户

  Scenario: 使用正确的密码登录成功
    When 用户在登录页面输入用户名 "user1" 和密码 "password123"
    And 点击"登录"按钮
    Then 系统应提示 "登录成功"
    And 页面应跳转到"用户主页"

  Scenario Outline: 使用无效的凭据登录失败
    When 用户在登录页面输入用户名 "<username>" 和密码 "<password>"
    And 点击"登录"按钮
    Then 系统应提示 "<error_message>"

    Examples:
      | username | password    | error_message    |
      | user1    | wrongpass   | 密码错误         |
      | unknown  | password123 | 用户名不存在     |
      | user1    |             | 密码不能为空     |
```
