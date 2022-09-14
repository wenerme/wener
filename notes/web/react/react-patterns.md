---
title: React Patterns
tags:
  - Pattern
---

# React Patterns

- `innerRef`, `elementRef` - forwardRef 透传内部引用
- `defaultValues`, `initialValues` - 初始状态 props

```tsx
const Layout = ({ children }) => {
  return <div>{children}</div>;
};
// 组合组件 - Compound Components
Layout.Sidebar = ({ children }) => {
  return <aside>{children}</aside>;
};

// 高阶组件 - HOC - Higher Order Components
const MyButton = withStyle(Button, { className: "" });

// 渲染属性 - Render Props
const Node = (
  <Comp
    // render props
    render={({ isActive }) => (isActive ? "Active" : "")}
    // props based on state
    className={{ isActive } ? "active" : ""}
  >
    {/* render props as children */}
    {/* 函数做为子元素 - function as children */}
    {({ isActive }) => (isActive ? "Active" : "Inactive")}
  </Comp>
);

// 代理组件 - Proxy component
const Button = (props) => <button type="button" {...props} />;

// 布局组件 - Layout component
const Layout = ({ sidebar, status, menu,children }) => (
  <div>
    <menu>{menu}</menu>
    <aside>{sidebar}</aside>
    <main>{children}</main>
    <footer>{status}</aside>
  </div>
);

// 受控组件/受控输入 - Controlled Components - Controlled input
// state = value
const MyComp = ({state,onStateChange})=>{
  return <div></div>
}
```

- createContext
  - 按需创建 Context
  - 多个相同 Context 并存
- Prop Collections and Getters
  - 传递 getXyzProps 返回的 props 到 Component
- State Initializers - 状态初始器 - `<Comp createState={()=>({})}/>`
- Provider/Context - React 的 IoC
- Controlled Components
- Array as children
- Style component - 同 Proxy component 但关注样式属性
- Container component
  - 获取数据，传递给具体组件
- State hoisting
  - 例如表单
- Control Props Pattern
  - 例如 react-hook-form 的 control 参数
  - Material UI
- Custom Hook Pattern
- State reducer pattern

---

- https://reactpatterns.com/

## Slot Pattern

- 组件传递逻辑层的 IoC
- 类似 WebComponents 的 slot 属性
- Pros
  - 解偶 需要自上而下 传参数的问题
  - 思维层更直观 - 不需要关心如何展现的，只需要关心需要展现
  - 逻辑通用
- Cons
  - Slot 如果不限定上下文可能会混淆 - 通过 `createSlotContext` + Compound Component 方式避免
  - 直接传递 children 到别的节点会丢失 Context
    - 实际 Context 不是 Slot 位置的 Context
    - 可以用 Portal 解决
    - 可以把 Context 放到更上层解决
- 参考
  - [Web Components > Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)

```tsx
const SlotDemo = (
  <Layout>
    <Layout.Slot name="Sidebar" placement="top">
      Menus
    </Layout.Slot>
    <Layout.Slot name="Footer" placement="right">
      Copyright
    </Layout.Slot>
    <h3>Layout Title</h3>
    <section>Content</section>
  </Layout>
);
```
