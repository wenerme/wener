---
title: xds
---

# xds

最早由 Envoy 开发，用于构建 ServiceMesh 统一的 DP 接口。

- xDS API - 一套 DP API - Mesh CP <-> Proxies
  - 用于 gRPC Mesh - `xds://pkg.service`
- 负载均衡
  - LDS - Listener Discovery Service - type.googleapis.com/envoy.config.listener.v3.Listener
  - RDS - Route Discovery Service - type.googleapis.com/envoy.config.route.v3.RouteConfiguration
  - CDS - Cluster Discovery Service - type.googleapis.com/envoy.config.cluster.v3.Cluster
  - EDS - Endpoint Discovery Service - type.googleapis.com/envoy.config.endpoint.v3.ClusterLoadAssignment
  - ADS - Aggregate Discovery Service - gRPC
- 负载报告 - LRS
- xDSv3
- CP 实现
  - GCP Traffic Director
  - istio
  - [envoyproxy/go-control-plane](https://github.com/envoyproxy/go-control-plane)
- UDPA - Universal Data Plane API
  - 服务发现，负载均衡分配，路由发现，监听器配置，安全发现，负载报告，运行状况检查委托
- 参考
  - [envoyproxy/data-plane-api](https://github.com/envoyproxy/data-plane-api)
  - [xDS REST and gRPC protocol](https://www.envoyproxy.io/docs/envoy/latest/api-docs/xds_protocol)

| Role       | For                                                                               |
| ---------- | --------------------------------------------------------------------------------- |
| gRPC       | 高性能通信                                                                        |
| Kubernetes | 服务注册、服务发现、健康检测                                                      |
| Istio      | 路由、负载，服务治理：熔断、重拾，安全：认证、mTLS，可观察性：trace、log、metrics |

## gRPC xDS

- GRPC_XDS_BOOTSTRAP
- 参考
  - [grpc-ecosystem/grpcdebug](https://github.com/grpc-ecosystem/grpcdebug)
    - 可用于 debug xds
  - [salrashid123/grpc_xds](https://github.com/salrashid123/grpc_xds)
  - [xDS Features in gRPC](https://grpc.github.io/grpc/cpp/md_doc_grpc_xds_features.html)
  - go grpc xds [example](https://github.com/grpc/grpc-go/blob/master/examples/features/xds/README.md)
  - gRPC [A27: xDS-Based Global Load Balancing](https://github.com/grpc/proposal/blob/master/A27-xds-global-load-balancing.md)

```json
{
  // The xDS server to talk to.  The value is an array to allow for a
  // future change to add support for failing over to a secondary xDS server
  // if the primary is down, but for now, only the first entry in the
  // array will be used.
  "xds_servers": [
    {
      "server_uri": "", //<string containing URI of xds server>,
      // List of channel creds; client will stop at the first type it
      // supports.  This field is required and must contain at least one
      // channel creds type that the client supports.
      "channel_creds": [
        {
          "type": "", // google_default, insecure
          // The "config" field is optional; it may be missing if the
          // credential type does not require config parameters.
          "config": "" //<JSON object containing config for the type>
        }
      ],
      "server_features": ["xds_v3"]
    }
  ],
  // JSON of proto
  // https://github.com/envoyproxy/data-plane-api/blob/1adb5d54abb0e28ca409254d26fad1cf5535239b/envoy/api/v2/core/base.proto#L85-L118
  "node": {
    "id": "",
    "cluster": "",
    "metadata": {},
    "locality": {
      "region": "",
      // https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
      // https://cloud.google.com/compute/docs/regions-zones/
      "zone": "",
      "sub_zone": ""
    },
    "build_version": ""
  }
}
```
