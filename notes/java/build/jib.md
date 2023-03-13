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

## Auth

- credential helpers
- $XDG_RUNTIME_DIR/containers/auth.json
- $XDG_CONFIG_HOME/containers/auth.json
- $HOME/.config/containers/auth.json
- $DOCKER_CONFIG/config.json
- $HOME/.docker/config.json
- -Djib.from.auth.username -Djib.from.auth.password
- -Djib.to.auth.username -Djib.to.auth.password

```json
{
  "auths": {
    "docker.io": {
      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="
    },
    "docker.io/wener": {
      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="
    },
    "quay.io": {
      "auth": "juQAqGmz5eR1ipzx8Evn6KGdw8fEa1w5MWczmgY="
    }
  },
  "credHelpers": {
    "registry.example.com": "secretservice"
  }
}
```

```bash
echo -n "$DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD" | base64 -w 0
```

- https://www.mankier.com/5/containers-auth.json

## Setup

**root pom**

```xml
<project>
<properties>
		<!-- for repro -->
		<project.build.outputTimestamp>2023-01-01T00:00:00Z</project.build.outputTimestamp>
		<!-- for jib -->
		<image>REGISTRY/REPO-${project.artifactId}:${image-tag}</image>
    <image-tag>latest</image-tag>
</properties>
<profiles>
  <profile>
      <id>ci</id>
      <activation>
          <property>
              <name>env.DOCKER_IMAGE_TAG</name>
          </property>
      </activation>
      <properties>
          <image-tag>${env.DOCKER_IMAGE_TAG}</image-tag>
      </properties>
  </profile>
</profiles>
<build>
  <pluginManagement>
    <plugins>
      <plugin>
        <groupId>com.google.cloud.tools</groupId>
        <artifactId>jib-maven-plugin</artifactId>
        <version>3.3.1</version>
        <configuration>
          <from>
            <image>wener/java:8</image>
            <platforms>
              <platform>
                <architecture>amd64</architecture>
                <os>linux</os>
              </platform>
              <platform>
                <architecture>arm64</architecture>
                <os>linux</os>
              </platform>
            </platforms>
          </from>
        </configuration>
      </plugin>
      <plugin>
        <groupId>io.github.zlika</groupId>
        <artifactId>reproducible-build-maven-plugin</artifactId>
        <version>0.16</version>
      </plugin>
    </plugins>
  </pluginManagement>
</build>
</project>
```

**common**

```xml
<build>
  <plugins>
    <plugin>
      <groupId>com.google.cloud.tools</groupId>
      <artifactId>jib-maven-plugin</artifactId>
      <configuration>
        <skip>true</skip>
      </configuration>
    </plugin>
    <plugin>
      <groupId>io.github.zlika</groupId>
      <artifactId>reproducible-build-maven-plugin</artifactId>
      <executions>
        <execution>
          <id>run-when-packaged</id>
          <goals>
            <goal>strip-jar</goal>
          </goals>
          <phase>package</phase>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

# FAQ

## multi-platform image building not supported when pushing to Docker engine
