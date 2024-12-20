---
title: DivisionCode
---

# 行政区划

- division code / administrative division code
  - 行政区划代码
  - 与 省市区 关联
- region code
  - 区域代码
  - 更加广泛的概念

```ts
/**
 * 行政区划元数据
 */
interface DivisonCodeMetadata {
  divisionCode: string;
  province: string;
  city: string;
  county: string;
  village: string;
  level: number;

  codes: string[];
  labels: string[];

  latitude: number;
  longitude: number;

  /**
   * 已经废弃的区划代码
   */
  deprecated?: boolean;
}
```

- https://www.ibm.com/support/pages/country-or-region-codes-0
