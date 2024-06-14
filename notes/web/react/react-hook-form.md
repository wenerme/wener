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

## Rerender

- watch -> useWatch, getValues
- useFormContext -> useFormState
- setValue -> reset - 如果需要设置非常多的值
- Controller, useController -> register
- FormProvider 使用了 React.Context, 导致 form 状态变化会 rerender
- useForm
  - 返回的是内部 `_formControl`
  - defaultValues
    - 默认值 - 避免 undefined - 导致 controlled 和 uncontrolled 混用
    - 表单的初始化值
    - reset 会重置表单为 defaultValues
  - values
    - 表单的当前值 - 修改会反应到表单上
    - 可用于 外部 状态修改
- formState
  - 注意
    - 会被代理 - 返回 Proxy 的对象，用于 subscribe
    - useEffect 需要将 formState 作为依赖
    - 取值时不要加 condition - 会导致未订阅的值不会更新
  - isDirty - 和 defaultValues 比较
  - dirtyFields
  - touchedFields
  - defaultValues
  - isSubmitted - reset 会设置为 false
  - isSubmitSuccessful
  - isSubmitting
  - isLoading - defaultValues 可以为 async 函数
  - submitCount
  - isValid
  - isValidating
  - validatingFields
  - errors

---

- https://react-hook-form.com/advanced-usage#FormProviderPerformance
- https://github.com/react-hook-form/react-hook-form/discussions/7611#discussioncomment-2008064

# FAQ

## defaultValues vs values

- values
  - 动态字段
- defaultValues
  - 静态字段
