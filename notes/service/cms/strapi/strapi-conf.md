---
tags:
  - Configuration
---

# Strapi Conf

| env                                        | default      | note
| ------------------------------------------ | ------------ | ---------------------------- |
| ADMIN_PATH                                 |
| STRAPI_ADMIN_BACKEND_URL                   |
| STRAPI_TELEMETRY_DISABLED                  | false        |
| STRAPI_DISABLE_UPDATE_NOTIFICATION         | false        |
| STRAPI_HIDE_STARTUP_MESSAGE                | false        |
| STRAPI_DISABLE_REMOTE_DATA_TRANSFER        | false        |
| STRAPI_LICENSE                             |
| STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE        | en           |
| STRAPI_ENFORCE_SOURCEMAPS                  | false        |
| FAST_REFRESH                               | true         |
| BROWSER                                    | true         |
| NODE_ENV                                   | development  |
| ENV_PATH                                   | ./.env       |
| JWT_SECRET                                 |
| HOST                                       | 0.0.0.0      |
| PORT                                       | 1337         |
| APP_KEYS                                   |
| API_TOKEN_SALT                             |
| ADMIN_JWT_SECRET                           |
| TRANSFER_TOKEN_SALT                        |
| DATABASE_CLIENT                            | sqlite       | mysql,mysql2,postgres,sqlite |
| DATABASE_FILENAME                          | .tmp/data.db |
| DATABASE_URL                               |
| DATABASE_HOST                              | localhost    |
| DATABASE_PORT                              |
| DATABASE_NAME                              | strapi       |
| DATABASE_USERNAME                          | strapi       |
| DATABASE_PASSWORD                          | strapi       |
| DATABASE_SSL                               | false        |
| `DATABASE_SSL_{KEY,CERT,CA,CAPATH,CIPHER}` |
| DATABASE_SSL_REJECT_UNAUTHORIZED           | true         |
| DATABASE_CONNECTION_TIMEOUT                | 60000        |
| DATABASE_POOL_MIN                          | 2            |
| DATABASE_POOL_MAX                          | 10           |
| DATABASE_SCHEMA                            | public       |

```ini
STRAPI_TELEMETRY_DISABLED=true
STRAPI_DISABLE_UPDATE_NOTIFICATION=true
STRAPI_HIDE_STARTUP_MESSAGE=true
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=zh
FLAG_PROMOTE_EE=false
FLAG_NPS=false
```

- NPS - Net Promoter Score - 净推荐得分

  - 一种衡量顾客忠诚度和顾客满意度的管理工具。
  - 询问顾客一个简单的问题 —— 他们有多大可能性会向朋友或同事推荐该产品或服务 —— 来计算得出。
  - 顾客的回答范围通常是0到10，基于这个得分，顾客被分类为推荐者（Promoters）、中性（Passives）或批评者（Detractors）。

- https://docs.strapi.io/dev-docs/configurations/environment/

```js title="src/admin/app.js"
export default {
  config: {
    // en 不可以移除，会作为第一次打开时的默认语言
    // @strapi/admin/admin/src/translations/[language-name].json
    // localStorage['strapi-admin-language']
    // https://github.com/strapi/strapi/blob/v4.0.0/packages/plugins/i18n/server/constants/iso-locales.json
    locales: ['zh-Hans', 'en'],
    // 自定义翻译
    translations: {
      fr: {
        'Auth.form.email.label': 'test',
        Users: 'Utilisateurs',
        City: 'CITY (FRENCH)',
        // Customize the label of the Content Manager table.
        Id: 'ID french',
      },
    },
  },
  bootstrap() {},
};
```

- https://docs.strapi.io/developer-docs/latest/development/admin-customization.html
- https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html

```js title="./config/server.js"
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // 配置后 url 会返回完整路径 - 涉及到第三方时可能要求必须配置 - 例如 回调
  // build 是会写入到 js 中，无法启动修改
  // STRAPI_ADMIN_BACKEND_URL
  url: env('WEBSITE', 'http://127.0.0.1:1337'),
  // 是否信任 proxy 头
  proxy: false,
  emitErrors: false,
  socket: '/tmp/nginx.socket',
  cron: {
    enabled: false,
    tasks: {},
  },
  dir: {
    public: './public',
  },
});
```

```js title="./config/admin.js"
module.exports = ({ env }) => ({
  // 后台路径
  url: '/admin',
});
```

```js tiitle="./config/plugins.js"
export default {
  //
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
};
```

```bash
# ADMIN 后台路径 server.url
# 不配置为空
egrep -o 'STRAPI_ADMIN_BACKEND_URL[^}]+' build/*.js
```
