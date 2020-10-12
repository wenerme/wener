# Gitlab CI 常用语法

## Tips
* `.` 开头的任务不会执行

## 构建之间传递变量

```yaml
build:
  stage: build
  script: echo 'FOO=BAR' > build.env
  artifacts:
    report:
      dotenv: build.env

test:
  stage: test
  script: echo $FOO     # "BAR"
  needs: [build]
```

## 继承
```yaml
include:
  # 模板继承
  template: Serverless.gitlab-ci.yml

functions:build:
  extends: .serverless:build:functions
  # 设置环境信息
  environment: production

functions:deploy:
  extends: .serverless:deploy:functions
  environment: production
```
