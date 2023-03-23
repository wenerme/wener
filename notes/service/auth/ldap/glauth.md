---
title: glauth
---

# glauth

- [glauth/glauth](https://github.com/glauth/glauth)
  - MIT, Go
  - LDAP server for development, home use, or CI
  - 只用于 Auth 场景 - 只有 user 和 group
  - 支持自定义属性，但不可以用于搜索
  - 默认 cn, ou -> user, group
- 参考
  - [sonicnkt/glauth-ui](https://github.com/sonicnkt/glauth-ui)

```bash
cat << CONF > config.cfg
[backend]
  datastore = "plugin"
  plugin = "sqlite.so"
  pluginhandler = "NewSQLiteHandler"
  database = "/data/glauth.db"
  baseDN = "dc=wener,dc=me"

[ldap]
  enabled = true
  listen = "0.0.0.0:3893"
[ldaps]
  enabled = false
[api]
  enabled = true
  internals = true
  listen = "0.0.0.0:5555"
CONF

docker run --rm -it \
  -v $PWD:/app/config/ \
  -v $PWD/data:/data \
  -p 3893:3893 -p 5555:5555 \
  --name glauth glauth/glauth-plugins

sqlite3 data/glauth.db .schema
sqlite3 data/glauth.db 'INSERT INTO groups(name, gidnumber) VALUES('users', 5501);'
sqlite3 data/glauth.db 'INSERT INTO users(name,uidnumber,primarygroup,passsha256) VALUES("wener",1000,5501,"652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0")'
sqlite3 data/glauth.db 'INSERT INTO capabilities(userid, action, object) VALUES(5001, "search", "ou=users,dc=wener,dc=me");'



ldapsearch -LLL -H ldap://localhost:3893 \
   -D cn=wener,ou=users,dc=wener,dc=me -w mysecret \
   -x -bdc=wener,dc=me cn=wener
```

**hardcode**

- 不需要数据库

```ini
[backend]
  datastore = "config"
  baseDN = "dc=glauth,dc=com"
[[users]]
  name = "hackers"
  uidnumber = 5001
  primarygroup = 5501
  passsha256 = "6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a"   # dogood
  sshkeys = [ "ssh-dss AAAAB3..." ]
[[users]]
  name = "uberhackers"
  uidnumber = 5006
  primarygroup = 5501
  passbcrypt = "243261243130244B62463462656F7265504F762E794F324957746D656541326B4B46596275674A79336A476845764B616D65446169784E41384F4432"   # dogood
[[groups]]
  name = "superheros"
  gidnumber = 5501
```

- https://github.com/glauth/glauth/blob/master/v2/sample-simple.cfg

```ini
debug = true
# syslog = true
# structuredlog = true
# 配置热加载 - 不支持 [ldap], [ldaps], [backend], [api]
# watchconfig = true
# yubikeyclientid = "yubi-api-clientid"
# yubikeysecret = "yubi-api-secret"

[ldap]
  enabled = true
  listen = "0.0.0.0:3893"
[ldaps]
# to enable ldaps genrerate a certificate, eg. with:
# openssl req -x509 -newkey rsa:4096 -keyout glauth.key -out glauth.crt -days 365 -nodes -subj '/CN=`hostname`'
  enabled = false
  listen = "0.0.0.0:3894"
  cert = "glauth.crt"
  key = "glauth.key"

[backend]
  datastore = "config"
  baseDN = "dc=glauth,dc=com"
  nameformat = "cn"
  groupformat = "ou"

# REST API
[api]
  enabled = true
  internals = true # debug application performance
  tls = false # enable TLS for production!!
  listen = "0.0.0.0:5555"
  cert = "cert.pem"
  key = "key.pem"
```

- datastore
  - config
  - ldap - 指向已有的 LDAP

## SQLite

```sql
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	uidnumber INTEGER NOT NULL,
	primarygroup INTEGER NOT NULL,
	othergroups TEXT DEFAULT '',
	givenname TEXT DEFAULT '',
	sn TEXT DEFAULT '',
	mail TEXT DEFAULT '',
	loginshell TYEXT DEFAULT '',
	homedirectory TEXT DEFAULT '',
	disabled SMALLINT  DEFAULT 0,
	passsha256 TEXT DEFAULT '',
	passbcrypt TEXT DEFAULT '',
	otpsecret TEXT DEFAULT '',
	yubikey TEXT DEFAULT '',
	sshkeys TEXT DEFAULT '',
	custattr TEXT DEFAULT '{}');
CREATE UNIQUE INDEX idx_user_name on users(name);
CREATE TABLE groups (id INTEGER PRIMARY KEY, name TEXT NOT NULL, gidnumber INTEGER NOT NULL);
CREATE UNIQUE INDEX idx_group_name on groups(name);
CREATE TABLE includegroups (id INTEGER PRIMARY KEY, parentgroupid INTEGER NOT NULL, includegroupid INTEGER NOT NULL);
CREATE TABLE capabilities (id INTEGER PRIMARY KEY, userid INTEGER NOT NULL, action TEXT NOT NULL, object TEXT NOT NULL);
```
