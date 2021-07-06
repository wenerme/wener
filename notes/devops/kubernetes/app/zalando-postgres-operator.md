---
title: zalando/postgres-operator
---

# zalando/postgres-operator

- [zalando/postgres-operator](https://github.com/zalando/postgres-operator)
  - [文档](https://postgres-operator.readthedocs.io/en/latest/)
- Operator 可通过 ConfigMap 或 CRD 配置 - 推荐 CRD 配置
  - CRD 要求类型匹配 - Helm values 需要调整
  - ConfigMap 值均为字符串
- 每个用户会创建一个 secret 存储账号密码
  - `{username}.{team}-{clustername}.credentials.postgresql.acid.zalan.do`
    - username
    - password
- CRD
  - OperatorConfiguration - CRD 配置 Operator
  - postgresql - 定义 PostgreSQL 集群
  - PostgresTeam - 定义团队
- 特性
  - WAL 备份
  - 逻辑备份 - SQL dump

:::caution

- cluster-name 必须匹配 {TEAM}-{NAME} 格式
  - 即 postgresql crd 的名字
- 数据库名字限制和 PG 不同 - 必须 `^[a-zA-Z_][a-zA-Z0-9_]*$`
  - 数据库名字不可以包含 `-` - 需要 quote
  - [#667](https://github.com/zalando/postgres-operator/issues/667)
- 用户名不要包含 `_` - 因为生成 secret 不支持名字包含 `_`

:::


:::caution 备份注意事项

- S3 bukect 是全局的，不支持每个集群独立配置
- pod_environment_secret 目前只挂载在了 operator 上
  - 逻辑备份无法使用该配置
  - [#1348](https://github.com/zalando/postgres-operator/issues/1348)
- 非 AWS S3 只能使用 WAL-G - 因为 WAL-E 开启了 SSE
  - 例如 Minio

:::

```bash
# {team}-{name}
CLUSTER_NAME=acid-minimal-cluster
# Master Host
PGMASTER=$(kubectl get pods -o jsonpath={.items..metadata.name} -l application=spilo,cluster-name=${CLUSTER_NAME},spilo-role=master)
# 端口转发
kubectl port-forward $PGMASTER 6432:5432

# 获取密码连接数据库
export PGUSER=postgres
export PGPASSWORD=$(kubectl get secret ${PGUSER}.${CLUSTER_NAME}.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)
export PGSSLMODE=require
psql -h localhost -p 6432


# 转发 operator-ui
kubectl port-forward -n postgres-operator svc/postgres-operator-ui 8080:80
```

## OperatorConfiguration

```yaml
kind: OperatorConfiguration
apiVersion: acid.zalan.do/v1
configuration:
  # 通用配置
  enable_crd_validation: true
  enable_lazy_spilo_upgrade: false
  enable_pgversion_env_var: true
  enable_spilo_wal_path_compat: false
  # 默认使用 DCS
  etcd_host:
  kubernetes_use_configmaps: false
  docker_image:
  sidecars: []
  enable_shm_volume: true
  # operator create/update/delete/sync
  workers: 8
  max_instances: -1
  min_instances: -1
  resync_period: 30m
  repair_period: 5m
  set_memory_request_to_limit: false

  # Postgres 用户配置
  users:
    super_username: postgres
    replication_username: stanby
  load_balancer:
  # AWS 和 GCP 配置
  aws_or_gcp:
    wal_s3_bucket:
    log_s3_bucket:

    aws_region: eu-central-1
    additional_secret_mount:
    additional_secret_mount_path:

    wal_gs_bucket:
    gcp_credentials:

    # 实际使用 AWS S3 关心的配置
    enable_ebs_gp3_migration: false
    enable_ebs_gp3_migration_max_size: 1000
    # AWS IAM role - https://github.com/jtblin/kube2iam
    # Pod annotation iam.amazonaws.com/role
    kube_iam_role:
  # 逻辑副本
  logical_backup:
    logical_backup_docker_image: registry.opensource.zalan.do/acid/logical-backup
    logical_backup_job_prefix: logical-backup-
    logical_backup_provider: s3
    logical_backup_s3_bucket:
    logical_backup_s3_endpoint:
    logical_backup_s3_region:
    # AWS_ACCESS_KEY_ID
    logical_backup_s3_access_key_id:
    # AWS_SECRET_ACCESS_KEY
    logical_backup_s3_secret_access_key:
    logical_backup_schedule: "30 00 * * *"

    logical_backup_google_application_credentials:
  # Operator 调试配置
  debug:
    debug_logging: true
    enable_database_access: true
  # 日志接口
  logging_rest_api:
    api_port: 8080
    ring_log_lines: 100
    cluster_history_entries: 1000
  # Team API 可用于服务集成
  teams_api:
    enable_teams_api: true
    # https://github.com/mkabilov/fake-teams-api
    teams_api_url:
    team_api_role_configuration: log_statement:all
    enable_team_superuser: false
    team_admin_role: admin
    enable_admin_role_for_users: true
    pam_role_name: zalandos
    # https://github.com/CyberDem0n/pam-oauth2
    pam_configuration:
    protected_role_names: admin
    postgres_superuser_teams:
    # 监听 PostgresTeam CRD
    enable_postgres_team_crd: false
    enable_postgres_team_crd_superusers: false
  # 负载均衡配置
  load_balancer:
    custom_service_annotations: {}
    # DNS Zone
    # 使用 https://github.com/kubernetes-sigs/external-dns
    db_hosted_zone: db.example.com
    enable_master_load_balancer: true
    enable_replica_load_balancer: false
    # Cluster, Local
    external_traffic_policy: Cluster
    master_dns_name_format: "{cluster}.{team}.{hostedzone}"
    replica_dns_name_format: "{cluster}-repl.{team}.{hostedzone}"
  # 超时相关配置
  timeouts:
  # 链接池配置
  connection_pooler:
    connection_pooler_number_of_instances: 2
    connection_pooler_schema: pooler
    connection_pooler_user: pooler
    connection_pooler_image: registry.opensource.zalan.do/acid/pgbouncer
    connection_pooler_max_db_connections: 60
    connection_pooler_mode: transaction
    connection_pooler_default_cpu_request: 500m
    connection_pooler_default_memory_reques: 100Mi
    connection_pooler_default_cpu_limit: 1
    connection_pooler_default_memory_limit: 100Mi
  # Kubernetes 资源配置
  kubernetes:
    # 创建基础设施账号信息 - 自定义密码和用户角色 - 默认密码是生成的
    infrastructure_roles_secrets:
      - secretname: 'postgresql-infrastructure-roles'
        userkey: 'user1'
        passwordkey: 'password1'
        rolekey: 'inrole1'
    # pod_environment_configmap: "postgres-operator-system/pod-env-overrides"
    pod_environment_configmap:
    # 自定义环境变量 secret - 用于携带 s3 密钥信息
    pod_environment_secret:

  # 资源配置
  postgres_pod_resources:
    default_cpu_request: 100m
    default_memory_request: 100Mi
    default_cpu_limit: 1
    default_memory_limit: 500Mi
    min_cpu_limit: 250m
    min_memory_limit: 250Mi
```

## PostgresTeam

- Team 由于减少 cluster-name 冲突，划分团队，设置默认角色账号

```yaml
apiVersion: "acid.zalan.do/v1"
kind: PostgresTeam
metadata:
  name: custom-team-membership
spec:
  # 附加团队
  additionalTeams:
    # a 作为 b 的附加团队
    # 效果等同于将 a 重命名为 b - 重命名通过 该功能实现 - teamdID 在 postgresql 内不可变
    a-team:
    - "b-team"
    # 可互相为附加团队
    b-team:
    - "a-team"

    # 虚拟团队可用于打包团队
    virtual-team:
    - "c-team"
    - "d-team"
    a-team:
    - "virtual-team"
    b-team:
    - "virtual-team"
  # 附加成员
  additionalMembers:
    # 在所有 a 团队的集群中创建 tia 可登陆账户
    a-team:
    - "tia"
    virtual-team:
    - "flynch"
    - "rdecker"
```

## postgresql

- [manifests/minimal-postgres-manifest.yaml](https://github.com/zalando/postgres-operator/blob/master/manifests/minimal-postgres-manifest.yaml)

```yaml
kind: 'postgresql'
apiVersion: 'acid.zalan.do/v1'

metadata:
  name: 'acid-demo'
  namespace: 'default'
  labels:
    team: acid
  # 实例对应 ID - 会用于备份和克隆
  uid: efd12e58-5786-11e8-b5a7-06148230260c
spec:
  # 所属团队 - 创建后不可变
  teamId: 'acid'
  postgresql:
    version: '13'
    # 其他参数
    parameters: {}
  # 受 operator 的 max_instances min_instances 参数影响
  numberOfInstances: 1
  volume:
    # 支持增加 - 不支持减少
    size: '10Gi'
  # 用户列表
  users:
    # 支持 flags
    # SUPERUSER, REPLICATION, INHERIT, LOGIN, NOLOGIN, CREATEROLE, CREATEDB, BYPASSURL
    # 默认 LOGIN
    demo: []
  # 数据库列表 - 不会创建关联角色
  databases:
    # 数据库: owner
    demo: demo
  allowedSourceRanges:
    # IP ranges to access your cluster go here

  # 最小 200m 250Mi
  resources:
    requests:
      cpu: 100m
      memory: 100Mi
    limits:
      cpu: 500m
      memory: 500Mi
  # 控制调度
  tolerations:
  - key: postgres
    operator: Exists
    effect: NoSchedule

  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: environment
          operator: In
          values:
          - pci
  podPriorityClassName:
  podAnnotations:
  serviceAnnotations:
  # 默认开启
  enableShmVolume: true
  additionalVolumes: [ ]

  # 准备数据库和 schema - 会创建对应的角色和用户
  preparedDatabases:
    # 创建 foo_{owner,reader,writer} 角色
    # 创建 foo_{owner,reader,writer}_user 用户
    foo:
      # 是否创建默认用户
      defaultUsers: true
      schemas:
        # 创建 foo_bar_{owner,reader,writer} 角色
        # 创建 foo_bar_{owner,reader,writer}_user 用户
        bar:
          # 可指定不创建默认角色
          defaultRoles: false
          defaultUsers: true
        # public 下不创建默认角色 - 让 search_path 包含 public
        public:
          defaultRoles: false
      # 扩展配置
      # https://github.com/dimitri/pgextwlist
      # SHOW extwlist.extensions;
      # btree_gin,btree_gist,citext,hstore,intarray,ltree,pgcrypto,pgq,pg_trgm,postgres_fdw,tablefunc,uuid-ossp,hypopg,pg_partman
      extensions:
        pg_partman: public
        postgis: data
  # 从 S3 克隆
  clone:
    uid: "efd12e58-5786-11e8-b5a7-06148230260c"
    cluster: "acid-batman"
    timestamp: "2017-12-19T12:40:33+01:00"
    s3_endpoint: https://s3.acme.org
    s3_access_key_id: 0123456789abcdef0123456789abcdef
    s3_secret_access_key: 0123456789abcdef0123456789abcdef
    s3_force_path_style: true
    # 直接克隆 - pg_basebackup 生成备份
    # 相同 namespace
    cluster: "acid-batman"

  # 热备集群 - 作为另外一个集群的 standby
  # 建议集群为单 Pod numberOfInstances: 1, 因为目前只有 master 从 S3 接受 WAL
  # https://github.com/zalando/postgres-operator/blob/master/manifests/standby-manifest.yaml
  standby:
    # 通过 S3 WAL 现成热备关系
    s3_wal_path: "s3://path/to/bucket/containing/wal/of/source/cluster/"
  # 提升 standby 为使用集群
  # 在容器内操作 patronictl edit-config
  # 删除下列配置
  # 完成后删除上述 standby 配置
  # 正常集群转 standby 可在容器内添加配置
  standby_cluster:
    create_replica_methods:
      - bootstrap_standby_with_wale
      - basebackup_fast_xlog
    restore_command: envdir "/home/postgres/etc/wal-e.d/env-standby" /scripts/restore_command.sh
      "%f" "%p"

  # Sidebar
  # enable_sidecars
  sidecars:
    - name: "container-name"
      image: "company/image:tag"
      resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 100m
          memory: 100Mi
      # POD_NAME
      # POD_NAMESPACE
      # POSTGRES_USER
      # POSTGRES_PASSWORD
      # PG 数据目录 /home/postgres/pgdata
      env:
        - name: "ENV_VAR_NAME"
          value: "any-k8s-env-things"
  # 初始化容器
  # enable_init_containers
  initContainers:
    - name: "container-name"
      image: "company/image:tag"
      env:
        - name: "ENV_VAR_NAME"
          value: "any-k8s-env-things"

  enableMasterLoadBalancer: false
  enableReplicaLoadBalancer: false
  # 允许访问 LB 的地址范围
  allowedSourceRanges:

  # 开启逻辑备份
  # 通过创建 k8s cronjob 进行备份
  # 可能失败，注意监控 - 受 cronjob 限制 https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-job-limitations
  enableLogicalBackup: true
  logicalBackupSchedule: "30 00 * * *"
  # 链接池 - pgbouncer
  # Service {cluster-name}-pooler
  enableConnectionPooler: true
  # 副本链接池
  enableReplicaConnectionPooler: true

  # 链接池配置
  # 如果配置了该参数则默认 enableConnectionPooler=true
  connectionPooler:
    numberOfInstances: 2
    # session, transaction
    mode: "transaction"
    # 创建函数和用户的 schema
    schema: "pooler"
    # 用户
    user: "pooler"
    resources:
      requests:
        cpu: 500m
        memory: 100Mi
      limits:
        # 建议 limit 为 1 即可
        cpu: "1"
        memory: 100Mi
  # 自定义 TLS 配置
  # 可通过 cert-manager 生成
  tls:
    secretName: "pg-tls"    # this should hold tls.key and tls.crt
    caSecretName: "pg-tls-ca" # this should hold ca.crt
    caFile: "ca.crt" # add this if the secret is configured with a CA

  dockerImage:
  schedulerName: default-scheduler
  spiloRunAsUser: root
  spiloRunAsGroup: root
  # 如果非 root 运行 - 需要自定义 image
  # spiloFSGroup:

  # Patroni 相关配置
  # https://patroni.readthedocs.io/en/latest/SETTINGS.html
  patroni:
```

# FAQ

## Spilo 环境变量

- [ENVIRONMENT](https://github.com/zalando/spilo/blob/master/ENVIRONMENT.rst)

## S3 相关环境变量

- WAL_BUCKET_SCOPE_SUFFIX
  - `/{uid}`
- LOG_BUCKET_SCOPE_SUFFIX
  - `/{uid}`
- WAL_BUCKET_SCOPE_PREFIX
- LOG_BUCKET_SCOPE_PREFIX

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pod-var-custom
data:
  BACKUP_NUM_TO_RETAIN: '5'
  BACKUP_SCHEDULE: '00 01 * * *'
  AWS_ACCESS_KEY_ID: '****'
  AWS_SECRET_ACCESS_KEY: '****'
  # AWS_ENDPOINT: "s3.eu-west-1.amazonaws.com"
  AWS_REGION: 'eu-west-1'
  WAL_S3_BUCKET: 'somebucket'

  USE_WALG_BACKUP: 'false'
  USE_WALG_RESTORE: 'false'
  WALG_DOWNLOAD_CONCURRENCY: '1'
  WALG_DISABLE_S3_SSE: 'true'
```

**$HOME/pgdata/pgroot/pg_log/postgres-?.log**

```yaml
archive_command:  `envdir "{WALE_ENV_DIR}" {WALE_BINARY} wal-push "%p"`
restore_command:  `envdir "{{WALE_ENV_DIR}}" /scripts/restore_command.sh "%f" "%p"`
```

```bash
# 手动触发
# 如果出现 root 不存在
# export PGUSER=postgres
envdir "/run/etc/wal-e.d/env" /scripts/postgres_backup.sh "/home/postgres/pgdata/pgroot/data"
# 查看 wal-e 变量
grep . /run/etc/wal-e.d/env/*
# 逻辑备份
grep . /run/etc/log.d/env/*

tail -f -n 100 /home/postgres/pgdata/pgroot/pg_log/postgresql-?.log

# 测试配置是否正确
# 如果 hang 住 可能是因为域名或 endpoint 错误
# minio 如果没配置子域名，需要设置 AWS_S3_FORCE_PATH_STYLE=true
envdir /run/etc/wal-e.d/env wal-g backup-list --detail
```

## WAL-E 配置

```bash
# 配置环境变量
AWS_ENDPOINT='https://s3.eu-central-1.amazonaws.com:443'
WALE_S3_ENDPOINT='https+path://s3.eu-central-1.amazonaws.com:443'
# 未设置 prefix 则通过 WAL_S3_BUCKET 生成
# SCOPE 为 cluster 名字
WALE_S3_PREFIX=$WAL_S3_BUCKET/spilo/{WAL_BUCKET_SCOPE_PREFIX}{SCOPE}{WAL_BUCKET_SCOPE_SUFFIX}/wal/{PGVERSION}
```

## 使用 wal-e 而不是 wal-g

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pod-env-overrides
  namespace: postgres-operator-system
data:
  # 环境变量控制
  USE_WALG_BACKUP: 'true'
  USE_WALG_RESTORE: 'true'
  CLONE_USE_WALG_RESTORE: 'true'
  # minio 需要
  AWS_S3_FORCE_PATH_STYLE: 'true'
```

## 逻辑备份注意事项

- 不能从逻辑备份恢复 - 不能作为 point-in-time recovery
- 只是当作数据快照
- [镜像](https://github.com/zalando/postgres-operator/tree/master/docker/logical-backup/Dockerfile)内包含 pg_dumpall 工具 - dump 后压缩上传 s3
- 依赖 cronjob - 不太稳定
- **不会删除旧的备份**
- 自定义镜像要处理好重启和并发请求 - [Handling Pod and container failures](https://kubernetes.io/docs/concepts/workloads/controllers/job/#handling-pod-and-container-failures)
- RBAC 添加 batch 接口 cronjobs 资源
  - [operator-service-account-rbac](https://github.com/zalando/postgres-operator/blob/master/manifests/operator-service-account-rbac.yaml)

## The request signature we calculated does not match the signature you provided. Check your key and signing method.

同步到 S3 异常。可能是 access_key 错误。

## Server side encryption specified but KMS is not configured

同步到 S3 异常。取消参数 logical_backup_s3_sse

- wal-e 默认开启 sse
  - 无法关闭
  - [wal-e/wal-e#404](https://github.com/wal-e/wal-e/issues/404)
  - [wal-e/wal-e#410](https://github.com/wal-e/wal-e/pull/410)

## cannot perform switch over before re-creating the pod: no replicas

可能由于 secret 冲突或者不同步导致异常

## 清理已删除集群

- operator 可能会删除 sts，可能有资源不会被删除。
  - 取决于删除集群时的状态。

```bash
CLUSTER_NAME=acid-demo

kubectl delete secret -l cluster-name=$CLUSTER_NAME
kubectl delete pdb -l cluster-name=$CLUSTER_NAME
kubectl delete svc -l cluster-name=$CLUSTER_NAME
kubectl delete ep -l cluster-name=$CLUSTER_NAME
kubectl delete pvc -l cluster-name=$CLUSTER_NAME
```

## operator-ui backup 错误

- [ui/operator_ui/main.py#L73](https://github.com/zalando/postgres-operator/blob/master/ui/operator_ui/main.py#L73)
  - 支持的配置参数
- [#937](https://github.com/zalando/postgres-operator/issues/937)
- operator ui helm 不支持自定义 env - 比较麻烦

```yaml
# Minio 环境变量配置
- name: "TARGET_NAMESPACE"
  value: "*"
- name: "AWS_ENDPOINT"
  value: "http://minio-service:9000"
- name: "AWS_ACCESS_KEY_ID"
  value: "access"
- name: "AWS_SECRET_ACCESS_KEY"
  value: "secret"
- name: "SPILO_S3_BACKUP_BUCKET"
  value: "bucket-name"
- name: "SPILO_S3_BACKUP_PREFIX"
  value: "spilo/"
- name: "WALE_S3_ENDPOINT"
  value: "http+path://minio-service:9000
```

### TypeError: expected string or bytes-like object

可能是因为 operator-ui 没有配置 S3 相关环境变量。

```log
operator_ui.main ERROR    Exception on /stored_clusters [GET]
          File "/usr/lib/python3.8/site-packages/botocore/handlers.py", line 205, in validate_bucket_name
            if not VALID_BUCKET.search(bucket) and not VALID_S3_ARN.search(bucket):
        TypeError: expected string or bytes-like object
```

### OSError: [Errno 101] Network unreachable

应该是 S3 地址配置错误。同时配置 AWS_ENDPOINT 和 WALE_S3_ENDPOINT

注意 WALE_S3_ENDPOINT schema 是 https+path

```bash
WALE_S3_ENDPOINT=https+path://minio.example.com:443
```

### No snapshots found

- 目前无解，需要修改源码
- [#1365](https://github.com/zalando/postgres-operator/issues/1365)

# 容器内容
- /home/postgres/
  - pgdata/
    - pgroot/
      - data/
        - pg_hba.conf

## pg_hba.conf rejects connection for host

## 其他问题

- 异常 resync 重启
  - 日志查看 resync 原因
  - [#927](https://github.com/zalando/postgres-operator/issues/927)
    - resync_period 间隔重启
  - [#1397](https://github.com/zalando/postgres-operator/issues/1397)
  - [#1377](https://github.com/zalando/postgres-operator/issues/1377) Rolling restart/update at every sync cycle since v1.6.1
    - v1.6.1 有问题 - 已 fix [#1380](https://github.com/zalando/postgres-operator/pull/1380)
    - 修复 `configKubernetes.additional_pod_capabilities=SYS_NICE`
    - 空 capabilities 会添加 SYS_NICE，导致每次同步 security context 都不一致
- pod_environment_secret 目前只挂载在了 operator 上
  - 逻辑备份无法使用该配置 - cronjob, backup 镜像
  - [#1348](https://github.com/zalando/postgres-operator/issues/1348)
  - 在问题修复之前只能使用 pod_environment_configmap
