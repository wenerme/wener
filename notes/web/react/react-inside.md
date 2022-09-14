---
title: Inside
---

# React Inside

- React
  - 定义各种元素类型
  - 定义上下文、状态规则
- ReactDOM
  - 按约定渲染各种元素类型
  - 事件 - 状态
- jsx - ReactElement
  - Fragment
  - jsx - jsxWithValidationDynamic
    - 校验 type
    - 校验 children
    - 校验 children key
    - 校验属性
      - Fragment 只允许 children 和 key, 不允许存在 ref
      - propTypes 校验
  - jsxs - jsxWithValidationStatic
    - children 为数组
  - Prod 环境 jsx=jsxs，且没有校验
  - 保留属性
    - ref
    - key - 会转为 string
    - `__self` - 辅助判断 this != owner
    - `__source` - 转译时添加的辅助信息
- 新的 jsx 避免 spread key
- feature
  - ScopeAPI
  - DebugTracing
  - TransitionTracing
  - SymbolFallbackForWWW
  - LazyContextPropagation
  - SuspenseAvoidThisFallback
  - SuspenseAvoidThisFallbackFizz
  - LegacyHidden
  - UseRefAccessWarning
  - StrictMode
    - createRootStrictEffectsByDefault
  - 实验
    - Cache
    - CacheElement
    - CPUSuspense
- API - React.
  - Component
  - PureComponent - 没有 setState 和 forceUpdate 方法
  - memo
  - 创建
    - createElement(type,props,children)
    - createFactory(type)
  - 转换
    - cloneElement(element, config, children)
      - 会应用 defaultProps 到 props
      - 会复制 children
    - isValidElement()
      - $$typeof === REACT_ELEMENT_TYPE
    - Children
  - Fragment
  - createRef
  - forwardRef
  - lazy, Suspense
  - startTransition, useTransition
  - hooks - 由 ReactCurrentDispatcher.current Dispatcher 处理 - 在 FC 渲染时设置
    - Basic - useState,useEffect,useContext
    - Additional - useReducer, useCallback,useMemo,useRef,useImperativeHandle,useDebugValue
      - useLayoutEffect = useEffect
        - DOM 操作后执行 - componentDidMount,componentDidUpdate
      - useDeferredValue - 低优先级
      - useTransition - urgent updates, 批量更新
      - useId - 生成唯一 ID
    - Library
      - useSyncExternalStore
        - 同步外部存储 - 例如 zustand
      - useInsertionEffect = useEffect
        - DOM 操作之前执行 - 用于 css-in-js 库
- 模块
  - react-is - 类型判断
  - react-reconciler - 用于实现自定义渲染
    - react-native-renderer
    - react-dom
    - react-art
    - react-noop-renderer - used for debug fiber
    - Fiber - 之前为 同步 Stack Reconciler
    - [Building a simple custom renderer to DOM](https://medium.com/@agent_hunt/hello-world-custom-react-renderer-9a95b7cd04bc)
    - [Building a simple custom renderer to native](https://medium.com/@agent_hunt/introduction-to-react-native-renderers-aka-react-native-is-the-java-and-react-native-renderers-are-828a0022f433)
  - react-refresh - bundlers 集成 fast refresh
  - scheduler - 堆、优先级队列
  - shared
  - use-subscription
  - use-sync-external-store
  - experimental
    - react-server - react-server-{dom-relay,dom-webpack,native-relay}
    - react-pg
    - react-cache
    - react-client - consuming React streaming models
    - react-fetch
    - react-fs - for react-server - experimental - bindings for the filesystem

```ts
// React 相关 Symbol - react.<nname>
// portal,fragment,provider,context,forward_ref,suspense,suspense_list
// memo,lazy,scope
// offscreen
// legacy_hidden
// cache
// tracing_marker
// default_value
// strick_mode,profiler,debug_trace_mode
// server_context
const REACT_ELEMENT_TYPE = Symbol.for('react.element');

const ReactElement = (type, key, ref, self, source, owner, props) => {
  return {
    // 类型识别
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props, // dev 时 Object.freeze

    // 创建该元素的组件
    _owner: owner,

    // dev 相关属性
    _store: {validated: false},
    _self: self,
    _source: source,
  };
};

function jsx(type, config, maybeKey, source, self) {
  const {key, ref, __self, __source, ...props} = config;
  return ReactElement(
    type,
    maybeKey || key || undefined,
    ref,
    // dev only
    source,
    self,
    //
    ReactCurrentOwner.current,
    props,
  );
}

const lazy = (ctor) => {
  return {
    $$typeof: REACT_LAZY_TYPE,
    // Uninitialized -> Pending -> Resolved, Rejected
    _payload: {_status: Uninitialized, _result: ctor},
    // 会维护 _payload
    // 非 Resolved 会 throw payload._result
    _init: lazyInitializer,
  };
};

const forwardRef = (render) => {
  return {$$typeof: REACT_FORWARD_REF_TYPE, render};
};

const memo = (type: React$ElementType, compare?) => {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };
};

const createContext = (defaultValue) => {
  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null,

    // Add these to use same hidden class in VM as ServerContext
    _defaultValue: null,
    _globalName: null,
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };
  context.Consumer = context;
  return context;
};

class Component {
  refs = {};
  constructor(props, context, updater);

  isReactComponent = {};
  setState(partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  }
  forceUpdate(callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  }
}
```

## Fiber

- 工作单位
- 两个阶段
  - render - 异步、优先级、可中断、beginWork
  - commit - 同步、commitWork
    - WIP tree -> current tree
- 支持 HMR 能力 - Function,Class,ForwardRef
- 复用 ReactElement 的 type 和 key
- createFiberFromXyz
- createFiberFromTypeAndProps
  - Fragment,Profiler,Suspense,SuspenseList,Offscreen,LegacyHidden
  - Scope,Cache
  - TracingMarker
  - MemoComponent,LazyComponent
  - ContextProvider,ContextConsumer
  - HostComponent
  - ClassComponent
- beginWork
- HooksDispatcherOnMount - 第一次 无状态时
- HooksDispatcherOnUpdate - 存在之前状态时
- Lanes - 不同优先级队列
  - SyncLane
  - InputContinuousHydrationLane
  - InputContinuousLane
  - DefaultHydrationLane
  - DefaultLane
  - TransitionHydrationLane
  - TransitionLanes
  - RetryLanes
  - SelectiveHydrationLane
  - IdleHydrationLane
  - IdleLane
  - OffscreenLane
- Dispatcher - memoizedState
  - useCallback - [callback, deps]
  - useDeferredValue - OnlyNonUrgentLanes
  - useContext

```ts
interface Fiber {
  tag: WorkTag; //  工作类型
  key;
  type;
  ref;
  elementType; //  element.type
  stateNode;
  pendingProps; // new,unresolved
  memoizedProps; // old
  updateQueue;
  memoizedState; // hook
  dependencies; // contexts, events
  mode: TypeOfMode; // 运行类型
  // Effect
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Array<Fiber> | null;

  nextEffect: Fiber | null;
  firstEffect: Fiber | null;
  lastEffect: Fiber | null;

  lanes: Lanes;
  childLanes: Lanes;
  // fiber 成对出现，这是另外一个 - 两个 tree 的 fiber
  alternate: Fiber | null;

  // 树 - 链表
  return?: Fiber; // 上级节点
  child?: Fiber; //  第一个子节点 - 多个子节点表现为 第一个的相邻节点
  sibling?: Fiber; // 相邻节点
  index: number;

  // enableProfilerTimer
  actualDuration?: number;
  actualStartTime?: number;
  selfBaseDuration?: number;
  treeBaseDuration?: number;
}

interface Hook {
  memoizedState: any;
  baseState: any;
  baseQueue: Update<any, any> | null;
  queue: any;
  // 更新时的 新的 Hook
  next: Hook | null;
}

interface Effect {
  // HasEffect,Insertion,Layout,Passive
  tag: HookFlags;
  create: () => (() => void) | void;
  destroy: (() => void) | void;
  deps: Array<mixed> | null;
  next: Effect;
}

const createFiber = (tag: WorkTag, pendingProps: mixed, key: null | string, mode: TypeOfMode): Fiber => {
  return new FiberNode(tag, pendingProps, key, mode);
};
const createWorkInProgress = (current: Fiber, pendingProps: any): Fiber => {
  const wip = current.alternate ?? createFiber(current.tag, pendingProps, current.key, current.mode);
  if (!current.alternate) {
    wip.elementType = current.elementType;
    wip.type = current.type;
    wip.stateNode = current.stateNode;

    wip.alternate = current;
    current.alternate = wip;
  }
  // copy props from current to wip
  return wip;
};
```

```ts title="WorkTag"
export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;
```

```ts title="TypeOfMode"
export const NoMode = /*                         */ 0b000000;
// TODO: Remove ConcurrentMode by reading from the root tag instead
export const ConcurrentMode = /*                 */ 0b000001;
export const ProfileMode = /*                    */ 0b000010;
export const DebugTracingMode = /*               */ 0b000100;
export const StrictLegacyMode = /*               */ 0b001000;
export const StrictEffectsMode = /*              */ 0b010000;
export const ConcurrentUpdatesByDefaultMode = /* */ 0b100000;
```

## fast refresh

```js
/* @refresh reset */
```

- 重置 state
- https://nextjs.org/docs/basic-features/fast-refresh
- https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md

## mhr

```js
// vite
// deps, cb
import.meta.hot.accept((newModule) => {
  if (newModule) {
    // newModule is undefined when SyntaxError happened
    console.log('updated: count is now ', newModule.count);
  }
});

// webpack
import.meta.webpackHot.accept(
  dependencies, // Either a string or an array of strings
  callback, // Function to fire when the dependencies are updated
  errorHandler, // (err, {moduleId, dependencyId}) => {}
);
```

- https://vitejs.dev/guide/api-hmr.html
  - import.meta.hot
    - accept
    - dispose
    - data
    - decline
    - invalidate
    - on
    - send
- https://webpack.js.org/api/hot-module-replacement/
  - cjs module.hot
  - esm import.meta.webpackHot

## react-is
- 通过构造的 $$typeof 来判断是否为内部对象类型
- `.$$typeof`
  - ELEMENT
    - `.type`
      - FRAGMENT
      - PROFILER
      - STRICT_MODE
      - SUSPENSE
      - SUSPENSE_LIST
  - PORTAL
  - SERVER_CONTEXT
  - CONTEXT
  - FORWARD_REF
  - LAZY
  - MEMO
  - PROVIDER
- isAsyncMode
- ReactIS
  - https://github.com/facebook/react/blob/main/packages/react-is/src/ReactIs.js
- ReactSymbols
  - https://github.com/facebook/react/blob/main/packages/shared/ReactSymbols.js
