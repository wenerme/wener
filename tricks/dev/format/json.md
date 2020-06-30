# JSON

## Tips
* [rfc6901](https://tools.ietf.org/html/rfc6901) - JavaScript Object Notation (JSON) Pointer
* [automerge/automerge](https://github.com/automerge/automerge)
  * A JSON-like data structure that can be modified concurrently by different users, and merged again automatically.

## Schema
* [json-schema](http://json-schema.org/)
* [jsonschema2pojo](http://www.jsonschema2pojo.org/)
  * Json Schema 生成 Pojo

## Patch
* [rfc6902](https://tools.ietf.org/html/rfc6902) - JavaScript Object Notation (JSON) Patch
* [rfc7396](https://tools.ietf.org/html/rfc7396) - JSON Merge Patch
* [jsonpatch](http://jsonpatch.com/)
* [flipkart-incubator/zjsonpatch](https://github.com/flipkart-incubator/zjsonpatch)

## Diff
https://github.com/andreyvit/json-diff
http://www.jsondiff.com/

https://json-diff.com/
https://github.com/benjamine/jsondiffpatch/blob/master/docs/formatters.md
https://benjamine.github.io/jsondiffpatch

## FAQ
### 时间格式选择

* [The “right” JSON date format](https://stackoverflow.com/q/10286204/1870054)
* ISO 8601
* `new Date().toJSON()`
* 2018-04-16T05:24:53.603Z
* Java `new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.CHINA)`
