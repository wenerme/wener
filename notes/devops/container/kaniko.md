---
title: Kaniko
---

# Kaniko
* 是什么？
  * 构建容器镜像的工具
  * 不依赖 Docker，不需要 root 权限
  * 可复现的容器镜像构建
* [GoogleContainerTools/kaniko](https://github.com/GoogleContainerTools/kaniko)
* gcr.io/kaniko-project/executor:latest
* gcr.io/kaniko-project/executor:debug - 包含 shell
* 参考
  * GitLab runner use [Kaniko](https://docs.gitlab.com/ee/ci/docker/using_kaniko.html)

:::caution

* 只支持 x86_64
* 不支持 multi-arch 和 manifest

:::

```bash
docker run --rm -it -w /workspace --entrypoint sh registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:debug

mkdir -p /workspace /images /cache
cd /workspace

cat <<DOCKERFILE > Dockerfile
FROM wener/base
RUN apk add coreutils
DOCKERFILE
# --no-push 不推送 --tarPath 生成的 tar 需要设置 --destination
# --context 默认 /workspace
# --cache 启用缓存 --cache-dir 基础镜像缓存目录，默认 /cache --cache-repo 缓存仓库
# --use-new-run 实验特性，提升构建性能
# --reproducible 移除时间戳
/kaniko/executor --context $PWD --dockerfile $PWD/Dockerfile \
  --registry-mirror hbcvocvo.mirror.aliyuncs.com \
  --no-push --tarPath /images/build.tar --destination=image \
  --use-new-run --reproducible

# Docker 认证配置
mkdir -p /kaniko/.docker
# 配置
echo "{\"auths\":{\"$CI_REGISTRY\":{\"username\":\"$CI_REGISTRY_USER\",\"password\":\"$CI_REGISTRY_PASSWORD\"}}}" > /kaniko/.docker/config.json
# 构建并推送
/kaniko/executor --context $CI_PROJECT_DIR --dockerfile $CI_PROJECT_DIR/Dockerfile --destination $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG
```

## 参数
* [Additional Flags](https://github.com/GoogleContainerTools/kaniko#additional-flags)
