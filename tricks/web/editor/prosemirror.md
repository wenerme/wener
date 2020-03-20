# ProseMirror

## Tips
* [prosemirror](https://prosemirror.net/) - A toolkit for building rich-text editors on the web
* 特性
  * 结构化的模型树
  * 模型不可变
  * 支持协作编辑
  * 模型受 schema 限制 - 实现自定义
  * 模型状态变化类似于 redux
  * 整体概念类似于 react+redux
  * 状态 UI 独立
* 模块
  * prosemirror-model - 定义文档模型
  * prosemirror-state - 编辑器状态
  * prosemirror-view - 编辑器状态的 UI
  * prosemirror-transform - 状态事务

```bash
# 核心模块
yarn add prosemirror-{state,view,model,schema-basic,schema-list}
yarn add --dev @types/prosemirror-{state,view,model,schema-basic,schema-list}
# 扩展模块
yarn add prosemirror-{keymap,history,commands,dropcursor,gapcursor,menu,inputrules}
yarn add --dev @types/prosemirror-{keymap,history,commands,dropcursor,gapcursor,menu,inputrules}
```
