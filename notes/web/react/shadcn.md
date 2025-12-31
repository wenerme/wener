---
title: shadcn
---

# shadcn

- [shadcn-ui/ui](https://github.com/shadcn-ui/ui)
  - =Radix+Tailwind CSS
  - 基于 preset 的模板生成组件到本地
  - 更多是强调怎么组织组件
  - 依赖
    - v4 支持多 icon 支持 @base-ui/react 了
    - [@radix-ui/primitive](./radix.md) - 基础组件
      - Headless UI
    - [cva](https://github.com/joe-bell/cva)
    - lucide-react - default 的 icon
    - @radix-ui/react-icons - new-york 的 icon
- 参考
  - 类似的 NextUI

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add select
```

- components - 组件 - 原子级
  - 按钮、输入框、下拉菜单、卡片
- blocks - 区块 - 组织级
  - 仪表盘侧边栏、带有验证的登录框、定价页、数据分析图表区
- CVA (class-variance-authority)
  - 组件变体

## Registry
