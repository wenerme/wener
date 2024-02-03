---
tags:
  - Awesome
---

# LDAP Awesome

| ref       | for              |
| --------- | ---------------- | ---- |
| [rfc2251] | LDAPv3           | 1997 |
| [rfc2252] | Attribute Syntax |

[rfc2252]: https://www.rfc-editor.org/rfc/rfc2252
[rfc2251]: https://www.rfc-editor.org/rfc/rfc2251

## Server

- [OpenLDAP](./openldap.md)
- [Apache Directory Server](./apacheds.md)
- [OpenDJ](https://github.com/OpenIdentityPlatform/OpenDJ)
- Kanidm
- 389 Directory Server
- Active Directory
- Apple Open Directory
- eDirectory
- Red Hat Directory Server
- Oracle Internet Directory
- Sun Java System Directory Server
- OpenDS
- Oracle Unified Directory
- IBM Tivoli Directory Server
- Windows NT Directory Services (NTDS)
- Critical Path Directory Server
- Lotus Domino
- Nexor Directory
- Novell eDirectory
- [erthink/ReOpenLDAP](https://github.com/erthink/ReOpenLDAP)
- https://directory.fedoraproject.org/

## Lightweight LDAP Server

- [glauth/glauth](./glauth.md)
  - MIT, Go
  - LDAP server for development, home use, or CI
  - 支持能力管理
- [nitnelave/lldap](https://github.com/nitnelave/lldap)
  - GPLv3, Rust
  - GraphQL - https://github.com/nitnelave/lldap/blob/main/schema.graphql
  - JWT Auth
  - WebUI 管理用户
  - 不支持 LDAPS, HTTPS
- [majewsky/portunus](https://github.com/majewsky/portunus)
  - GPLv3, Go
  - Self-contained user/group management and authentication service

## Library

- Server
  - [openstandia/ldap-pg](https://github.com/openstandia/ldap-pg)
    - GPLv2, Go
    - LDAP server with PostgreSQL as the backend
  - [vjeantet/ldapserver](https://github.com/vjeantet/ldapserver)
    - GPLv2, Go
  - [jimlambrt/gldap](https://github.com/jimlambrt/gldap)
    - MIT, Go
    - Build LDAP services w/ Go
- Client
  - [go-ldap/ldap](https://github.com/go-ldap/ldap)
    - MIT, Go
    - LDAP v3
  - [FreeDSx/LDAP](https://github.com/FreeDSx/LDAP)
    - MIT, PHP
  - [DirectoryTree/LdapRecord](https://github.com/DirectoryTree/LdapRecord)
    - MIT, PHP
    - Active Record ORM that makes working with LDAP
  - [Adldap2/Adldap2](https://github.com/Adldap2/Adldap2)
  - [pwm-project/pwm](https://github.com/pwm-project/pwm)
- [ldapjs/node-ldapjs](https://github.com/ldapjs/node-ldapjs)
  - MIT, JS
  - Server+Client
- https://github.com/lucianweber/ldap-jwt
- [ltb-project/self-service-password](https://github.com/ltb-project/self-service-password)
  - GPLv3, PHP
- [lkarlslund/Adalanche](https://github.com/lkarlslund/Adalanche)
  - AGPLv3, Go
  - Active Directory ACL Visualizer and Explorer
- mgmt
  - [fusiondirectory/fusiondirectory](https://github.com/fusiondirectory/fusiondirectory)
    - GPLv2, PHP
  - [LDAPAccountManager/lam](https://github.com/LDAPAccountManager/lam)
    - PHP
    - https://hub.docker.com/r/ldapaccountmanager/lam
  - [eryajf/go-ldap-admin](https://github.com/eryajf/go-ldap-admin)
    - GPLv3, Go+Vue
  - http://www.ldapadmin.org/
    - [osixia/docker-phpLDAPadmin](https://github.com/osixia/docker-phpLDAPadmin)
- [CroweCybersecurity/ad-ldap-enum](https://github.com/CroweCybersecurity/ad-ldap-enum)
  - MIT, Python
  - LDAP based Active Directory user and group enumeration tool
- [projectdiscovery/interactsh](https://github.com/projectdiscovery/interactsh)
- Tools
  - The LDIF Merge Tool https://docs.oracle.com/cd/E19850-01/816-6400-10/mmldif.html

```bash
# http://localhost:8080/
# /etc/ldap-account-manager
# /var/lib/ldap-account-manager
# https://github.com/LDAPAccountManager/lam/blob/develop/lam-packaging/docker/.env
docker run -it --rm \
  -p 8080:80 \
  -e LDAP_SERVER=ldap://ldap:389 \
  -e LDAP_USER=cn=admin,dc=wener,dc=me \
  -e LDAP_DOMAIN=wener.me \
  -e LDAP_BASE_DN=dc=wener,dc=me \
  -e LDAP_USERS_DN=ou=users,dc=wener,dc=me \
  -e LDAP_GROUPS_DN=ou=groups,dc=wener,dc=me \
  -e LAM_PASSWORD=master \
  -e LAM_LANG=zh_CN \
  --name lam ldapaccountmanager/lam:stable

# PHPLDAPADMIN_SERVER_PATH=/phpldapadmin
# /container/service/phpldapadmin/assets/config/config.php
docker run --rm -it \
  -p 6443:443 -p 8080:80 \
  -e PHPLDAPADMIN_HTTPS=false \
  -e PHPLDAPADMIN_LDAP_HOSTS=ldap.example.com \
  --name phpldapadmin osixia/phpldapadmin
```

---

- https://github.com/bbbbbrie/awesome-ldap
- https://github.com/osixia/docker-openldap
- https://therubyist.org/2020/04/03/ldap-in-containers/
