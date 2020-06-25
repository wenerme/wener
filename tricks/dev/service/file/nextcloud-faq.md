---
id: nextcloud-faq
title: Nextcloud FAQ
---

# Nextcloud FAQ

## Auto provisioning not allowed and user hello does not exist

## Found an Attribute element with duplicated Name
* Keycloak
* (Realm) -> Client Scopes -> role_list (saml) -> Mappers tab -> role list -> 'Single Role Attribute'.

## Command "maintenance:install" is not defined.
应用被重新安装了，因为没有检测到 `/var/www/html/version.php`，需要注意挂载路径

## cURL error 28: Operation timed out after XXXXXX milliseconds 
* [#18103](https://github.com/nextcloud/server/issues/18103)
