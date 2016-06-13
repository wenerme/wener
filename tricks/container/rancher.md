# [Rancher](http://rancher.com/)


## Get started

```bash
docker run -d --restart=always --name=rs -p 8080:8080 rancher/server
docker logs -f rs
# docker-machine ip default
# 如果 agent 和 server 允许在同一个主机上,必须设置 CATTLE_AGENT_IP 为 server 的内部 IP
# 例如 172.17.0.2
docker run -e CATTLE_AGENT_IP="172.17.0.2"  -d --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.0.1 http://192.168.99.100:8080/v1/scripts/F45B5769CA99955D21C4:1464494400000:bUpxJ4M5aHYeVslBoV8pRAg0UVI

docker run --name rs-instantce -e CATTLE_AGENT_IP="139.196.177.100"  -d --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.0.1 http://d.yikaiye.com:18080/v1/scripts/921BCCF5C6EA1E2DD3D2:1464930000000:S1rHp6S589wbDSsJjxAr6msSRCE
```
