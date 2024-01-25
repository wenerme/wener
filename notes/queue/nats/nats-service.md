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
  - multiple endpoints on services [#187](https://github.com/nats-io/nats-architecture-and-design/issues/187)
- https://github.com/nats-io/nats.go/blob/main/micro/README.md

```ts
import { Type, Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { firstOfAsyncIterator } from '@wener/utils';
import { polyfillWebSocket } from '@wener/utils/server/ws';
import { connect } from 'nats.ws';
import { test } from 'vitest';

test(
  'nats-service',
  async () => {
    await polyfillWebSocket();

    const nc = await connect({
      servers: ['wss://demo.nats.io:8443'],
    });

    console.log(`nats ttl ${await nc.rtt()}ms`);

    const svc = await nc.services.add({
      name: 'test_Service',
      version: '1.0.0',
      statsHandler: async (ep) => {
        console.log(`[STATS] ${ep.subject} ${ep.queue} ${JSON.stringify(ep.metadata)}`);
        return null;
      },
      queue: 'SVC',
    });

    type HelloRequest = Static<typeof HelloRequest>;
    const HelloRequest = Type.Object({
      name: Type.String(),
    });

    const queue = svc.addEndpoint('hello', {
      subject: `test_Service.hello`,
      metadata: {
        schema: JSON.stringify({
          request: HelloRequest,
        }),
      },
    });
    Promise.resolve(null).then(async () => {
      for await (const msg of queue) {
        const str = msg.string();
        const req = Value.Cast(HelloRequest, JSON.parse(str));
        console.log(`[RECV] ${msg.subject}: ${str}`);
        msg.respond(
          JSON.stringify({
            message: `hello ${req.name}`,
          }),
        );
      }
    });

    const sc = nc.services.client();
    console.log(await firstOfAsyncIterator(sc.ping('test_Service')));
    console.log(await firstOfAsyncIterator(sc.stats('test_Service')));
    console.log(await firstOfAsyncIterator(sc.info('test_Service')));
    console.log(
      (await nc.request('test_Service.hello', JSON.stringify({ name: 'wener' }), { timeout: 1000 * 60 * 60 })).string(),
    );
  },
  {
    timeout: 60_000,
  },
);
```
