---
title: JSON
---

# JSON

- [rfc6901](https://tools.ietf.org/html/rfc6901) - JavaScript Object Notation (JSON) Pointer
- [automerge/automerge](https://github.com/automerge/automerge)
  - A JSON-like data structure that can be modified concurrently by different users, and merged again automatically.
- Extension
  - geojson
  - hljson
  - json5
- Variants
  - yaml
  - toml
- [jsonata-js/jsonata](https://github.com/jsonata-js/jsonata)
  - JSON query and transformation language
  - https://jsonata.org/

## Schema

- [json-schema](http://json-schema.org/)
- [jsonschema2pojo](http://www.jsonschema2pojo.org/)
  - Json Schema 生成 Pojo
- [app.quicktype.io](https://app.quicktype.io)

## Patch

- [rfc6902](https://tools.ietf.org/html/rfc6902) - JSON Patch
  - `application/json-patch+json`
  - 基于操作 - op, path, value - 更适用于复杂场景
  - op = add, remove, replace, move, copy, test
  - test 用于断言，断言失败则操作失败
    - 例如 `{ "op": "test", "path": "/a/b/c", "value": "foo" }`
- [rfc7396](https://tools.ietf.org/html/rfc7396) - JSON Merge Patch
  - `application/merge-patch+json`
  - 基于文档合并 - `{"key":"new value"}` - 适用于简单场景
  - 设置 key 为 null 表示删除
  - 数组只能替换
  - 合并操作不会出错
  - ~~rfc7386~~
- [jsonpatch](http://jsonpatch.com/)
  - [HN](https://news.ycombinator.com/item?id=31301627)
- [flipkart-incubator/zjsonpatch](https://github.com/flipkart-incubator/zjsonpatch)
- https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#patch-operations
  - `application/strategic-merge-patch+json`
    - 基于 Merge Patch
    - list 合并基于 name 去重合并，而不是直接替换
      - patchStrategy
    - `$patch`
      - replace, delete
    - [Strategic Merge Patch](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md)

## Diff

- [DoneDeal0/superdiff](https://github.com/DoneDeal0/superdiff)
- [benjamine/jsondiffpatch](- https://github.com/benjamine/jsondiffpatch)
  - npm:jsondiffpatch
  - https://github.com/benjamine/jsondiffpatch/blob/master/docs/formatters.md
  - https://benjamine.github.io/jsondiffpatch
- [andreyvit/json-diff](https://github.com/andreyvit/json-diff)
  - MIT, CoffeeScript
  - npm:json-diff
- [google/diff-match-patch](https://github.com/google/diff-match-patch)
  - plain text
- [trailofbits/graphtage](https://github.com/trailofbits/graphtage)
  - LGPLv3, Python
  - JSON, JSON5, XML, HTML, YAML, CSV
- [sanity-io/mendoza](https://github.com/sanity-io/mendoza)
  - MIT, Go
  - [Mendoza: Use stack machines to compute efficient JSON diffs](https://www.sanity.io/blog/mendoza)
    - [HN](https://news.ycombinator.com/item?id=24943775)
- https://extendsclass.com/json-diff.html
- [zgrossbart/jdd](https://github.com/zgrossbart/jdd)
  - http://www.jsondiff.com/
- https://json-diff.com/
- [mattphillips/deep-object-diff](https://github.com/mattphillips/deep-object-diff)
- [flitbit/diff](https://github.com/flitbit/diff)
- [Starcounter-Jack/JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch)
- [kpdecker/jsdiff](https://github.com/kpdecker/jsdiff)
  - Text  Diff
## Command line tools

- [antonmedv/fx](https://github.com/antonmedv/fx)
- [jmespath/jp](https://github.com/jmespath/jp)

## ETL

- [jsonata-js/jsonata](https://github.com/jsonata-js/jsonata)
  - JSONata query and transformation language
- [bazaarvoice/jolt](https://github.com/bazaarvoice/jolt)
  - Apache-2.0, Java
  - JOLT - JsOn Language for Transform
- [jmespath](https://jmespath.org/)
  - [jmespath/go-jmespath](https://github.com/jmespath/go-jmespath)

## Misc

- [WebReflection/JSONH](https://github.com/WebReflection/JSONH)
  - Reducce JSON Size
  - hpack

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

```js
new Date().toJSON() === new Date().toISOString();
```
