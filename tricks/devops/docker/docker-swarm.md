---
id: docker-swarm
title: Docker Swarm
---

# Docker Swarm

## Tips

* 可备份 swarm 的状态,以便以后恢复 `/var/lib/docker/swarm/raft`

```bash
# 初始化 Swarm
docker swarm init --advertise-addr <MANAGER-IP>
# 加入该 Swarm 的 Wroker 执行的命令
docker swarm join-token worker
# 加入该 Swarm 的 manager 执行的命令
docker swarm join-token manager
# 查看节点
docker node ls
# 提升节点为主节点
docker node promote node-3
# 离开 Swarm
docker swarm leave
# 移除节点
docker node rm node-2
# 创建网络
docker network create --driver overlay my-network
# 使服务运行在网络中
docker service create --replicas 3 --network my-network --name my-web nginx
# 启动一个 busybox 用于测试网络
docker service create --name my-busybox --network my-network busybox sleep 3000
# 在执行 my-busybox 的节点上可通过 docker exec -it my-busybox.1.1dok2cmx2mln5hbqve8ilnair sh 进入交互
# 查看 my-web 这个服务的 vip
# nslookup my-web
# 查看 my-web 后所有 container 的信息
# nslookup tasks.my-web
# 可测试服务是否正常
# wget -O- 10.0.0.5


# 添加 Label
docker node update --label-add TYPE=main myhost
# 查看所有的 Label
docker node inspect hd2-1 --format '{{range $k,$v:=.Spec.Labels}}{{$k}}={{$v}}{{"\n"}}{{end}}'
# 在指定的节点上执行
docker service create --name tool --replicas=1 --container-label TYPE=main --network=pwork --mount type=bind,src=/data,dst=/data ubuntu bash
```

## Pitfall

### 18.03
* 关于 Swarm Network 的问题也还有非常多
* https://github.com/moby/moby/issues?q=is%3Aopen+is%3Aissue+label%3Aarea%2Fswarm+label%3Aarea%2Fnetworking

### 1.21.1
* 跨主机的 Overlay 依然有问题
* Label 经常不生效
* [#25325 Docker 1.12 swarm mode load balancing not consistently working](https://github.com/docker/docker/issues/25325)


## Reference

* [Lessons learned from using Docker Swarm mode in production](http://blog.bugsnag.com/container-orchestration-with-docker-swarm-mode)
  * [HN](https://news.ycombinator.com/item?id=12508711)
* 学习资源
  * https://github.com/yeasy/docker_practice/
