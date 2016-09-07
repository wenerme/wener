# Neo4j

## Tips
```bash
# 启动 Web 的控制台,用于学习和联系
neo4j console
```

## Cypher
- [Railroad diagrams](https://s3.amazonaws.com/artifacts.opencypher.org/railroad/Cypher.html)
- [EBNF](https://s3.amazonaws.com/artifacts.opencypher.org/cypher.ebnf)
- [ANTLR4 Grammar](https://s3.amazonaws.com/artifacts.opencypher.org/Cypher.g4)


```cql
# 删除所有节点
MATCH (n) DETACH DELETE n

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


```

## Reference
* [Cypher Query Language](https://neo4j.com/developer/cypher-query-language/)
* [Open Cypher Project](http://www.opencypher.org/)

csvlint.io
papaparse.com
pokemon.chrisdkemper.co.uk

https://neo4j.com/blog/official-neo4j-jdbc-driver-3-0/
https://neo4j.com/developer/guide-importing-data-and-etl/
