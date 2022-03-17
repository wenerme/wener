---
tags:
  - Kubernetes
---

# Nats on K8S

| port | for       |
| ---- | --------- |
| 443  | websocket |
| 4222 | client    |
| 6222 | cluster   |
| 8222 | monitor   |
| 7777 | metrics   |
| 7422 | leafnodes |
| 7522 | gateways  |
| 1883 | mqtt      |

## setup nats resolver

- https://github.com/nats-io/k8s/tree/main/helm/charts/nats#nats-resolver-setup-example

```bash title="setup-nsc"
[ -z "$NKEYS_PATH" ] && {
    export NKEYS_PATH=$(pwd)/nsc/nkeys
}

[ -z "$NSC_HOME" ] && {
    export NSC_HOME=$(pwd)/nsc/accounts
}

if [ ! -f .nsc.env ]; then
  echo '
# NSC Environment Setup
export NKEYS_PATH=$(pwd)/nsc/nkeys
export NSC_HOME=$(pwd)/nsc/accounts
' > .nsc.env
fi

mkdir -p "$NKEYS_PATH"
mkdir -p "$NSC_HOME"
nsc add operator --name KO

# Create system account
nsc add account --name SYS
nsc add user    --name sys
```

```bash
nsc generate config --sys-account SYS --nats-resolver
```

```yaml
auth:
  enabled: true

  timeout: '5s'

  resolver:
    type: full

    operator: #

    systemAccount: #

    store:
      dir: '/etc/nats-config/accounts/jwt'
      size: '1Gi'

    resolverPreload:
      #: #
```

```bash
helm install
```

```bash
# port forward
kubectl -n nats port-forward svc/nats 4222:4222

# for JetStream
account=JS1
nsc add account  --name $account
nsc edit account --name $account --js-disk-storage -1 --js-consumer -1 --js-streams -1
nsc add user -a $account js-user

# Upload
nsc push --system-account SYS -u nats://localhost:4222 -A
# 测试
nats stream ls -s localhost --creds ./nsc/nkeys/creds/KO/JS1/js-user.creds

# nats protocol
nsc tool rtt --nats nats://localhost:4222
# websocket
nsc tool rtt --nats wss://nats.example.com:443
```
