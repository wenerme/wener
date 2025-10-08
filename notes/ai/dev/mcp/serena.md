---
title: serena
---

# serena

- [oraios/serena](https://github.com/oraios/serena)
  - MIT, Python
  - Serena 是一个强大的**编码代理工具包**，能够将 LLM 转换为功能完整的代理，直接在你的代码库上工作。
  - 提供**语义代码检索和编辑工具**，类似于 IDE 的功能，在符号级别提取代码实体并利用关系结构。
  - 主要特性：
    - 基于语言服务器协议（LSP）的语义代码分析
    - 支持多种编程语言：Python、TypeScript/JavaScript、PHP、Go、R、Rust、C/C++、Zig、C#、Ruby、Swift、Kotlin、Java、Clojure、Dart、Bash、Lua、Nix、Elixir、Erlang 等
    - 提供 MCP（Model Context Protocol）服务
  - 核心工具：
    - `find_symbol` - 全局符号搜索
    - `find_referencing_symbols` - 查找引用符号
    - `insert_after_symbol` / `insert_before_symbol` - 在符号前后插入代码
    - `replace_symbol_body` - 替换符号定义
    - `get_symbols_overview` - 获取文件符号概览
  - 典型用例：
    - 增强现有编码代理的性能（如 Claude Code）
    - 在大型复杂项目中精确导航和操作代码
    - 提供 IDE 级别的代码理解和编辑能力
    - 节省 token 使用并提高代码质量
