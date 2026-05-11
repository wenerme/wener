---
tags:
- Style Guide
---

# Proto Style Guide

- 参考
  - https://protobuf.dev/programming-guides/style/
  - https://protobuf.dev/programming-guides/proto3/
  - https://buf.build/docs/best-practices/style-guide/
  - [Buf lint rules](https://buf.build/docs/lint/rules/)

```
.
├── buf.yaml
└── proto
    └── foo
        └── bar
            ├── bat
            │   └── v1
            │       └── bat.proto // package foo.bar.bat.v1
            └── baz
                └── v1
                    ├── baz.proto         // package foo.bar.baz.v1
                    └── baz_service.proto // package foo.bar.baz.v1
```
