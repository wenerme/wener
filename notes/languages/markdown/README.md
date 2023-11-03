---
title: Markdown
---

# Markdown

- .md, .markdown
  - RFC7763 text/markdown
    - text/markdown; variant=CommonMark
  - RFC7764
- 常见扩展 .md, .markdown, .mdown, .mkdn, .mkd, .mdwn, .mkdown, .ron, .mdx
- [Awesome](./markdown-awesome.md)
- [语法参考](./markdown-reference.md)
- Flavor
  - [Markdown](https://daringfireball.net/projects/markdown/syntax)
    2004-03-19
  - [CommonMark](https://commonmark.org/)
    - [commonmark/commonmark-spec](https://github.com/commonmark/commonmark-spec)
    - [Implementations](https://github.com/commonmark/commonmark-spec/wiki/List-of-CommonMark-Implementations)
  - [Github Markdown Flavor](./markdown-gh.md)
    2011-04-28
- wikipedia [Markdown](https://en.wikipedia.org/wiki/Markdown)


## 工具

### Pandoc

[Pandoc](http://pandoc.org/) 可用于直接将 Markdown 转换为 Word 或者 PDF. 也支持将 Word 或者 PDF 转换为 Markdown, 是一款非常强大的文档转换工具.支持的格式有

```
输入格式:  commonmark, docbook, docx, epub, haddock, html, json*, latex,
                markdown, markdown_github, markdown_mmd, markdown_phpextra,
                markdown_strict, mediawiki, native, odt, opml, org, rst, t2t,
                textile, twiki
                [ *only Pandoc's JSON version of native AST]
输出格式: asciidoc, beamer, commonmark, context, docbook, docx, dokuwiki,
                dzslides, epub, epub3, fb2, haddock, html, html5, icml, json*,
                latex, man, markdown, markdown_github, markdown_mmd,
                markdown_phpextra, markdown_strict, mediawiki, native, odt,
                opendocument, opml, org, pdf**, plain, revealjs, rst, rtf, s5,
                slideous, slidy, texinfo, textile
                [**for pdf output, use latex or beamer and -o FILENAME.pdf]
```

```bash
# 在 Mac 下可直接使用 brew 安装
brew install pandoc

# Markdown 转 docx
pandoc makrdown.md -f markdown -t docx -o output.docx

# Markdown 转 pdf
# 依赖于 pdflatex,
# Mac 下可通过安装 maclatex 提供
#   brew cask install mactex # 2.5 G
pandoc makrdown.md -f markdown -t latex -o output.pdf
```
