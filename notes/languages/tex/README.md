---
title: Tex
---

# Tex

- texmf -> TeX and Metafont
- https://texdoc.org/
  - https://texdoc.org/serve/tds.pdf/0

# FAQ

## TeX vs LaTeX

- TeX:
  - 底层 排版/TypeSetting **引擎**和语言
  - by Donald Knuth
  - 类似于排版领域的“汇编语言”，提供了强大的底层排版指令，但直接使用非常复杂。
  - 用户需要关注大量的格式细节。
- **LaTeX**:
  - 基于 TeX 的**宏包**和文档准备系统。
  - 在 TeX 的基础上提供了一套更高级、更易于使用的命令，让用户可以专注于**内容**而非**格式**。
  - 例如，用户使用 `\section`、`\documentclass` 等命令来定义文档结构，LaTeX 会自动处理格式。
  - 是目前学术界和科技写作的事实标准。

**简单类比**: 如果 TeX 是汽车的引擎，那么 LaTeX 就是一辆完整的汽车。你可以直接操作引擎（TeX），但这很困难；而驾驶汽车（LaTeX）则要简单得多，能让你轻松到达目的地。
