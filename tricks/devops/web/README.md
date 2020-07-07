## FAQ

### Caddy vs Traefik
* Caddy
  * 定位是 Web 服务器
  * 特点是 HTTP2、自动 HTTPS
  * V2 版本还在开发中 - 变化很大
* Traefik
  * 定位是微服务下的负载均衡、边界路由、反向代理
  * 偏向 Cloud Native
  * 对 K8S 支持较好 - 支持作为 Ingress
  * V2 版本调整了前后端概念 - 结构更加清晰易于配置
  * 支持 TCP 和 SNI 负载路由
  * acme 不支持分布式 - 付费

### Nginx vs HAProxy
* Nginx
  * 支持 Web Hosting
  * 作为负载均衡限流能力较弱
  * 统计指标少
  * 支持 TCP 和 UDP
  * 更多应用层面的感知 - 7层
  * 通过模块提供各种功能
  * 收费版 [Nginx Plus](https://www.nginx.com/products/nginx/#compare-versions)
  * ⚠️ 社区版 upstream 的 host 不会变 - 不会随 dns 变化 - 对于 LB 来说比较致命
* HAProxy
  * 不支持作为 Web 服务器
  * 比 Nginx 更擅长 SSL offload / SSL terminate
  * 主要角色是负载均衡
  * 支持非常多的限流策略
  * 支持非常多的统计指标
  * 不支持 UDP [#62](https://github.com/haproxy/haproxy/issues/62)
    * 如果是 DNS 负载推荐用 [dnsdist](https://dnsdist.org)
  * 代码量和逻辑比 Nginx 简单
  * 收费版 - [HAProxy EE](https://www.haproxy.com/products/community-vs-enterprise-edition/)
* 负载均衡选择 HAProxy
* 需要托管网站选择 Nginx

### Caddy v1 vs v2
* v1
  * 通过配置文件配置
* v2
  * 通过接口配置 - 更加灵活

