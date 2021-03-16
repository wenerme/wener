---
title: Keycloak 客户端
---

# Keycloak 客户端
* [Nerzal/gocloak](https://github.com/Nerzal/gocloak) - Golang

## Javascript Adapter

* https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter
* 默认配置 /keycloak.json
  * Adapter Reference
    * [JavaScript Adapter Reference](https://www.keycloak.org/docs/latest/securing_apps/#javascript-adapter-reference)

```bash
npm add keycloak-js
```

```html
<head>
    <script src="keycloak.js"></script>
    <script>
        var keycloak = new Keycloak();
        keycloak.init().then(function(authenticated) {
            alert(authenticated ? 'authenticated' : 'not authenticated');
        }).catch(function() {
            alert('failed to initialize');
        });
    </script>
</head>
```

```js
new Keycloak('http://localhost:8080/myapp/keycloak.json');
new Keycloak({
    url: 'http://keycloak-server/auth',
    realm: 'myrealm',
    clientId: 'myapp'
});


keycloak.init({
    onLoad: 'check-sso',
    // onLoad: 'login-required'
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
})
```

__silent-check-sso.html__
```html
<html>
<body>
    <script>
        parent.postMessage(location.href, location.origin)
    </script>
</body>
</html>
```

## keycloak-config-cli
* [adorsys/keycloak-config-cli](https://github.com/adorsys/keycloak-config-cli)
  * 通过命令行导入配置
  * 配置参考 [moped.json](https://github.com/adorsys/keycloak-config-cli/blob/main/contrib/example-config/moped.json)
  * 支持 JSON 和 YAML
  * 格式与导出 JSON 相同 - 支持合并/部分导入
