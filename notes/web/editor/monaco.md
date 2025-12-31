---
title: monaco
---

# monaco

- [Microsoft/monaco-editor](https://github.com/Microsoft/monaco-editor)
- 参考
  - [monaco-editor README](https://github.com/microsoft/fluentui/blob/master/packages/monaco-editor/README.md)
  - [TsxEditor.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-monaco-editor/src/components/TsxEditor.tsx)
    - TsxEditor
  - [CDN: monaco-editor](https://cdn.jsdelivr.net/npm/monaco-editor/)
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

[Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)
[Sample: browser-amd-localized](https://github.com/Microsoft/monaco-editor-samples/blob/master/browser-amd-localized/index.html)
[Sample: browser-esm-webpack-typescript](https://github.com/microsoft/monaco-editor-samples/blob/master/browser-esm-webpack-typescript/src/index.ts)
