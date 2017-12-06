# ClickHouse

## Tips

https://clickhouse.yandex/docs/en/single/

https://en.wikipedia.org/wiki/ClickHouse
https://github.com/yandex/ClickHouse
https://clickhouse.yandex/

https://hub.docker.com/r/yandex/clickhouse-server/

8123 HTTP
9000 native client

```bash
docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 yandex/clickhouse-server

docker run -it --rm --link some-clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server

docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 -v /path/to/your/config.xml:/etc/clickhouse-server/config.xml yandex/clickhouse-server
```
