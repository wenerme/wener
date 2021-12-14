---
title: K8S Features
---

# K8S Features

## StatefulSetAutoDeletePVC

```yaml
apiVersion: apps/v1
kind: StatefulSet
spec:
  # StatefulSetAutoDeletePVC
  # sts 异常后的 pvc 回收策略
  persistentVolumeClaimRetentionPolicy:
    whenDeleted: Retain
    whenScaled: Delete
```

## CronJobControllerV2

| schedule          | =           |
| ----------------- | ----------- |
| @yearly,@annually | `0 0 1 1 *` |
| @monthly          | `0 0 1 * *` |
| @weekly           | `0 0 * * 0` |
| @daily,@midnight  | `0 0 * * *` |
| @hourly           | `0 * * * *` |

- 之前为 ScheduledJobs,所以这是 v2
- [KEP#19](https://github.com/kubernetes/enhancements/tree/master/keps/sig-apps/19-Graduate-CronJob-to-Stable)
- [CronJobV1](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/cron-job-v1/)

:::caution

- 时区基于 kube-controller-manager
- 未正式支持 CRON_TZ, TZ

:::

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: '*/1 * * * *'
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: hello
              image: busybox
              imagePullPolicy: IfNotPresent
              command:
                - /bin/sh
                - -c
                - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```

## IPv6DualStack

- [KEP#563](https://github.com/kubernetes/enhancements/tree/master/keps/sig-network/563-dual-stack)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: ClusterIP
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  # 默认 SingleStack, 支持 PreferDualStack, RequireDualStack
  ipFamilyPolicy: RequireDualStack
  ipFamilies:
    - IPv4
    - IPv6
  # 申请到的地址
  clusterIP: 1.2.3.4
  clusterIPs:
    - 1.2.3.4
    - 2001::1
```
