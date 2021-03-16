---
slug: google-api-design-guide
title: Google API Design Guide
---

## Google API Design Guide

- [API Design Guide](https://cloud.google.com/apis/design/)

### 面向资源设计

- 设计流程
  - 确定 APi 提供的资源类型
  - 确定资源之间的关系
  - 决定资源的名字格式, 基于类型和关系
  - 决定资源的格式
  - 为资源添加最低限度的方法
- 资源
  - 集合
  - 资源
- 方法

### 资源名字

- 基本概念
  - 资源是被命名的实体
  - 资源名即为其标识符
  - 每个资源必须有其唯一的资源名
  - 资源名由 资源 ID, 父资源 ID 和服务名
  - gRPC 资源名应该使用 scheme-less 的 URI
  - 集合为特殊的资源, 包含一列相同类型的子资源
  - 集合资源的 ID 为 集合 ID
- 完整资源名
  - `//library.googleapis.com/shelves/shelf1/books/book2`
- 相对资源名
  - 相对于服务
  - `shelves/shelf1/books/book2`
- 资源 ID
  - 资源名中的资源 ID 可能会有超过一个的 URI segment
  - 服务应该使用 URL 友好的资源 ID
  - 必须要明确资源 ID 是由客户端指定,服务指定或都可以
    - 例如文件名通常由客户端指定
    - 有限 ID 通常由服务端指定
  - Collection ID -> `files`
  - Resource ID -> `/source/py/parser.py`
- 集合 ID
  - 必须是有效的 C/C++ 标识符
  - 必须是负数的 `lowerCamel` 形式
    - 如果没有合适的负数形式, 那么应该使用单数形式, 例如 `evidence`,`weather`
  - 必须使用明确简洁的英语词汇
  - 通用的词汇应该避免使用或加限定符
    - `values` -> `rowValues`
    - 应该避免直接使用的词汇
      - elements
      - entries
      - instances
      - items
      - objects
      - resources
      - types
      - values
- 资源名 vs URL
  - 在 REST API 使用时, 应该转换为相应的 URL 格式
  - 添加版本号和 Schema
  - 资源名 -> `//calendar.googleapis.com/users/john smith/events/123`
  - URL -> `https://calendar.googleapis.com/v3/users/john%20smith/events/12`
- 资源名作为字符串
  - 资源名必须能被呈现为字符串
  - 资源名应该能像文件名一样被处理, 不支持百分号编码
  - 对于资源定义, 第一个字段应该为资源名, 应该为 `name`
  - 其他名字相关的字段应该添加限定符避免混淆, 例如 `display_name`, `first_name`
  - 资源名禁止包含前 `/`
- 为什么不适用资源 ID 来标识一个资源
  - 例如为什么不使用诸如 `(bucket, object)` 或 `(user, album, photo)` 的形式
  - 开发者必须要理解并且记住这样的匿名元组
  - 传递元组比字符串一般更加困难
  - 很多系统不能理解这样的形式
  - 特点的元组限制 API 设计的灵活性
- 为什么使用 `name` 而不使用 `id`
  - 遵从资源名的概念
  - 通常 `name` 的定义会非常混淆, 保留 `name` 使得开发者选择一个更合适的名字, 例如 `display_name`, `title`

| API Service Name         | Collection ID | Resource ID | Collection ID | Resource ID |
| ------------------------ | ------------- | ----------- | ------------- | ----------- |
| //storage.googleapis.com | /buckets      | /bucket-id  | /objects      | /object-id  |

| API Service Name      | Collection ID | Resource ID       | Resource ID | Resource ID |
| --------------------- | ------------- | ----------------- | ----------- | ----------- |
| //mail.googleapis.com | /users        | /name@example.com | /settings   | /customFrom |

### 标准方法

| Std.Method | HTTP Mapping                  | HTTP Request Body | HTTP Response Body        |
| ---------- | ----------------------------- | ----------------- | ------------------------- |
| List       | `GET <collection URL>`        | N/A               | Resource\* list           |
| Get        | `GET <resource URL>`          | N/A               | Resource\*                |
| Create     | `POST <collection URL>`       | Resource          | Resource\*                |
| Update     | `PUT or PATCH <resource URL>` | Resource          | Resource\*                |
| Delete     | `DELETE <resource URL>`       | N/A               | google.protobuf.Empty\*\* |

### 自定义方法

- HTTP 映射
  - `https://service.name/v1/some/resource/name:customVerb`
  - 应该使用 `POST` 方法
  - 如果是类似 List 的方法也许使用 `GET`
  - 不应该使用 `PATCH`, 也许会使用其他方法, 但应该遵从 HTTP 语义
  - 使用 `GET` 方法, 必须要求请求幂等, 不会有副作用
    - 例如自定义视图应该使用 `GET`
  - 请求消息中的资源名应该被映射到路径上
  - URL 路径必须以 `:customVerb` 结束
  - 如果允许请求体, 必须使用 `body: "*"`, 应该将所有字段映射到请求消息上
  - 如果不接受请求体, 禁止使用 `body` 语句
  - 自定义的方法动词禁止重叠

| Method Name             | Custom verb | HTTP verb | 备注                                       |
| ----------------------- | ----------- | --------- | ------------------------------------------ |
| Cancel                  | :cancel     | POST      | 取消一个未完成的操作 (构建,计算 等)        |
| `BatchGet<plural noun>` | :batchGet   | GET       | 批量获取多个资源                           |
| Move                    | :move       | POST      | 将资源从父节点移动到另外一个父节点         |
| Search                  | :search     | GET       | 获取资源列表, 但不同于 List 语义           |
| Undelete                | :undelete   | POST      | 恢复一个已删除的资源. 建议做 30 天的保留期 |

### 标准字段

| Name            | Type                  | Description                                                                                                                                        |
| --------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| name            | string                | 包含相对资源名                                                                                                                                     |
| parent          | string                | 对资源定义和 List/Create 请求, 该字段表示相对的父节点资源名                                                                                        |
| create_time     | Timestamp             | 创建时间                                                                                                                                           |
| update_time     | Timestamp             | 最后一次更新时间, 在 create/patch/delete 时更新                                                                                                    |
| delete_time     | Timestamp             | 删除时间, 如果支持资源保留                                                                                                                         |
| expire_time     | Timestamp             | 超时时间                                                                                                                                           |
| start_time      | Timestamp             | 开始时间                                                                                                                                           |
| end_time        | Timestamp             | 结束时间 (不管是否成功)                                                                                                                            |
| time_zone       | string                | 时区名. IANA TZ name, 例如 "America/Los_Angeles", [时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)                         |
| region_code     | string                | 地区的 Unicode country/region code (CLDR), 例如 "US" and "419",[unicode_region_subtag](http://www.unicode.org/reports/tr35/#unicode_region_subtag) |
| language_code   | string                | BCP-47 语言码, 例如 "en-US". [Unicode locale identifier](http://www.unicode.org/reports/tr35/#Unicode_locale_identifier)                           |
| mime_type       | string                | IANA 发布的 MIME 类型. [media-types](https://www.iana.org/assignments/media-types/media-types.xhtml)                                               |
| display_name    | string                | 实体的显示名字                                                                                                                                     |
| title           | string                | 实体的官方名字, 例如公司名. 作为正式的 display_name.                                                                                               |
| description     | string                | 实体描述                                                                                                                                           |
| filter          | string                | List 方法的标准过滤参数                                                                                                                            |
| query           | string                | 等同于 List 方法的 filter, 不过用于 Search                                                                                                         |
| page_token      | string                | List 请求的分页符                                                                                                                                  |
| page_size       | int32                 | List 请求的分页大小                                                                                                                                |
| total_size      | int32                 | 总数                                                                                                                                               |
| next_page_token | string                | 下一页的分页符, 如果为空则表示没有更多结果                                                                                                         |
| order_by        | string                | 指定 List 请求的排序                                                                                                                               |
| request_id      | string                | 用于检测重复请求的唯一标识符                                                                                                                       |
| resume_token    | string                | 用于恢复一个流请求的不透明标识符                                                                                                                   |
| labels          | `map<string, string>` | 资源标签                                                                                                                                           |
| deleted         | bool                  | 如果资源允许 undelete 操作, 则应该有被删除标示                                                                                                     |
| show_deleted    | bool                  | 如果资源允许 undelete 操作, 相应的 List 操作应该可以死指定显示已删除的资源                                                                         |
| update_mask     | FieldMask             | 用于 Update 对资源进行部分更新操作. 该属相对于资源而非请求消息                                                                                     |
| validate_only   | bool                  | 如果为 true, 则应该只验证该请求, 而不执行                                                                                                          |

### 错误

- 错误模型 [google.rpc.Status](https://github.com/googleapis/googleapis/blob/master/google/rpc/status.proto)
- 错误码 [google.rpc.Code](https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto)
  - 单独的接口应该避免定义额外的错误码, 如果一个接口需要处理三四种错误码, 那么代码将大部分都是错误处理
- 错误信息
  - 不要假设用户非常了解你的接口
  - 不要假设用户知道任何服务的实现相关, 或者了解错误的上下文信息
  - 如果可以, 错误信息应该能被一个技术人员理解并且修复错误
  - 保持错误信息简介, 如果可以, 可提供一个错误链接以供提问或反馈
- [google/rpc/error_details.proto](https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto)
  - 定义了常用的错误详情

```protobuf
package google.rpc;

message Status {
  // 简单的错误码, 实际的错误码由 `google.rpc.Code` 定义
  int32 code = 1;

  // 面向开发者的错误信息. 应该解释错误原因并提可操作的解决办法
  string message = 2;

  // 附加的错误信息, 例如重试延迟或帮助链接
  repeated google.protobuf.Any details = 3;
}
```

### 名称转换

- 遵循 简介, 直观, 一致 的原则
- 产品名
  - 产品的营销名称
  - 应该与 接口, UI, 文档, TOS, 账单, 合同保持一致
  - 必须以 Google 开头, 除非由多个产品使用, 例如 Gmail, Youtube
  - 应该由产品或营销团队决定
- 服务名
  - 应该是一个合法的 DNS 名字, 可以被解析为一个或多个网络地址
    - 谷歌接口的服务名均为 `xxx.googleapis.com`
    - 例如 `calendar.googleapis.com`
  - 如果 API 由多个服务组成, 名字应该帮助其发现相应的其他服务, 例如使用一个统一的前缀
    - 例如 `build.googleapis.com` 和 `buildresults.googleapis.com` 同属于 Google Build API
- 包名
  - 在 `.proto` 中定义的包名, 应该尽量与产品和服务名保持你一直
  - 如果 API 有版本, 那么包必须以版本号作为结束
  - 不由具体服务使用的抽象 API, 应该使用与产品一致的包名
    - `google.watcher.v1`
  - Java 包必须与包名一直, 只在其前面加相应前缀 (`com`.`net` 等)
- 集合标识符
  - 应该使用复数形式和驼峰命名
- 接口名
  - 即 `.proto` 中的 `service`, 避免与服务名冲突
  - 可认为服务名是一组 API 实现的合集, 而接口是 API 的抽象定义
  - 应该使用只管的名字, 例如 `Calendar` `Blob`
  - 不应该使用与已有的概念产生冲突, 例如 `File`
  - 在极端情况下, 避免与其他 API 冲突, 应该使用一个后缀(`Api`,`Service`)来避免歧义
- 方法名
  - 应该使用 `VerbNoun` `动词名字` 的格式, 其中的每次应该为资源类型
  - 动词应该使用[祈使语气](https://zh.wikipedia.org/wiki/祈使语气), 而不是疑问语气
    - 表达直接命令或请求
- 消息名
  - 应该与方法名为前缀, 添加 `Request` 和 `Response` 作为后缀, 除非
    - 消息为空, google.protobuf.Empty
    - 资源类型
    - 表示一个操作的资源
- 枚举名
  - 类型名必须为 `UpperCamelCase`
  - 值名必须为 `CAPITALIZED_NAMES_WITH_UNDERSCORES`
  - 每个枚举值必须以 `;` 结束
  - 第一个值应该为 `ENUM_TYPE_UNSPECIFIED`, 表示该值未被指定
- 字段名
  - 字段名必须为 `lower_case_underscore_separated_names`
  - 应该避免使用[介词](https://zh.wikipedia.org/wiki/介词)
    - `reason_for_error` -> `error_reason`
    - `cpu_usage_at_time_of_failure` -> `failure_time_cpu_usage`
  - 应该避免使用后置形容词 [Postpositive adjective](https://en.wikipedia.org/wiki/Postpositive_adjective)
    - `items_collected` -> `collected_items`
    - `objects_imported` -> `imported_objects`
  - 重复字段应该使用复数形式
  - 时间点和持续时间
    - 使用 `google.protobuf.Timestamp` 和 `google.protobuf.Duration`
    - 以 `_time` 或 `_duration` 作为后缀
    - 如果需要时间相关的后缀, 必须遵循 `xxx_{time|duration|delay|latency}_{seconds|millis|micros|nanos}` 格式
    - 如果不得不使用字符串格式, 那么应该使用 RFC 3339 格式, 例如 `2014-07-30T10:43:17Z`
  - 日期和一天中的时间
    - 应该使用 `google.type.Date` 和 `google.type.TimeOfDay`
    - 应该以 `_date` 和 `_time` 作为后缀
    - 如果日期不得不使用字符串形式, 应该使用 ISO 8601 日期格式 `YYYY-MM-DD` 例如 `2014-07-30`
    - 如果时间不得不使用字符串形式, 应该使用 ISO 8601 24 小时的事件格式, `HH:MM:SS[.FFF]` 例如 `14:55:01.672`
  - 数量
    - 比包含测量单位
      - `xxx_{bytes|width_pixels|meters}`
    - 如果是项目的数量, 应该以 `_count` 作为后缀
  - List 过滤字段应该使用 `filter`
  - List 响应
    - 返回的资源字段必须是复数形式
- 名字缩写
  - 在接口定义时应该使用常见的缩写, 在文档中应该使用标准格式
    - config (configuration)
    - id (identifier)
    - spec (specification)
    - stats (statistics)

| API Name | Example                            |
| -------- | ---------------------------------- |
| 产品名   | Google Calendar API                |
| 服务名   | calendar.googleapis.com            |
| 包名     | google.calendar.v3                 |
| 接口名   | google.calendar.v3.CalendarService |
| 源码目录 | //google/calendar/v3               |
| API 名   | calendar                           |

**方法名**

| Verb   | Noun | Method name | Request message   | Response message      |
| ------ | ---- | ----------- | ----------------- | --------------------- |
| List   | Book | ListBooks   | ListBooksRequest  | ListBooksResponse     |
| Get    | Book | GetBook     | GetBookRequest    | Book                  |
| Create | Book | CreateBook  | CreateBookRequest | Book                  |
| Update | Book | UpdateBook  | UpdateBookRequest | Book                  |
| Rename | Book | RenameBook  | RenameBookRequest | RenameBookResponse    |
| Delete | Book | DeleteBook  | DeleteBookRequest | google.protobuf.Empty |

### 版本

- `MAJOR.MINOR.PATCH`
  - MAJOR 接口不兼容
  - MINOR 添加新的功能
  - PATCH 问题修正

| Version   | Proto Package | Description                                     |
| --------- | ------------- | ----------------------------------------------- |
| v1alpha   | v1alpha1      | The v1 alpha release.                           |
| v1beta1   | v1beta1       | The v1 beta 1 release.                          |
| v1beta2   | v1beta2       | The second beta release of v1.                  |
| v1test    | v1test        | An internal test release with dummy data.       |
| v1        | v1            | The v1 major version, general availability.     |
| v1.1beta1 | v1p1beta1     | The first beta release for minor changes to v1. |
| v1.1      | v1            | The minor update to v1.1 release.               |
| v2beta1   | v2beta1       | The v2 beta 1 release.                          |
| v2        | v2            | The v2 major version, general availability.     |
