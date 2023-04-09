---
title: Jenkins
---

# Jenkins

- [jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)
- 系统要求
  - 4GB+ 内存
  - 50GB+ 磁盘

## Docker

- [jenkinsci/docker](https://github.com/jenkinsci/docker)
  - jenkins/jenkins
    - lts-alpine
      - 只有 amd64
    - lts-jdk11
      - debian
      - amd64, arm64
    - lts-jdk17
  - /var/jenkins_home
- 50000
  - agent

```bash
docker run --rm -it \
  -v $PWD/data:/var/jenkins_home \
  -p 8080:8080 -p 50000:50000 \
  --name jenkins jenkins/jenkins:lts-jdk11
```

- /var/jenkins_home/secrets/initialAdminPassword
- 默认插件
  - Folders
  - OWASP Markup Formatter
  - Build Timeout
  - Credentials Binding
  - Timestamper
  - Workspace Cleanup
  - Ant
  - Gradle
  - Pipeline
  - GitHub Branch Source
  - Pipeline: GitHub Groovy Libraries
  - Pipeline: Stage View
  - Git
  - SSH Build Agents
  - Matrix Authorization Strategy
  - PAM Authentication
  - LDAP
  - Email Extension
  - Mailer
  - Localization: Chinese (Simplified)

## jenkins/ssh-agent

```bash
docker run --rm -it \
  jenkins/ssh-agent:4.13.0-alpine-jdk17
```

- alpine
  - based on adoptopenjdk/openjdk
- JENKINS_AGENT_SSH_PUBKEY
- [SSH Build Agents](https://plugins.jenkins.io/ssh-slaves/)
- https://www.jenkins.io/doc/book/using/using-agents/#configuring-agents-with-docker

## Failed to dynamically deploy this plugin

下载失败

- https://updates.jenkins-ci.org/download/plugins/

## System Properties

```ini
jenkins.install.runSetupWizard=true
# $JENKINS_HOME/secrets/initialAdminApiToken
# "TOKEN" - `echo "11$(openssl rand -hex 16)"`
# "@file"
jenkins.install.SetupWizard.adminInitialApiToken=true

JENKINS_HOME=~/.jenkins
```

- https://archives.jenkins.io/status.html
- https://mirrors.tuna.tsinghua.edu.cn/jenkins/
- mirror.xmission.com
- https://www.jenkins.io/doc/book/managing/system-properties/
- https://get.jenkins.io/plugins/

```bash
JENKINS_UC=https://updates.jenkins.io/update-center.json
JENKINS_UC_EXPERIMENTAL=https://updates.jenkins.io/experimental/update-center.json
JENKINS_INCREMENTALS_REPO_MIRROR=https://repo.jenkins-ci.org/incrementals
JENKINS_UC_DOWNLOAD=$JENKINS_UC/download

JENKINS_PLUGIN_INFO=https://updates.jenkins.io/plugin-versions.json
```

```bash
export JENKINS_UC=https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
export JENKINS_UC_DOWNLOAD=https://mirrors.tuna.tsinghua.edu.cn/jenkins/
jenkins-plugin-cli --verbose -d $JENKINS_HOME/plugins/ --plugins cloudbees-folder

jenkins-plugin-cli -d $JENKINS_HOME/plugins/ --plugins cloudbees-folder antisamy-markup-formatter build-timeout credentials-binding timestamper ws-cleanup ant gradle workflow-aggregator github-branch-source pipeline-github-lib pipeline-stage-view git ssh-slaves matrix-auth pam-auth ldap email-ext mailer locale msbuild
```

- https://updates.jenkins.io/plugin-versions.json

```
http://mirror.esuni.jp/jenkins/updates/update-center.json
https://updates.jenkins-zh.cn/update-center.json
https://jenkins-zh.gitee.io/update-center-mirror/tsinghua/current/update-center.json
http://mirror.xmission.com/jenkins/updates/update-center.json
http://updates.jenkins-ci.org/update-center.json
```

- https://github.com/lework/jenkins-update-center
- http://mirrors.jenkins-ci.org/status.html
- https://updates.jenkins.io/
