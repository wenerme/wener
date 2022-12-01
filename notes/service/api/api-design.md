---
tags:
  - Design
---

# API Design

:::tip

- grpc 内部默认 4mb buffer

:::

- Google Cloud API [常见设计模式](https://cloud.google.com/apis/design/design_patterns)
  - `[start_xxx, end_xxx)`
  - `map<string, string> labels`
- https://github.com/Microsoft/api-guidelines
- https://cloud.google.com/apis/design/
- https://opensource.zalando.com/restful-api-guidelines/
  - [zalando/zally](https://github.com/zalando/zally)
    - API linter
- https://apistylebook.com/
  - http://apistylebook.com/design/guidelines/
- https://github.com/restcookbook/restcookbook
- [Atlassian REST API design guidelines version 1](https://developer.atlassian.com/server/framework/atlassian-sdk/atlassian-rest-api-design-guidelines-version-1/)
  - 集合名字 singular
- [adidas/api-guidelines](https://github.com/adidas/api-guidelines)
  - https://adidas.gitbook.io/api-guidelines/
- https://github.com/interagent/http-api-design
- [WhiteHouse/api-standards](https://github.com/WhiteHouse/api-standards)

## pagination

- Offset/Limit
  - offset+limit
- Cursor/Limit
  - cursor+limit
  - 时间: until, since
- Zalando
  - sort - `+id,-name`,`-id`
    - `+` asc, `-` desc
- Google API
  - order_by - `field [asc|desc],...`
- MS API
  - orderBy=name desc,hireDate

```json title="Meta GQL.json"
{
  "data": [],
  "paging": {
    "cursors": {
      "after": "XYZ=",
      "before": "XYZ="
    },
    "previous": "https://?limit=25&before=XYZ=",
    "next": "https://?limit=25&after=XYZ="
  }
}
```

```json title="Twitter.json"
{
  "ids": [123],
  "next_cursor": 123,
  "next_cursor_str": "123",
  "previous_cursor": -123,
  "previous_cursor_str": "-123"
}
```

```json "Zalando.json"
{
  "items": [],
  "self": "http://?cursor=",
  "first": "",
  "prev": "",
  "next": "",
  "last": "",
  "query": {}
}
```

- 参考
  - https://developers.facebook.com/docs/graph-api/results

## Zalando

- 查询参数
  - q
  - sort - `+id,-name`,`-id`
    - `+` asc, `-` desc
  - fields - `(name,friends(name))`
    - 获取部分字段
  - embed - `(items)`
    - 包含关联属性
  - offset
  - cursor
  - limit

## Google Cloud

- `fields=name,generation,size`
- `fields=items(id,metadata/key1)`
- https://cloud.google.com/storage/docs/json_api#partial-response

## gRPC API Design

- 接口面向资源
- 资源名字
  - 资源 **必须** 包含资源名字
  - _可以_ 包含 `<resource>_id`
  - _可以_ 包含 `uid`
  - ID 字段 _应该_ 为 字符串
  - 例如
    - `teams/first/members/wener`
    - `users/wener`
  - 完整资源名字
    - `服务名字/资源名字`
    - `//library.wener.me/publishers/123/books/456`
      - 对于的类型 `library.wener.me/Publisher`, `library.wener.me/Book`
- 集合资源名字
  - 复数、驼峰
  - `users/wener/events/hello-world`
  - 可以考虑支持跨集合
    - `publishers/-/books/{book}`
    - `users/-/events?filter=`
- 资源类型 - {Service Name}/{Type}
  - ServiceName
  - Type
- GetResource(GetResourceRequest) returns (Resource)
  - GetResourceRequest#name -- 资源名字 -> `publishers/{publisher}/books/{book}`
- ListResources(ListResourceRequest) returns (ListResourceResponse)
  - ListResourceRequest#
    - parent - 上级集合 -> `publishers/*`
    - page_size
    - page_token - 尽量前端不可逆
    - skip - 可选实现
    - order_by - `field [asc|desc],...`
    - filter - [AIP-160](https://google.aip.dev/160)
      - `a AND b OR NOT c` - OR 优先级高于 AND
      - `NOT a` = `-a`
      - `=,!=,>,<,>=,<=`
      - true,false,null
      - `a.b = true`
      - 包含/has `a.b:10` - a 为集合，b 为集合元素字段
      - `call(args...)`
      - 字段名必须在左边
    - bool show_deleted - 软删除
    - unreachable
  - ListResourceResponse
    - repeated Resource resources
    - next_page_token
    - 可选 int64 total_size
- CreateResource(CreateResourceRequest) returns (Resource)
  - CreateResourceRequest
    - parent
    - resource
    - resource_id 有些场景可以支持客户端自己指定
  - 长时间运行操作返回 google.longrunning.Operation
- UpdateResource(UpdateResourceRequest) returns (Resource)
  - UpdateResourceRequest
    - resource
      - 通过 name 匹配
      - etag - 可指定 etga 进行比较更新，如果不匹配则失败
    - google.protobuf.FieldMask update_mask - 支持部分更新
    - bool allow_missing - 如果不存则创建
- DeleteResource(DeleteResourceRequest) returns (google.protobuf.Empty)
- DeleteResourceRequest
  - name
  - bool force - 强制级联删除
  - etag - 如果匹配才删除
  - bool allow_missing - 忽略不存在
- PurgeResources(PurgeResourcesRequest) returns (google.longrunning.Operation)
  - 批量删除
  - PurgeResourcesRequest
    - parent
    - filter
    - force
  - PurgeResourcesResponse
    - purge_count
    - purge_sample
- UndeleteResource(UndeleteResourceRequest) returns (Resource)
  - 支持软删除
  - UndeleteResourceRequest
    - name
- Batch
- ImportResources(ImportResourcesRequest) returns (google.longrunning.Operation)
  - ImportResourcesRequest
    - parent
- ExportResources(ExportResourcesRequest) returns (google.longrunning.Operation)
  - ExportResourcesRequest
    - filter
- 常见标准字段
  - name
  - parent
  - uid
  - display_name,title,given_name,faamily_ame
  - create_time,update_time,delete_time
  - expire_time - 软删除场景
  - etag - checksum
- 常见请求字段
  - request_id - UUID
  - validate_only - Change validation
  - google.protobuf.FieldMask
    - 不应该在请求包含 - 可以在 metadata 包含 - 例如 头
    - 必须 optional
    - 支持 `*`
    - 现在推荐 view
  - 例如 enum BookView {BOOK_VIEW_UNSPECIFIED=0;BASIC = 1;FULL = 2;}
- 单实例资源只有 Get 和 Update
- https://google.aip.dev/
- https://github.com/googleapis/googleapis/blob/master/google/api/
- 参考
  - [einride/aip-go](https://github.com/einride/aip-go)
    - 包含了解析资源名字逻辑

> **Note**
>
> - 不要用 unsigned integer
> - 不要用 optional - 除非表示特定含义 - 例如 空 为 未投票、未评分
>   - optional 会返回 zero value - 即便没有 set

### entpb

- 一个资源一个服务
- 生成大量内容，但模式固定
- entpb https://github.com/ent/contrib
- [#2446](https://github.com/ent/ent/issues/2446)

```proto
syntax = "proto3";

service UserService {
  rpc Create ( CreateUserRequest ) returns ( User );
  rpc Get ( GetUserRequest ) returns ( User );
  rpc Update ( UpdateUserRequest ) returns ( User );
  rpc Delete ( DeleteUserRequest ) returns ( google.protobuf.Empty );
  rpc List ( ListUserRequest ) returns ( ListUserResponse );
  rpc BatchCreate ( BatchCreateUsersRequest ) returns ( BatchCreateUsersResponse );
}

message CreateUserRequest {
  User user = 1;
}

message GetUserRequest {
  int64 id = 1;
  View view = 2;

  enum View {
    VIEW_UNSPECIFIED = 0;
    BASIC = 1;
    WITH_EDGE_IDS = 2;
  }
}
message UpdateUserRequest {
  User user = 1;
}
message DeleteUserRequest {
  int64 id = 1;
}
message ListUserRequest {
  int32 page_size = 1;
  string page_token = 2;
  View view = 3;

  enum View {
    VIEW_UNSPECIFIED = 0;
    BASIC = 1;
    WITH_EDGE_IDS = 2;
  }
}
message ListUserResponse {
  repeated User user_list = 1;
  string next_page_token = 2;
}

message BatchCreateUsersRequest {
  repeated CreateUserRequest requests = 1;
}
message BatchCreateUsersResponse {
  repeated User users = 1;
}
```

- https://github.com/ent/contrib/blob/1faab982b6648b7704a6cf41ff65d9cb7811a2be/entproto/internal/todo/ent/proto/entpb/entpb.proto
