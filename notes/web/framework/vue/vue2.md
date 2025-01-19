---
title: Vue 2
tags:
  - Legacy
---

# Vue 2

| lifecycle     | $refs | notes                                        |
| ------------- | ----- | -------------------------------------------- |
| beforeCreate  | ❌    | 组件实例尚未完全初始化。                     |
| created       | ❌    | DOM 尚未渲染，模板中的引用未挂载到实例。     |
| beforeMount   | ❌    | 组件即将挂载，但 DOM 结构尚未生成。          |
| mounted       | ✅    | DOM 已生成并挂载，$refs 已初始化完成。       |
| beforeUpdate  | ✅    | 数据更新前调用，适合在更新前访问现有 DOM。   |
| updated       | ✅    | 数据更新后调用，适合在更新后操作 DOM。       |
| beforeDestroy | ✅    | 组件销毁前调用，适合在销毁前清理资源。       |
| destroyed     | ❌    | 组件销毁后调用，所有绑定和事件监听器已移除。 |

```js
this.$nextTick(() => {
  // DOM 更新完成后执行的代码
});
this.$watch('someData', (newVal, oldVal) => {
  // 数据变化时执行的代码
});

// 子组件中触发事件
this.$emit('customEvent', data);
// 父组件中监听事件
this.$on('customEvent', (data) => {
  // 处理事件
});

// 访问父组件实例
this.$parent.someMethod();

// 访问子组件实例
this.$children[0].someMethod();

/ 添加属性
this.$set(this.someObject, 'newProp', value);

// 删除属性
this.$delete(this.someObject, 'propToDelete');

// 强制更新
this.$forceUpdate();

// 销毁组件
this.$destroy();
```
