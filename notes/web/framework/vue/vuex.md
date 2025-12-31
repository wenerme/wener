---
tags:
  - State Management
  - Legacy
---

# vuex

> [!CAUTION]
>
> - ⚠️ 4年未更新
> - 替代方案: [Pinia](./pinia.md), Vue 3 Composition API reactive

- [vuejs/vuex](https://github.com/vuejs/vuex)
  - MIT, TS
- Vuex 使用 **单一状态树**
- 每个应用将仅仅包含一个 store 实例
- 核心概念
  - State
  - Getters
  - Mutations
    - 必须同步
  - Actions
    - 可以异步
    - Action 提交的是 mutation，而不是直接变更状态。
  - Modules
    - 第一个参数是模块的局部状态对象
    - `context.state` - 局部状态
    - `context.rootState` - 根状态

```ts
import { mapGetters, mapState, mapMutations, mapActions, createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done);
    },
    // module 第三个参数是根状态
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
  },
  modules: {},
});

store.getters.doneTodos;

// 手动提交
store.commit('increment', 10);
store.commit({
  type: 'increment',
  amount: 10,
});

// 分发 Action
store.dispatch('increment');
```

```ts title="store.ts"
import { createNamespacedHelpers } from 'vuex';

// 模块
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module');
```
