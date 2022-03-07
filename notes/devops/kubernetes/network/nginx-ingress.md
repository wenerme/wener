---
title: Nginx Ingress
---

# Nginx Ingress

- [kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx)
  - 基于 Nginx 实现的 Ingress API
- 模版路径 [/etc/nginx/template/nginx.tmpl](https://github.com/kubernetes/ingress-nginx/blob/master/rootfs/etc/nginx/template/nginx.tmpl)
- 支持自定义 [Lua 插件](https://github.com/kubernetes/ingress-nginx/blob/master/rootfs/etc/nginx/lua/plugins/README.md)
- 无法全局添加 cert
  - 可以设置默认 `--default-ssl-certificate` 指向 secret - 例如 `default/foo-tls`
  - 默认使用 self-signed
- [Websocket](https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/#websockets)
  - proxy-read-timeout 和 proxy-send-timeout 默认 60s
  - 对于 websocket 建议 3600
- 插件
  - https://kubernetes.github.io/ingress-nginx/kubectl-plugin/
- https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/

:::caution

- 默认 ssl-passthrough 未开启，不支持 SNI
  - 启用对性能影响很大
- 不支持 Gateway API [kubernetes/ingress-nginx#7517](https://github.com/kubernetes/ingress-nginx/issues/7517)

:::

```bash
POD_NAME=$(kubectl get pods --selector "app.kubernetes.io/name=ingress-nginx" --all-namespaces --output=name | head -1)
# 查看 Nginx 配置
kubectl exec -n ingress-nginx -it $POD_NAME -- cat /etc/nginx/nginx.conf
```

## config

- 默认前缀 `nginx.ingress.kubernetes.io`
- 参考
  - [annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)
  - [configmap](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/)
  - [args](https://kubernetes.github.io/ingress-nginx/user-guide/cli-arguments/)

| annotation             | value | note                          |
| ---------------------- | ----- | ----------------------------- |
| configuration-snippet  |
| server-snippet         |
| service-upstream       | false | 访问 service 而不是 pod       |
| upstream-vhost         |       | `proxy_set_header Host $host` |
| proxy-body-size        | 1m    | 推荐设置稍微大点              |
| whitelist-source-range | CIDR  |
| proxy-buffering        | off   |

```yaml
# location 自定义
nginx.ingress.kubernetes.io/configuration-snippet: |
  more_set_headers "Request-Id: $req_id";
# server 自定义
nginx.ingress.kubernetes.io/server-snippet: |
  set $agentflag 0;

  if ($http_user_agent ~* "(Mobile)" ){
    set $agentflag 1;
  }

  if ( $agentflag = 1 ) {
    return 301 https://m.example.com;
  }

# 别名
nginx.ingress.kubernetes.io/server-alias: '<alias 1>,<alias 2>'
```

| configmap          | value | note                   |
| ------------------ | ----- | ---------------------- |
| use-proxy-protocol | false | HAProxy Proxy Protocol |
| enable-brotli      | false | Safari >= 11           |

| flag                     | value | note |
| ------------------------ | ----- | ---- |
| --enable-ssl-passthrough |       |

### 粘性会话

```yaml
nginx.ingress.kubernetes.io/affinity: cookie
# 默认 balanced 模式 - 扩缩容的时候会变
nginx.ingress.kubernetes.io/affinity-mode: persistent
# 默认 INGRESSCOOKIE
nginx.ingress.kubernetes.io/session-cookie-name: _sticky
# 默认为 ingress match 的路径
# nginx.ingress.kubernetes.io/session-cookie-path: /
# None, Lax, Strict
# nginx.ingress.kubernetes.io/session-cookie-samesite: None

# Will omit SameSite=None attribute for older browsers which reject the more-recently defined SameSite=None value
# nginx.ingress.kubernetes.io/session-cookie-conditional-samesite-none: 'true'

# Expires
nginx.ingress.kubernetes.io/session-cookie-expires: '172800'
# Max-Age
nginx.ingress.kubernetes.io/session-cookie-max-age: '172800'

# 默认 false - 当请求上游失败时修改 cookie
nginx.ingress.kubernetes.io/session-cookie-change-on-failure: 'true'
```

### grpc

:::info

- 注意 body 默认 4MB 限制

:::

```yaml
annotations:
  # GRPCS - 后端自行处理 TLS
  nginx.ingress.kubernetes.io/backend-protocol: 'GRPCS'
  # GRPC - 由 nginx 处理 TLS
  nginx.ingress.kubernetes.io/backend-protocol: 'GRPC'
  nginx.ingress.kubernetes.io/ssl-redirect: 'true'

  # 如果要使用 stream 考虑设置长一点的超时
  nginx.ingress.kubernetes.io/server-snippet: |
    grpc_read_timeout "1200s";
    grpc_send_timeout "1200s";
    client_body_timeout "1200s";
```

### cors

```yaml
nginx.ingress.kubernetes.io/enable-cors: 'true'
# 默认所有
nginx.ingress.kubernetes.io/cors-allow-origin: 'https://wener.me'
```

### ConfigMap

- [configmap](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap)

```yaml
# 隐藏 Proxy 的头
#hide-headers: Server
# 默认会返回 Server 头
server-tokens: 'false'
# 默认 1m
proxy-body-size: 5m

# 生成 RequestID
generate-request-id: 'true'

# 自定义脚本
main-snippet: ''
http-snippet: ''
server-snippet: ''
location-snippet: ''

# 来源白名单
whitelist-source-range: ''
```

## 安装

```bash
# HELM
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install my-release ingress-nginx/ingress-nginx

# manifest
ver=$(curl -Ls https://api.github.com/repos/kubernetes/ingress-nginx/releases/latest | jq -r .tag_name)
curl -LC- https://raw.githubusercontent.com/kubernetes/ingress-nginx/$ver/deploy/static/provider/baremetal/deploy.yaml -o nginx-ingress-baremetal-$ver.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/baremetal/deploy.yaml

# wener helm charts
helm repo add wener https://charts.wener.tech
helm install ingress-nginx wener/ingress-nginx -n ingress-nginx -v nginx.values.yaml
```

**values.yaml**

```yaml
config:
  hide-headers: 'Server'
controller:
  image:
    # use mirror
    # k8s.gcr.io/ingress-nginx/controller
    repository: registry.cn-hongkong.aliyuncs.com/cmi/ingress-nginx_controller
    # disable digest
    digest: ''
  # 以 DaemonSet 安装
  kind: DaemonSet
  # 80 端口
  hostPort:
    enabled: true
  # 是否启用 /metrics
  metrics:
    enabled: true
    # 是否安装 kube-prometheus
    serviceMonitor:
      enabled: false
  prometheusRule:
    enabled: false
  admissionWebhooks:
    patch:
      image:
        repository: registry.cn-hongkong.aliyuncs.com/cmi/jettech_kube-webhook-certgen
```

```yaml title="Proxy Protocol"
controller:
  service:
    annotations:
      haproxy.org/send-proxy-protocol: proxy
  config:
    use-proxy-protocol: 'true'
```

## Examples

```yaml
# https://github.com/kubernetes/ingress-nginx/blob/master/docs/examples/rewrite/README.md
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: rewrite
  namespace: default
spec:
  rules:
    - host: rewrite.bar.com
      http:
        paths:
          - backend:
              serviceName: http-svc
              servicePort: 80
            path: /something(/|$)(.*)
```

## FastCGI

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: 'nginx'
    nginx.ingress.kubernetes.io/backend-protocol: 'FCGI'
    nginx.ingress.kubernetes.io/fastcgi-index: 'index.php'
    # 存放额外参数
    nginx.ingress.kubernetes.io/fastcgi-params-configmap: 'example-cm'
    # nginx.ingress.kubernetes.io/fastcgi-params-configmap: "example-namespace/example-configmap"
  name: example-app
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - backend:
              serviceName: example-service
              servicePort: fastcgi
```

## 默认 backend

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: no-rules-map
spec:
  tls:
    - hosts:
        - 'wener.me'
        - '*.wener.me'
      secretName: wener-me-cert
  backend:
    serviceName: def
    servicePort: 80
```

## auth

- https://kubernetes.github.io/ingress-nginx/examples/auth/oauth-external-auth/

### basic

```yaml
apiVersion: v1
data:
  auth: Zm9vOiRhcHIxJE9GRzNYeWJwJGNrTDBGSERBa29YWUlsSDkuY3lzVDAK
kind: Secret
metadata:
  name: basic-auth
  namespace: default
type: Opaque
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-with-auth
  annotations:
    # 认证类型
    nginx.ingress.kubernetes.io/auth-type: basic
    # 存储了 auth 的 secret
    nginx.ingress.kubernetes.io/auth-secret: basic-auth
    # 显示信息
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required - foo'
spec:
  rules:
    - host: foo.bar.com
      http:
        paths:
          - path: /
            backend:
              serviceName: http-svc
              servicePort: 80
```

### external basic

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/auth-url: https://httpbin.org/basic-auth/user/passwd
  name: external-auth
  namespace: default
spec:
  rules:
    - host: external-auth-01.sample.com
      http:
        paths:
          - backend:
              serviceName: http-svc
              servicePort: 80
            path: /
```

### cert

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    # Enable client certificate authentication
    nginx.ingress.kubernetes.io/auth-tls-verify-client: 'on'
    # Create the secret containing the trusted ca certificates
    nginx.ingress.kubernetes.io/auth-tls-secret: 'default/ca-secret'
    # Specify the verification depth in the client certificates chain
    nginx.ingress.kubernetes.io/auth-tls-verify-depth: '1'
    # Specify an error page to be redirected to verification errors
    nginx.ingress.kubernetes.io/auth-tls-error-page: 'http://www.mysite.com/error-cert.html'
    # Specify if certificates are passed to upstream server
    nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream: 'true'
  name: nginx-test
  namespace: default
spec:
  rules:
    - host: mydomain.com
      http:
        paths:
          - backend:
              serviceName: http-svc
              servicePort: 80
            path: /
  tls:
    - hosts:
        - mydomain.com
      secretName: tls-secret
```

## controller

```
    1 www-data  0:00 /usr/bin/dumb-init -- /nginx-ingress-controller --publish-service=ingress-nginx/ingress-nginx-controller --election-id=ingress-controller-leader --ingress-class=nginx --configmap=ingress-nginx/ingress-nginx-controller --validating-webhook=:8443 --validating-webhook-certificate=/usr/local/certificates/cert --validating-webhook-key=/usr/local/certificates/key
    6 www-data  0:00 /nginx-ingress-controller --publish-service=ingress-nginx/ingress-nginx-controller --election-id=ingress-controller-leader --ingress-class=nginx --configmap=ingress-nginx/ingress-nginx-controller --validating-webhook=:8443 --validating-webhook-certificate=/usr/local/certificates/cert --validating-webhook-key=/usr/local/certificates/key
   26 www-data  0:00 nginx: master process /usr/local/nginx/sbin/nginx -c /etc/nginx/nginx.conf
   37 www-data  2:15 nginx: worker process is shutting down
  105 www-data  0:00 /wait-shutdown
  117 root      0:00 bash
  136 root      0:00 ps aux
  137 root      0:00 tee
```

```
/nginx-ingress-controller --help
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:       v0.35.0
  Build:         54ad65e32bcab32791ab18531a838d1c0f0811ef
  Repository:    https://github.com/kubernetes/ingress-nginx
  nginx version: nginx/1.19.2

-------------------------------------------------------------------------------

Usage of :
      --add_dir_header                          If true, adds the file directory to the header of the log messages
      --alsologtostderr                         log to standard error as well as files
      --annotations-prefix string               Prefix of the Ingress annotations specific to the NGINX controller. (default "nginx.ingress.kubernetes.io")
      --apiserver-host string                   Address of the Kubernetes API server.
                                                Takes the form "protocol://address:port". If not specified, it is assumed the
                                                program runs inside a Kubernetes cluster and local discovery is attempted.
      --certificate-authority string            Path to a cert file for the certificate authority. This certificate is used
                                                only when the flag --apiserver-host is specified.
      --configmap string                        Name of the ConfigMap containing custom global configurations for the controller.
      --default-backend-service string          Service used to serve HTTP requests not matching any known server name (catch-all).
                                                Takes the form "namespace/name". The controller configures NGINX to forward
                                                requests to the first port of this Service.
      --default-server-port int                 Port to use for exposing the default server (catch-all). (default 8181)
      --default-ssl-certificate string          Secret containing a SSL certificate to be used by the default HTTPS server (catch-all).
                                                Takes the form "namespace/name".
      --disable-catch-all                       Disable support for catch-all Ingresses
      --election-id string                      Election id to use for Ingress status updates. (default "ingress-controller-leader")
      --enable-metrics                          Enables the collection of NGINX metrics (default true)
      --enable-ssl-chain-completion             Autocomplete SSL certificate chains with missing intermediate CA certificates.
                                                Certificates uploaded to Kubernetes must have the "Authority Information Access" X.509 v3
                                                extension for this to succeed.
      --enable-ssl-passthrough                  Enable SSL Passthrough.
      --health-check-path string                URL path of the health check endpoint.
                                                Configured inside the NGINX status server. All requests received on the port
                                                defined by the healthz-port parameter are forwarded internally to this path. (default "/healthz")
      --health-check-timeout int                Time limit, in seconds, for a probe to health-check-path to succeed. (default 10)
      --healthz-port int                        Port to use for the healthz endpoint. (default 10254)
      --http-port int                           Port to use for servicing HTTP traffic. (default 80)
      --https-port int                          Port to use for servicing HTTPS traffic. (default 443)
      --ingress-class string                    Name of the ingress class this controller satisfies.
                                                The class of an Ingress object is set using the field IngressClassName in Kubernetes clusters version v1.18.0 or higher or the annotation "kubernetes.io/ingress.class" (deprecated).
                                                If this parameter is not set, or set to the default value of "nginx", it will handle ingresses with either an empty or "nginx" class name.
      --kubeconfig string                       Path to a kubeconfig file containing authorization and API server information.
      --log_backtrace_at traceLocation          when logging hits line file:N, emit a stack trace (default :0)
      --log_dir string                          If non-empty, write log files in this directory
      --log_file string                         If non-empty, use this log file
      --log_file_max_size uint                  Defines the maximum size a log file can grow to. Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)
      --logtostderr                             log to standard error instead of files (default true)
      --maxmind-edition-ids string              Maxmind edition ids to download GeoLite2 Databases. (default "GeoLite2-City,GeoLite2-ASN")
      --maxmind-license-key string              Maxmind license key to download GeoLite2 Databases.
                                                https://blog.maxmind.com/2019/12/18/significant-changes-to-accessing-and-using-geolite2-databases
      --metrics-per-host                        Export metrics per-host (default true)
      --monitor-max-batch-size int              Max batch size of NGINX metrics (default 10000)
      --profiler-port int                       Port to use for expose the ingress controller Go profiler when it is enabled. (default 10245)
      --profiling                               Enable profiling via web interface host:port/debug/pprof/ (default true)
      --publish-service string                  Service fronting the Ingress controller.
                                                Takes the form "namespace/name". When used together with update-status, the
                                                controller mirrors the address of this service's endpoints to the load-balancer
                                                status of all Ingress objects it satisfies.
      --publish-status-address string           Customized address to set as the load-balancer status of Ingress objects this controller satisfies.
                                                Requires the update-status parameter.
      --report-node-internal-ip-address         Set the load-balancer status of Ingress objects to internal Node addresses instead of external.
                                                Requires the update-status parameter.
      --skip_headers                            If true, avoid header prefixes in the log messages
      --skip_log_headers                        If true, avoid headers when opening log files
      --ssl-passthrough-proxy-port int          Port to use internally for SSL Passthrough. (default 442)
      --status-port int                         Port to use for the lua HTTP endpoint configuration. (default 10246)
      --status-update-interval int              Time interval in seconds in which the status should check if an update is required. Default is 60 seconds (default 60)
      --stderrthreshold severity                logs at or above this threshold go to stderr (default 2)
      --stream-port int                         Port to use for the lua TCP/UDP endpoint configuration. (default 10247)
      --sync-period duration                    Period at which the controller forces the repopulation of its local object stores. Disabled by default.
      --sync-rate-limit float32                 Define the sync frequency upper limit (default 0.3)
      --tcp-services-configmap string           Name of the ConfigMap containing the definition of the TCP services to expose.
                                                The key in the map indicates the external port to be used. The value is a
                                                reference to a Service in the form "namespace/name:port", where "port" can
                                                either be a port number or name. TCP ports 80 and 443 are reserved by the
                                                controller for servicing HTTP traffic.
      --udp-services-configmap string           Name of the ConfigMap containing the definition of the UDP services to expose.
                                                The key in the map indicates the external port to be used. The value is a
                                                reference to a Service in the form "namespace/name:port", where "port" can
                                                either be a port name or number.
      --update-status                           Update the load-balancer status of Ingress objects this controller satisfies.
                                                Requires setting the publish-service parameter to a valid Service reference. (default true)
      --update-status-on-shutdown               Update the load-balancer status of Ingress objects when the controller shuts down.
                                                Requires the update-status parameter. (default true)
  -v, --v Level                                 number for the log level verbosity
      --validating-webhook string               The address to start an admission controller on to validate incoming ingresses.
                                                Takes the form "<host>:port". If not provided, no admission controller is started.
      --validating-webhook-certificate string   The path of the validating webhook certificate PEM.
      --validating-webhook-key string           The path of the validating webhook key PEM.
      --version                                 Show release information about the NGINX Ingress controller and exit.
      --vmodule moduleSpec                      comma-separated list of pattern=N settings for file-filtered logging
      --watch-namespace string                  Namespace the controller watches for updates to Kubernetes objects.
                                                This includes Ingresses, Services and all configuration resources. All
                                                namespaces are watched if this parameter is left empty.
pflag: help requested
```
