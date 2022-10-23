---
title: LaTex Math
---

# LaTex Math

- https://github.com/mathjax/MathJax
- [MathJax basic tutorial and quick reference](https://math.meta.stackexchange.com/a/19678/636093)
- http://detexify.kirelabs.org/classify.html
  - 画图，显示字符操作
- http://docs.mathjax.org/_/downloads/en/v3.1-latest/pdf/
- [Glossary of mathematical symbols](https://en.wikipedia.org/wiki/Glossary_of_mathematical_symbols)
- https://www.maths.tcd.ie/~dwilkins/LaTeXPrimer/Calculus.html
- [希腊字母](https://zh.wikipedia.org/wiki/希腊字母)
- [KaTeX](https://github.com/KaTeX/KaTeX)
  - https://katex.org/docs/options.html
  - [Support Table](https://katex.org/docs/support_table.html)
  - [Supported Functions](https://katex.org/docs/supported.html)
- https://www.overleaf.com/learn
- https://www.overleaf.com/learn/latex/Brackets_and_Parentheses

| abbr | for        |
| ---- | ---------- |
| `x'` | `x^\prime` |

| latex         | symbol        |
| ------------- | ------------- |
| `\varphi`     | $\varphi$     |
| `\phi`        | $\phi$        |
| `\mathbb{R}`  | $\mathbb{R}$  |
| `\in`         | $\in$         |
| `\mathcal{D}` | $\mathcal{D}$ |

$$
7\dfrac{4}{3}
$$

```xml title="MathML"
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mn>20</mn>
  <mfrac>
    <mn>47</mn>
    <mn>100</mn>
  </mfrac>
</math>
```

```html
<html>
  <head>
    <script
      type="text/javascript"
      async
      src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"
    ></script>

    <title>mathsjax</title>
  </head>
  <body>
    $$7\frac{4}{3}$$
  </body>
</html>
```

# FAQ

## katex unicodeTextInMathMode

## KaTeX vs MathJax

- KaTeX
  - 只关心 TeX/LaTeX -> HTML
  - 所以会更快一些
- MathJax
  - 还支持 MathML, AsciiMath
  - 可输出 HTML, SVG, MathML.
  - 包含输出 accessible 信息

---

- https://www.intmath.com/cg5/katex-mathjax-comparison.php
