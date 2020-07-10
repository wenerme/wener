---
id: nextcloud-dev
title: Nextcloud 开发
---

# Nextcloud 开发

## Tips

- [接口文档](https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/instruction_set_for_users.html)


## NodeJS

- [hobigo/nextcloud-node-client](https://github.com/hobigo/nextcloud-node-client)

```ts
import Client, { Server } from 'nextcloud-node-client';
const server: Server = new Server({
  basicAuth: { password: '<your password>', username: '<your user name>' },
  url: 'https://<your nextcloud host>/remote.php/webdav',
});

const client = new Client(server);
```
