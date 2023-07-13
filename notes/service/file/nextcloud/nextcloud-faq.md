---
title: Nextcloud FAQ
tags:
- FAQ
---

# Nextcloud FAQ

## su as

- 有些时候无法 `docker exec -u www-data`
- kubectl 不支持 -u

```bash
su -l www-data -s /bin/bash
cd /var/www/html
export PHP_MEMORY_LIMIT=8G
./occ

tail -f /var/www/html/data/nextcloud.log
```

## nextcloud put 413

发生未知错误

- 调整 nginx、haproxy 最大 body 大小

## Auto provisioning not allowed and user hello does not exist

## Found an Attribute element with duplicated Name

- Keycloak
- (Realm) -> Client Scopes -> role_list (saml) -> Mappers tab -> role list -> 'Single Role Attribute'.

## Command "maintenance:install" is not defined.

应用被重新安装了，因为没有检测到 `/var/www/html/version.php`，需要注意挂载路径

## cURL error 28: Operation timed out after XXXXXX milliseconds

- [#18103](https://github.com/nextcloud/server/issues/18103)

## Error when trying to connect (Host violates local access rules)

配置

```php
'allow_local_remote_servers'=>true,
```

```bash
sudo -u www-data ./occ config:system:set allow_local_remote_servers --value=true --type=boolean
```

## fpm caddy

```
https:// {

      reverse_proxy /loleaflet collabora:9980
      reverse_proxy /hosting/discovery collabora:9980
      reverse_proxy /lool collabora:9980
      reverse_proxy /cool/* collabora:9980
      reverse_proxy /hosting/capabilities collabora:9980
      reverse_proxy /browser collabora:9980


        header {
Strict-Transport-Security max-age=31536000;
        }

	tls internal {
		on_demand
	}

        #redir /.well-known/carddav /remote.php/dav 301
        #redir /.well-known/caldav /remote.php/dav 301

        # .htaccess / data / config / ... shouldn't be accessible from outside
        @forbidden {
                path    /.htaccess
                path    /data/*
                path    /config/*
                path    /db_structure
                path    /.xml
                path    /README
                path    /3rdparty/*
                path    /lib/*
                path    /templates/*
                path    /occ
                path    /console.php
        }

        respond @forbidden 404

}
```

## Collabora Online should expose the same protocol as the server installation. Please check the ssl.enable and ssl.termination settings of your Collabora Online server.


## loading document exception: No acceptable WOPI hosts found matching the target host

```bash
docker run --rm -it -e 'domain=nextcloud.wener.me'
```

- 注意配置 domain

## Refused to send form data to 'https://nextcloud' because it violates the following Content Security Policy directive: "form-action 'self' https://collabora"

- CSP
- form-action 'self'
- 如果是 http 和 https 问题可以配置 `'overwriteprotocol' => 'https'`

```bash
./occ config:system:set overwriteprotocol --value=https
```

## AH00558: apache2: Could not reliably determine the server's fully qualified domain name
Apache 错误信息，不影响
