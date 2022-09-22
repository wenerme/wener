---
title: Ava
---

# Ava

- [avajs/ava](https://github.com/avajs/ava)
  - 小、快、简单
- process.env.NODE_ENV=test
- node_modules/.cache/ava
- 配合 enzyme 测试 react

```json title="packages.json"
{
  "devDependencies": {
    "ava": "*",
    "tsx": "*"
  },
  "ava": {
    "extensions": {
      "ts": "module"
    },
    "nodeArguments": ["--loader=tsx"]
  }
}
```

```ts
import test from 'ava';

test('foo', (t) => {
  t.pass();
});

test('bar', async (t) => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});

// 串行执行
test.serial('passes serially', (t) => {
  t.pass();
});

test.only('will be run', (t) => {
  t.pass();
});
test.skip('will not be run', (t) => {
  t.fail();
});

test.todo('later');
test.serial.todo('later');

// 标记失败测试
test.failing('demonstrate some bug', (t) => {
  t.fail(); // Test will count as passed
});

// 增加输出内容
import util from 'util';
util.inspect.defaultOptions.depth = 5;
```

- test.{before,after,beforeEach,afterEach}
- test.after.always
- test.afterEach.always
- t.context - 测试上下文
- test.meta.file - 元信息

```bash
npx @ava/init

npx ava
npx ava src/hello.test.ts
# match by title
npx ava src/hello.test.ts -m "db"

npx ava --watch
DEBUG=ava:watcher npx ava --watch

# tap report
npx ava --tap | npx tap-nyan
```

---

- https://github.com/avajs/ava/blob/main/docs/06-configuration.md
- 使用 [watson/is-ci](https://github.com/watson/is-ci) 检测 CI
  - https://github.com/watson/ci-info/blob/master/index.js

## 配置

```json
{
  "ava": {
    "files": ["test/**/*", "!test/exclude-files-in-this-directory", "!**/exclude-files-with-this-name.*"],
    "ignoredByWatcher": "",
    // --match
    // "match": ["*oo", "!foo"],
    // node_modules/.cache/ava
    "cache": true,
    // nproc
    "concurrency": 5,
    "workerThreads": true,
    "failFast": true,
    // 没有 assert 是否认为失败
    "failWithoutAssertions": false,
    "environmentVariables": {
      "MY_ENVIRONMENT_VARIABLE": "some value"
    },
    "tap": false,
    "verbose": true,
    // "snapshotDir":"",
    "extensions": ["cjs", "mjs", "js"],
    "require": ["./my-helper-module.js"],
    "timeout": 0,
    "nodeArguments": ["--trace-deprecation", "--napi-modules"],
    // ava.config.*  使用，定义函数
    // sortTestFiles:"",
    "utilizeParallelBuilds": true
  }
}
```
