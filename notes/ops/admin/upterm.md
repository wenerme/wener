---
title: upterm
---

# upterm

- [owenthereal/upterm](https://github.com/owenthereal/upterm)
  - Apache-2.0, Golang

```bash
# macOS
brew install owenthereal/upterm/upterm
# golang
go install github.com/owenthereal/upterm/cmd/upterm@latest
# downloaad
curl -LO ghproxy.com/https://github.com/owenthereal/upterm/releases/download/v0.7.6/upterm_darwin_amd64.tar.gz
tar -zxvf upterm_darwin_amd64.tar.gz

# Websocket
upterm host --server wss://uptermd.upterm.dev -- bash
ssh -o ProxyCommand='upterm proxy wss://TOKEN@uptermd.upterm.dev' TOKEN@uptermd.upterm.dev:443
```

- 认证
  - --authorized-key PATH_TO_PUBLIC_KEY
  - --github-user username
  - --gitlab-user username

## uptermd

- [charts/uptermd](https://github.com/owenthereal/upterm/tree/master/charts/uptermd)

# FAQ

## websocket: close 1006 (abnormal closure): unexpected EOF

- https://github.com/owenthereal/upterm/issues/90
