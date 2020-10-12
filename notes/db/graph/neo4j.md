# Neo4j

* [Neo4j 开发者手册](http://neo4j.com/docs/developer-manual/3.0/)

## Tips

* bolt 地址 `localhost:7687`

```bash
# 启动 Web 的控制台,用于学习和练习
neo4j console
```



## Cypher
- [Railroad diagrams](https://s3.amazonaws.com/artifacts.opencypher.org/railroad/Cypher.html)
- [EBNF](https://s3.amazonaws.com/artifacts.opencypher.org/cypher.ebnf)
- [ANTLR4 Grammar](https://s3.amazonaws.com/artifacts.opencypher.org/Cypher.g4)
- [Cypher 语法](http://neo4j.com/docs/cypher-refcard/3.0/)

```cql
CREATE (ee:Person { name: "Emil", from: "Sweden", klout: 99 })
# CREATE 创建数据
# () 表示一个节点
# ee:Person 表示变量 'ee' 和标签 'Person'
# {} 添加属性

# 分析执行的语句
PROFILE MATCH (js:Person)-[:KNOWS]-()-[:KNOWS]-(surfer)
WHERE js.name = "Johan" AND surfer.hobby = "surfing"
RETURN DISTINCT surfer

# 删除所有节点
MATCH (n) DETACH DELETE n



# 增大批量提交的数量以增加速度
USING PERIODIC COMMIT 500

# 导入 CSV
LOAD CSV WITH HEADERS FROM ‘http://localhost/people.csv’ AS row
CREATE (:Person {
  id: row.id,
  first_name: row.`First Name`,
  middle_name: row.`Middle name(s)`,
  surname: row.`Surname`,
  dob: row.`D.O.B`,
  favourite_animal: row.`Favourite Animal`,
  favourite_colour: row.`Favourite Colour`
})

# 导入并创建关系
LOAD CSV WITH HEADERS FROM ‘http://localhost/people.csv’ AS row
MATCH (p:Person {id: row.id})
MATCH (friend:Person {id: row.friend_id})
MERGE (p)-[f:FRIENDS_WITH]->(friend)
WHERE row.friend_id IS NOT NULL;

# 查看所有存储过程
CALL dbms.procedures()
```

```bash
# 使用容器运行
docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j
# 挂载插件和数据
# 可挂载的目录包括 data,logs,plugins,conf
docker run -it --rm \
    --publish=7474:7474 --publish=7687:7687 \
    -v $PWD/data:/data -v $PWD/logs:/logs -v $PWD/plugins:/plugins \
    neo4j
```

### APOC
```
CALL apoc.load.driver("com.mysql.jdbc.Driver");

WITH "jdbc:mysql://localhost:3306/northwind?user=root" as url
CALL apoc.load.jdbc(url,"products") YIELD row
RETURN count(*);
```

## Reference
* [Cypher Query Language](https://neo4j.com/developer/cypher-query-language/)
* [Open Cypher Project](http://www.opencypher.org/)

csvlint.io
papaparse.com
pokemon.chrisdkemper.co.uk

https://neo4j.com/blog/official-neo4j-jdbc-driver-3-0/
https://neo4j.com/developer/guide-importing-data-and-etl/
