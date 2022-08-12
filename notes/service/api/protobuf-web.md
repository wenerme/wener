---
title: protobuf-web
---

# protobuf-web

- [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
  - 与 protobuf-ts 相同作者
- [timostamm/protobuf-ts](https://github.com/timostamm/protobuf-ts)
- [protobufjs/protobuf.js](https://github.com/protobufjs/protobuf.js)
  - .proto, JSON descriptors, reflectiom, custom class
  - https://protobufjs.github.io/protobuf.js/

:::caution

- protobufjs 生成的 JSON 缺少信息
  - 无 comment
  - option 只能记录 1 个
    - 无法记录 repeated option
  - 无法记录嵌套 option

:::

## protobuf-es

```bash
go install github.com/bufbuild/protobuf-es/cmd/protoc-gen-es@latest
```

## protobufjs

```bash
npm add -D protobufjs-cli

# -t,--target - json, json-module, proto2, proto3, static, static-module
pbjs -t json file1.proto file2.proto > bundle.json
pbjs -t json-module -w commonjs -o bundle.js file1.proto file2.proto

pbjs -t static-module -w commonjs -o compiled.js file1.proto file2.proto

pbts -o compiled.d.ts compiled.js
pbjs -t static-module file1.proto file2.proto | pbts -o bundle.d.ts -

#
pbjs -t json -p ./protos/bundles/ ./protos/core/**/*.proto -o src/protos/pb.json
pbjs -t static-module -p ./protos/bundles/ ./protos/core/**/*.proto -w es6 -o src/protos/pb.js
pbts -o src/protos/pb.d.ts src/protos/pb.js
```

| source | lib     | pros                    | cons       |
| ------ | ------- | ----------------------- | ---------- |
| .proto | full    | 简单，不需要编译        |
| json   | light   | 单 bundle，不需要 parse |
| static | minimal | 不需要 eval, 有 comment | 代码非常长 |

- 默认 root 为 default
- static 代码很长 - 1000 loc json -> 10,000 loc js
  - 很多空行和注释
- https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md

| pbjs          |
| ------------- | ------------------ |
| --alt-comment | 解析出更多 comment |
| -w            | es6                |

```js
import * as $protobuf from 'protobufjs/light';

// 可以有多个 ROOT
$protobuf.roots['default'] = new $protobuf.Root();
```
