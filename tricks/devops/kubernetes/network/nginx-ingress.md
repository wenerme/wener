---
id: nginx-ignress
title: Nginx Ingress
---

# Nginx Ingress

```bash
POD_NAME=$(kubectl get pods --selector "app.kubernetes.io/name=ingress-nginx" --all-namespaces --output=name | head -1)
# 查看 Nginx 配置
kubectl exec -n ingress-nginx -it $POD_NAME -- cat /etc/nginx/nginx.conf
```

## config

### annotations
* [annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)
* 默认前缀 `nginx.ingress.kubernetes.io`
 
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

# 访问 service 而不是 pod
nginx.ingress.kubernetes.io/service-upstream: "false"
# proxy_set_header Host $host
nginx.ingress.kubernetes.io/upstream-vhost: ""
# 别名
nginx.ingress.kubernetes.io/server-alias: "<alias 1>,<alias 2>"
```

### ConfigMap
* [configmap](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap)

```yaml
# 隐藏 Proxy 的头
#hide-headers: Server
# 默认会返回 Server 头
server-tokens: "false"
# 默认 1m
proxy-body-size: 5m

# 生成 RequestID
generate-request-id: "true"

# 自定义脚本
main-snippet: ""
http-snippet: ""
server-snippet: ""
location-snippet: ""

# 来源白名单
whitelist-source-range: ""
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
