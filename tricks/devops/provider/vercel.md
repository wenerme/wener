# Vercel

## Tips
* Free
* [Fair Use Policy](https://vercel.com/docs/platform/fair-use-policy)
  * JAM 站点和应用
  * 前端
  * SPA
  * Functions that query DBs or APIs
  * 博客、电商、营销
* 问题
  * [#4910](https://github.com/vercel/vercel/discussions/4910) - Yarn2 build failed
  * [#4029](https://github.com/vercel/vercel/discussions/4029) - 价格调整
* 注意
  * Vercel 可以本地部署静态，但无法部署 nextjs 项目
  * 不支持 yarn2

```bash
# 登陆
yarn dlx vercel login

# 部署
# .vercel 目录会记录项目信息 - 默认会加到 .gitignore
yarn dlx vercel
```
