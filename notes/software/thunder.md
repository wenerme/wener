---
tags:
  - Downloader
---

# 迅雷


## Docker

- `gitlab.xunlei.cn/xlppc/pan-cli`
- 邀请码 迅雷牛通

```bash
# https://github.com/cnk3x/xunlei

  -e XL_CHROOT=/ \
  -e XL_DIR_DOWNLOAD=/xunlei/downloads \

docker run --rm -it \
  -e XL_DASHBOARD_USERNAME=admin \
  -e XL_DASHBOARD_PASSWORD=admin \
  -v $PWD/data:/xunlei/data \
  -v $PWD/downloads:/xunlei/downloads \
  -p 2345:2345 \
  --name xunlei cnk3x/xunlei
```

| env                     | default           | for                                                                                       |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `XL_DASHBOARD_PORT`     | 2345              | 网页访问的端口                                                                            |
| `XL_DASHBOARD_IP`       | 0.0.0.0           | 网页访问的IP，0.0.0.0代表所有IP                                                           |
| `XL_DASHBOARD_USERNAME` |                   | 网页访问的用户名                                                                          |
| `XL_DASHBOARD_PASSWORD` |                   | 网页访问的密码                                                                            |
| `XL_DIR_DOWNLOAD`       | /xunlei/downloads | 下载保存默认文件夹，多个文件夹用冒号:分隔                                                 |
| `XL_DIR_DATA`           | /xunlei/data      | 程序数据保存文件夹                                                                        |
| `XL_UID`                |                   | 运行迅雷的用户ID                                                                          |
| `XL_GID`                |                   | 运行迅雷的用户组ID                                                                        |
| `XL_PREVENT_UPDATE`     | true              | 是否阻止更新，可选值 true/false, 1/0                                                      |
| `XL_CHROOT`             | /                 | 隔离运行主目录，指定且不为`/`时以隔离模式运行，需特权模式(--privileged)，否则为非特权模式 |
| `XL_DEBUG`              |                   | 调试模式，可选值 true/false, 1/0                                                          |
