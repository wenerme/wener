---
title: multiformats
tags:
  - Codec
---

# multiformats

- [multiformats/unsigned-varint](https://github.com/multiformats/unsigned-varint)
  - 基于 Go varint, 基于 PB int
- [table.csv](https://github.com/multiformats/multicodec/blob/master/table.csv)
  - 编码列表

## multihash

- [multiformats/multihash](https://github.com/multiformats/multihash)
  - hash 结果包含使用的 hash 算法

```
<hash-func-type><digest-length><digest-value>
```

- hash-func-type - uvarint
- digest-length - uvarint
