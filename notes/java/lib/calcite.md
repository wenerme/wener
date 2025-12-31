---
title: Apache Calcite
---

- [apache/calcite](https://github.com/apache/calcite)
  - Apache-2.0, Java, SQL
  - A dynamic data management framework and SQL parser/optimizer.

## Tips

https://dl.acm.org/citation.cfm?id=3190662

https://arxiv.org/abs/1802.10233
https://arxiv.org/pdf/1802.10233.pdf

Orca [45] is a modular query optimizer used in data management
products such as Greenplum and HAWQ. Orca decouples
the optimizer from the query execution engine by implementing a
framework for exchanging information between the two known as
Data eXchange Language. Orca also provides tools for verifying the
correctness and performance of generated query plans. In contrast
to Orca, Calcite can be used as a standalone query execution engine
that federates multiple storage and processing backends, including
pluggable planners, and optimizers.

Spark SQL [3] extends Apache Spark to support SQL query execution
which can also execute queries over multiple data sources
as in Calcite. However, although the Catalyst optimizer in Spark
SQL also attempts to minimize query execution cost, it lacks the
dynamic programming approach used by Calcite and risks falling
into local minima.

Algebricks [6] is a query compiler architecture that provides
a data model agnostic algebraic layer and compiler framework
for big data query processing. High-level languages are compiled
to Algebricks logical algebra. Algebricks then generates an optimized
job targeting the Hyracks parallel processing backend. While
Calcite shares a modular approach with Algebricks, Calcite also
includes a support for cost-based optimizations. In the current
version of Calcite, the query optimizer architecture uses dynamic
programming-based planning based on Volcano [20] with extensions
for multi-stage optimizations as in Orca [45]. Though in principle
Algebricks could support multiple processing backends (e.g.,
Apache Tez, Spark), Calcite has provided well-tested support for
diverse backends for many years.

Garlic [7] is a heterogeneous data management system which
represents data from multiple systems under a unified object model.
However, Garlic does not support query optimization across different
systems and relies on each system to optimize its own queries.

FORWARD [17] is a federated query processor that implements
a superset of SQL called SQL++ [38]. SQL++ has a semi-structured
data model that integrate both JSON and relational data models
whereas Calcite supports semi-structured data models by representing
them in the relational data model during query planning.
FORWARD decomposes federated queries written in SQL++ into
subqueries and executes them on the underlying databases according
to the query plan. The merging of data happens inside the
FORWARD engine.

Another federated data storage and processing system is BigDAWG,
which abstracts a wide spectrum of data models including
relational, time-series and streaming. The unit of abstraction in
BigDAWG is called an island of information. Each island of information
has a query language, data model and connects to one or more
storage systems. Cross storage system querying is supported within
the boundaries of a single island of information. Calcite instead
provides a unifying relational abstraction which allows querying
across backends with different data models.

Myria is a general-purpose engine for big data analytics, with
advanced support for the Python language [21]. It produces query
plans for other backend engines such as Spark and PostgreSQL.

a query parser and validator that can
translate a SQL query to a tree of relational operators

optimized SQL

Relational algebra

Operators

DML filter, project, join, window

Traits
does not use different entities to represent logical
and physical operators.

describes the physical properties
associated with an operator using traits.

s help the optimizer
evaluate the cost of different alternative plans. Changing a
trait value does not change the logical expression being evaluated

tries to enforce certain traits on
relational expressions,

sort order of certain columns. Relational
operators can implement a converter interface that indicates
how to convert traits of an expression from one value to another

common traits that describe the physical properties
of the data produced by a relational expression, such as ordering,
grouping, and partitioning.

, one of the main features of Calcite
is the calling convention trait.

adapter is an architectural pattern that defines how Calcite
incorporates diverse data sources for general access.

Calcite uses a physical trait known
as the calling convention to identify relational operators which correspond
to a specific database backend.

adapters is a powerful abstraction that enables not
only optimization of queries for a specific backend, but also across
multiple backends. Calcite is able to answer queries involving tables
across multiple backends by pushing down all possible logic to each
backend and then performing joins and aggregations on the resulting
data

includes a set of planner rules to transform
expression trees.

Metadata providers. Metadata is an important part of Calcite’s
optimizer, and it serves two main purposes: (i) guiding the planner
towards the goal of reducing the cost of the overall query plan, and
(ii) providing information to the rules while they are being applied.

https://janino-compiler.github.io/janino/

metadata providers are pluggable, they are compiled and
instantiated at runtime using Janino

Planner engines. The main goal of a planner engine is to trigger
the rules provided to the engine until it reaches a given objective. At
the moment, Calcite provides two different engines. New engines
are pluggable in the framework.
The first one, a cost-based planner engine, triggers the input rules
with the goal of reducing the overall expression cost. The engine
uses a dynamic programming algorithm, similar to Volcano [20],
to create and track different alternative plans created by firing the

Materialized views. One of the most powerful techniques to accelerate
query processing in data warehouses is the precomputation of
relevant summaries or materialized views

The first approach is based on view substitution [10, 18]. The aim
is to substitute part of the relational algebra tree with an equivalent
expression which makes use of a materialized view, and the
algorithm proceeds as follows: (i) the scan operator over the materialized
view and the materialized view definition plan are registered
with the planner, and (ii) transformation rules that try to unify
expressions in the plan are triggered.

The second approach is based on lattices [22]. Once the data
sources are declared to form a lattice, Calcite represents each of
the materializations as a tile which in turn can be used by the optimizer
to answer incoming queries. On the one hand, the rewriting
algorithm is especially efficient in matching expressions over data
sources organized in a star schema, which are common in OLAP
applications. On the other hand, it is more restrictive than view
substitution, as it imposes restrictions on the underlying schema.

Calcite as its rule and cost-based optimizer. Instead of relying on
Calcite’s JDBC driver, SQL parser and validatorHive uses its own
implementation of these components. The query is then translated
into Calcite operators, which after optimization are translated into
Hive’s physical algebra. Hive operators can be executed by multiple
engines, the most popular being Apache Tez [43, 51] and Apache
Spark [

Apache Apex™
Enterprise-grade unified stream and batch processing engine.

Now with event-time windowing and high-level API.

https://www.cascading.org/projects/lingual/

ANSI SQL on Cascading

https://github.com/omnisci/mapd-core
