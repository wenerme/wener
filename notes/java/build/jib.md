---
title: jib
---

# jib

- [GoogleContainerTools/jib](https://github.com/GoogleContainerTools/jib)

:::tip

- tar
  - docker 要先 load 才能 push
  - crane 可以直接 push

:::

```bash
mvn compile jib:build       # 不依赖 docker 直接推送
mvn compile jib:dockerBuild # 使用 docker
mvn compile jib:buildTar

mvn compile com.google.cloud.tools:jib-maven-plugin:3.3.1:build -Dimage=IMAGE
```

```
51ec4eb40e96   53 years ago   jib-maven-plugin:3.3.1                          70B       jvm arg files
<missing>      53 years ago   jib-maven-plugin:3.3.1                          546kB     classes
<missing>      53 years ago   jib-maven-plugin:3.3.1                          139kB     resources
<missing>      53 years ago   jib-maven-plugin:3.3.1                          2.18MB    snapshot dependencies
<missing>      53 years ago   jib-maven-plugin:3.3.1                          350MB     dependencies
```
