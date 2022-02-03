---
title: crawlab
---

# crawlab

- [crawlab-team/crawlab](https://github.com/crawlab-team/crawlab) 是什么？
  - 爬虫管理平台
  - BSD-3, Go+Vue
  - 依赖 MongoDB 3.6+
  - 区分 Master 和 Worker 角色
  - 使用 SeaweeFS 提供存储同步

```bash
# master 包含了 nginx, backend, frontend, seaweedfs
cat <<YAML > docker-compose.yml
version: '3.3'
services:
  master:
    image: crawlabteam/crawlab:latest
    container_name: crawlab_example_master
    environment:
      CRAWLAB_NODE_MASTER: "Y"
      CRAWLAB_MONGO_HOST: "mongo"
    volumes:
      - "./.crawlab/master:/root/.crawlab"
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  worker01:
    image: crawlabteam/crawlab:latest
    container_name: crawlab_example_worker01
    environment:
      CRAWLAB_NODE_MASTER: "N"
      CRAWLAB_GRPC_ADDRESS: "master"
      CRAWLAB_FS_FILER_URL: "http://master:8080/api/filer"
    volumes:
      - "./.crawlab/worker01:/root/.crawlab"
    depends_on:
      - master

  worker02:
    image: crawlabteam/crawlab:latest
    container_name: crawlab_example_worker02
    environment:
      CRAWLAB_NODE_MASTER: "N"
      CRAWLAB_GRPC_ADDRESS: "master"
      CRAWLAB_FS_FILER_URL: "http://master:8080/api/filer"
    volumes:
      - "./.crawlab/worker02:/root/.crawlab"
    depends_on:
      - master

  mongo:
    image: mongo:latest
    container_name: crawlab_example_mongo
    restart: always
YAML
docker-compose up
```
