---
title: BlockNote
---

# BlockNote

- [TypeCellOS/BlockNote](https://github.com/TypeCellOS/BlockNote)
  - MPLv2, TS, React
  - 基于 tiptap，prosemirror
  - UI mantine, shadcn
  - 原生 React - 非常好定制化和扩展

:::caution

- 不支持粘贴图片
  - https://github.com/TypeCellOS/BlockNote/issues/693

:::

```bash
npm add @blocknote/{core,react,shadcn}
```

## Cutome

- 媒体和图片统一作为 File 处理
- 选择文件的组件为 FilePanel
- 所有的组件可替换
  - https://github.com/TypeCellOS/BlockNote/blob/main/packages/react/src/editor/ComponentsContext.tsx

## Model

```tsx
type Block = {
  id: string;
  type: string;
  props: Record<string, boolean | number | string>;
  content: InlineContent[] | TableContent | undefined;
  children: Block[];
};

type InlineContent = Link | StyledText;

type Link = {
  type: 'link';
  content: StyledText[];
  href: string;
};

type StyledText = {
  type: 'text';
  text: string;
  styles: Styles;
};

type TableContent = {
  type: 'tableContent';
  rows: {
    cells: InlineContent[][];
  }[];
};

// 默认 Schema

type ParagraphBlock = {
  id: string;
  type: "paragraph";
  props: DefaultProps;
  content: InlineContent[];
  children: Block[];
};

type HeadingBlock = {
  id: string;
  type: "heading";
  props: {
    level: 1 | 2 | 3 = 1;
  } & DefaultProps;
  content: InlineContent[];
  children: Block[];
};

type BulletListItemBlock = {
  id: string;
  type: "bulletListItem";
  props: DefaultProps;
  content: InlineContent[];
  children: Block[];
};

type NumberedListItemBlock = {
  id: string;
  type: "numberedListItem";
  props: DefaultProps;
  content: InlineContent[];
  children: Block[];
};

type ImageBlock = {
  id: string;
  type: "image";
  props: {
    url: string = "";
    caption: string = "";
    width: number = 512;
  } & DefaultProps;
  content: undefined;
  children: Block[];
};

type TableBlock = {
  id: string;
  type: "table";
  props: DefaultProps;
  content: TableContent[];
  children: Block[];
};

type DefaultProps = {
  backgroundColor: string = "default";
  textColor: string = "default";
  textAlignment: "left" | "center" | "right" | "justify" = "left";
};

type Styles = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  textColor: string;
  backgroundColor: string;
};
```

- https://www.blocknotejs.org/docs/editor-basics/document-structure
