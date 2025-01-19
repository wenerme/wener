---
title: MVC
---

# MVC

- Model-View-Controller
  - Model 定义数据结构
  - View 定义视图结构
  - Controller 合并两者进行控制
    - 处理用户输入
- User -> Controller -> Model -> View

## Editor

Editor 算是 MVC 模式

例如 [prosemirror](../../web/editor/prosemirror.md) 包含核心包

- prosemirror-state
  - 抽象编辑器状态 - 选中、插件、Schema
- prosemirror-model
  - 文档模型 - Node, Fragment, Mark, Slice
- prosemirror-view
  - 抽象视图状态
- prosemirror-transform
  - 实现状态操作的抽象
- prosemirror-commands
  - 预定义的操作

其中 state+model 对应 数据结构，view 对应视图结构，而整体的组合形成 controller。

在 [tiptap](../../web/editor/tiptap.md) 中存在 Editor 对象，其主要属性为

```ts
interface Editor {
  state: EditorState;
  view: EditorView;
  commands: SingleCommands;

  storage: Record<string, any>;
  extensionManager: ExtensionManager;
}
```

该 Editor = Controller，我认为它有几个特点

- self-contained - 自身是完备的
- 状态、操作 分离
- 数据状态、视图状态 分离
- 是一个框架 - extension 逻辑是 I call you

Editor 主要负责组装和提供 操作/operator。

## 前端开发应用

开发前端的时候实际也可以用这样的 Pattern

```ts
interface ResourceControll {
  // 数据状态
  data: {
    items: any[];
    count: number;
    pageSize: number;
    pageNumber: number;
  };
  // 不同的视图状态
  viewer: {
    table: {
      summarySidebarOpen: boolean;
      detailSidebarOpen: boolean;
    };
    list: ListViewerState;
    kanban: KanbanViewerState;
  };
  // 提供操作
  commands: {
    // 数据
    refresh(): void;
    // 数据+视图
    setPage(pageSize: number, pageNumber: number);

    // 视图
    toggleTableSummarySidebar(): this;
    toggleTableDetailSidebar(): this;
  };
}
```

这样的形式是 多个 viewer 对应一个 controller，但其实也可以拆分 view 和核心数据关系，例如

```ts
interface DataController {
  // 数据状态
  state: {
    items: any[];
    count: number;
    pageSize: number;
    pageNumber: number;
  };
  commands: {
    // 数据
    refresh(): void;
    // 数据+视图
    setPage(pageSize: number, pageNumber: number);
  };
}

interface TableController {
  data: DataController;
  state: {
    // 记录列自定义
    columns: Array<{ id: string; width: number }>;
  };
  commands: {
    setPage(pageSize: number, pageNumber: number);
  };
}
```

拆分后能更好的分离焦点，针对相同的 data 实现不同的 viewer，这个是和 editor 有一定出入的地方。

这样的模式避免了深度透传属性，开发基于存在一个 Controller 的上下文进行，并且预先配置好功能。

**开发中的树结构**

- TableProvider
  - Layout
    - Header
      搜索、过滤、排序
    - Body
      - table
        - cell
      - aside
        - Layout
          - summary
            - 操作
            - 根据 controller 支持的操作进行显示
          - detail
    - Footer
      - 翻页组件

统一的 controller 避免从顶部传递属性到最内部的 summary 等方式，他们只需要监控 controller 上对应的 state 即可。

这样的问题是 state 需要有预设，预先设计好一个基础可用的结构，其他扩展功能需要避免冲突，或者使用额外的 storage 字段。
