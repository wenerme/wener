---
title: TinaCMS
---

# TinaCMS

在 Web 上添加属性编辑功能。

- [tinacms/tinacms](https://github.com/tinacms/tinacms)
  - 目前主要集成 next 和 gatsby
  - 后端交互目前以 git 为主
  - 实现自定义后端可参照 next 的 local json 方式

:::tip

- 虽然名字是 tinacms 但更偏向编辑器 - Contextual Editing
  - 模型 -formify->表单<->API
  - 基于 Git 的 CMS - 但个人认为其编辑功能更有意思
  - Git 后端生成 GraphQL API
- 使用 final-form 构建 form

:::

## schema

- Tina Content API
- 参考
  - [defineSchema](https://github.com/tinacms/tinacms/blob/37ee94fb30bcbcc38c2ebf84ccbd3eb7e7485016/packages/tinacms/src/index.ts#L47-L50)
  - [@tinacms/schema-tools/src/types/SchemaTypes.ts](https://github.com/tinacms/tinacms/blob/37ee94fb30bcbcc38c2ebf84ccbd3eb7e7485016/packages/@tinacms/schema-tools/src/types/SchemaTypes.ts)
  - [@tinacms/schema-tools/src/schema/TinaSchema.ts](https://github.com/tinacms/tinacms/blob/37ee94fb30bcbcc38c2ebf84ccbd3eb7e7485016/packages/@tinacms/schema-tools/src/schema/TinaSchema.ts)

```ts title=".tina/schema.ts"
import { defineSchema } from 'tinacms';

const schema = defineSchema({
  // entity
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      fields: [
        {
          // scalar - string, datetime, boolean, image, number
          // nonscalar - object, reference, rich-text, image
          type: 'string',

          // string
          isBody: false,
          isTitle: true,

          // datetime
          dateFormat: '',
          timeFormat: '',

          // reference
          reverseLookup: { label: '', name: '' },
          collections: [],

          // object
          visualSelector: false,
          templates: '',
          fields: [],

          // 基础字段
          label: 'Title',
          name: 'title',
          required: true,
          description: '',
          list: false,

          ui: {
            defaultValue: 'A new title', // 定义默认值
            component: 'textarea', // 定义 UI 组件
          },
        },
        {
          type: 'string',
          label: 'Post Body',
          name: 'body',
          // markdown body
          isBody: true,
        },
        {
          label: 'Tags',
          name: 'tags',
          type: 'string',
          // array
          list: true,
        },
        {
          label: 'Categories',
          name: 'categories',
          type: 'string',
          list: true,
          // 限定值
          options: [
            {
              value: 'movies',
              label: 'Movies',
            },
            {
              value: 'music',
              label: 'Music',
            },
          ],
        },
        // 嵌套对象
        {
          label: 'Testimonial',
          name: 'testimonial',
          type: 'object',
          fields: [
            {
              label: 'Quote',
              name: 'quote',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
          ],
        },
        {
          label: 'Author',
          name: 'author',
          type: 'reference',
          collections: ['author'], // 引用已有 entity
        },
      ],
    },
  ],
});

export default schema;
```

## next-tinacms-json

> 基于 本地 JSON 提供编辑数据，已废弃。

- [next-tinacms-json](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-json)
- useJsonForm
- useLocalJsonForm
- useGlobalJsonForm
- InlineJsonForm: A render-children component
- inlineJsonForm: A higher-order component
- 实现
  - 获取 json 文件数据
  - next 全局初始化时候配置 json 映射关系 `{fileRelativePath:string,data:any}`
  - 通过 `useLocalJsonForm` 获取映射的文件数据

```ts
export function useLocalJsonForm<T = any>(
  // 文件映射定义
  jsonFile: JsonFile<T>,
  options?: Options,
) {
  const [values, form] = useJsonForm(jsonFile, options);

  usePlugins(form);

  return [values, form];
}
```

```ts
import { useCallback } from 'react';
import { useWatchFormValues, useForm, useCMS, FormOptions, Field } from 'tinacms';
import { generateFields } from './generate-fields';

/**
 * 表示 git 存储的文件
 */
export interface JsonFile<T = any> {
  fileRelativePath: string;
  data: T;
}

export interface Options {
  id?: string;
  label?: string;
  fields?: Field[];
  actions?: FormOptions<any>['actions'];
}
/**
 * 创建一个编辑 GIT 里 JSON 的表单
 */
export function useJsonForm<T = any>(jsonFile: JsonFile<T>, options: Options = {}) {
  const cms = useCMS();

  const id = options.id || jsonFile.fileRelativePath;
  const label = options.label || jsonFile.fileRelativePath;
  const fields = options.fields || generateFields(jsonFile);
  const actions = options.actions || [];
  // 创建表单
  const [values, form] = useForm(
    {
      id,
      label,
      fields,
      actions,
      loadInitialValues() {
        // 通过 git 接口初始化数据
        return cms.api.git.show(jsonFile.fileRelativePath).then((git: { content: string }) => {
          const jsonFileInGit = JSON.parse(git.content);

          return jsonFileInGit;
        });
      },
      onSubmit() {
        // 通过 git 接口提交数据 - 版本概念
        return cms.api.git.commit({
          files: [jsonFile.fileRelativePath],
          message: `Commit from Tina: Update ${jsonFile.fileRelativePath}`,
        });
      },
      reset() {
        // 重置修改
        return cms.api.git.reset({ files: [id] });
      },
    },
    //
    { values: jsonFile.data, label },
  );

  const writeToDisk = useCallback(
    (formState) => {
      // 变化修改到文件
      cms.api.git.writeToDisk({
        fileRelativePath: jsonFile.fileRelativePath,
        content: JSON.stringify(formState.values, null, 2),
      });
    },
    [jsonFile.fileRelativePath],
  );
  // 监听表单变化
  useWatchFormValues(form, writeToDisk);

  return [values || jsonFile.data, form];
}
```
