---
title: Kubernetes Getting Started
tags:
  - DevOps
  - Kubernetes
  - Guide
  - kubeadm
---

# Kubernetes Getting Started

- [Deploying Kubernetes on Raspberry Pi](https://opensource.com/article/20/6/kubernetes-raspberry-pi)

## Prerequisites

### Docker Configuration

Check Docker info:

```bash
sudo docker info
```

Configure Docker daemon:

```bash
sudo cat > /etc/docker/daemon.json << EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

Enable cgroups in `/boot/cmdline.txt`:

```text
cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1 swapaccount=1
```

### System Configuration

```bash
# Enable net.bridge.bridge-nf-call-iptables and -iptables6
cat << EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```

## Installation

```bash
sudo apt update && sudo apt install -y kubelet kubeadm kubectl
```

## Cluster Initialization

Generate token:

```bash
TOKEN=$(sudo kubeadm token generate)
echo $TOKEN
```

Initialize control plane:

```bash
sudo kubeadm init --token=${TOKEN} --kubernetes-version=v1.18.2 --pod-network-cidr=10.244.0.0/16
```

### Configure kubectl

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Networking (CNI)

Deploy Flannel:

```bash
curl -sSL https://raw.githubusercontent.com/coreos/flannel/v0.12.0/Documentation/kube-flannel.yml | kubectl apply -f -
```

## Adding Worker Nodes

Run the join command on worker nodes:

```bash
sudo kubeadm join <control-plane-host>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

## Verification

### Create Namespace

```bash
kubectl create namespace kube-verify
kubectl get namespaces
```

### Deploy Verification App

```bash
cat << EOF | kubectl create -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-verify
  namespace: kube-verify
  labels:
    app: kube-verify
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kube-verify
  template:
    metadata:
      labels:
        app: kube-verify
    spec:
      containers:
      - name: nginx
        image: quay.io/clcollins/kube-verify:01
        ports:
        - containerPort: 8080
EOF
```

Check deployment:

```bash
kubectl get all -n kube-verify
```

### Expose Service

```bash
cat << EOF | kubectl create -f -
apiVersion: v1
kind: Service
metadata:
  name: kube-verify
  namespace: kube-verify
spec:
  selector:
    app: kube-verify
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
EOF
```

Test access:

```bash
curl <service-ip>
```
