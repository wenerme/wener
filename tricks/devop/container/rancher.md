# Rancher

## Tips
[Rancher](http://rancher.com/)


## Get started

```bash
docker run -d --restart=always --name=rs -p 8080:8080 rancher/server
docker logs -f rs
# docker-machine ip default
# 如果 agent 和 server 允许在同一个主机上,必须设置 CATTLE_AGENT_IP 为 server 的内部 IP
# 例如 172.17.0.2

```
