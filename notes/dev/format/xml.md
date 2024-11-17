---
title: xml
---

# xml

- usecase
  - WSDL
  - SOAP
  - RSS
  - Atom
  - SVG
  - XSLT
  - XHTML
  - XForms
  - XQuery
  - XPath
  - XPointer
  - XLink
  - 企业级标准协议
    - SOAP
    - Web Services
    - 金融报文 - SWIFT、FIX
    - 医疗 - HL7
    - 电信行业
  - 文档建模
    - MS Office
    - Open Office
    - PDF
    - DocBook
    - DITA
  - 政府、科研数据交换

```bash
# macOS 工具
brew install xmlstarlet

echo '<root><foo a="b">lorem</foo><bar value="ipsum" /></root>' > test.xml

# format
xmllint --format test.xml
tidy -xml -i -q test.xml
xmlstarlet format --omit-decl --indent-spaces 2 test.xml

# 添加属性
# -O omit xml tag
xmlstarlet ed -O --inplace -N x=http://www.w3.org/2000/svg \
  --update "x:svg/@fill" -v currentColor \
  --insert "/x:svg[not(@fill)]" --type attr -n fill -v currentColor
icon.svg
```

## Schema

- complexType
  - all - 任意顺序出现，但每个只允许出现一次
  - choice
  - sequence
    - element
      - .name
      - .type
      - .minOccurs
      - .maxOccurs
- XML Schema 1.1 https://www.w3.org/XML/Schema
- W3C Recommendation: XML Schema Part 1: Structures
- W3C Recommendation: XML Schema Part 2: Datatypes
