---
title: Joomla
tags:
  - Ops
  - Service
  - CMS
  - Joomla
---

# Joomla

- [Installing Joomla](https://docs.joomla.org/J3.x:Installing_Joomla)

## Docker

- [wordpress](https://hub.docker.com/_/wordpress)
- [joomla](https://hub.docker.com/_/joomla/)
- `joomla:alpine`
  - `-e JOOMLA_DB_HOST=...` (defaults to the IP and port of the linked mysql container)
  - `-e JOOMLA_DB_USER=...` (defaults to "root")
  - `-e JOOMLA_DB_PASSWORD=...` (defaults to the value of the MYSQL_ROOT_PASSWORD environment variable from the linked mysql container)
  - `-e JOOMLA_DB_NAME=...` (defaults to "joomla")

> [!NOTE]
> WP 只支持 MySQL， 但有 REST
> Joomla 支持 PG 但没有官方的 REST，需要可以自己实现
> Joomla docker 不支持 pg [joomla/docker-joomla#42](https://github.com/joomla/docker-joomla/issues/42)

## API

- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [REST API for Joomla 3.0 (Stack Overflow)](https://stackoverflow.com/q/26340885/1870054)
- [Joomla API](https://api.joomla.org/cms-3/graph_class.html)
- [Joomla! CMS](https://github.com/joomla/joomla-cms)
