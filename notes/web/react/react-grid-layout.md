---
title: react-grid-layout
---

# react-grid-layout

- [react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
  - 子项目
    - [react-draggable](https://github.com/react-grid-layout/react-draggable)
    - [react-resizable](https://github.com/react-grid-layout/react-resizable)
- Responsive
  - lg,md,sm,xs,xxs
- memo children 可以提升性能
- 自定义 child 要求 React.forwardRef 且接受 style, className

```tsx
// 基于环境自动检测 width
const ResponsiveGridLayout = WidthProvider(Responsive);

const Demo = () => {
  return (
    <ResponsiveGridLayout
      layouts={{}}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      <div key="1">1</div>
      <div key="2">2</div>
      <div key="3">3</div>
    </ResponsiveGridLayout>
  );
};
```
