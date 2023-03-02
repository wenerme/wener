---
title: grpcurl
---

# grpcurl

- [fullstorydev/grpcurl](https://github.com/fullstorydev/grpcurl)

```bash
# macOS
brew install grpcurl

# -plaintext
grpcurl grpc.server.com:443 -d '{"name":"Wener"}' my.custom.server.Service/Method

grpcurl localhost:8787 list
grpcurl -protoset my-protos.bin list
grpcurl -import-path ../protos -proto my-stuff.proto list
grpcurl localhost:8787 list my.custom.server.Service
```

## grpcui

```bash
grpcui -use-reflection -plaintext 127.0.0.1:18088
grpcui -use-reflection -base-path / -plaintext localhost:18088
```
