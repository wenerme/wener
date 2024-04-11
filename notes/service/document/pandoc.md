---
commands:
  - pandoc
---

# Pandoc

- [jgm/pandoc](https://github.com/jgm/pandoc)
  - GPLv2, Haskell
- 参考
  - https://pandoc.org/demos.html

[Pandoc](https://pandoc.org/) 可用于直接将 Markdown 转换为 Word 或者 PDF. 也支持将 Word 或者 PDF 转换为 Markdown, 是一款非常强大的文档转换工具.支持的格式有

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
brew install pandoc # macOS brew

# Markdown 转 docx
pandoc makrdown.md -f markdown -t docx -o output.docx

# Markdown 转 pdf
# 依赖于 pdflatex,
# Mac 下可通过安装 maclatex 提供
#   brew cask install mactex # 2.5 G
pandoc makrdown.md -f markdown -t latex -o output.pdf
```
