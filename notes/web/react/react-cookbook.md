---
title: React Cookbook
tags:
  - Cookbook
---

# React Cookbook

## Admin & Dashboard

- [marmelab/react-admin](https://github.com/marmelab/react-admin)
- [React Admin Demo](https://marmelab.com/react-admin-demo/)
- [Veltrix React](http://veltrix-v.react.themesbrand.com/)
- [Best React Admin Templates](https://athemes.com/collections/best-react-admin-templates/)
- [supasate/connected-react-router](https://github.com/supasate/connected-react-router)

## Editors

- [webcodesk/webcodesk](https://github.com/webcodesk/webcodesk)
- [Webcodesk](https://webcodesk.com/)
- [Dmytro-Medzatiy/react-ui-builder](https://github.com/Dmytro-Medzatiy/react-ui-builder)
- [tinacms/tinacms](https://github.com/tinacms/tinacms)
- [edtr-io/edtr-io](https://github.com/edtr-io/edtr-io)
- [Quill](https://quilljs.com)
- [Slate](https://www.slatejs.org)
- [Trumbowyg](https://alex-d.github.io/Trumbowyg)
- [ContentTools](http://getcontenttools.com)
- [SummerNote](https://summernote.org)
- [Squire](https://github.com/neilj/Squire)
- [Editor.js](https://codex.so/editor)
- [ProseMirror](https://prosemirror.net/)
- [Webiny](https://www.webiny.com/)
- [webiny/webiny-js](https://github.com/webiny/webiny-js)

<h1/>	header-one
<h2/>	header-two
<h3/>	header-three
<h4/>	header-four
<h5/>	header-five
<h6/>	header-six
<blockquote/>	blockquote
<pre/>	code-block
<figure/>	atomic
<li/>	unordered-list-item,ordered-list-item**
<div/>	unstyled***

## unordered-list-item

ordered-list-item 0.

atomic
[draft-js#543](https://github.com/facebook/draft-js/issues/543)

```js
const types = [
  { type: 'header-one', component: 'h1' },
  { type: 'header-two', component: 'h1' },
  { type: 'header-three', component: 'h1' },
  { type: 'header-four', component: 'h1' },
  { type: 'header-five', component: 'h1' },
  { type: 'header-six', component: 'h1' },
  { type: 'blockquote', component: 'blockquote' },
  { type: 'code-block', component: 'pre' },
  { type: 'code', component: 'code' },
  { type: 'unordered-list-item', component: 'li' },
  { type: 'ordered-list-item', component: 'li' },
];
```

[Top 15 Best Rich Text Editor Components](https://ourcodeworld.com/articles/read/1065/top-15-best-rich-text-editor-components-wysiwyg-for-reactjs)

## Drag Drop Editor

- [prevwong/craft.js](https://github.com/prevwong/craft.js)
  - A React Framework for building extensible drag and drop page editors
- [cerner/kaiju](https://github.com/cerner/kaiju)
  - A drag and drop web editor for React components.
- [artf/grapesjs](https://github.com/artf/grapesjs)
  - Free and Open source Web Builder Framework. Next generation tool for building templates without coding
- [chriskitson/react-drag-drop-layout-builder](https://github.com/chriskitson/react-drag-drop-layout-builder)

## Wysiwyg

- [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)

## Markdown

- [react-mde](https://www.npmjs.com/package/react-mde)
  - React-mde has no 3rd party dependencies.
- [outline/rich-markdown-editor](https://github.com/outline/rich-markdown-editor)
  - React and Prosemirror based markdown editor that powers Outline wiki

### Theory

- [Lessons from a year of WYSIWYG](https://medium.com/@yurkaninryan/lessons-from-a-year-of-wysiwyg-915135ec846e)
- [Wiki: Model-based design](https://en.wikipedia.org/wiki/Model-based_design)
  - in these four steps:
    1. modeling a plant
       - 为受控体建模。
       - [Wiki: Plant (control theory)](<https://en.wikipedia.org/wiki/Plant_(control_theory)>)
    2. analyzing and synthesizing a controller for the plant
       - 配合受控体，分析及合成适合的控制器。
    3. simulating the plant and controller
       - 针对控制器及受控体进行仿真。
    4. integrating all these phases by deploying the controller
       - 整合上述的步骤来布署控制器。
- [Wiki: Cybernetics (控制论)](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E8%AE%BA)
  - 控制论与对系统的研究有关，如自动化系统、物理系统、生物系统、认知系统、以及社会系统等等。控制论可被应用于研究包含信令回路的系统。信令回路在这里指，当一个系统的运作改变了它所在的环境，而这些改变又反过来反馈于系统上，并导致系统本身的变化。这种循环最初被称为“循环影响”关系。

## Forms

- [Medium: Which React form library should you use](https://medium.com/@ReactEurope/which-react-form-library-should-you-use-in-your-app-in-2020-469894c687d)
- [jaredpalmer/formik](https://github.com/jaredpalmer/formik)
- [rjsf-team/react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
- [NPM Trends: Forms](https://www.npmtrends.com/final-form-vs-formik-vs-react-form-vs-react-redux-form)
- [Formik Issue #533](https://github.com/jaredpalmer/formik/issues/533)
- [hosseintalebi/formik-vs-react-final-form](https://github.com/hosseintalebi/formik-vs-react-final-form)

### Form Builders & Commercial

- [formbuilder.online](https://formbuilder.online/)
  - [kevinchappell/formBuilder](https://github.com/kevinchappell/formBuilder)
- [Codebrahma/cb-react-forms](https://github.com/Codebrahma/cb-react-forms)
- [kinto-formbuilder](http://kinto.github.io/formbuilder/)
- [React Hook Form Builder](https://react-hook-form.com/form-builder/)
- [react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form)

**Commercial/SaaS:**

- [Paperform](https://paperform.co/) ([Templates](https://paperform.co/templates))
- [Cognito Forms](https://www.cognitoforms.com/)
- [Formbuilder Demo](https://formbuilder.dev/demo/)
- [Formstack Templates](https://www.formstack.com/templates)
- [Form.io](https://www.form.io/) - [GitHub](https://github.com/formio/formio)
- [Zapier: Best Online Form Builder Software](https://zapier.com/learn/forms-surveys/best-online-form-builder-software/)

[Building a Responsive Drag and Drop UI](https://www.prototypr.io/2019/11/27/building-drag-drop-ui/)

- [CodeSandbox: dnd](https://codesandbox.io/s/74wxnz38m6?file=/src/index.js:155-165)
- [CodeSandbox: dnd 2](https://codesandbox.io/s/n9m02v24yj)

## Interactive & UI Libraries

`yarn add react-draggable react-resizable react-grid-layout`

`react-sortable-hoc`

### Category

1.  **Interaction**
    - `react-sortable-hoc`
    - `react-draggable`
    - `react-resizable`
2.  **List/Table**
    - `react-window`
    - `react-virtualized`
    - `react-tiny-virtual-list`
    - `react-infinite`
    - `react-table`
    - [NPM Trends: Table libs](https://www.npmtrends.com/react-data-grid-vs-react-datasheet-vs-react-list-vs-react-table-vs-react-virtualized-vs-react-window)
3.  **Layout**
    - `react-grid-layout`
    - `golden-layout`
    - `react-frame`

## Sorting

- [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)

## Diagrams

- [react-diagrams](https://github.com/projectstorm/react-diagrams)

## Build & Analytics

- [@scarf/scarf](https://www.npmjs.com/package/@scarf/scarf) - npm 包分析工具
- [react-frame rollup.config.js](https://github.com/swiftcarrot/react-frame/blob/master/rollup.config.js) - Rollup 配置参考

## React Native Tips

- [React Native Debugging](https://facebook.github.io/react-native/docs/debugging)

### 访问开发菜单 (In-App Developer Menu)

- **iOS Simulator**: `⌘D` 或 Hardware > Shake Gesture
- **Android Emulator**: `⌘M` (Mac), `Ctrl+M` (Windows/Linux)
- **ADB**: `adb shell input keyevent 82`

### 重新加载 (Reloading)

- **iOS Simulator**: `⌘R`
- **Android Emulator**: 连按两次 `R`

### 调试工具

- Debugger UI: `http://localhost:8081/debugger-ui/`
- [reactotron](https://github.com/infinitered/reactotron)
