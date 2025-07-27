---
title: qpdf
---

# qpdf

- [qpdf](https://github.com/qpdf/qpdf)
  - Apache-2.0, C++
  - PDF 文件结构分析、修复和加密/解密工具

```bash
# 检查
# 0 表示没有问题
# 2 error
# 3 warning
qpdf --check input.pdf
# 部分修复
qpdf --empty --pages input.pdf -- repaired.pdf

# 生成逐步显示的 PDF 文档
# 优化 Web/下载显示
qpdf input.pdf --linearize output-linearized.pdf
```

- check 不会检查
  - 流数据内容
  - 不符合 PDF 规范的结构
- QDF Mode
- linearized PDF

## json

- alternative syntax for working with PDF data
- --update-from-json

```bash
# PDF to JSON
# https://qpdf.readthedocs.io/en/stable/json.html
qpdf --json-output out.pdf out.json
# datafile -> stream-N
qpdf --json-output --json-stream-data=file --json-stream-prefix=stream out.pdf out.json

qpdf --json-output --json-stream-data=none out.pdf out.json

# JSON to PDF
qpdf --json-input out.json out.pdf
```

```json
{
  "qpdf": [
    {
      "jsonversion": 2,
      // 1.3， 1.7, 2.0
      "pdfversion": "1.3",
      // 指示库是否将继承的资源下推到页面级别。
      // 某些库调用会触发此操作，qpdf 在读回 JSON 文件时需要知道是否应该这样做，因为这可能会导致某些对象被重新编号。
      // 如果未指定 --update-from-json，则此字段将被忽略。
      "pushedinheritedpageresources": false,
      // 指示在写入 JSON 输出之前是否调用了 getAllPages。
      // 此方法会导致页面树修复，这可能会重新编号某些对象（在极少数损坏的页面树情况下），因此 qpdf 在读回 JSON 文件时需要知道此信息。
      // 如果未指定 --update-from-json，则此字段将被忽略。
      "calledgetallpages": null,
      // 一个数字，指示文件中编号最高的对象的对象 ID。提供此信息是为了方便想要向文件添加新对象的软件，因为在创建新对象时可以安全地从该数字加一开始。请注意，“maxobjectid” 的值可能高于输入 PDF 中实际出现的最大对象，因为它考虑了原始文件中的任何悬空间接对象引用。这可以防止您在不知不觉中创建一个不存在但被引用的对象，这可能会产生意想不到的副作用。（PDF 规范明确允许悬空引用，并表示应将其视为空值。当从 PDF 文件中删除对象时，可能会发生这种情况。）
      "maxobjectid": 31
    },
    {
      "obj:1 0 R": {}
    },
    {
      "trailer": {}
    }
  ]
}
```

- ObjectID - `obj:O G R`
  - O - Object Number
  - G - Generation Number
  - `obj:1 0 R`
- Top-level Stream Objects
  - `stream` - Stream Data
  - `dict`
  - `data`
  - `datafile`
- Top-level Non-stream Objects
  - `value`
- Name Object
  - `/text/plain`
  - `/text#2fplain`
  - `n:/pdf-syntax`
- String
  - `u:utf8-encoded-string`
  - `b:hex-string`
