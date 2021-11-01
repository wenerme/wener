---
title: macOS 微信备份原理
slug: macos-wechat-backup
tags:
  - macOS
  - WeChat
---

# macOS 微信备份原理

iPhone7 32G 用了几年后，微信占了 10G，如果能把微信备份后清除，还能再战两年！

- 微信自身支持备份，但备份后是加密的，无法访问。
- 微信占用空间的主要是图片和视频
- 微信清理不会清除文本
  - 文本消息相对少
  - 想要清除文本消息可以卸载重装

<!-- more -->

- 通过 macOS 备份 iPhone 系统 - 备份时不要加密
  - 备份后位于 `$HOME/Library/Application Support/MobileSync/Backup/`
- 备份后的数据
  - Manifest.{mbdb,db} - mac 备份文件清单
    - Files - 文件清单
      - `fileID TEXT PRIMARY KEY, domain TEXT, relativePath TEXT, flags INTEGER, file BLOB`
        - fileID - 为 备份映射后的文件
        - domain - 应用
        - relativePath - 应用相对路径
      - `select relativePath from Files where domain = 'AppDomain-com.tencent.xin' limit 10`;
        - 微信相关文件
    - Properties
      - `key TEXT PRIMARY KEY, value BLOB`
    - .mbdb - 二进制文件，需要自定义解码逻辑
    - .db - sqlite3 - 新版一般是 sqlite3

```bash
# 打开 Manifest.db
sqlite3 Manifest.db
```

```sql title="常用操作"
-- 查看表
.tables
.tables Chat_%
-- 查看表结构
.schema Chat_ID
```

```sql
-- 关心的文件
select fileID,relativePath from Files
where domain = 'AppDomain-com.tencent.xin' and
(
  relativePath like '%/MM.sqlite'
  or relativePath like '%/WCDB_Contact.sqlite'
  or relativePath like '%/message_%.sqlite'
);

-- 所有 DB 目录下内容
select fileID,relativePath from Files
where domain = 'AppDomain-com.tencent.xin' and relativePath like 'Documents/%/DB/%';

-- 文件数量
select count(*) from Files
where domain = 'AppDomain-com.tencent.xin';
```

- 备份后包含微信数据
  - `message_%d.sqlite` - 聊天对话
    - ChatExt2_ID
    - Chat_ID - 对应一个聊天会话
      - ID 为 userName 或 MD5 的 alias
    - Hello_ID
  - WCDB_Contact.sqlite - 联系人
    - Friend - 好友
    - MassSendContact
    - QQContact - QQ 联系人
  - MM - 消息
    - BottleContactTable4
    - BottleTable4
    - ChatExt2_ID
    - Chat_ID
    - Emoticon1
    - EmoticonPackage05
    - EmoticonUpload_1
    - Friend
    - Friend_Ext
    - MassSendContactTable
    - MessageBizExtTable
    - QQContact
    - RevokeMsgTable
    - friend_meta
  - contactlabel.list - 标签列表

## Friend

| column                  | type    | desc                   |
| ----------------------- | ------- | ---------------------- |
| userName                | text    | WXID、群 ID、公众号 ID |
| type                    | integer | 类型                   |
| certificationFlag       | integer |
| imgStatus               | integer |
| encodeUserName          | text    |
| dbContactLocal          | blob    |
| dbContactOther          | blob    |
| dbContactRemark         | blob    | 联系人备注             |
| dbContactHeadImage      | blob    | 联系人头像             |
| dbContactProfile        | blob    |
| dbContactSocial         | blob    |
| dbContactChatRoom       | blob    | 群信息,XML             |
| dbContactBrand          | blob    |
| \_packed_DBContactTable | blob    |

| userName           | desc        |
| ------------------ | ----------- |
| 100000000@chatroom | 群组会话    |
| `wxid_`            | 标准微信 ID |
| QQ1000000000       |
| gh_123456789abc    | 公众号      |

| encodeUserName   | desc             |
| ---------------- | ---------------- |
| v1_xxxx@stranger | 加密后陌生人姓名 |
| v3_xxxx@stranger | 加密后陌生人姓名 |

| type  |               bin | desc                       |
| ----- | ----------------: | -------------------------- |
| 0     |                 0 | 微信运动                   |
| 1     |                 1 | 微信应用                   |
| 2     |                10 | app + 群                   |
| 3     |                11 | 好友                       |
| 4     |               100 | 群里面的人                 |
| 6     |               110 | 群好友，对方加你，你未通过 |
| 7     |               111 | 群里面的人，而且互为好友   |
| 11    |              1011 | 拉黑别人                   |
| 67    |           1000011 | 标星                       |
| 256   |         100000000 | 删除好友                   |
| 259   |         100000011 | 不让他看我的朋友圈         |
| 65539 | 10000000000000011 | 不看他的朋友圈             |

| bit | desc               |
| --- | ------------------ |
| 1   | 你是否加对方为好友 |
| 2   | 对方是否加你为好友 |
| 3   | 是否群里面的       |
| 4   | 你主动拉黑对方     |
| 7   | 标星               |

## Chat

- Chat\_ 聊天信息
- ChatExt\_ 消息扩展信息

| column     | type    | desc     |
| ---------- | ------- | -------- |
| CreateTime | INTEGER |
| Des        | INTEGER |
| ImgStatus  | INTEGER |
| MesLocalID | INTEGER |
| Message    | TEXT    | 消息内容 |
| MesSvrID   | INTEGER |
| Status     | INTEGER |
| TableVer   | INTEGER |
| Type       | INTEGER | 消息类型 |

| type  | desc          |
| ----- | ------------- |
| 1     | 文本          |
| 3     | 图片          |
| 34    | 语音          |
| 42    | 名片          |
| 43    | 视频          |
| 47    | 表情          |
| 48    | 位置          |
| 49    | 链接          |
| 50    | 视频/语音通话 |
| 62    | 小视频        |
| 10000 | 系统消息      |

# 附录

## WCDB_Contact.sqlite

```sql
-- WCDB_Contact
CREATE TABLE Friend
(
    userName               text primary key on conflict replace,
    type                   integer default 0,
    certificationFlag      integer default 0,
    imgStatus              integer default 0,
    encodeUserName         text,
    dbContactLocal         blob,
    dbContactOther         blob,
    dbContactRemark        blob,
    dbContactHeadImage     blob,
    dbContactProfile       blob,
    dbContactSocial        blob,
    dbContactChatRoom      blob,
    dbContactBrand         blob,
    _packed_DBContactTable blob
);
CREATE TABLE MassSendContact
(
    UsrName    text not null primary key on conflict replace,
    Detail     text,
    ConIntRes1 integer default 0,
    ConIntRes2 integer default 0,
    ConStrRes1 text,
    ConStrRes2 text
);
CREATE TABLE QQContact
(
    UsrName           text not null primary key on conflict replace,
    Uin               integer default 0,
    Type              integer default 0,
    Sex               integer default 0,
    Age               integer default 0,
    ImgKey            integer default 0,
    ExtKey            integer default 0,
    ImgKeyLast        integer default 0,
    ExtKeyLast        integer default 0,
    CreateTime        integer default 0,
    ConIntRes1        integer default 0,
    ConIntRes2        integer default 0,
    ConIntRes3        integer default 0,
    NickName          text,
    Email             text,
    Mobile            text,
    Address           text,
    Sign              text,
    birthday          text,
    FullPY            text,
    ShortPY           text,
    Img               text,
    ConRemark         text,
    ConRemark_PYShort text,
    ConRemark_PYFull  text,
    ConStrRes1        text,
    ConStrRes2        text,
    ConStrRes3        text
);
```

## MM.sqlite

```sql
CREATE TABLE Friend
(
    TableVer     integer default 1,
    UsrName      text not null primary key on conflict replace,
    NickName     text,
    Uin          integer default 0,
    Email        text,
    Mobile       text,
    Sex          integer default 0,
    FullPY       text,
    ShortPY      blob,
    Img          text,
    Type         integer default 0,
    LastChatTime integer default 0,
    Draft        text
);
CREATE TABLE Friend_Ext
(
    UsrName           text not null primary key on conflict replace,
    ConType           integer default 0,
    ConRemark         text,
    ConRemark_PYShort text,
    ConRemark_PYFull  text,
    ConQQMBlog        text,
    ConSMBlog         text,
    ConChatRoomMem    text,
    ConIntRes1        integer default 0,
    ConIntRes2        integer default 0,
    ConIntRes3        integer default 0,
    ConStrRes1        text,
    ConStrRes2        text,
    ConStrRes3        text
);
CREATE TABLE friend_meta
(
    username   text primary key on conflict replace,
    lastUpdate integer,
    intCon1    integer,
    intCon2    integer,
    intCon3    integer,
    strCon1    text,
    strCon2    text,
    strCon3    text
);
CREATE TABLE QQContact
(
    UsrName           text not null primary key on conflict replace,
    Uin               integer default 0,
    Type              integer default 0,
    Sex               integer default 0,
    Age               integer default 0,
    ImgKey            integer default 0,
    ExtKey            integer default 0,
    ImgKeyLast        integer default 0,
    ExtKeyLast        integer default 0,
    CreateTime        integer default 0,
    ConIntRes1        integer default 0,
    ConIntRes2        integer default 0,
    ConIntRes3        integer default 0,
    NickName          text,
    Email             text,
    Mobile            text,
    Address           text,
    Sign              text,
    birthday          text,
    FullPY            text,
    ShortPY           text,
    Img               text,
    ConRemark         text,
    ConRemark_PYShort text,
    ConRemark_PYFull  text,
    ConStrRes1        text,
    ConStrRes2        text,
    ConStrRes3        text
);
CREATE TABLE RevokeMsgTable
(
    MSG_REVOKE_COL_SVRID   bigint  default 0 primary key,
    MSG_REVOKE_COL_CONTENT text,
    MSG_REVOKE_COL_INTRES1 integer default 0,
    MSG_REVOKE_COL_INTRES2 bigint  default 0,
    MSG_REVOKE_COL_INTRES3 bigint  default 0,
    MSG_REVOKE_COL_STRRES1 text,
    MSG_REVOKE_COL_STRRES2 text,
    MSG_REVOKE_COL_STRRES3 text,
    _packed_RevokeMessage  blob
);
CREATE TABLE Emoticon1
(
    MD5        text,
    Message    text,
    Type       integer default 0,
    CreateTime integer default 0,
    Len        integer default 0,
    Status     integer default 0,
    Catalog    text,
    CatelogID  integer default 0,
    Draft      text,
    ConIntRes1 integer default 0,
    ConIntRes2 integer default 0,
    ConIntRes3 integer default 0,
    ConStrRes1 text,
    ConStrRes2 text,
    ConStrRes3 text
);
CREATE TABLE EmoticonUpload_1
(
    UsrName    text,
    MesLocalID text,
    MD5        text,
    Type       integer default 0,
    Message    text,
    CreateTime integer default 0,
    SendTime   integer default 0,
    Offset     integer default 0,
    Len        integer default 0,
    Status     integer default 0,
    Catalog    text,
    CatelogID  integer default 0,
    Draft      text,
    ConIntRes1 integer default 0,
    ConIntRes2 integer default 0,
    ConIntRes3 integer default 0,
    ConStrRes1 text,
    ConStrRes2 text,
    ConStrRes3 text
);
CREATE TABLE BottleTable4
(
    BottleLocalID        integer primary key autoincrement,
    BottleSvrID          integer default 0,
    BottleEncryptUsrName text,
    BottleID             text,
    BottleExt            text
);
CREATE TABLE BottleContactTable4
(
    BottleContactUsrName     text not null primary key on conflict replace,
    BottleContactNickName    text,
    BottleContactSex         integer default 0,
    BottleContactImgStatus   text,
    BottleContactHDImgStatus text,
    BottleContactProvince    text,
    BottleContactCity        text,
    BottleContactSign        text,
    BottleContactImgKey      integer default 0,
    BottleContactImgKeyLast  integer default 0,
    BottleContactExtKey      integer default 0,
    BottleContactExtKeyLast  integer default 0,
    BottleContactINTRES1     integer default 0,
    BottleContactINTRES2     integer default 0,
    BottleContactINTRES3     integer default 0,
    BottleContactTEXTRES1    text,
    BottleContactTEXTRES2    text,
    BottleContactTEXTRES3    text
);
CREATE TABLE MassSendContactTable
(
    UsrName    text not null primary key on conflict replace,
    Detail     text,
    ConIntRes1 integer default 0,
    ConIntRes2 integer default 0,
    ConStrRes1 text,
    ConStrRes2 text
);
CREATE TABLE MessageBizExtTable
(
    chatUsername            text,
    msgLocalId              integer,
    msgType                 integer,
    msgInnerType            integer,
    bizId                   text,
    msgExtColInt1           integer,
    msgExtColInt2           integer,
    msgExtColString1        text,
    msgExtColString2        text,
    _packed_DBMessageBizExt blob
);
CREATE TABLE EmoticonPackage05
(
    EmoticonPackageId          text not null primary key on conflict replace,
    EmoticonPackageName        text,
    EmoticonPackageIconUrl     text,
    EmoticonPackagePannelUrl   text,
    EmoticonPackagePStatus     integer default 0,
    EmoticonPackageDLStatus    integer default 0,
    EmoticonPackageInstallTime integer default 0,
    EmoticonPackageRemoveTime  integer default 0,
    ConIntRes1                 integer default 0,
    ConIntRes2                 integer default 0,
    ConIntRes3                 integer default 0,
    ConStrRes1                 text,
    ConStrRes2                 text,
    ConStrRes3                 text
);
CREATE TABLE Chat
(
    TableVer   integer default 1,
    MesLocalID integer primary key autoincrement,
    MesSvrID   bigint  default 0,
    CreateTime integer default 0,
    Message    text,
    Status     integer default 0,
    ImgStatus  integer default 0,
    Type       integer,
    Des        integer
);
CREATE TABLE ChatExt2
(
    MesLocalID  integer primary key,
    msgFlag     integer default 0,
    ConIntRes2  integer default 0,
    ConIntRes3  integer default 0,
    MsgSource   text,
    MsgIdentify text,
    ConStrRes1  text,
    ConStrRes2  text,
    ConStrRes3  text,
    ConIntRes1  integer default 0
);
```

## `message_%d.sqlite`

```sql
CREATE TABLE Chat_ID
(
    CreateTime INTEGER DEFAULT 0,
    Des        INTEGER,
    ImgStatus  INTEGER DEFAULT 0,
    MesLocalID INTEGER PRIMARY KEY AUTOINCREMENT,
    Message    TEXT,
    MesSvrID   INTEGER DEFAULT 0,
    Status     INTEGER DEFAULT 0,
    TableVer   INTEGER DEFAULT 1,
    Type       INTEGER
);
CREATE TABLE ChatExt2_ID
(
    ConIntRes1  INTEGER DEFAULT 0,
    ConIntRes2  INTEGER DEFAULT 0,
    ConIntRes3  INTEGER DEFAULT 0,
    ConStrRes1  TEXT,
    ConStrRes2  TEXT,
    ConStrRes3  TEXT,
    MesLocalID  INTEGER PRIMARY KEY,
    msgFlag     INTEGER DEFAULT 0,
    MsgIdentify TEXT,
    MsgSource   TEXT
);
CREATE TABLE Hello_ID
(
    ConIntRes1 INTEGER DEFAULT 0,
    ConIntRes2 INTEGER DEFAULT 0,
    ConIntRes3 INTEGER DEFAULT 0,
    ConStrRes1 TEXT,
    ConStrRes2 TEXT,
    ConStrRes3 TEXT,
    CreateTime INTEGER DEFAULT 0,
    Des        INTEGER,
    ImgStatus  INTEGER DEFAULT 0,
    MesLocalID INTEGER PRIMARY KEY AUTOINCREMENT,
    Message    TEXT,
    MesSvrID   INTEGER DEFAULT 0,
    OpCode     INTEGER DEFAULT 0,
    Status     INTEGER DEFAULT 0,
    TableVer   INTEGER DEFAULT 1,
    Type       INTEGER,
    UsrName    TEXT
);
```

# 参考

- https://www.jianshu.com/p/07a8d87e698b
