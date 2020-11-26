---
slug: issues-system-design
title: 工单系统设计实现
hide_title: true
---

# 工单系统设计实现
工单/Issues 系统都不会陌生，Github、Gitlab、Gitea 中每天都在接触的系统。想要学习如何设计实现最简单的是直接从别人的系统逻辑参考理解。

我理解的工单系统

* 元数据丰富
* 分类标签体系
* 基于时间线呈现活动
* 可扩展性强
* 能封装出上层管理体系
  * 看板
  * 里程碑
  * 日历

## Gitea
* Issues 特性
  * 上下文切换 - 组织、当前用户
  * 模板
  * 里程碑
  * 标签
  * 指派
  * 时间跟踪
  * 回应 - 表情
  * 过滤
    * Open
    * Closed
    * 你的仓库
    * 被指派工单
    * 你创建的工单
    * 仓库
  * 排序： 最老的、最近更新、评论数量
  * 搜索、评论、附件
* 数据模型位于 [models](https://github.com/go-gitea/gitea/tree/master/models)
  * 13 个关于用户的模型文件
  * 23 个关于仓库的模型文件
  * __28__ 个关于工单的模型文件 - 是系统中最多的模块
* 评论作为活动/指令，Issues 基于时间关联评论修改操作

核心 Issue 模型


```go
// Issue represents an issue or pull request of repository.
type Issue struct {
	ID               int64       `xorm:"pk autoincr"`
	RepoID           int64       `xorm:"INDEX UNIQUE(repo_index)"`
	Repo             *Repository `xorm:"-"`
	Index            int64       `xorm:"UNIQUE(repo_index)"` // Index in one repository.
	PosterID         int64       `xorm:"INDEX"`
	Poster           *User       `xorm:"-"`
	OriginalAuthor   string
	OriginalAuthorID int64      `xorm:"index"`
	Title            string     `xorm:"name"`
	Content          string     `xorm:"TEXT"`
	RenderedContent  string     `xorm:"-"`
	Labels           []*Label   `xorm:"-"`
	MilestoneID      int64      `xorm:"INDEX"`
	Milestone        *Milestone `xorm:"-"`
	Project          *Project   `xorm:"-"`
	Priority         int
	AssigneeID       int64        `xorm:"-"`
	Assignee         *User        `xorm:"-"`
	IsClosed         bool         `xorm:"INDEX"`
	IsRead           bool         `xorm:"-"`
	IsPull           bool         `xorm:"INDEX"` // Indicates whether is a pull request or not.
	PullRequest      *PullRequest `xorm:"-"`
	NumComments      int
	Ref              string

	DeadlineUnix timeutil.TimeStamp `xorm:"INDEX"`

	CreatedUnix timeutil.TimeStamp `xorm:"INDEX created"`
	UpdatedUnix timeutil.TimeStamp `xorm:"INDEX updated"`
	ClosedUnix  timeutil.TimeStamp `xorm:"INDEX"`

	Attachments      []*Attachment `xorm:"-"`
	Comments         []*Comment    `xorm:"-"`
	Reactions        ReactionList  `xorm:"-"`
	TotalTrackedTime int64         `xorm:"-"`
	Assignees        []*User       `xorm:"-"`

	// IsLocked limits commenting abilities to users on an issue
	// with write access
	IsLocked bool `xorm:"NOT NULL DEFAULT false"`

	// For view issue page.
	ShowTag CommentTag `xorm:"-"`
}
```

关联内容

* 上下文关联: Repo, Project
* 元信息关联: Poster, OriginalAuthor, PullRequest
* 分类关联: Labels, Milestone
* 指派关联: Assignee, Assignees
* 内容关联: Attachments, Comments, Reactions

评论核心模型

```go
// Comment represents a comment in commit and issue page.
type Comment struct {
	ID               int64       `xorm:"pk autoincr"`
	Type             CommentType `xorm:"INDEX"`
	PosterID         int64       `xorm:"INDEX"`
	Poster           *User       `xorm:"-"`
	OriginalAuthor   string
	OriginalAuthorID int64
	IssueID          int64  `xorm:"INDEX"`
	Issue            *Issue `xorm:"-"`
	LabelID          int64
	Label            *Label   `xorm:"-"`
	AddedLabels      []*Label `xorm:"-"`
	RemovedLabels    []*Label `xorm:"-"`
	OldProjectID     int64
	ProjectID        int64
	OldProject       *Project `xorm:"-"`
	Project          *Project `xorm:"-"`
	OldMilestoneID   int64
	MilestoneID      int64
	OldMilestone     *Milestone `xorm:"-"`
	Milestone        *Milestone `xorm:"-"`
	AssigneeID       int64
	RemovedAssignee  bool
	Assignee         *User `xorm:"-"`
	AssigneeTeamID   int64 `xorm:"NOT NULL DEFAULT 0"`
	AssigneeTeam     *Team `xorm:"-"`
	ResolveDoerID    int64
	ResolveDoer      *User `xorm:"-"`
	OldTitle         string
	NewTitle         string
	OldRef           string
	NewRef           string
	DependentIssueID int64
	DependentIssue   *Issue `xorm:"-"`

	CommitID        int64
	Line            int64 // - previous line / + proposed line
	TreePath        string
	Content         string `xorm:"TEXT"`
	RenderedContent string `xorm:"-"`

	// Path represents the 4 lines of code cemented by this comment
	Patch       string `xorm:"-"`
	PatchQuoted string `xorm:"TEXT patch"`

	CreatedUnix timeutil.TimeStamp `xorm:"INDEX created"`
	UpdatedUnix timeutil.TimeStamp `xorm:"INDEX updated"`

	// Reference issue in commit message
	CommitSHA string `xorm:"VARCHAR(40)"`

	Attachments []*Attachment `xorm:"-"`
	Reactions   ReactionList  `xorm:"-"`

	// For view issue page.
	ShowTag CommentTag `xorm:"-"`

	Review      *Review `xorm:"-"`
	ReviewID    int64   `xorm:"index"`
	Invalidated bool

	// Reference an issue or pull from another comment, issue or PR
	// All information is about the origin of the reference
	RefRepoID    int64                 `xorm:"index"` // Repo where the referencing
	RefIssueID   int64                 `xorm:"index"`
	RefCommentID int64                 `xorm:"index"`    // 0 if origin is Issue title or content (or PR's)
	RefAction    references.XRefAction `xorm:"SMALLINT"` // What hapens if RefIssueID resolves
	RefIsPull    bool

	RefRepo    *Repository `xorm:"-"`
	RefIssue   *Issue      `xorm:"-"`
	RefComment *Comment    `xorm:"-"`

	Commits     *list.List `xorm:"-"`
	OldCommit   string     `xorm:"-"`
	NewCommit   string     `xorm:"-"`
	CommitsNum  int64      `xorm:"-"`
	IsForcePush bool       `xorm:"-"`
}
```

因为评论同时表示了 Issue 的评论和 Commit 评论，因此包含了很多提交相关的信息。评论有相当多的类型

```go
const (
  // 普通评论 - 可关联到提交和行
	CommentTypeComment CommentType = iota
	CommentTypeReopen
	CommentTypeClose

	CommentTypeIssueRef         // 工单引用
	CommentTypeCommitRef        // 提交引用
	CommentTypeCommentRef       // 评论引用
	CommentTypePullRef          // PR 引用
	CommentTypeLabel            // 标签修改
	CommentTypeMilestone        // 里程碑修改
	CommentTypeAssignees        // 指派人修改
	CommentTypeChangeTitle      // 标题修改
	CommentTypeDeleteBranch     // 删除分支
	CommentTypeStartTracking    // 开始时间跟踪
	CommentTypeStopTracking     // 结束时间跟踪
	CommentTypeAddTimeManual    // 手动添加时间跟踪信息
	CommentTypeCancelTracking   // 取消时间跟踪
	CommentTypeAddedDeadline    // 添加截止日期
	CommentTypeModifiedDeadline // 修改截止日期
	CommentTypeRemovedDeadline  // 删除截止日期
	CommentTypeAddDependency    // 添加依赖
	CommentTypeRemoveDependency // 删除依赖
	CommentTypeCode             // 评论代码行
	CommentTypeReview           // PR 评论反馈
	CommentTypeLock             // 锁定工单为协作者
	CommentTypeUnlock           // 解锁工单
	CommentTypeChangeTargetBranch // 修改 PR 目标分支
	CommentTypeDeleteTimeManual // 删除时间跟踪
	CommentTypeReviewRequest    // 添加或删除审核请求
	CommentTypeMergePull        // 合并 PR
	CommentTypePullPush         // 推送到 PR head 分支
	CommentTypeProject          // 修改项目
	CommentTypeProjectBoard     // 修改项目面板
)
```

评论类型非常详细，因为 Issues 是基于时间线的事件，评论等同于注释，每个注释都是一个命令，使用命令的方式才能实现时间线变化。

## Gitlab
Gitlab 相比 Gitea 的 Issues 功能更加强大

__Issues [功能特性](https://docs.gitlab.com/ee/user/project/issues/)__

* 内容: 标题, 描述, 任务
* 人员: 作者, 指派人
* 状态: 打开/关闭, 健康状态, 可信度, 任务完成度
* 计划和跟踪: 里程碑, 截止日期，权重，时间跟踪，标签，投票，表情，工单关联，Epic关联，唯一的编号和地址
* 其他相关功能
  * 看板
  * Epic
  * 服务台/Service Deck
  * 外部集成
  * 带范围支持层级的 Label
  * 用户 Todo List
  * 燃尽图
  * 分组管理 - 组级别可统计和管理组内项目
  * 迭代
  * 设计管理
  * 价值流
  * 洞察

Issues 对于 Gitlab 来说不只是工单管理，在最基础的功能上实现了更多管理和分析相关的功能，作为有一定规模的团队，这些附加的功能都是很有必要的。

核心 [issues](https://github.com/gitlabhq/gitlabhq/blob/2eaa60e4555bb11ad5c0af905217f0fa61cf7cc9/db/structure.sql#L13105) 表

- API [Reference](https://docs.gitlab.com/ee/api/api_resources.html)
- GraphQL [explorer](https://gitlab.com/-/graphql-explorer)

```sql
CREATE TABLE issues (
    id integer NOT NULL,
    title character varying,
    author_id integer,
    project_id integer,                       -- 项目管理
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    description text,
    milestone_id integer,                     -- 里程碑
    iid integer,                              -- 项目内 ID
    updated_by_id integer,
    weight integer,
    confidential boolean DEFAULT false NOT NULL,  -- 隐秘
    due_date date,                            -- 截止日期
    moved_to_id integer,                      -- 迁移
    lock_version integer DEFAULT 0,
    title_html text,
    description_html text,
    time_estimate integer,                    -- 时间预估
    relative_position integer,
    service_desk_reply_to character varying,
    cached_markdown_version integer,
    last_edited_at timestamp without time zone,
    last_edited_by_id integer,
    discussion_locked boolean,
    closed_at timestamp with time zone,
    closed_by_id integer,
    state_id smallint DEFAULT 1 NOT NULL,     -- 状态
    duplicated_to_id integer,                 -- 重复标志
    promoted_to_epic_id integer,              -- epic
    health_status smallint,                   -- 健康状态
    external_key character varying(255),      -- 外部关联
    sprint_id bigint,                         -- sprint 关联
    issue_type smallint DEFAULT 0 NOT NULL,   -- 类型
    blocking_issues_count integer DEFAULT 0 NOT NULL,
    CONSTRAINT check_fba63f706d CHECK ((lock_version IS NOT NULL))
);


-- 提及的用户
CREATE TABLE issue_user_mentions (
    id bigint NOT NULL,
    issue_id integer NOT NULL,
    note_id integer,
    mentioned_users_ids integer[],
    mentioned_projects_ids integer[],
    mentioned_groups_ids integer[]
);
-- 指派关系
CREATE TABLE issue_assignees (
    user_id integer NOT NULL,
    issue_id integer NOT NULL
);
-- 邮件 - service desk
CREATE TABLE issue_email_participants (
    id bigint NOT NULL,
    issue_id bigint NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    email text NOT NULL
);
-- slas
CREATE TABLE issuable_slas (
    id bigint NOT NULL,
    issue_id bigint NOT NULL,
    due_at timestamp with time zone NOT NULL
);
-- 严重程度
CREATE TABLE issuable_severities (
    id bigint NOT NULL,
    issue_id bigint NOT NULL,
    severity smallint DEFAULT 0 NOT NULL
);
-- epic
CREATE TABLE epic_issues (
    id integer NOT NULL,
    epic_id integer NOT NULL,
    issue_id integer NOT NULL,
    relative_position integer
);
```

Gitlab 不是通过注释来关联活动，而是通过 events 进行关联。例如

```sql
-- 迭代事件
CREATE TABLE resource_iteration_events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    issue_id bigint,
    merge_request_id bigint,
    iteration_id bigint,
    created_at timestamp with time zone NOT NULL,
    action smallint NOT NULL
);
-- 标签事件
CREATE TABLE resource_label_events (
    id bigint NOT NULL,
    action integer NOT NULL,
    issue_id integer,
    merge_request_id integer,
    epic_id integer,
    label_id integer,
    user_id integer,
    created_at timestamp with time zone NOT NULL,
    cached_markdown_version integer,
    reference text,
    reference_html text
);
-- 里程碑事件
CREATE TABLE resource_milestone_events (
    id bigint NOT NULL,
    user_id bigint,
    issue_id bigint,
    merge_request_id bigint,
    milestone_id bigint,
    action smallint NOT NULL,
    state smallint NOT NULL,
    created_at timestamp with time zone NOT NULL
);
-- 状态事件
CREATE TABLE resource_state_events (
    id bigint NOT NULL,
    user_id bigint,
    issue_id bigint,
    merge_request_id bigint,
    created_at timestamp with time zone NOT NULL,
    state smallint NOT NULL,
    epic_id integer,
    source_commit text,
    close_after_error_tracking_resolve boolean DEFAULT false NOT NULL,
    close_auto_resolve_prometheus_alert boolean DEFAULT false NOT NULL,
    source_merge_request_id bigint,
    CONSTRAINT check_f0bcfaa3a2 CHECK ((char_length(source_commit) <= 40)),
    CONSTRAINT state_events_must_belong_to_issue_or_merge_request_or_epic CHECK ((((issue_id <> NULL::bigint) AND (merge_request_id IS NULL) AND (epic_id IS NULL)) OR ((issue_id IS NULL) AND (merge_request_id <> NULL::bigint) AND (epic_id IS NULL)) OR ((issue_id IS NULL) AND (merge_request_id IS NULL) AND (epic_id <> NULL::integer))))
);
-- 权重事件
CREATE TABLE resource_weight_events (
    id bigint NOT NULL,
    user_id bigint,
    issue_id bigint NOT NULL,
    weight integer,
    created_at timestamp with time zone NOT NULL
);
```

使用事件的模式则都是反向关联，扩展性相对通过 Type+条件字段 更好，模块之间影响也会更小。但需要查询所有的事件则会麻烦一点。

Gitlab 的 Issues 页面是在服务端生成的，且生成的内容会缓存，Markdown 生成的 HTML 会直接写入表中，某种程度上减少了需要客户端拉取所有事件的复杂度。

## 总结

虽然只看了 Gitea 和 Gitlab 的实现，但也足够有参考意义，如果要实现简单的工单系统，可能会选择第一种，但要实现复杂的逻辑则考虑选择第二种方式。
