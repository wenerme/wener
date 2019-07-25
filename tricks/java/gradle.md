# Gradle

## Tips

* [Userguide](https://docs.gradle.org/current/userguide/userguide.html)
* [Building Java 9 Modules](https://guides.gradle.org/building-java-9-modules/)

```bash
# https://docs.gradle.org/current/userguide/build_init_plugin.html
# 生成基本配置
# --type pom,java-application,java-library,scala-library,groovy-library,basic
gradle init

# 刷新依赖
gradlew build --refresh-dependencies
# 代理
gradlew -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=1234 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=1234 build
```

__gradle.properties__

```ini
# 代理配置
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1234
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1234

# 如果需要授权
# http.proxyUser=usernameProxy
# http.proxyPassword=yourPassoword
```

```groovy
// https://docs.gradle.org/current/userguide/declaring_repositories.html
mavenCentral()
maven {
    url "http://maven.aliyun.com/nexus/content/groups/public"
}
```


## gradle --help

```
USAGE: gradle [option...] [task...]

-?, -h, --help          Shows this help message.
-a, --no-rebuild        Do not rebuild project dependencies.
-b, --build-file        Specifies the build file.
-c, --settings-file     Specifies the settings file.
--configure-on-demand   Only relevant projects are configured in this build run. This means faster build for large multi-project builds. [incubating]
--console               Specifies which type of console output to generate. Values are 'plain', 'auto' (default) or 'rich'.
--continue              Continues task execution after a task failure.
-D, --system-prop       Set system property of the JVM (e.g. -Dmyprop=myvalue).
-d, --debug             Log in debug mode (includes normal stacktrace).
--daemon                Uses the Gradle Daemon to run the build. Starts the Daemon if not running.
--foreground            Starts the Gradle Daemon in the foreground. [incubating]
-g, --gradle-user-home  Specifies the gradle user home directory.
--gui                   Launches the Gradle GUI.
-I, --init-script       Specifies an initialization script.
-i, --info              Set log level to info.
--include-build         Includes the specified build in the composite. [incubating]
-m, --dry-run           Runs the builds with all task actions disabled.
--max-workers           Configure the number of concurrent workers Gradle is allowed to use. [incubating]
--no-daemon             Do not use the Gradle Daemon to run the build.
--no-scan               Disables the creation of a build scan. [incubating]
--offline               The build should operate without accessing network resources.
-P, --project-prop      Set project property for the build script (e.g. -Pmyprop=myvalue).
-p, --project-dir       Specifies the start directory for Gradle. Defaults to current directory.
--parallel              Build projects in parallel. Gradle will attempt to determine the optimal number of executor threads to use. [incubating]
--profile               Profiles build execution time and generates a report in the <build_dir>/reports/profile directory.
--project-cache-dir     Specifies the project-specific cache directory. Defaults to .gradle in the root project directory.
-q, --quiet             Log errors only.
--recompile-scripts     Force build script recompiling.
--refresh-dependencies  Refresh the state of dependencies.
--rerun-tasks           Ignore previously cached task results.
-S, --full-stacktrace   Print out the full (very verbose) stacktrace for all exceptions.
-s, --stacktrace        Print out the stacktrace for all exceptions.
--scan                  Creates a build scan. Gradle will fail the build if the build scan plugin has not been applied. [incubating]
--status                Shows status of running and recently stopped Gradle Daemon(s).
--stop                  Stops the Gradle Daemon if it is running.
-t, --continuous        Enables continuous build. Gradle does not exit and will re-execute tasks when task file inputs change. [incubating]
-u, --no-search-upward  Don't search in parent folders for a settings.gradle file.
-v, --version           Print version info.
-x, --exclude-task      Specify a task to be excluded from execution.
```
