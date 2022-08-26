---
title: LDAP Command line
---

# ldap cli

- ldapmodify
- ldapadd -> `ldapmodify -a`
- modifyDN -> rename
- /etc/openldap/ldap.conf
- filter - [RFC2254](https://www.rfc-editor.org/rfc/rfc2254.html)
  - attribute/value assertion
  - `(k=v)`
  - `(&(k=v)(k2=v2))`
  - `(k=*)` - 存在 k
  - `=`,`<=`,`>=`,`~=`
  - `!`,`|`,`&`
  - `*` 通配符

| common        | for                         |
| ------------- | --------------------------- |
| -c            | ignore error                |
| -D binddn     |                             |
| -f file       |
| -h host       |
| -H ldapuri    |                             |
| -n            | dry run                     |
| -p port       |
| -P protocol   | 2,3                         |
| -v            | verbose                     |
| -W            | ask password                |
| -w passwd     |                             |
| -x            | simple auth instead of SASL |
| -y passwdfile |

```conf title="/etc/openldap/ldap.conf"
BASE dc=wener,dc=me
URI ldap://ip
TLS_CACERTDIR /etc/openldap/certs
```

| ldapsearch     | for                                     |
| -------------- | --------------------------------------- |
| -u             | output dn                               |
| -t             | binary to file                          |
| -tt            | all values to file                      |
| -T path        | TMPDIR                                  |
| -F prefix      | URL prefix for temporary files          |
| -A             | attributes only                         |
| -L             | output LDIFv1                           |
| -LL            | output LDIFv1 without comment           |
| -LLL           | output LDIFv1 without comment & version |
| -S sort-attr   | sort by attr                            |
| -b base        |                                         |
| -s scope       | base,one,**sub**,children               |
| -a alias-deref | never,always,search,find                |
| -l timelimit   |                                         |
| -z sizelimit   |                                         |
| -M             | DSA IT                                  |

[ldapsearch.1]: https://www.openldap.org/software/man.cgi?query=ldapsearch&apropos=0&sektion=0&manpath=OpenLDAP+2.6-Release&arch=default&format=html

```bash
# 修改密码 - 只能修改自己的
# LDAPv3 Password Modify (RFC 3062)
ldappasswd -x -D uid=admin,ou=users,dc=wener,dc=me -w secret -s new

# namingContexts
ldapsearch -LLL -x -b '' -s base '(objectClass=*)' namingContexts

# 生成密码
# -m module.so
slappasswd -h {SSHA} -s secret
```

## modify

- changetype
  - modify
    - replace: attr
  - add
    - add: attr
    - 多值属性值不能相同
  - delete
    - delete: attr - 未指定则删除 entry
- `-` 分隔 多个操作

```ldif
dn: cn=ToModify,dc=example,dc=com
changetype: modify
replace: mail
mail: new@email.com
-
changetype: add
add: foo
foo: bar
-
changetype: delete
delete: unneededEntry
```

- RFC 4511 LDAP: the protocol
- RFC 4512 LDAP: directory information models
