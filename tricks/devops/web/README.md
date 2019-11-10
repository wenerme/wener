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
