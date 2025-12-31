---
title: Drupal
tags:
  - Ops
  - Service
  - CMS
  - Drupal
---

# Drupal

- [Drupal](https://www.drupal.org/)
- [Drupal Dockerfile](https://github.com/docker-library/drupal/blob/master/8.5/apache/Dockerfile)
- [NGINX Recipes: Drupal](https://www.nginx.com/resources/wiki/start/topics/recipes/drupal/)
- [drupal-with-nginx](https://github.com/perusio/drupal-with-nginx)

```dockerfile
# https://www.drupal.org/node/3060/release
ENV DRUPAL_VERSION=8.5.5
ENV DRUPAL_MD5=4fee1348bbac85cae82d6634e7296b9f

RUN curl -fSL "https://ftp.drupal.org/files/projects/drupal-${DRUPAL_VERSION}.tar.gz" -o drupal.tar.gz \
 && echo "${DRUPAL_MD5} *drupal.tar.gz" | md5sum -c - \
 && tar -xz --strip-components=1 -f drupal.tar.gz \
 && rm drupal.tar.gz \
 && chown -R www-data:www-data sites modules themes
```

```bash
DRUPAL_VERSION=8.5.5
DRUPAL_MD5=4fee1348bbac85cae82d6634e7296b9f

curl -fSL "https://ftp.drupal.org/files/projects/drupal-${DRUPAL_VERSION}.tar.gz" -o drupal.tar.gz
echo "${DRUPAL_MD5} *drupal.tar.gz" | md5sum -c -
tar -xz --strip-components=1 -f drupal.tar.gz -C drupal
```
