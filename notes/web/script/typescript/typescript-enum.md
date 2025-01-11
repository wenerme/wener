---
tags:
  - Enum
---

# enum

- const enum
  - 编译的时候会直接替换
  - 减少生成的代码
  - 外部无法引用
  - 不要 export
- enum 要求类型匹配，不只是值匹配
- https://www.typescriptlang.org/docs/handbook/enums.html#const-enums

```ts
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

// 达到类似 enum 的效果
type Direction = (typeof ODirection)[keyof typeof ODirection];

enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
// 这样可以值匹配即可
type LogLevelStrings = keyof typeof LogLevel;
```

**编译后的 ENUM**

```js
var Enum;
(function (Enum) {
  Enum[(Enum['A'] = 0)] = 'A';
})(Enum || (Enum = {}));
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```


## Practice

```ts
// 使用的时候
export enum WecomSubjectType {
  WecomRoom = 'WecomRoom',
  WecomRobot = 'WecomRobot',
  ExternalWechatUser = 'ExternalWechatUser',
  ExternalWecomUser = 'ExternalWecomUser',
}

// 返回的时候 - 确保也能直接使用 string
export type WecomSubjectTypeCode = keyof typeof WecomSubjectType;
```
