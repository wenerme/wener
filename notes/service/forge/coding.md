---
title: Coding
---

# coding

- https://coding.net
  - 功能非常多非常全
  - 团队 -> 项目 -> 仓库

## Worker

- CI/CD 基于 Jenkins
  - Jenkinsfile
- /etc/qci.conf
- /etc/cci_daemon.conf

```bash
apk add git make java python

mkdir -p /root/codingci/tools
cd /root/codingci/tools
curl -fL "https://coding-public-generic.pkg.coding.net/cci/release/cci-agent/jenkins.war?version=2.293-cci" -o jenkins.war
curl -fL "https://coding-public-generic.pkg.coding.net/cci/release/jenkinsHome.zip?version=latest" -o jenkins_home.zip
unzip jenkins_home.zip

# py 脚本
qci_worker version

curl -fL 'https://coding.net/public-files/coding-ci/install/linux/install.sh' | CODING_SERVER=wss://PROJECT.coding.net PACKAGE_URL=https://coding.net JENKINS_VERSION=2.293-cci-v2.3 JENKINS_HOME_VERSION=v51 PYPI_HOST=https://PROJECT.coding.net/ci/pypi/simple PYPI_EXTRA_INDEX_URL= LOG_REPORT=http://worker-beat.coding.net bash -s $TOKEN false dev-ci
```

```ini
/etc/qci.conf
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

## 制品

- Composer
- Maven
- Docker
- Generic
- Npm
