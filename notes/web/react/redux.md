# Redux

## Tips

- [Redux Documentation](http://redux.js.org/docs/)
- [paularmstrong/normalizr](https://github.com/paularmstrong/normalizr)
  - Normalizes nested JSON according to a schema

```bash
yarn add redux react-redux @reduxjs/toolkit redux-logger
yarn add --dev @types/react-redux @types/redux-logger
```

- @reduxjs/toolkit 依赖内容
  - immer
  - redux
  - redux-devtools-extension
  - redux-immutable-state-invariant
  - redux-thunk
  - reselect
- [reduxjs/redux-toolkit#76](https://github.com/reduxjs/redux-toolkit/issues/76) Create Async Action

**中心思想**

- 程序所有状态存储于 Store
- 状态只读
- 通过纯函数来修改状态
  - 相同的参数返回相同的结果

**基本元素**

- Action
  - 仅描述发生了什么事情,不对状态做任何解释.
- Reducer
  - 不要在 Reducer 中进行以下操作
    - 修改参数
    - 进行有单向影响(side effects)的操作,例如 调用 API 或者路由
    - 调用 non-pure 函数,例如 Date.now() 或 Math.random().
- Store

### 基础初始化逻辑

**带类型 selector**

```ts
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'app/redux/store';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
```

**DEV 添加日志**

```js
const isDev = process.env.NODE_ENV !== 'production';
export const store = configureStore({
  reducer: {
    inc: incReducer,
    nav: navReducer,
  },
  middleware: [...getDefaultMiddleware(), ...(isDev ? [require('redux-logger').createLogger()] : [])],
});
```

**slice 单元**

```js
const slice = createSlice({
  name: 'inc',
  initialState: {},
  reducers: {},
});

export const {} = slice.actions;
export const incReducer = slice.reducer;
```

### 持久化状态

- [rt2zz/redux-persist](https://github.com/rt2zz/redux-persist)

```jsx
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    // 这些操作不能序列化
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
```

### Five Tips for Working with Redux in Large Applications

- [Five Tips for Working with Redux in Large Applications](https://techblog.appnexus.com/89452af4fdcb)

1. 将数据进行索引，通过选择器访问

- 例如服务端返回的 `users:[{id:1}]` 存储为 `userById:{1:{id:1}}`
- 数据使用更加便捷、更好跟踪也更好更新
- 否则每次访问都是遍历选择、每次更新都得更新整个数组

2. 分离“完整状态”和视图、编辑状态

- 完整状态指和服务端交互的状态
- 便于状态重置恢复，区别于需要进行的具体操作
- 增加 reducers 比在逻辑里添加编辑、取消、提交逻辑要简单得多
- 增加额外的 reducers 也更好维护，更好复用

3. 视图之间共享状态需要谨慎

- 早期可能全局一个状态
- 随着扩展可能增加多个用户，多页页面状态
- 共享状态需要考虑的问题
  - 有多少视图和其它的 reducers 依赖该状态？
  - 每个页面都需要数据的副本么？
  - 数据变化的频度？
- 例如每个页面一个状态，但每个页面的用户状态是共享的
- 例如: usersLoading, tableLoading
- 例如: 对 reducer 加前缀 - 状态前缀、action 前缀

4. 复用常用的 reducer 逻辑

- 例如数据列表分页获取
- 通过作用域和类型前缀来实现
  - 作用域例如 `userLoading`, `projectLoading` 前面部分通过 `scope` 控制
    - 所有的 action 都添加一个额外的 scope 信息
  - 类型前缀
    - combineReducers 使用相同的名字，但构造时添加前缀 `combineReducers({paginationData: paginationReducerFor('USERS_')})`
    - action 也需要注意添加前缀
    - 在依赖的组件需要相同的状态字段时可以使用

5. React 集成

### 逻辑复用

- [Reusing Reducer Logic](https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic/)

```ts
// 直接基于 slice 复用 - 取 action 会麻烦一点
function createCounterSlice(name = 'counter') {
  return createSlice({
    name,
    initialState: {},
    reducers: {},
  });
}
```
