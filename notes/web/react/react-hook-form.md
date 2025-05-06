---
title: React Hook Form
---

# React Hook Form

- [react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form) 是什么？
  - 基于 Hook 的轻量级表单组件 - 5KB
- [接口](https://react-hook-form.com/zh/api/)
- 默认通过 ref 的方式进行注册
  - 获取 name, type, value
  - 在设置 ref 时候就会初始化进行注册
  - 会判断是否为 checkbox 和 radio - 使用 checked
  - 如果是 html 元素 ref - 会添加事件监听
- Controller - 基于 useController 实现的自定义控件封装
  - 处理没有 ref 进行注册的场景
  - 核心逻辑在 useController
  - Controller 只包含基础渲染逻辑 - 渲染 as 或者使用 render 函数渲染
- useController - 提供自定义组件所需的上下文
  - 提供 onChange, onBlur, name, value, ref,
  - 提供元数据 invalid, isDirty, isTouched

:::tip

- 能使用 ref 尽量使用 ref 注册 - register

:::

:::caution

- 默认 mode 为 onSubmit - 也就是在提交的时候才会校验
- 元素上的 required 会由浏览器处理，而不会添加到 rhf 的规则里
- resolver 和 rules 不能同时使用
  - [#8992](https://github.com/orgs/react-hook-form/discussions/8992)

:::

```tsx
const MyForm: React.FC<{ onSubmit; defaultValue }> = ({ onSubmit, defaultValue }) => {
  const formMethods = useForm({ mode: 'onBlur', defaultValues: defaultValue });
  const { register, handleSubmit } = formMethods;
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
        <input type='number' {...register('age')} />
        <button type='submit'>Submit</button>
      </form>
    </FormProvider>
  );
};
```

## Notes

- watch -> useWatch, getValues
- useFormContext -> useFormState
- setValue -> reset - 如果需要设置非常多的值
- Controller, useController -> register
- FormProvider 使用了 React.Context, 导致 form 状态变化会 rerender
- 默认
  - mode=onSubmit
  - reValidateMode=onChange
  - shouldFocusError=true
- useForm
  - control.\_options = props
  - 返回的是内部 `_formControl`
  - defaultValues
    - 值会缓存 - 第一次调用有效
    - 默认值 - 避免 **undefined** - 导致 controlled 和 uncontrolled 混用
    - 表单的初始化值
    - reset 会重置表单为 defaultValues
    - 会包含在 submit 的数据里
  - values - 建议 memo
    - 表单的当前值 - 修改会反应到表单上 - ⚠️ 主要用于 reset 表单
    - 可用于 外部 状态修改
    - 会和上次的做 deepEqual 比较
      - 变化后会调用 reset 触发 formState 更新
      - 未变化会调用 \_resetDefaultValues
        - 如果 defaultValues 是个函数，则会调用函数 然后 reset
  - errors - 建议 memo
    - 用于传递 server errors
  - disabled - 是否禁用表单
    - 可以在 submit 的时候将 disabled 设置为 true
- formState
  - 注意
    - 会被代理 - 返回 Proxy 的对象，用于 subscribe
    - useEffect 需要将 formState 作为依赖
    - 取值时不要加 condition - 会导致未订阅的值不会更新
  - isDirty - 和 defaultValues 比较
  - dirtyFields
    - 跟踪哪些字段发生了变化
    - ⚠️ 存在 isDirty=true 但 dirtyFields 为空的情况
    - 通过 defaultValues & formValues 生成
  - touchedFields
  - defaultValues
  - isSubmitted - reset 会设置为 false
  - isSubmitSuccessful
    - 提交时 errors 不为空 且 onValid 没有抛出异常
  - isSubmitting
  - isLoading - defaultValues 可以为 async 函数
  - submitCount
  - isValid
  - isValidating
  - validatingFields
  - errors
    - root.server
      - `<Form>` 组件会使用这个记录请求返回的错误

---

- https://react-hook-form.com/advanced-usage#FormProviderPerformance
- https://github.com/react-hook-form/react-hook-form/discussions/7611#discussioncomment-2008064

# FAQ

- context.control.\_options 为 useForm props
- FormProvider/Context 能传递任何附加的值，但不推荐

## values vs defaultValues

- defaultValues
  - 推荐用于静态值
  - 不会跟随改变，使用 reset 修改
- values
  - 推荐用于动态值
  - 会跟随改变

## reset

- reset 可能只能覆盖，也就是必须要传入内容，否则之前的值会保留
  - 修改 value 时，如果新的 value 为 null 也会导致保留之前的值
- `reset()` 只有在有 defaultValues 才有用
- https://github.com/orgs/react-hook-form/discussions/7589

## empty to null

## isDirty 不匹配 dirtyFields

- isDirty=true, dirtyFields 为 空
- array swap 的时候会出现这样的情况，需要 touch 了才会 有
  - https://github.com/react-hook-form/react-hook-form/issues/2778

## 只提交修改后的值

```ts
function getDirtyFields(
  {
    formState: { dirtyFields },
    getValues,
  }: {
    formState: { dirtyFields: any };
    getValues: () => any;
  },
  formValues = getValues(),
) {
  if (typeof dirtyFields !== 'object' || dirtyFields === null || !formValues) {
    return {};
  }

  return Object.keys(dirtyFields).reduce(
    (accumulator, key) => {
      const isDirty = dirtyFields[key];
      const value = formValues[key];

      // If it's an array, apply the logic recursively to each item
      if (Array.isArray(isDirty)) {
        // eslint-disable-next-line no-underscore-dangle
        const _dirtyFields = isDirty.map((item, index) => getDirtyFields(item, value[index]));
        if (_dirtyFields.length > 0) {
          // eslint-disable-next-line no-param-reassign
          accumulator[key] = _dirtyFields;
        }
      }
      // If it's an object, apply the logic recursively
      else if (typeof isDirty === 'object' && isDirty !== null) {
        // eslint-disable-next-line no-param-reassign
        accumulator[key] = getDirtyFields(isDirty, value);
      }
      // If it's a dirty field, get the value from formValues
      else if (isDirty) {
        // eslint-disable-next-line no-param-reassign
        accumulator[key] = value;
      }

      return accumulator;
    },
    {} as Record<string, any>,
  );
}
```

- https://github.com/orgs/react-hook-form/discussions/9472

## validation 修改会导致 submit 失败

- 使用 onBlur, focus 在 input, 点 submit 会无效，因为触发 blur 后 validation，然后会中止 submit
- https://github.com/react-hook-form/react-hook-form/issues/4177
