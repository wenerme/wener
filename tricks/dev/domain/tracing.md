# Tracing
## Tips
* Dapper
  * [Dapper, a Large-Scale Distributed Systems Tracing Infrastructure](https://research.google.com/pubs/pub36356.html)
* [opentracing](http://opentracing.io/)
  * Vendor-neutral APIs and instrumentation for distributed tracing
* [openzipkin/zipkin](https://github.com/openzipkin/zipkin)
  * Java
* [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger)
  * Golang
  * Thrift
  * CNCF Jaeger, a Distributed Tracing System
  * https://jaegertracing.io/
* [apache/skywalking](https://github.com/apache/incubator-skywalking)
  * Java
* APM (application performance monitor)


```bash
docker run -it --rm \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp \
  -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 \
  jaegertracing/all-in-one:latest
```

