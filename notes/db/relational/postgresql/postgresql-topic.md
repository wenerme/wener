---
title: PostgreSQL Topics
---

# PostgreSQL Topics

## Full Text Search

- [Official Documentation](https://www.postgresql.org/docs/current/static/textsearch.html)
- [pg_trgm](https://www.postgresql.org/docs/current/static/pgtrgm.html) - Trigram matching
- [PGroonga](https://pgroonga.github.io/) - Multilingual Full Text Search
- [Speeding up LIKE '%text%' queries](http://0x80.pl/articles/sql-ngram-index.html)

**Limitations:**

- Lexeme length < 2KB
- `tsvector` length < 1MB
- Nodes in `tsquery` < 32,768

## GIN Index

- [Documentation](https://www.postgresql.org/docs/current/static/gin.html)
- [Built-in Opclasses](https://www.postgresql.org/docs/current/static/gin-builtin-opclasses.html)

| Name             | Indexed Data Type | Operators              |
| :--------------- | :---------------- | :--------------------- |
| `array_ops`      | `anyarray`        | `&&`, `<@`, `=`, `@>`  |
| `jsonb_ops`      | `jsonb`           | `?`, `?&`, `?\|`, `@>` |
| `jsonb_path_ops` | `jsonb`           | `@>`                   |
| `tsvector_ops`   | `tsvector`        | `@@`, `@@@`            |

## Analytics

- [10 Reasons to Start Your Analytics Project with PostgreSQL](https://www.slideshare.net/snaga/10-reasons-to-start-your-analytics-project-with-postgresql)
- [Real-Time Analytics with Citus](https://dzone.com/articles/building-real-time-analytics-dashboards-with-postg)
- [2UDA](https://www.2ndquadrant.com/en/resources/2uda/) - Unified Data Analytics

## Parallel Query

- [Parallel Query Docs](https://www.postgresql.org/docs/current/static/parallel-query.html)
  - Scans, Joins, Aggregation
