# Cayley

## Tips
* https://github.com/cayleygraph/cayley
  * https://cayley.io/
  * https://cayley.gitbook.io/cayley/
* 支持的存储
   - KVs: Bolt, LevelDB
   - NoSQL: MongoDB
   - SQL: PostgreSQL, CockroachDB, MySQL
   - In-memory, ephemeral


```bash
brew add cayley

# 启动服务
# http://127.0.0.1:64210
cayley http

# Docker 启动
docker run --rm -it -v $PWD:/data -p 64210:64210 cayleygraph/cayley

# 样本数据
curl -OL https://github.com/cayleygraph/cayley/raw/master/data/30kmoviedata.nq.gz
cayley http --load 30kmoviedata.nq.gz


cayley repl
```

## gizmo
* https://cayley.gitbook.io/cayley/gizmoapi

```js
// 基本查询
g.V().getLimit(5);

// 属性查询
g.V()
  .has("<name>", "Humphrey Bogart")
  .all();

// 复杂路径 - 可以预定义路径
var filmToActor = g
  .Morphism()
  .out("</film/film/starring>")
  .out("</film/performance/actor>");

g.V()
  .has("<name>", "Casablanca")
  .follow(filmToActor)
  .out("<name>")
  .all();
```

https://www.cs.bham.ac.uk/~petitcz/files/Cayley.pdf

返回所有属性
https://discourse.cayley.io/t/get-vertex-with-all-predicates/1416/2


```bash
var result = {};
var person = g.V("wener");
result['id'] = 'wener'
person.outPredicates().forEach(function(d) {
  result[d.id] = person.out(d.id).toValue();
});

g.emit(result);
```
