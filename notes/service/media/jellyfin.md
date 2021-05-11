
# Jellyfin
* 是什么？
  * 开源媒体系统
  * 类似 Plex 但更开放
* [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)
  * C#, GPL

```bash
docker pull jellyfin/jellyfin:latest
mkdir -p $PWD/jellyfin/{config,cache}
# --net=host
docker run --rm -it \
  -v $PWD/jellyfin/config:/config \
  -v $PWD/jellyfin/cache:/cache \
  -v $PWD/media:/media \
  -p 8096:8096 \
  -e TZ=Asia/Shanghai \
  --name jellyfin jellyfin/jellyfin:latest
```

https://jellyfin.org/docs/general/administration/configuration.html#data-directory
