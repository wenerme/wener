---
title: Coding
---

# coding

- https://coding.net
  - 功能非常多非常全
  - 团队 -> 项目 -> 仓库
- 免费版 - https://coding.net/pricing
  - 仓库 10G
  - Docker 制品 1000 个
  - 非 Docker 制品 5G
  - 项目管理 5000 条记录
  - 测试用例 3000 条记录
  - 网盘 20G

## Worker

- CI/CD 基于 Jenkins
  - Jenkinsfile
- /etc/qci.conf
- /etc/cci_daemon.conf
- /root/codingci - CI_HOME
- /root/codingci/tools/jenkins_home/workspace/
- `/root/codingci/msg/msg_<TIMESTAMP>.json`
- `/root/codingci/cci_daemon.log`
- `/root/codingci/jenkins.log`
- `/root/codingci/ci_log_YYYY-MM-DD.log`

```bash
apk add git make java python

mkdir -p /root/codingci/tools
cd /root/codingci/tools
curl -fL "https://coding-public-generic.pkg.coding.net/cci/release/cci-agent/jenkins.war?version=2.293-cci" -o jenkins.war
curl -fL "https://coding-public-generic.pkg.coding.net/cci/release/jenkinsHome.zip?version=latest" -o jenkins_home.zip
unzip jenkins_home.zip

# py 脚本
qci_worker version

# 官方安装命令
# VERSION=2023.04.06-98504ecfdfc8699d3b557059c3fe79b8ebc2c668
curl -fL "https://public-files.coding.net/public-files/coding-ci/install/linux/install.sh?version=2023.04.06-98504ecfdfc8699d3b557059c3fe79b8ebc2c668" | CODING_SERVER=wss://$PROJECT.coding.net PACKAGE_URL=https://public-files.coding.net JENKINS_VERSION=2.293-cci-v2.5 JENKINS_HOME_VERSION=v65 PYPI_HOST=https://$PROJECT.coding.net/ci/pypi/simple PYPI_EXTRA_INDEX_URL= LOG_REPORT=http://worker-beat.coding.net CI_HOME=/root/codingci bash -s $TOKEN false default
# 重新启动
qci_worker up -d
```

```ini title=/etc/qci.conf
[default]
PYPI_PACKAGE_URL = https://PROJECT.coding.net/ci/pypi/simple/qci-worker/
PYPI_INDEX_URL = https://PROJECT.coding.net/ci/pypi/simple
NODE_LOG_REPORT_HOST = http://worker-beat.coding.net
CI_HOME = /root/codingci
API_HOST = https://PROJECT.coding.net
NODE_CLIENT_ID =
NODE_CLIENT_FINGERPRINT =
NODE_TOKEN =
```

- https://coding.net/help/docs/ci/node/customize.html

| 包管理工具 | 缓存目录                      |
| ---------- | ----------------------------- |
| Maven      | /root/.m2/                    |
| Gradle     | /root/.gradle/                |
| npm        | /root/.npm/                   |
| composer   | /root/.cache/composer/        |
| pip3       | /root/.cache/pip/             |
| yarn       | /usr/local/share/.cache/yarn/ |

## CI Env

| env        | for    |
| ---------- | ------ |
| DEPOT_NAME | 仓库名 |

## 制品

- Composer
- Maven
- Docker
- Generic
- Npm

# FAQ

- CI 运行可能没有 HOME 变量
- 健康检查
  - `ps -ef | grep jenkins.war | grep -v grep`
  - `pgrep -f jenkins.war`

```bash
java -Dsun.java2d.debugfonts=warning -Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8 -jar /root/codingci/tools/jenkins.war --httpPort=15740 --httpListenAddress=127.0.0.1
```

```groovy
stage('检出') {
  when {
    branch 'env/*'
    expression {
      env.BRANCH_NAME=='123'
      env.BRANCH_NAME ==~ /feature\/[0-9]+\.[0-9]+\.[0-9]+/
    }
  }
}
```

## Shadow Clone Depths

```groovy
checkout(
  [$class: 'GitSCM',
  // branches: [[name: '*/master']],
  branches: [[name: GIT_BUILD_REF]],
  // extensions: [[$class: 'CloneOption', noTags: false, shallow: true, depth: 1, /*timeout: 30*/]],
  userRemoteConfigs: [[ url: GIT_REPO_URL, credentialsId: CREDENTIALS_ID ]]]
)
```

- https://javadoc.jenkins.io/plugin/git/hudson/plugins/git/extensions/impl/CloneOption.html
