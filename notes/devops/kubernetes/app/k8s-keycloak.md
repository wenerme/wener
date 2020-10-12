

## 为什么使用 StatefulSet 部署
* jboss.node.name 为 pod 名，会用于标示节点
* 节点标识符不能超过 23 字符
* pod 名字加上 17 个字符 hash 后会比较长 - 因此需要将名字裁剪为 6 个字符 keyclo
* 使用 StatefulSet 则可以保留 20 长度的名字，假设不超过 100 replica
* jboss.node.name 能取到固定的名字也利于服务发现
* headless service 用于 DNS 服务发现
* 参考
  * [#6349](https://github.com/helm/charts/issues/6349) - Keycloak fails for hostname longer then 23 bytes
  * [Why StatefulSet](https://github.com/codecentric/helm-charts/tree/master/charts/keycloak#why-statefulset)
