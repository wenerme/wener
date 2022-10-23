---
tags:
  - Glossary
---

# Tex Glossary

- documentclass
  - article
  - beamer - 做 PPT
    - https://www.overleaf.com/learn/latex/Beamer
    - http://tug.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf
  - standalone - 单独编译 pictures 作为文档的一部分
    - https://ctan.org/pkg/standalone
    - `\documentclass[convert={density=600x100,outext=.jpg}]{standalone}`
    - `\documentclass[convert={size=640}]{standalone}`
      - 默认 png
  - article for articles in scientific journals, presentations, short reports, program documentation, invitations, ...
  - proc a class for proceedings based on the article class.
  - minimal is as small as it can get. It only sets a page size and a base font. It is mainly used for debugging purposes.
  - report for longer reports containing several chapters, small books, thesis, ...
  - book for real books
  - slides for slides. The class uses big sans serif letters.
  - memoir for changing sensibly the output of the document. It is based on the book class, but you can create any kind of document with it (1)
  - letter For writing letters.
  - 其他
    - https://ctan.org/topic/class
    - https://tex.stackexchange.com/questions/782

## beamer

```tex
\documentclass{beamer}
%Information to be included in the title page:
\title{Sample title}
\author{wener}
\institute{Wener}
\date{2021}

\begin{document}

\frame{\titlepage}

\begin{frame}
\frametitle{Sample frame title}
This is some text in the first frame. This is some text in the first frame. This is some text in the first frame.
\end{frame}

\end{document}
```
