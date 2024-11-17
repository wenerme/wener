---
tags:
  - Model
---

# Modeling

| name             | for                          |
| ---------------- | ---------------------------- |
| cube             | table                        |
| view             | query                        |
| measure          | aggregation over column      |
| dimension        | attribute of measure, column |
| join             |
| segment          | filter                       |
| pre-aggregations |

- https://cube.dev/docs/reference/data-model/cube
- https://cube.dev/docs/product/apis-integrations/rest-api/query-format

```ts
interface Query {
  measures: (Member | MemberExpression | ParsedMemberExpression)[];
  dimensions?: (Member | TimeMember | MemberExpression | ParsedMemberExpression)[];
  filters?: (QueryFilter | LogicalAndFilter | LogicalOrFilter)[];
  timeDimensions?: QueryTimeDimension[];
  segments?: (Member | MemberExpression | ParsedMemberExpression)[];
  limit?: null | number;
  offset?: number;
  total?: boolean;
  totalQuery?: boolean;
  order?: any;
  timezone?: string;
  renewQuery?: boolean;
  ungrouped?: boolean;
  responseFormat?: ResultType;
}

/**
 * Normalized filter interface.
 */
interface NormalizedQueryFilter extends QueryFilter {
  dimension?: Member;
}

/**
 * Normalized query interface.
 */
interface NormalizedQuery extends Query {
  filters?: NormalizedQueryFilter[];
  rowLimit?: null | number;
  order?: { id: string; desc: boolean }[];
}
```
