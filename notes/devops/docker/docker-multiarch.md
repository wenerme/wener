# Docker multiarch
* [Architectures](https://github.com/docker-library/official-images#architectures-other-than-amd64)
* 官方 Docker, Inc : https://download.docker.com - [jenkins](https://doi-janky.infosiftr.net/job/multiarch/)
  * ARMv6 32-bit (arm32v6): https://hub.docker.com/u/arm32v6/
  * ARMv7 32-bit (arm32v7): https://hub.docker.com/u/arm32v7/
  * ARMv8 64-bit (arm64v8): https://hub.docker.com/u/arm64v8/
  * Linux x86-64 (amd64): https://hub.docker.com/u/amd64/
  * Windows x86-64 (windows-amd64): https://hub.docker.com/u/winamd64/
* 官方镜像
  * ARMv5 32-bit (arm32v5): https://hub.docker.com/u/arm32v5/
  * IBM POWER8 (ppc64le): https://hub.docker.com/u/ppc64le/
  * IBM z Systems (s390x): https://hub.docker.com/u/s390x/
  * MIPS64 LE (mips64le): https://hub.docker.com/u/mips64le/
  * x86/i686 (i386): https://hub.docker.com/u/i386/
* [Manifest List](https://docs.docker.com/registry/spec/manifest-v2-2/#manifest-list)
* https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/
* https://github.com/estesp/manifest-tool
* https://docs.docker.com/docker-for-mac/multi-arch/
* https://github.com/ckulka/docker-multi-arch-example
* [#36552](https://github.com/moby/moby/issues/36552) - arch support run,pull,build

```bash
# linux/amd64, linux/arm64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
docker buildx ls

docker manifest create \
wener/miniroot:manifest-latest \
--amend wener/miniroot:manifest-amd64 \
--amend wener/miniroot:manifest-arm32v7 \
--amend wener/miniroot:manifest-arm64v8

docker manifest push wener/miniroot:manifest-latest

DOCKER_CLI_EXPERIMENTAL=enabled
```

