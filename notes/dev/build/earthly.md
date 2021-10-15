---
title: earthly
---

# earthly

- [earthly/earthly](https://github.com/earthly/earthly)
  - Makefile + Dockerfile = Earthfile

```bash
# macOS
brew install earthly/earthly/earthly && earthly bootstrap
# macOS manual
curl -LO https://github.com/earthly/earthly/releases/download/v0.5.24/earthly-darwin-amd64
chmod +x earthly-darwin-amd64
mv earthly-darwin-amd64 ~/go/bin/earthly

earthly +docker
```

```Earthfile
FROM golang:alpine
WORKDIR /go-example

deps:
    COPY go.mod go.sum ./
    RUN go mod download
    # Output these back in case go mod download changes them.
    SAVE ARTIFACT go.mod AS LOCAL go.mod
    SAVE ARTIFACT go.sum AS LOCAL go.sum

build:
    FROM +deps
    COPY main.go .
    RUN go build -o build/go-example main.go
    SAVE ARTIFACT build/go-example /go-example AS LOCAL build/go-example

docker:
    COPY +build/go-example .
    ENTRYPOINT ["/go-example/go-example"]
    SAVE IMAGE go-example:latest
```

**~/.earthly/config.yml**

```yaml
global:
  # ~/.earthly/install_id
  disable_analytics: true
```

- https://docs.earthly.dev/docs/earthly-config
