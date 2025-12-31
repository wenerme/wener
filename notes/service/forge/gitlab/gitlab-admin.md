---
title: GitLab
tags:
  - Ops
  - Service
  - GitLab
  - DevOps
---

# GitLab

- [galexrt/presentation-gitlab-k8s](https://github.com/galexrt/presentation-gitlab-k8s)
- [Omnibus GitLab](https://docs.gitlab.com/omnibus/README.html)
  - Omnibus is a way to package different services and tools required to run GitLab, so that most users can install it without laborious configuration.

> [!NOTE]
> 如果意外关闭，可能 postgresql 启动不了 - 需要删除 `postmaster.pid`

```bash
# https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template
# --env GITLAB_OMNIBUS_CONFIG="external_url 'http://my.domain.com/'; gitlab_rails['lfs_enabled'] = true;" \
docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest

docker exec -it gitlab vim /etc/gitlab/gitlab.rb
docker exec -it gitlab update-permissions
docker exec -it gitlab gitlab-ctl reconfigure

docker restart gitlab
```

- [Prometheus eats disk space in /var/opt/gitlab/prometheus/data](https://gitlab.com/gitlab-org/omnibus-gitlab/issues/4166)

## docker registry

- [Container Registry definition](https://docs.gitlab.com/ee/administration/packages/container_registry.html)
- [Enable the Container Registry](https://docs.gitlab.com/ee/administration/packages/container_registry.html#enable-the-container-registry)

```yaml
registry:
  enabled: true
  host: registry.gitlab.example.com
  port: 5005
  api_url: http://localhost:5000/
  key: config/registry.key
  path: shared/registry
  issuer: gitlab-issuer
```

```ini
[alias]
    mr = !sh -c 'git fetch $1 merge-requests/$2/head:mr-$1-$2 && git checkout mr-$1-$2' -
```

```bash
# https://gitlab.com/help/user/project/merge_requests/index.md#checkout-merge-requests-locally
# mr-origin-4
git mr origin 4
```
