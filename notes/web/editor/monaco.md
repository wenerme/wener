---
title: monaco
---

# monaco

- [Microsoft/monaco-editor](https://github.com/Microsoft/monaco-editor)
- 参考
  - https://github.com/microsoft/fluentui/blob/master/packages/monaco-editor/README.md
  - https://github.com/microsoft/fluentui/blob/master/packages/react-monaco-editor/src/components/TsxEditor.tsx
    - TsxEditor
  - https://cdn.jsdelivr.net/npm/monaco-editor/
- [suren-atoyan/monaco-react](https://github.com/suren-atoyan/monaco-react)
  - npm:@monaco-editor/react
  - -> @monaco-editor/loader
- [react-monaco-editor](https://github.com/react-monaco-editor/react-monaco-editor)
  - npm:react-monaco-editor
- nls -> National Language Support

## Notes

- model
  - identified by a URI
  - 如果没有指定 URI，会自动生成一个 - `inmemory://model/1`
  - 文本内容、语言、版本、URI、编辑历史
- uri
  - monaco.Uri
  - `file:///`
- editor
  - user facing view of the model
- provider
  - LPS - Language Protocol Server
  - 补全
