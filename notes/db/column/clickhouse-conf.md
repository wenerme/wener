---
tags:
  - Configuration
---

# Clickhouse 配置

- /etc/clickhouse-server/config.xml
- /etc/clickhouse-server/users.xml
- /etc/clickhouse-server/config.d
- /etc/clickhouse-server/users.d
  - XML, YAML
- 参考
  - https://clickhouse.com/docs/en/operations/configuration-files/
  - https://github.com/ClickHouse/ClickHouse/blob/master/programs/server/config.yaml.example
  - https://github.com/ClickHouse/ClickHouse/blob/master/programs/server/config.xml

```bash
# clickhouse-benchmark
# 会命令行启动 clickhouse server
curl -LO https://raw.githubusercontent.com/ClickHouse/ClickBench/main/hardware/hardware.sh
chmod a+x hardware.sh
./hardware.sh
```

## REST API

```bash
echo 'SELECT version()' | curl 'http://localhost:8123/' --data-binary @-

curl 'http://192.168.66.61:8123?query=select%20version()'
curl --get http://192.168.66.61:8123 --data-urlencode 'query=select version()'
```



## Query

```sql
select version();

select currentDatabase();
select currentProfiles();
select currentUser();
select currentRoles();
```

## docker_related_config.xml

```xml
<clickhouse>
     <!-- Listen wildcard address to allow accepting connections from other containers and host network. -->
    <listen_host>::</listen_host>
    <listen_host>0.0.0.0</listen_host>
    <listen_try>1</listen_try>

    <!--
    <logger>
        <console>1</console>
    </logger>
    -->
</clickhouse>
```
