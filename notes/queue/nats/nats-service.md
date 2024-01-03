---
title: NATS Service
tags:
  - Microservices
  - RPC
---

# NATS Service

```
$SRV.<operation>
$SRV.<operation>.<service_name>
$SRV.<operation>.<service_name>.<service_id>
```


- https://github.com/nats-io/nats.deno/blob/main/nats-base-client/service.ts
- 标准操作
  - `$SRV.PING|STATS|INFO`
- operation=method
- Group=相同的前缀
- headers
  - Nats-Service-Error - 字符串描述
  - Nats-Service-Error-Code - 数字

```ts
// io.nats.micro.v1.info_response
type InfoResponse = {
  type: string;
  name: string;
  id: string;
  version: string;
  metadata: Record<string, string>;
  /**
   * Description for the service
   */
  description: string;
  /**
   * An array of info for all service endpoints
   */
  endpoints: EndpointInfo[];
};
type EndpointInfo = {
  /**
   * The name of the endpoint
   */
  name: string;
  /**
   * The subject on which the endpoint is listening.
   */
  subject: string;
  /**
   * Queue group to which this endpoint is assigned to
   */
  queue_group: string;
  /**
   * Metadata of a specific endpoint
   */
  metadata: Record<string, string>;
};

// io.nats.micro.v1.ping_response
type PingResponse = {
  type: string;
  name: string;
  id: string;
  version: string;
  metadata: Record<string, string>;
};

// io.nats.micro.v1.stats_response
type StatsResponse = {
  type: string;
  name: string;
  id: string;
  version: string;
  metadata: Record<string, string>;
  /**
   * Individual endpoint stats
   */
  endpoints: EndpointStats[];
  /**
   * ISO Date string when the service started in UTC timezone
   */
  started: string;
};

type EndpointStats = {
  /**
   * The name of the endpoint
   */
  name: string;
  /**
   * The subject on which the endpoint is listening.
   */
  subject: string;
  /**
   * Queue group to which this endpoint is assigned to
   */
  queue_group: string;
  /**
   * The number of requests received by the endpoint
   */
  num_requests: number;
  /**
   * Number of errors that the endpoint has raised
   */
  num_errors: number;
  /**
   * If set, the last error triggered by the endpoint
   */
  last_error?: Error;
  /**
   * A field that can be customized with any data as returned by stats handler see {@link ServiceConfig}
   */
  data?: unknown;
  /**
   * Total processing_time for the service
   */
  processing_time: Nanos;
  /**
   * Average processing_time is the total processing_time divided by the num_requests
   */
  average_processing_time: Nanos;
};
```

---

- Service API [ADR-32](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-32.md)
  - https://github.com/nats-io/nats-architecture-and-design/issues/220
  - https://github.com/nats-io/nats-architecture-and-design/issues/206
  - https://github.com/nats-io/nats-architecture-and-design/issues/184
  - multiple endpoints on services  [#187](https://github.com/nats-io/nats-architecture-and-design/issues/187)
- https://github.com/nats-io/nats.go/blob/main/micro/README.md
