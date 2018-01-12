# Jetbrains

## Tips
* https://hub.docker.com/u/jetbrains/

```bash
docker run -it --name teamcity-server-instance  \
  -v ./datadir:/data/teamcity_server/datadir \
  -v ./logs:/opt/teamcity/logs  \
  -p 8111:8111 \
  jetbrains/teamcity-server


docker run -it --name upsource-server-instance \
  -v <path to data directory>:/opt/upsource/data \
  -v <path to conf directory>:/opt/upsource/conf \
  -v <path to logs directory>:/opt/upsource/logs \
  -v <path to backups directory>:/opt/upsource/backups \
  -p <port on host>:8080 \
  jetbrains/upsource:<version>.<build>

mkdir -p -m 750 <path to data directory> <path to logs directory> \
    <path to conf directory> <path to backups directory>
chown -R 13001:13001 <path to data directory> <path to logs directory> \
    <path to conf directory> <path to backups directory>
```
