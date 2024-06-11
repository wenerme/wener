---
title: Watchtower
---

# Watchtower

- [containrrr/watchtower](https://github.com/containrrr/watchtower)
- 如果 image 有更新自动更新
- 支持通知
  - email
  - slack
  - msteams
  - gotify
    - WATCHTOWER_NOTIFICATIONS=gotify
    - WATCHTOWER_NOTIFICATION_GOTIFY_URL
    - WATCHTOWER_NOTIFICATION_GOTIFY_TOKEN

```bash
# 确保存在配置文件
# 需要 docker login 的镜像能够生效
mkdir $HOME/.docker -p && [ ! -f $HOME/.docker/config.json ] && echo '{}' > $HOME/.docker/config.json

# --label-enable  有 com.centurylinklabs.watchtower.enable=true 标签的才生效，如果不指定，则可以用 =false 来排除
# --cleanup       清理删除的 image
docker run -d \
  -e TZ=Asia/Shanghai \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $HOME/.docker/config.json:/config.json \
  --name watchtower containrrr/watchtower \
  --interval 180 --cleanup

# 升级单个容器
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock -v $HOME/.docker/config.json:/config.json containrrr/watchtower -R <NAME>
# 升级单个容器 - 不带鉴权信息
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -R <NAME>
```
