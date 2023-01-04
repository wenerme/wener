---
title: react-table
---

# react-table

- [tannerlinsley/react-table](https://github.com/tannerlinsley/react-table)
  - 基于 Hook 功能强大的 Table 组件
- v8+ 框架无关,不再使用插件模式

:::caution

- 不支持 sticky 行列
  - ~~可使用 [GuillaumeJasmin/react-table-sticky](https://github.com/GuillaumeJasmin/react-table-sticky)~~
    - react-table v7

:::

## Note

- table-core
  - 状态管理
  - 操作 reduce
  - 行列处理
  - 其他功能由插件提供
  - [createTable](https://github.com/TanStack/table/blob/main/packages/table-core/src/core/table.ts)
  - table
    - reset - 状态设置为 initialState
- react-table
  - [useReactTable](https://github.com/TanStack/table/blob/main/packages/react-table/src/index.tsx#L54-L91)
    - 主要提供状态

```ts
// 完整空状态
const InitialReactTableState = {
  columnVisibility: {},
  columnOrder: [],
  columnPinning: {
    left: [],
    right: [],
  },
  columnFilters: [],
  globalFilter: {},
  sorting: [],
  expanded: {},
  grouping: [],
  columnSizing: {},
  columnSizingInfo: {
    startOffset: null ,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null ,
    isResizingColumn: false,
    columnSizingStart: [], // [string, number][]
  },
  pagination: {
    pageIndex: 0,
    pageSize: 30,
  },
  rowSelection: {},
} as TableState;
```

- react-table 基于 table-core 提供简单的状态管理
  - 提供 flexRender, useReactTable
- useReactTable
  - 处理 - state, onStateChange
  - 核心逻辑
    - createTable, 持有 ref
      - 返回的 table 一直不会变
    - 更新 table 状态
      - useState 作为 table 的 state - 初始值为构建后的 initialState
      - onStateChange 为 setState
        - 因此每次 state 变化 useTable 也会 rerender

## useTable

- 需要 memoized 的属性
  - colums, data, getSubRows, getRowId

# 插件

```ts
export const usePagination = (hooks) => {
  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
};

// 状态处理
function reducer(state, action: { type }, previousState, instance) {
  // 初始化
  if (action.type === actions.init) {
    return {
      pageSize: 10,
      pageIndex: 0,
      ...state,
    };
  }
}

// 会在 hook 中循环调用 - 可以使用 react hook 实现插件状态
// 可添加额外方法到 instance
function useInstance(instance) {}
```

## usePagination

- 受控分页
  - 对 row 数据进行分页
  - 基于行数计算 pageCount
- 非受控分页
  - 用于服务端接口场景
  - 提供 pageCount

```ts
interface PaginationState {
  pageIndex;
  pageSize;
}

interface PaginationInstance {
  pageCount: number;
  pageOptions: number[];
  page: Row[];

  canPreviousPage: boolean;
  canNextPage: boolean;

  // 操作 - 进行 dispatch
  gotoPage(pageIndex);
  previousPage();
  nextPage();
  setPageSize(pageSize);
}
```

## useTokenPagination

- [src/utility-hooks/useTokenPagination.js](https://github.com/tannerlinsley/react-table/blob/master/src/utility-hooks/useTokenPagination.js)
  - 未包含在正常包里
  - 独立使用
- 状态
  - pageToken
  - nextPageToken
  - previousPageTokens
    - 数组 - 记录经过的 token
  - pageIndex

## useRowSelect

- 默认会在 row 上设置 isSelected

```ts
interface RowSelectOptions {
  initialState: {
    selectedRowIds: Record<string: boolean> // rowId
  }
  manualRowSelectedKey?:string // 'isSelected'
  autoResetSelectedRows?:bool // true
}


interface RowSelectInstance {
  toggleRowSelected(rowPath: string, set?: boolean): void;

  toggleAllRowsSelected(set?: boolean): void;

  toggleAllPageRowsSelected(set?: boolean): void;

  getToggleAllPageRowsSelectedProps(props): RowSelectProps;

  getToggleAllRowsSelectedProps(props): RowSelectProps;

  isAllRowsSelected: boolean;
  selectedFlatRows: Array<Row>;
}

interface RowSelectProps {
  onChange;
  style: { cursor };
  indeterminate;
  title;
}

interface RowSelectRowProps {
  isSelected: boolean;
  isSomeSelected: boolean;
  toggleRowSelected(set?: boolean);
  getToggleRowSelectedProps(props): RowSelectProps;
}
```
