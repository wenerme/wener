---
title: React Live
---

# React Live

- [FormidableLabs/react-live](https://github.com/FormidableLabs/react-live)
  - 使用 [alangpierce/sucrase](https://github.com/alangpierce/sucrase) 转译
    - 187kB/41kB
  - 编辑器 [FormidableLabs/use-editable](https://github.com/FormidableLabs/use-editable)
  - 高亮 [FormidableLabs/prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)
  - https://react-live.netlify.com/

```tsx
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const Live = () => {
  return (
    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};
```

- noInline - 不做 render 封装 - 可以在代码里调 render 方法
- scope - 传递上下文

```jsx
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```
