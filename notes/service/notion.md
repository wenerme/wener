---
title: Notion
---

# Notion

- Price - https://www.notion.so/pricing
  - Free - 不限内容数量、最多分享 5 访客、上传单文件 5MB
  - Personal - 5$/月 - 不限访客、不限上传
- 参考
  - https://www.notion.so/blog/faster-page-load-navigation
  - [notion-enhancer](https://github.com/notion-enhancer)
- 类似开源项目
  - [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE)
    - MIT, TS
  - [Dashibase/lotion](https://github.com/Dashibase/lotion)
    - GPLv3, Vue
  - https://editorjs.io/
  - https://www.slatejs.org/
  - [ueberdosis/tiptap](https://github.com/ueberdosis/tiptap)
  - [japrozs/dino](https://github.com/japrozs/dino)
  - [mattermost/focalboard](https://github.com/mattermost/focalboard)
    - MIT, Typescript
  - [AppFlowy-IO/appflowy](https://github.com/AppFlowy-IO/appflowy)
    - AGPL-3.0, Rust+Dart
    - Trello, Notion, Asana
  - [bangle-io/bangle-io](https://github.com/bangle-io/bangle-io)
  - [tobi4120/notion-clone](https://github.com/tobi4120/notion-clone)
    - [demo](https://notion-app-clone.herokuapp.com/#/)
  - [konstantinmuenster/notion-clone](https://github.com/konstantinmuenster/notion-clone)
    - [How to Build a Text Editor Like Notion](https://medium.com/swlh/c510aedfdfcc)
  - [djyde/plastic-editor](https://github.com/djyde/plastic-editor)
- Render
  - [NotionX/react-notion-x](https://github.com/NotionX/react-notion-x)
    - React renderer for Notion
  - [transitive-bullshit/nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)
    - Notion-powered website with Next.js
  - Notion-Kit-Test-Suite https://www.notion.so/Notion-Test-Suite-067dd719a912471ea9a3ac10710e7fdf
- API
  - [kjk/notionapi](https://github.com/kjk/notionapi)
    - Unofficial Go API for Notion.so

## 数据模型

```json
{
  "id": "abcd",
  "type": "to_do",
  "properties": {
    "title": [[""]],
    "checked": [["No"]]
  },
  "content": ["defgh"],
  "format": {
    "page_icon": "📺",
    "block_color": "orange_background"
  },
  "parent": "01234",
  // database schema
  "schema": {
    "abc": {
      "name": "Date",
      "type": "date"
    }
  },
  "query": {
    "calendar_by": "abc",
    "sort": {},
    "filter": {}
  }
}
```

- [The data model behind Notion's flexibility](https://www.notion.so/blog/data-model-behind-notion)
  - [HN](https://news.ycombinator.com/item?id=27200177)
- [The Beauty of Notion](https://www.notion.so/stephenou/4663b221fd154c07bb6f826b537bfcd4)

## API

- https://developers.notion.com/
  - https://developers.notion.com/reference/intro

### Filter

```json title="FilterObject in Notion JSON"
{
  "filters": [
    {
      "filter": {
        "value": {
          "type": "exact",
          "value": false
        },
        "operator": "checkbox_is"
      },
      "property": "eP[*"
    },
    {
      "filter": {
        "value": {
          "type": "exact",
          "value": "even"
        },
        "operator": "enum_contains"
      },
      "property": "<r1@"
    }
  ],
  "operator": "or"
}
```

```ts title="FilterObject in API"
export interface FilterObject {
  property: string;
  text: {
    equals: string;
    does_not_equal: string;
    contains: string;
    does_not_contain: string;
    starts_with: string;
    ends_with: string;
    is_empty: boolean;
    is_not_empty: boolean;
  };
  number: {
    equals: number;
    does_not_equal: number;
    greater_than: number;
    less_than: number;
    greater_than_or_equal_to: number;
    less_than_or_equal_to: number;
    is_empty: boolean;
    is_not_empty: boolean;
  };

  checkbox: {
    equals: boolean;
    does_not_equal: boolean;
  };
  select: {
    equals: string;
    does_not_equal: string;
    is_empty: boolean;
    is_not_empty: boolean;
  };
  multi_select: {
    equals: string;
    does_not_equal: string;

    is_empty: boolean;
    is_not_empty: boolean;
  };

  date: {
    equals: string;
    before: string;
    after: string;
    on_or_before: string;
    on_or_after: string;
    past_week: object;
    past_month: object;
    past_year: object;
    next_week: object;
    next_month: object;
    next_year: object;

    is_empty: boolean;
    is_not_empty: boolean;
  };

  people: {
    contains: string;
    does_not_contain: string;
    is_empty: boolean;
    is_not_empty: boolean;
  };
  file: {
    is_empty: boolean;
    is_not_empty: boolean;
  };
  relation: {
    contains: string;
    does_not_contain: string;
    is_empty: boolean;
    is_not_empty: boolean;
  };
  formula: {
    text: object;
    checkbox: object;
    number: object;
    date: object;
  };
  or: [];
  any: [];
}
```
