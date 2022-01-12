---
title: JSON
---

# JSON

- [rfc6901](https://tools.ietf.org/html/rfc6901) - JavaScript Object Notation (JSON) Pointer
- [automerge/automerge](https://github.com/automerge/automerge)
  - A JSON-like data structure that can be modified concurrently by different users, and merged again automatically.

## Schema

- [json-schema](http://json-schema.org/)
- [jsonschema2pojo](http://www.jsonschema2pojo.org/)
  - Json Schema 生成 Pojo

## Patch

- [rfc6902](https://tools.ietf.org/html/rfc6902) - JSON Patch
  - 基于操作 - op, path, value - 更适用于复杂场景
  - op = add, remove, replace, move, copy, test
  - test 用于断言，断言失败则操作失败
    - 例如 `{ "op": "test", "path": "/a/b/c", "value": "foo" }`
- [rfc7396](https://tools.ietf.org/html/rfc7396) - JSON Merge Patch
  - 基于文档合并 - `{"key":"new value"}` - 适用于简单场景
  - 设置 key 为 null 表示删除
  - 数组只能替换
  - 合并操作不会出错
- [jsonpatch](http://jsonpatch.com/)
- [flipkart-incubator/zjsonpatch](https://github.com/flipkart-incubator/zjsonpatch)

## Diff

- https://github.com/andreyvit/json-diff
- http://www.jsondiff.com/
- https://json-diff.com/
- https://github.com/benjamine/jsondiffpatch/blob/master/docs/formatters.md
- https://benjamine.github.io/jsondiffpatch
- [google/diff-match-patch](https://github.com/google/diff-match-patch)
- [Mendoza: Use stack machines to compute efficient JSON diffs](https://www.sanity.io/blog/mendoza)
  - [HN](https://news.ycombinator.com/item?id=24943775)
- https://extendsclass.com/json-diff.html

## Command line tools

- [antonmedv/fx](https://github.com/antonmedv/fx)
- [jmespath/jp](https://github.com/jmespath/jp)

## FAQ

### JSON Patch and JSON Merge Patch

- rfc6902 vs rfc7396
- 参考
  - [JSON Patch and JSON Merge Patch](https://erosb.github.io/post/json-patch-vs-merge-patch/)

### 时间格式选择

- ISO 8601
- `new Date().toJSON()`
  - 2018-04-16T05:24:53.603Z
- Java `new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.CHINA)`
- [The “right” JSON date format](https://stackoverflow.com/q/10286204/1870054)
