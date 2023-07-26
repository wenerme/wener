---
title: payload
---

# payload

- [payload](https://payloadcms.com/) - Headless CMS
  - GraphQL, REST API, Local API
  - MongoDB
- Local API
  - 可以不启动服务

:::caution

- v1 需要 commonjs
- v2 还在开发中

:::

```bash
# npx create-payload-app
pnpm add payload express dotenv # 添加到现有项目
pnpm add -D ts-node typescript @types/node

cat << EOF > .env
PAYLOAD_SECRET=secret
MONGODB_URI=mongodb://localhost:27017/payload
EOF
npx tsc --init --target esnext --module esnext --moduleResolution node16
# ts-node config with swc

NODE_ENV=development pnpm node --loader ts-node/esm --watch ./src/server.ts
```


```ts title="payload.config.ts"
import { buildConfig } from 'payload/config';
export default buildConfig({
  // By default, Payload will boot up normally
  // and you will be provided with a base `User` collection.
  // But, here is where you define how you'd like Payload to work!
});
```

- http://localhost:3000/admin

```ts
import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
  });

  app.listen(3000, async () => {
    console.log('Express is now listening for incoming connections on port 3000.');
  });
};

start();
```
