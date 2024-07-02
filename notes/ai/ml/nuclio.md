---
title: nuclio
---

# nuclio

- [nuclio](https://github.com/nuclio/nuclio)
  - Apache-2.0, Go
  - Automate the Data Science Pipeline with Serverless Functions

```bash
# https://github.com/nuclio/nuclio/releases/
curl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-darwin-$(uname -m)
chmod +x nuctl
# 假设 $HOME/bin 在 PATH 中
mv nuctl ~/bin/

nuctl get function
```

```bash
docker run -p 8070:8070 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp:/tmp --name nuclio-dashboard quay.io/nuclio/dashboard:stable-amd64
```

## nuctl

- --platform local/kube
  - local -> docker
- https://nuclio.io/docs/latest/reference/nuctl/


# FAQ

## Copy local file

- 部署目录默认都会包含 到 /opt/nuclio
- https://github.com/nuclio/nuclio/issues/2333
