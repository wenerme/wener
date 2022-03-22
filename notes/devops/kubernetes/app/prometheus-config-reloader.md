---
title: prometheus-config-reloader
---

# prometheus-config-reloader

- [prometheus-config-reloader](https://github.com/prometheus-operator/prometheus-operator/tree/main/cmd/prometheus-config-reloader)
  - 强求 reload 接口 - 作为 sidecar 部署
  - fsnotify
  - quay.io/prometheus-operator/prometheus-config-reloader

| flag                              |
| --------------------------------- | ------------------------------ |
| --config-file file                | 被监听文件                     |
| --config-envsubst-file file       | 替换 config-file 里的环境变量  |
| --watched-dir dir                 | 被监听目录                     |
| --reload-url url                  | http://127.0.0.1:9090/-/reload |
| --listen-address                  | metrics                        |
| --statefulset-ordinal-from-envvar |
| --watch-interval                  | 3m                             |
| --delay-interval                  | 1s                             |
| --retry-interval                  | 5s                             |
| --log-format                      |
| --log-level                       | info                           |

- config-file 可以是 gz
  - k8s secret 最多 1MB

```yaml
spec:
  containers:
    - name: config-reloader
      image: quay.io/prometheus-operator/prometheus-config-reloader:v0.48.1
      command:
        - /bin/prometheus-config-reloader
      args:
        - '--reload-url=http://localhost:8429/-/reload'
        - '--config-envsubst-file=/etc/vmagent/config_out/vmagent.env.yaml'
        - '--watched-dir=/etc/vm/relabeling'
        - '--config-file=/etc/vmagent/config/vmagent.yaml.gz'
      env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: metadata.name
      resources:
        limits:
          cpu: 100m
          memory: 25Mi
        requests:
          cpu: 100m
          memory: 25Mi
      volumeMounts:
        - name: config
          mountPath: /etc/vmagent/config
        - name: config-out
          mountPath: /etc/vmagent/config_out
        - name: relabeling-assets
          readOnly: true
          mountPath: /etc/vm/relabeling
        - name: kube-api-access-g58qm
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: FallbackToLogsOnError
      imagePullPolicy: IfNotPresent
```
