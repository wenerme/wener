---
title: Nextcloud 开发
---

# Nextcloud 开发

- [接口文档](https://docs.nextcloud.com/server/latest/admin_manual/configuration_user/instruction_set_for_users.html)

**/status.php**

```json
{
  "installed": true,
  "maintenance": false,
  "needsDbUpgrade": false,
  "version": "30.0.2.2",
  "versionstring": "30.0.2",
  "edition": "",
  "productname": "Nextcloud",
  "extendedSupport": false
}
```

- /cron.php

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
