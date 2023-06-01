---
title: craft.js
---

# craft.js

- [prevwong/craft.js](https://github.com/prevwong/craft.js)
  - MIT, React
  - drag and drop page editors
  - 编辑模式对现有组件侵入
- @craftjs/core
  - 150kb - self 30kb + @craftjs/utils 13kb + lodash 96kb + immer + nanoid
- [prevwong/reka.js](https://github.com/prevwong/reka.js)
  - 新的状态管理+序列化

:::caution

- 对现有组件侵入
- ~~暂不支持 Reaact 18 StrictMode [#404](https://github.com/prevwong/craft.js/issues/404)~~

:::

```tsx
import React from "react";
import {Editor, Frame, Canvas, Selector} from "@craftjs/core";

const TextComponent = ({text}) => {
  const { connectors: { connect, drag }, isClicked, actions: {setProp} } = useNode(
    (state) => ({
      isClicked: state.event.selected,
    })
  );

  return (
    <div ref={dom => connect(drag(dom))}>
      <h2>{text}</h2>
      {
        isClicked ? (
          <Modal>
            <input
              type="text"
              value={text}
              onChange={e => setProp(e.target.value)}
            />
          </Modal>
        )
      }
    </div>
  )
}

const Container = () => {
  const { actions: {add}, query: { createNode, node } } = useEditor();
  const { id, connectors: {drag, connect} } = useNode();
  return (
    <div ref={dom => connect(drag(dom))}>
      <a onClick={() => {
        const { data: {type, props}} = node(id).get();
        add(
          createNode(React.createElement(type, props));
        );
      }}>
        Make a copy of me
      </a>
    </div>
  )
}

const SaveButton = () => {
  const { query } = useEditor();
  return <a onClick={() => console.log(query.serialize()) }>Get JSON</a>
}

const App = () => {
  return (
    <div>
      <header>Editor</header>
      <Editor>
        <Frame resolver={{TextComponent, Container}}>
          <Canvas>
            <TextComponent text="I'm already rendered here" />
          </Canvas>
        </Frame>
        <SaveButton/>
      </Editor>
    </div>
  )
}
```

## Internal

- useMethos 基于 [pelotom/use-methods](https://github.com/pelotom/use-methods) 做了一定调整
  - 加了 QueryMethods - 用于查询状态
  - 加了状态订阅机制
  - 原始 userMethods 返回 `[state, callbacks]`, 现在的返回 `[actions, query, watcher, getState]`
  - 理解 `useMethos` 对看懂 useEditor 和 useNode 非常有帮助
- Editor
  - 配置项
    - onRender - 渲染 hoc
    - resolver - 组件列表
    - enabled - 是否启用编辑
    - indicator - 线条颜色 - success 和 error
  - 状态
    - nodes - 所有节点
    - events - 事件状态
    - options - 配置项
  - API 通过 useMethods 实现 - actions、queries
    - 主要是维护 node 的结构 - 增、删、改、查
- Events
  - 事件处理 - "select" | "hover" | "drag" | "drop" | "create"
  - 维护节点上的事件状态
  - 维护 drop 的 标识动画
  - 逻辑相对复杂
- NodeElement 会基于 id 对节点进行 memo
- NodeHandlers 会从事件机制衍生出针对节点的事件处理
- Canvas
  - 替代组件，相当于组件的 decorator、hoc
  - 初始化内部组件
  - 维护 ID 映射关系
  - 依赖 internalEditor 和 internalNode 维护状态
- useInternalNode
  - 从 NodeContext 暴露额外信息
- NodeContext
  - 包含 id, related, connectors
- UserComponent
  - 附加额外配置信息的组件
  - name
  - rules - 控制拖拉行为
  - related
  - defaultProps
- Node - 节点信息
  - id
  - data
  - events - selected、dragged、hovered
  - dom
  - related
  - rules - canDrag、canMoveIn、canMoveOut
- NodeData - 节点数据
  - props
  - type
  - name
  - displayName
  - isCanvas
  - parent
  - index
  - nodes
  - hidden
  - custom
- 序列化会排出默认的 type、props、isCanvas、name 然后序列化组件
- https://craft.js.org/r/docs/acknowledgements/
