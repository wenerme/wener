---
title: React Hook Form
tags:
  - Form
  - React
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
  - 核心逻辑在 `useController`
  - Controller 只包含基础渲染逻辑 - 渲染 as 或者使用 render 函数渲染
- `useController` - 提供自定义组件所需的上下文
  - 提供 onChange, onBlur, name, value, ref,
  - 提供元数据 invalid, isDirty, isTouched

:::tip

- 能使用 ref 尽量使用 ref 注册 - `register`

:::

:::caution

- 默认 mode 为 `onSubmit` - 也就是在提交的时候才会校验
- 元素上的 `required` 会由浏览器处理，而不会添加到 rhf 的规则里
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

- mode = onSubmit - 验证策略: onChange, onBlur, onSubmit, onTouched, all
- reValidateMode = onChange - 验证策略: onChange, onBlur, onSubmit
- defaultValues
- resolver - 外部验证 - yup, zod, joi, superstruct, vest, class-validator, io-ts, nope, computed-types, typanion, ajv, typebox, arktype, valibot
- context
- criteriaMode - firstError | all
- shouldFocusError = true
- shouldUnregister = false

## 技巧

### Schema Validation

Using [Resolver](https://github.com/react-hook-form/resolvers) with Zod, Yup, Joi, etc.

```bash
npm install @hookform/resolvers zod
```

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register('name')} />
      <input type='number' {...register('age', { valueAsNumber: true })} />
      <input type='submit' />
    </form>
  );
};
```

### 数组名字

```js
// test[0].name
// test.0.name
```
