---
title: protobuf-es
---

# protobuf-es

- [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
  - Apache-2.0, TS
- protoc-gen-es
  - target - 默认为 js+dts
    - js - 生成 `_pb.js`
    - ts - 生成 `_pb.d.ts`
    - dts - 生成 `_pb.d.ts`
  - import_extension - import 的后缀
  - js_import_style
  - keep_empty_files
  - ts_nocheck
  - json_types
- field 选项
  - jstype = JS_STRING
- RPC -> [connectrpc/connect-es](https://github.com/connectrpc/connect-es)
  - 支持 [Connect](../grpc/connect.md), gRPC, gRPC-Web


```bash
# by pnpm/npm
pnpm add -D @bufbuild/protoc-gen-es
PATH=$(pnpm bin):$PATH protoc --es_out=. file.proto

# from source
go install github.com/bufbuild/protobuf-es/cmd/protoc-gen-es@latest
```


```ts
import { UserSchema } from "./gen/user_pb.js";
import { create, toBinary, toJson } from "@bufbuild/protobuf";

let user = create(UserSchema, {
  firstName: "Homer",
  lastName: "Simpson",
  active: true,
  locations: ["Springfield"],
  projects: { SPP: "Springfield Power Plant" },
  manager: {
    firstName: "Montgomery",
    lastName: "Burns",
  },
});

const bytes = toBinary(UserSchema, user);
const json = toJson(UserSchema, user);
```
