---
title: Container Image
---

# Container Image

- [opencontainers/image-spec](https://github.com/opencontainers/image-spec)
- ~[Label Schema Convention DRAFT](http://label-schema.org/rc1/)~
  - 废弃

```
[image name] = [repository]:[tag]
```

```bash
docker manifest inspect --verbose wener/base
docker pull wener/base@sha256:dc5ed3a4c56fb194904558bf68f4ff2c48c4b3fc3ebd9fbf82e96c1f548bead3
curl -L -s 'https://registry.hub.docker.com/v2/repositories/library/httpd/tags?page_size=20' | jq '."results"[]["name"]'

docker pull golang@sha256:232a180dbcbcfa7250917507f3827d88a9ae89bb1cdd8fe3ac4db7b764ebb25a
```
