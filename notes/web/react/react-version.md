# 17
* 不再需要对事件进行 persist

```jsx
<input onChange={e=>{
  e.persist() // 17 之后不再需要
  update(s=>{
    // 之前如果不 persist 可能为 null
    s.value = e.target.value
  })
}} />
```
