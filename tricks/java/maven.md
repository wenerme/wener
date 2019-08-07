---
id: maven
title: Maven
tags:
  - Maven
  - Java
  - 编程
  - 技巧
---

# Maven

## Tips

* Maven 包类型
  * pom - Project Object Model
  * jar - Java Application Archive
  * ear - Enterprise Application Archive
  * war - Web Application Archive 
  * rar - Resource Adapter Archive


属性 | 说明
-----|-------
maven.javadoc.skip | 不调用 Javadoc 插件
maven.test.skip | 不编译测试，不执行测试
maven.test.skip.exec | 不执行测试，但编译测试包
maven.repo.remote | 远程仓库
maven.repo.local | 本地仓库
socksProxyHost<br/>socksProxyPort | Socks 代理
httpProxyHost<br/>httpProxyPort | Http 代理
httpsProxyHost<br/>httpsProxyPort | Https 代理


```
-pl, --projects
        Build specified reactor projects instead of all projects
-am, --also-make
        If project list is specified, also build projects required by the list
```

```bash
# 修改远程仓库和本地仓库
mvn package \
  -Dmaven.repo.remote=http://maven.aliyun.com/nexus/content/groups/public \
  -Dmaven.repo.local="$HOME/repo"

# 下载包
mvn dependency:get \
  -DrepoUrl=http://maven.aliyun.com/nexus/content/groups/public \
  -Dartifact=org.redisson:redisson:3.2.0

# 获取项目信息,在命令行下比较有用
mvn -q -Dexec.executable="echo" -Dexec.args='${project.artifactId}' --non-recursive org.codehaus.mojo:exec-maven-plugin:exec

# 强制更新 SNAPSHOT
mvn clean install -U
```



## pom.xml
* [POM Reference](https://maven.apache.org/pom.html)

## settings.xml
* 默认配置文件位于 `$HOME/.m2/settings.xml`
  * 如果没有，可以从 Maven 安装目录拷贝


### 代理设置

```xml
<proxy>
	<id>myproxy</id>
	<active>true</active>
	<protocol>http</protocol>
	<host>127.0.0.1</host>
	<port>8087</port>
	<nonProxyHosts>localhost|127.0.0.1</nonProxyHosts>
</proxy>
```

## 镜像

一般使用镜像有以下几种方式

* 在 POM 中添加仓库
  * 粘贴复制下就能使用
  * 会持久在项目中
    * 团队中其他人也不需要配置
  * 如果在镜像的仓库中找不到会在中央仓库找
* 在 setting 中添加镜像
  * 需要调整 setting.xml 相对麻烦一些
  * 在仓库中找不到会出错
  * 当项目中有多个模块时,使用镜像可能会出现找不到本地模块的问题
* 在 setting 中添加 profile

### 阿里云

可以在 POM 中加入如下仓库配置来使用 阿里云的 Maven 仓库镜像。

> ⚠️ 注意
> 阿里云 Maven 仓库镜像同步相对较慢,可能几天或者十几天才能同步

```xml
<repositories>
    <repository>
        <id>aliyun</id>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>aliyun</id>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </pluginRepository>
</pluginRepositories>
```

### 谷歌

同步速度快,访问速度也很快,没有被封

```xml
<repositories>
    <repository>
       <id>google</id>
       <url>https://maven-central.storage.googleapis.com</url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>google</id>
        <url>https://maven-central.storage.googleapis.com</url>
    </pluginRepository>
</pluginRepositories>
```

### Settings

也可以在 `settings.xml` 里配置

```xml
<settings>
  <mirrors>
    <!-- Google -->
    <mirror>
      <id>google-maven-central</id>
      <name>Google Maven Central</name>
      <url>https://maven-central.storage.googleapis.com</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
    <!-- 阿里 -->
    <mirror>
         <id>aliyun</id>
         <mirrorOf>central</mirrorOf>
         <name>aliyun</name>
         <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
  </mirrors>
</settings>
```

## 插件
* 插件如果不制定 groupId 则默认为 `org.apache.maven.plugins`
* [官方插件列表](https://maven.apache.org/plugins/)
* 默认生命周期包含的插件 [Plugin Bindings for default Lifecycle Reference](https://maven.apache.org/ref/current/maven-core/default-bindings.html)
  * pom 包
    * install - maven-install-plugin:install
    * deploy - maven-deploy-plugin:deploy
  * jar 包
    * process-resources - maven-resources-plugin:resources
    * compile - maven-compiler-plugin:compile
    * process-test-resources - maven-resources-plugin:testResources
    * test-compile - maven-compiler-plugin:testCompile
    * test - maven-surefire-plugin:test
    * package - maven-jar-plugin:jar
    * install - maven-install-plugin:install
    * deploy - maven-deploy-plugin:deploy

### maven-install-plugin

#### 安装 Jar 包到本地仓库

```bash
mvn install:install-file \
  -Dfile=mylib-$VERSION.jar \
  -DgroupId=me.wener.lib \
  -DartifactId=mylib \
  -Dversion=$VERSION \
  -Dpackaging=jar \
  -DgeneratePom=true
```

### maven-jar-plugin
* [Apache Maven JAR Plugin](https://maven.apache.org/plugins/maven-jar-plugin)



### maven-shade-plugin
* [Apache Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/index.html)

```xml
<!-- 常用配置，按需粘贴 -->
<configuration>
    <!-- 不创建 reduced pom 文件 -->
    <createDependencyReducedPom>false</createDependencyReducedPom>
    <!-- 附加 shaded 的文件，默认会上传 shaded 的问题 -->
    <shadedArtifactAttached>true</shadedArtifactAttached>
    <!-- shaded 的 classfier，依赖时指定 classfier 即可 -->
    <shadedClassifierName>jar-with-dependencies</shadedClassifierName>
    <!-- 排除签名相关，否则 shade 后签名异常，切排除 java9 后的 module 信息 -->
    <filters>
        <filter>
            <artifact>*:*</artifact>
            <excludes>
                <exclude>META-INF/*.SF</exclude>
                <exclude>META-INF/*.DSA</exclude>
                <exclude>META-INF/*.RSA</exclude>
                <exclude>module-info.class</exclude>
            </excludes>
        </filter>
    </filters>
    <artifactSet>
        <excludes>
            <!-- 排除包，不做 shade -->
            <exclude>org.slf4j:*</exclude>
        </excludes>
    </artifactSet>
    <!-- 转换，按需配置 -->
    <transformers>
        <!-- 合并文件为一个，附加的方式 -->
        <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
            <resource>config.properties</resource>
        </transformer>
        <!-- 处理 ServiceLoader 的定义 -->
        <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
        <!-- 合并 META-INF/NOTICE.TXT 文件 -->
        <transformer implementation="org.apache.maven.plugins.shade.resource.ApacheNoticeResourceTransformer"/>
    </transformers>
    <!-- 避免版本冲突，做 shade -->
    <relocations>
        <relocation>
            <pattern>com.google.common</pattern>
            <shadedPattern>me.wener.shade.guava</shadedPattern>
        </relocation>
    </relocations>
</configuration>
```

#### shade one & relocation

将 guava 重定位到 `me.wener.guava`

```xml
<plugin>
    <artifactId>maven-shade-plugin</artifactId>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <artifactSet>
                    <includes>
                        <include>com.google.guava:guava</include>
                    </includes>
                </artifactSet>
                <relocations>
                    <relocation>
                        <pattern>com.google.common</pattern>
                        <shadedPattern>me.wener.guava</shadedPattern>
                    </relocation>
                </relocations>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### shade all & relocation & new jar

会生成另外一个 jar `jraphql-${project.version}-shaded`

```xml
<plugin>
  <artifactId>maven-shade-plugin</artifactId>
  <executions>
    <execution>
      <phase>package</phase>
      <goals>
        <goal>shade</goal>
      </goals>
      <configuration>
        <finalName>jraphql-${project.version}-shaded</finalName>
        <relocations>
          <relocation>
            <pattern>com.google.common</pattern>
            <shadedPattern>shaded.com.google.common</shadedPattern>
          </relocation>
        </relocations>
        <artifactSet>
          <includes>
            <include>*:*</include>
          </includes>
        </artifactSet>
      </configuration>
    </execution>
  </executions>
</plugin>
```

## maven-release-plugin
* [Maven Release Plugin](http://maven.apache.org/maven-release/maven-release-plugin/)
* 执行目标
  * release:clean 在准备发布后清理
  * release:prepare 在 SCM 中生成准备提交
  * release:prepare-with-pom 在 SCM 中生成准备提交并生成 POM
  * release:rollback 回退之前的发布
  * release:perform 从 SCM 执行发布
  * release:stage 在制定的目录从 SCM 发布
  * release:branch 创建分支并更新版本
  * release:update-versions 更新 POM 中的版本
* 基本的逻辑是先提交到 SCM，在从 SCM 拉取到一个临时目录进行构建发布

```bash
# 查看帮助
mvn release:help
# 准备发布
mvn release:clean release:prepare
# 执行发布
# deploy & push
mvn release:perform
# 回滚操作
mvn release:rollback
```

### maven-gpg-plugin
* [maven-gpg-plugin](https://maven.apache.org/plugins/maven-gpg-plugin)
* 在部署到仓库时一般要求做 gpg 签名
* [How to config GPG and sign artifact with it](https://github.com/sevntu-checkstyle/dsm-maven-plugin/wiki/How-to-config-GPG-and-sign-artifact-with-it)

GPG 的基本操作

```bash
# 生成 key
gpg --gen-key
# 查看 key
gpg --list-keys
# 上传
gpg --keyserver hkp://pool.sks-keyservers.net --send-keys 09CB6FEF
# 生成签名
gpg -ab artifact.jar
# 验证签名
gpg --verify artifact.jar.asc
```

在验证时进行签名操作

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-gpg-plugin</artifactId>
	<version>1.4</version>
	<executions>
		<execution>
			<id>sign-artifacts</id>
			<phase>verify</phase>
			<goals>
				<goal>sign</goal>
			</goals>
		</execution>
	</executions>
</plugin>
```

### spring-boot-maven-plugin
* [Spring Boot Maven Plugin](https://docs.spring.io/spring-boot/docs/current/maven-plugin)

### 生成 build-info

默认位置为 `META-INF/build-info.properties`

```xml
<executions>
  <execution>
    <goals>
      <goal>build-info</goal>
    </goals>
    <configuration>
      <additionalProperties>
        <encoding.source>UTF-8</encoding.source>
        <encoding.reporting>UTF-8</encoding.reporting>
        <java.source>${maven.compiler.source}</java.source>
        <java.target>${maven.compiler.target}</java.target>
      </additionalProperties>
    </configuration>
  </execution>
</executions>
```

### git-commit-id-plugin

* [ktoso/maven-git-commit-id-plugin](https://github.com/ktoso/maven-git-commit-id-plugin)

Maven plugin which includes build-time git repository information into an POJO / *.properties

#### 只生成部分属性

```xml
<plugin>
    <groupId>pl.project13.maven</groupId>
    <artifactId>git-commit-id-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>revision</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <verbose>false</verbose>
        <dateFormat>yyyy-MM-dd'T'HH:mm:ssZ</dateFormat>
        <generateGitPropertiesFile>true</generateGitPropertiesFile>
        <generateGitPropertiesFilename>
            ${project.build.outputDirectory}/git.properties
        </generateGitPropertiesFilename>
        <includeOnlyProperties>
            <includeOnlyProperty>^git.branch$</includeOnlyProperty>
            <includeOnlyProperty>^git.build.time$</includeOnlyProperty>
            <includeOnlyProperty>^git.build.version$</includeOnlyProperty>
            <includeOnlyProperty>^git.commit.id.abbrev$</includeOnlyProperty>
            <includeOnlyProperty>^git.commit.time$</includeOnlyProperty>
        </includeOnlyProperties>
    </configuration>
</plugin>
```


## 仓库管理
* [Best Practice - Using a Repository Manager](https://maven.apache.org/repository-management.html)
* [Artifactory 特性比较](https://www.jfrog.com/confluence/display/RTF/Artifactory+Comparison+Matrix)
* [Nexus OSS](https://www.sonatype.com/nexus-repository-oss)
  * 标准的 Maven 仓库
  * 支持 Bower,Docker,Git LFS,Maven,npm,NuGet,PyPI,Ruby Gems,Yum
  * 3.x 支持 Docker 就像仓库
  * 有 Docker 镜像
* [JFrog](https://jfrog.com/open-source/)
  * 第二大开源 Maven 仓库
* [Apache Archiva](https://archiva.apache.org)

```bash
# ARCHIVA_BASE 可修改存储位置, 默认为 /var/archiva
# ARCHIVA_CONTEXT_PATH 可在反向代理是使用, 默认为 /
docker run -v $PWD/archiva:/var/archiva -p 8080:8080 -d ninjaben/archiva-docker
```


## 中央仓库
* [Guide to uploading artifacts to the Central Repository](https://maven.apache.org/guides/mini/guide-central-repository-upload.html)
* [Deploy to Maven Central Repository](https://dzone.com/articles/deploy-maven-central)


### Sonatype Central
* [OSSRH Guide](http://central.sonatype.org/pages/ossrh-guide.html)
* [Deploying to OSSRH with Apache Maven](http://central.sonatype.org/pages/apache-maven.html)
* [Requirements](https://central.sonatype.org/pages/requirements.html)
* 发布到 Sonatype 后，大约 10m 后会同步到中央仓库
* 坐标申请
  * 在 https://issues.sonatype.org/ 创建账号
  * 创建一个 issues 描述希望使用的 groupId 并简单阐述放的内容
  * 等待审批完成
* 要求
  * 提供 Javadoc 和 Sources
  * 使用 GPG/PGP 签名，生成 `.asc` 文件
  * pom 要求
    * 正确的坐标
    * 版本不能为 `-SNAPSHOT`
    * 名字，描述，网址 - name,description,url
    * name 可接受 `${project.groupId}:${project.artifactId}`
    * 许可信息 - licenses
    * 开发者信息 - developers
    * SCM 信息 - scm

#### Maven 部署



#### 手动部署
```bash
# https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide

# 编译打包
mvn jar:jar source:jar javadoc:jar
cd target
cp ../pom.xml .
# 签名
NAME=MyLib-0.0.1
rm *.asc
gpg -ab pom.xml
gpg -ab $NAME.jar
gpg -ab $NAME-sources.jar
gpg -ab $NAME-javadoc.jar

# http://maven.apache.org/plugins/maven-gpg-plugin/sign-mojo.html
# 可以直接在命令行上指定密码
PASSPHRASE=xxx
mvn gpg:sign-and-deploy-file -Dgpg.passphrase=$PASSPHRASE \
	-Durl=https://oss.sonatype.org/service/local/staging/deploy/maven2/ \
  -DrepositoryId=sonatype-nexus-staging -DpomFile=pom.xml \
  -Dfile=NAME.jar

mvn gpg:sign-and-deploy-file -Dgpg.passphrase=$PASSPHRASE \
	-Durl=https://oss.sonatype.org/service/local/staging/deploy/maven2/ \
  -DrepositoryId=sonatype-nexus-staging -DpomFile=pom.xml \
  -Dfile=$NAME-sources.jar -Dclassifier=sources

mvn gpg:sign-and-deploy-file -Dgpg.passphrase=$PASSPHRASE \
	-Durl=https://oss.sonatype.org/service/local/staging/deploy/maven2/ \
  -DrepositoryId=sonatype-nexus-staging -DpomFile=pom.xml \
  -Dfile=$NAME-javadoc.jar -Dclassifier=javadoc

```

## FAQ
### optional vs provided

* optional 只影响包的传递性, 不影响包的 ClassPath
* provided 只在 compile 和 test 下存在, 并且不会传递
* 所以区别在于 optional 在 runtime 时生效, 而 provided 不生效



### Scope 的作用域

scope     | compile | test  |runtime  | transitive
----------|---------|-------|---------|---------
compile   | Y       | Y	    | Y       | Y
test      | -       | Y     | -       | -
provided  | Y       | Y     | -       | -
runtime   | -       | Y     | Y       | Y
system    | Y       | Y     | -       | Y
