---
title: React Buddy
---

# React Buddy

- https://react-buddy.com/
- 类似于 StoryBook 的组件开发体验
- Component Preview
- Palette
- Inspector
- Outline
- 参考
  - [JPA Buddy & React Buddy 加入了 JetBrains](https://blog.jetbrains.com/idea/2023/09/jpa-buddy-and-react-buddy-join-jetbrains/)
    - 2023-09-11
    - 意味着不在额外收费
  - https://plugins.jetbrains.com/plugin/17467-react-buddy

```tsx
ReactDOM.render(
  <React.StrictMode>
    <DevSupport ComponentPreviews={<ComponentPreviews />} useInitialHook={useInitial}>
      <App />
    </DevSupport>
  </React.StrictMode>,
  document.getElementById('root'),
);
```
