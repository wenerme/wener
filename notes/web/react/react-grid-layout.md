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

:::tip

- ResponsiveGridLayout 在 container 中，当 container resize 的时候不会变化
  - [WidthProvide](https://github.com/react-grid-layout/react-grid-layout/blob/master/lib/components/WidthProvider.jsx) 默认只监听了 window resize

:::

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

## Notes

- resize handle 会作为 children 传入 子元素
  - 因此 children 会变为数组
- 自定义元素需要注意处理好 透传 props

# FAQ

## Resize based on container

```ts
import useResizeObserver from 'use-resize-observer';
import { Responsive, ResponsiveProps } from 'react-grid-layout';
const ResponsiveGridLayout: React.FC<ResponsiveProps> = (props) => {
  const { ref, width } = useResizeObserver();
  const realWidth = useDebounce(width, 200);
  // measureBeforeMount
  const w = realWidth ?? width;
  return (
    <div className={classNames('h-full w-full')} ref={ref}>
      {w && <Responsive width={w} {...props} />}
    </div>
  );
};
```
