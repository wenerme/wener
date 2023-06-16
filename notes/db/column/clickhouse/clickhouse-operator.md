# Clickhouse Operator

- [Altinity/clickhouse-operator](https://github.com/Altinity/clickhouse-operator)

```bash
# 直接安装 - 默认安装到 kube-system
kubectl apply -f https://raw.githubusercontent.com/Altinity/clickhouse-operator/master/deploy/operator/clickhouse-operator-install-bundle.yaml

# 替换模板参数
OPERATOR_NAMESPACE="${OPERATOR_NAMESPACE:-kube-system}"
METRICS_EXPORTER_NAMESPACE="${OPERATOR_NAMESPACE}"
OPERATOR_IMAGE="${OPERATOR_IMAGE:-altinity/clickhouse-operator:latest}"
METRICS_EXPORTER_IMAGE="${METRICS_EXPORTER_IMAGE:-altinity/metrics-exporter:latest}"
kubectl apply --namespace="${OPERATOR_NAMESPACE}" -f <( \
    curl -s https://raw.githubusercontent.com/Altinity/clickhouse-operator/master/deploy/operator/clickhouse-operator-install-template.yaml | \
        OPERATOR_IMAGE="${OPERATOR_IMAGE}" \
        OPERATOR_NAMESPACE="${OPERATOR_NAMESPACE}" \
        METRICS_EXPORTER_IMAGE="${METRICS_EXPORTER_IMAGE}" \
        METRICS_EXPORTER_NAMESPACE="${METRICS_EXPORTER_NAMESPACE}" \
        envsubst \
)
```

- https://github.com/Altinity/clickhouse-operator/tree/master/docs/chi-examples
