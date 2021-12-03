---
title: RDF
---

# RDF

- RDF Store / Triplestore
  - 使用 Semantic query 查询 Triple
  - wikipedia [Triplestore](https://en.wikipedia.org/wiki/Triplestore)
  - W3C [标准](https://www.w3.org/RDF/)
  - RDF = Resource Description Framework
    - a model for data publishing and interchange on the Web
- LOD - Linked Open Data
- Semantic triple
  - subject-predicate-object
- N-Quads - Named Graphs in N-Triples
- SPARQL
  - Semantic query
- 参考
  - [Comparison of triplestores](https://en.wikipedia.org/wiki/Comparison_of_triplestores)
  - https://www.ontotext.com/knowledgehub/fundamentals/what-is-rdf-triplestore/
  - [Indexing and Query Processing in RDF Quad-Stores](https://repository.iiitd.edu.in/xmlui/bitstream/handle/123456789/703/Jyoti_PhD1103.pdf)

## triplestore vs graph

```
<http://example.org/person/1> :hasName "Bob".
<http://example.org/person/1> foaf:knows <http://example.org/person/2>.
<http://example.org/person/2> :hasName "Susan".
```

```
(a:Person {name: "Bob"})-[:KNOWS]->(b:Person {name: "Susan"})
```

- triplestore
  - 更加原子
  - 关系 link-data - link 为主
- graph
  - 表示节点关系
  - 关系存储结构
- https://stackoverflow.com/a/30167732/1870054

## Notes

- rdf 是图数据模型
  - 规范化的描述信息的语义和含义
  - 表示元数据
- rdf 模型 组成
  - eva 模型
  - triple 三元素
    - subject - entity - 实体
    - predicate - attribute - 属性
    - object - value - 值
  - 每个 triple 都有一个唯一标示符 - uri
  - 表述图中的链接
- rdfs - rdf schema
  - adds
    - 资源、literal、class、datatype 概念
    - 关系 - subClassOf、subPropertyOf、domain、range
  - 提供定义
    - classes 、 properties
    - hierachies of classes and properties
  - 包含 entailment rules - 基于现有信息推算
