---
title: TypeScript 类型定义
---

# TypeScript 类型定义

- [sindresorhus/type-fest](https://github.com/sindresorhus/type-fest)

```json title="覆盖 lib"
{
 "dependencies": {
    "@typescript/lib-dom": "npm:@types/web"
  }
}
```

## 内置

- 4.5 Awaited

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R
  ? R
  : any;

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}

interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
```

## Optional

```ts
// 部分字段 Partial
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
```

## maybeFunction

T 需要检测是否为函数，否则直接 typeof 无法区分

```ts
// eslint-disable-next-line @typescript-eslint/ban-types
export type MaybeFunction<T, A extends any[]> = T extends Function ? (...args: A) => T : T;

export function maybeFunction<T, A extends any[]>(v: MaybeFunction<T, A>, ...args: A): T {
  return typeof v === 'function' ? v(...args) : v;
}
```

## keyof 强制为 string 类型

默认 keyof 会返回 `string|number|symbol` 类型

```ts
// 取 string
type StringKeys = Extract<keyof AbstractModel, string>;
// 强制 string
type Keys = keyof AbstractModel & string;
// 定义工具类型
type KeyOf<T extends object> = Extract<keyof T, string>;
```

## Example

```ts
/// 1
const values = ['A', 'B'] as const;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

type Foo = ElementType<typeof values>; // this is correctly inferred as literal "A" | "B"

/// 2

export const type = <const>['room', 'room_with_gifter', 'user_send'];

export interface Activity {
  id?: string;
  type: typeof type[number];
}

/// 3
const pages = <const>[
  {
    label: 'homepage',
    url: '',
  },
  {
    label: 'team',
    url: '',
  },
];

// resulting signature = function getUrl(label: "homepage" | "team"): void
function getUrl(label: typeof pages[number]['label']) {}

getUrl('homepage'); // ok
getUrl('team'); // ok
getUrl('bad'); // wrong

// stub 类型

interface ExampleType {
  [key: string]: string | (() => string);
}

const specific =
  <T>() =>
  <U extends T>(argument: U) =>
    argument;
const testObj = specific<ExampleType>()({
  firstName: 'Peter',
  lastName: 'Parker',
  gender: 'male',
  getFullName: () => 'I am Peter Parker',
});
console.log(testObj.getFullName()); // this works
```

## 允许导入其他文件

```ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
}
```
