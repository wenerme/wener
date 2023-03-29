---
title: Jenkins
---

# Jenkins

- [jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)
- 系统要求
  - 4GB+ 内存
  - 50GB+ 磁盘

## Docker

- [jenkinsci/docker](https://github.com/jenkinsci/docker)
  - jenkins/jenkins
    - lts-alpine
      - 只有 amd64
    - lts-jdk11
      - debian
      - amd64, arm64
    - lts-jdk17
  - /var/jenkins_home
- 50000
  - agent

```bash
docker run --rm -it \
  -v $PWD/data:/var/jenkins_home \
  -p 8080:8080 -p 50000:50000 \
  --name jenkins jenkins/jenkins:lts-jdk11
```
