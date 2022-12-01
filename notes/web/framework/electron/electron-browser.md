---
title: Electron Browser
---

# Electron Browser

## BEAKER

```js
// 自定义 userData - 测试
// app.setPath('userData', getEnvVar('BEAKER_USER_DATA_PATH'))

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = '1'; // we know, we know

// enable the sandbox
app.enableSandbox();

// HACK fix for cors in custom protocols
// see https://github.com/electron/electron/issues/20730
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// enable process reuse to speed up navigations
// see https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse = true;

// configure the protocols
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'dat',
    privileges: { standard: true, secure: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true },
  },
  {
    scheme: 'hyper',
    privileges: {
      standard: true,
      secure: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  {
    scheme: 'beaker',
    privileges: { standard: true, secure: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true },
  },
]);
```
