---
title: spicedb
---

# spicedb

- [authzed/spicedb](https://github.com/authzed/spicedb)
  - 支持数据库: PostgreSQL, CockroachDB, Cloud Spanner, memdb
- Authzed Cloud: < 1M 关系记录免费
- 参考
  - Playground https://play.authzed.com/
  - [authzed/connector-postgresql](https://github.com/authzed/connector-postgresql)
    - Import PostgreSQL foreign key relationships into SpiceDB
  - [User Defined Roles](https://authzed.com/blog/user-defined-roles)

```
document:specificdocument#reader@user:specificuser
|_______________________| |____| |_______________|
        resource         relation     subject
```

- API - [authzed.api.v1](https://buf.build/authzed/api/docs/main:authzed.api.v1)
- PermissionsService
  - CheckPermission
    - resource,permission,subject
    - consistency
  - ExpandPermissionTree
  - LookupResources
  - {Read,Write,Delete}Relationships
- SchemaService
- WatchService

```bash
# Docker
docker run --rm -it \
  -p 50051:50051 \
  --name spicedb authzed/spicedb serve \
  --grpc-preshared-key "PSK"

# macOS Brew
brew install spicedb
# --grpc-preshared-key "PSK"
SPICEDB_GRPC_PRESHARED_KEY=PSK spicedb serve

# zed 作为 spicedb 客户端
brew install zed

zed context set local localhost:50051 "PSK" --insecure
zed schema read --insecure
```

```
definition user {}

definition organization {
  relation administrator: user
  permission view_all_documents = administrator
}

definition team {
  relation member: user
}

definition document {
  relation owner_org: organization

  relation reader: user | team#member
  relation writer: user

  permission view = reader + owner_org->view_all_documents
  permission edit = view + writer

  relation peek: user | anonymoususer:*
  relation retrive: service#token
}

definition anonymoususer {}

definition token {}
definition service {
    token: token
}
```

- 需要在某个地方维护 匿名 用户 ID
- https://play.authzed.com/s/qli9YpRRUg3x
