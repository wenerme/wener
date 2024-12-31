---
tags:
  - API
---

# Google APIs

- https://github.com/googleapis/googleapis.github.io
- https://developers.google.com/discovery
- https://developers.google.com/apis-explorer/
- Google Photos API: Read-Only Scopes Deprecated
  - 2025 年 3 月 31 日
    - 移除 Google Photos Library API 读取功能，保留上传和管理
    - 新增 Google Photos Picker API - 从相册中选择照片
  - https://developers.google.com/photos/support/updates
  - https://news.ycombinator.com/item?id=41604241

## Keep

```ts
/**
 * 表示 Google Keep API 中的一个备注。
 *
 * 备注是 Google Keep 中的一条单独的记事。
 */
interface Note {
  /**
   * 仅限输出。此备注的资源名称。
   * 请参阅 KeepService 中关于标识符的一般说明。
   * @example "notes/1234567890"
   */
  name?: string;

  /**
   * 仅限输出。此备注的创建时间。
   * @format date-time
   */
  createTime?: string;

  /**
   * 仅限输出。此备注的最后修改时间。
   * @format date-time
   */
  updateTime?: string;

  /**
   * 仅限输出。此备注被移动到回收站的时间。
   * 如果 trashed 为 true，则该备注最终将被删除。
   * 如果该备注不在回收站中，则此字段未设置（且 trashed 为 false）。
   * @format date-time
   */
  trashTime?: string;

  /**
   * 仅限输出。如果此备注已被移动到回收站，则为 true。
   * 一旦进入回收站，该备注最终将被删除。
   */
  trashed?: boolean;

  /**
   * 仅限输出。附加到此备注的附件。
   */
  attachments?: Attachment[];

  /**
   * 仅限输出。在此备注上设置的权限列表。
   * 至少包含一个备注所有者的条目。
   */
  permissions?: Permission[];

  /**
   * 备注的标题。
   * 长度必须少于 1,000 个字符。
   */
  title?: string;

  /**
   * 备注的正文。
   */
  body?: Section;
}

/**
 * 表示备注的一个附件。
 */
interface Attachment {
  /**
   * 资源名称。
   */
  name?: string;

  /**
   * 附件可用的 MIME 类型（IANA 媒体类型）。
   */
  mimeType?: string[];
}

/**
 * 表示备注上的单个权限。
 * 将成员与角色关联。
 */
interface Permission {
  /**
   * 仅限输出。资源名称。
   */
  name?: string;

  /**
   * 此权限授予的角色。
   * 该角色决定了实体读取、写入和共享备注的能力。
   */
  role?: Role;

  /**
   * 与成员关联的电子邮件地址。
   * 如果在创建时设置，则 User 或 Group 消息中的 email 字段必须为空或与此字段匹配。
   * 在读取时，如果成员没有关联的电子邮件地址，则此设置可以取消。
   */
  email?: string;

  /**
   * 仅限输出。此成员是否已被删除。
   * 如果成员被恢复，则此值将设置为 false，并且恢复的成员将保留其在备注上的角色。
   */
  deleted?: boolean;

  /**
   * 联合字段 member。
   * 指定被授予该角色的身份。
   * 如果成员已被删除，则该成员不会被取消设置。
   *
   * 以下字段中只能设置一个：
   */
  user?: User;
  group?: Group;
  family?: Family;
}

/**
 * 定义实体可以拥有的各种角色。
 */
enum Role {
  /**
   * 未定义的角色。
   */
  ROLE_UNSPECIFIED = 'ROLE_UNSPECIFIED',

  /**
   * 授予完全访问权限的角色。
   * 此角色无法添加或删除。
   * 由备注的创建者定义。
   */
  OWNER = 'OWNER',

  /**
   * 授予提供内容和修改备注权限的角色。
   */
  WRITER = 'WRITER',
}

/**
 * 描述单个用户。
 */
interface User {
  /**
   * 用户的电子邮件地址。
   */
  email?: string;
}

/**
 * 描述单个群组。
 */
interface Group {
  /**
   * 群组的电子邮件地址。
   */
  email?: string;
}

/**
 * 描述单个 Google 家庭群组。
 */
interface Family {
  // 此类型没有字段。
}

/**
 * 备注的内容。
 */
interface Section {
  /**
   * 联合字段 Content。
   * 此部分的内容必须是以下类型之一。
   *
   * 以下字段中只能设置一个：
   */
  text?: TextContent;
  list?: ListContent;
}

/**
 * 单个文本部分或列表项的文本块。
 */
interface TextContent {
  /**
   * 备注的文本。
   * 此字段的限制因使用此类型的特定字段而异。
   */
  text?: string;
}

/**
 * 单个清单记事的项目列表。
 */
interface ListContent {
  /**
   * 列表中的项目。
   * 项目数量必须小于 1,000。
   */
  listItems?: ListItem[];
}

/**
 * 记事列表中的单个列表项。
 */
interface ListItem {
  /**
   * 如果设置，则为嵌套在此列表项下的列表项列表。
   * 只允许嵌套一级。
   */
  childListItems?: ListItem[];

  /**
   * 长度必须少于 1,000 个字符。
   */
  text?: TextContent;
  checked?: boolean;
}
```

## Task

```ts
interface TaskList {
  kind: string; // tasks#taskList
  id: string;
  etag: string;
  title: string; // max 1024
  updated: string; // 仅限输出。RFC 3339
  selfLink: string; // 仅限输出。指向此任务列表的网址。用于检索、更新或删除此任务列表。
}

interface Task {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent?: string; // Optional because it's omitted for top-level tasks
  position: string; // 按字典顺序 00000000000000000001
  notes?: string; // 任务的备注,8192 个字符。
  status: 'needsAction' | 'completed';
  due?: string; // 任务的截止日期
  completed?: string; // 任务的完成日期
  deleted: boolean;
  hidden: boolean;
  links?: Link[]; // Optional array of links
  webViewLink: string;
  assignmentInfo?: AssignmentInfo; // Optional
}

interface Link {
  type: string;
  description: string;
  link: string;
}

interface AssignmentInfo {
  linkToTask: string;
  surfaceType: ContextType;
  driveResourceInfo?: DriveResourceInfo; // Only one of these will be present
  spaceInfo?: SpaceInfo; // Only one of these will be present
}

/**
 * 表示任务可以来自的不同上下文或来源。
 */
enum ContextType {
  /** 任务的上下文未知或未指定。 */
  CONTEXT_TYPE_UNSPECIFIED = 'CONTEXT_TYPE_UNSPECIFIED',
  /** 任务是通过 Gmail 创建的。 */
  GMAIL = 'GMAIL',
  /** 任务是从 Google 文档中分配的。 */
  DOCUMENT = 'DOCUMENT',
  /** 任务是在 Google Chat 聊天室中分配的。 */
  SPACE = 'SPACE',
}

/**
 * 表示与任务关联的 Google 云端硬盘资源的信息。
 */
interface DriveResourceInfo {
  driveFileId: string;
  resourceKey: string;
}

/**
 * 表示与任务关联的 Google Chat 聊天室的信息。
 */
interface SpaceInfo {
  space: string;
}
```

- https://developers.google.com/tasks/reference/rest

## Photos

- 主要对象
  - Album
  - MediaItem

```ts
// 表示 Google 相册库中的一个媒体项。
// 媒体项可以是照片或视频。
interface MediaItem {
  // 媒体项的唯一标识符。
  id?: string;

  // 媒体项的描述。
  description?: string;

  // 可查看媒体项的 Google 相册页面 URL。
  productUrl?: string;

  // 下载媒体项的 URL。
  // 可通过添加查询参数调整媒体项大小。
  baseUrl?: string;

  // 媒体项的 MIME 类型。
  // 例如：`image/jpeg`。
  mimeType?: string;

  // 媒体项的元数据。
  mediaMetadata?: MediaMetadata;

  // 媒体项的文件名。
  filename?: string;
}

// 媒体项的元数据。
interface MediaMetadata {
  // 媒体项的创建时间。
  // @format date-time
  creationTime?: string;

  // 媒体项的宽度（像素）。
  width?: string;

  // 媒体项的高度（像素）。
  height?: string;

  // 照片媒体项的元数据。
  photo?: Photo;

  // 视频媒体项的元数据。
  video?: Video;
}

// 照片媒体项的元数据。
interface Photo {
  // 拍摄照片的相机品牌。
  cameraMake?: string;

  // 拍摄照片的相机型号。
  cameraModel?: string;

  // 拍摄照片的相机焦距（毫米）。
  focalLength?: number;

  // 拍摄照片的相机光圈 F 值。
  apertureFNumber?: number;

  // 拍摄照片的相机 ISO 等效值。
  isoEquivalent?: number;

  // 拍摄照片的相机曝光时间。
  exposureTime?: string;
}

// 视频媒体项的元数据。
interface Video {
  // 拍摄视频的相机品牌。
  cameraMake?: string;

  // 拍摄视频的相机型号。
  cameraModel?: string;

  // 视频的帧率。
  fps?: number;

  // 视频的状态。
  status?: string;

  // 视频的时长。
  duration?: string;
}

// 表示 Google 相册库中的一个相册。
interface Album {
  // 相册的 ID。
  id?: string;

  // 相册的标题。
  title?: string;

  // 可查看相册的 Google 相册页面 URL。
  productUrl?: string;

  // 是否可以向此相册添加媒体项。
  isWriteable?: boolean;

  // 共享相册的信息。
  shareInfo?: ShareInfo;

  // 相册中的媒体项数量。
  mediaItemsCount?: string;

  // 封面照片字节的 URL。
  coverPhotoBaseUrl?: string;

  // 封面照片的媒体项 ID。
  coverPhotoMediaItemId?: string;
}

// 共享相册的相关信息。
interface ShareInfo {
  // 控制用户能否向共享相册添加媒体内容或发表评论的选项。
  sharedAlbumOptions?: SharedAlbumOptions;

  // 指向共享 Google 相册影集的链接。
  shareableUrl?: string;

  // 用于代表用户加入、退出或检索共享影集详细信息的令牌。
  shareToken?: string;

  // 用户是否已加入影集。
  isJoined?: boolean;

  // 用户是否为影集的所有者。
  isOwned?: boolean;

  // 用户是否可以加入影集。
  isJoinable?: boolean;
}

// 用于控制影集分享的选项。
interface SharedAlbumOptions {
  // 共享影集是否允许协作者添加媒体内容。
  isCollaborative?: boolean;

  // 共享影集是否允许协作者添加评论。
  isCommentable?: boolean;
}
```

- https://developers.google.com/photos/library/reference/rest/
