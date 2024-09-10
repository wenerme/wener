---
title: protobuf-web
---

# protobuf-web

- [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
  - Apache-2.0, TS
  - 与 protobuf-ts 相同作者
  - @bufbuild/protoc-gen-es
  - used by [connectrpc/connect-es](https://github.com/connectrpc/connect-es)
- [timostamm/protobuf-ts](https://github.com/timostamm/protobuf-ts)
- [protobufjs/protobuf.js](https://github.com/protobufjs/protobuf.js)
  - .proto, JSON descriptors, reflectiom, custom class
  - https://protobufjs.github.io/protobuf.js/
- [protocolbuffers/protobuf-javascript](https://github.com/protocolbuffers/protobuf-javascript)
  - BSD-2, Apache-2.0, JS
  - 目前维护不足
- [stephenh/ts-proto](https://github.com/stephenh/ts-proto)
  - 不生成 index.ts [#212](https://github.com/stephenh/ts-proto/issues/212)

## ts-proto

- nice-grpc 使用
- 生成单独文件

| opt                     | default | notes                                            |
| ----------------------- | ------- | ------------------------------------------------ |
| context                 | false   |
| forceLong               | number  | long,string                                      |
| esModuleInterop         | false   |
| env                     | both    | node,browser                                     |
| useOptionals            | none    | message,all                                      |
| exportCommonSymbols     | true    |
| oneof                   | unions  |
| unrecognizedEnum        | false   | 是否包含 UNRECOGNIZED=-1                         |
| lowerCaseServiceMethods | true    |
| snakeToCamel            | true    |
| outputEncodeMethods     | true    | encode,decode                                    |
| outputJsonMethods       | true    | fromJSON,toJSON                                  |
| stringEnums             | false   | 要求 `outputEncodeMethods=false`                 |
| outputClientImpl        |         | grpc-web                                         |
| returnObservable        | false   | `Observable<T>`                                  |
| addGrpcMetadata         |         | 要求 `nestJs=true`                               |
| addNestjsRestParameter  |         | 要求 `nestJs=true`                               |
| nestJs                  | false   |
| useDate                 | true    | google.protobuf.Timestamp                        |
| useObjectId             | false   | mongodb.ObjectId                                 |
| outputSchema            | false   |
| outputTypeRegistry      | false   | `$type`                                          |
| outputServices          |         | grpc-js,nice-grpc,generic-definitions,none,false |
| metadataType            |         | `Foo@./some-file`                                |
| useAsyncIterable        |
| emitImportedFiles       |
| fileSuffix              |
| importSuffix            |
| enumsAsLiterals         |         | `as const`                                       |
| useExactTypes           | true    | fromPartial                                      |
| unknownFields           | false   |
| onlyTypes               | false   | 只生成类型                                       |
| usePrototypeForDefaults |         | Object.create                                    |
| useJsonWireFormat       | false   |
| useNumericEnumForJson   | false   |

- useOptionals - `field: Message | undefined`, `field?: Message`
- exportCommonSymbols - export DeepPartial
- fromJSON - 会设置默认值
- toJSON - 不会忽略默认值 - 未来可能会
- outputClientImpl - grpc-web, twirp, grpc-js, nextjs
- useContext - 添加一个额外的 context 参数

```
outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false,esModuleInterop=true,forceLong=long,outputTypeRegistry=true
```

```ts
// Basic gRPC
interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
```


## protobufjs

- 开发不活跃

:::caution

- 不支持 ESM [#1230](https://github.com/protobufjs/protobuf.js/issues/1230)
- protobufjs 生成的 JSON 缺少信息
  - 无 comment
  - option 只能记录 1 个
    - 无法记录 repeated option
  - 无法记录嵌套 option
- option 为对象会失败 [#1788](https://github.com/protobufjs/protobuf.js/issues/1788)

:::

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
