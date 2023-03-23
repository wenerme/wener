/*
 users
    othergroups 为逗号分隔的分组 uid
    custattr 为 json 格式的自定义属性


 capabilities 控制用户 LDAP 操作权限 - action -> *,search
 */

CREATE TABLE users
(
    id            INTEGER PRIMARY KEY,
    name          TEXT    NOT NULL,
    uidnumber     INTEGER NOT NULL,
    primarygroup  INTEGER NOT NULL,
    othergroups   TEXT     DEFAULT '',
    givenname     TEXT     DEFAULT '',
    sn            TEXT     DEFAULT '',
    mail          TEXT     DEFAULT '',
    loginshell    TYEXT    DEFAULT '',
    homedirectory TEXT     DEFAULT '',
    disabled      SMALLINT DEFAULT 0,
    passsha256    TEXT     DEFAULT '',
    passbcrypt    TEXT     DEFAULT '',
    otpsecret     TEXT     DEFAULT '',
    yubikey       TEXT     DEFAULT '',
    sshkeys       TEXT     DEFAULT '',
    custattr      TEXT     DEFAULT '{}'
);
CREATE UNIQUE INDEX idx_user_name on users (name);
CREATE TABLE groups
(
    id        INTEGER PRIMARY KEY,
    name      TEXT    NOT NULL,
    gidnumber INTEGER NOT NULL
);
CREATE UNIQUE INDEX idx_group_name on groups (name);
CREATE TABLE includegroups
(
    id             INTEGER PRIMARY KEY,
    parentgroupid  INTEGER NOT NULL,
    includegroupid INTEGER NOT NULL
);
CREATE TABLE capabilities
(
    id     INTEGER PRIMARY KEY,
    userid INTEGER NOT NULL,
    action TEXT    NOT NULL,
    object TEXT    NOT NULL
);