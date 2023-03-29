---
title: docker buildx bake
---

# docker buildx bake

- 配置合并
  - docker-compose.yml
  - docker-compose.yaml
  - docker-bake.json
  - docker-bake.override.json
  - docker-bake.hcl
  - docker-bake.override.hcl
- https://docs.docker.com/build/bake/file-definition/

```bash
cat <<EOF > Dockerfile
FROM wener/base
RUN touch test
EOF
cat <<HCL > docker-bake.hcl
target "default" {
  dockerfile = "Dockerfile"
  platforms = ["linux/amd64", "linux/arm64"]
  pull = true
}
HCL

# moby/buildkit:buildx-stable-1
docker context create --use

docker buildx bake
```
