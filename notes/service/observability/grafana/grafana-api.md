---
title: Grafana API
---

# API

- /api/ds/query
- [Grafana Data Source API](https://grafana.com/docs/grafana/latest/developers/http_api/data_source/)
  - 不会分页，最多 5000
- https://play.grafana.org/swagger

```json
{
  "debug": true,
  "queries": [
    {
      "refId": "A",
      "datasource": {
        "uid": "PD8C576611E62080A"
      },
      // time_series, table
      "format": "table",
      // 默认 100
      "maxDataPoints": 1848,
      // 默认 1000
      "intervalMs": 200,
      "stringInput": "1,20,90,30,5,0",
      "rawSql": "SELECT 1 as valueOne, 2 as valueTwo"
    }
  ],
  "from": "now-5m",
  "to": "now"
}
```

```json
{
  "results": {
    "A": {
      "status": 200,
      "frames": [
        {
          "schema": {
            "refId": "A",
            "fields": [
              {
                "name": "time",
                "type": "time",
                "typeInfo": {
                  "frame": "time.Time"
                }
              },
              {
                "name": "A-series",
                "type": "number",
                "typeInfo": {
                  "frame": "int64",
                  "nullable": true
                }
              }
            ]
          },
          "data": {
            "values": [
              [1644488152084, 1644488212084, 1644488272084, 1644488332084, 1644488392084, 1644488452084],
              [1, 20, 90, 30, 5, 0]
            ]
          }
        }
      ]
    }
  }
}
```

## Data Frame

- [Data frame design: Basics](https://community.grafana.com/t/data-frame-design-basics/63644)
- https://grafana.com/developers/plugin-tools/how-to-guides/data-source-plugins/create-data-frames

```ts
const timeValues = [1599471973065, 1599471975729];
const numberValues = [12.3, 28.6];

// Create data frame from values.
const frame = toDataFrame({
  name: 'http_requests_total',
  fields: [
    { name: 'Time', type: FieldType.time, values: timeValues },
    { name: 'Value', type: FieldType.number, values: numberValues },
  ],
});

const series = [
  { Time: 1599471973065, Value: 12.3 },
  { Time: 1599471975729, Value: 28.6 },
];

const frame = toDataFrame(series);
frame.name = 'http_requests_total';
```
