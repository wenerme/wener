---
title: GitLab Java
tags:
  - Ops
  - Service
  - GitLab
  - CI
  - Java
---

# GitLab CI Java

- [gitlab-runner#4566](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/4566#note_222730933)

```yaml
image: maven:3.5-jdk-11-slim

cache:
  paths:
    - .m2/repository
    - node_modules/
    - frontend/node
    - frontend/node_modules/

variables:
  # This will suppress any download for dependencies and plugins or upload messages which would clutter the console log.
  # `showDateTime` will show the passed time in milliseconds. You need to specify `--batch-mode` to make this work.
  MAVEN_OPTS: '-Dhttps.protocols=TLSv1.2 -Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=WARN -Dorg.slf4j.simpleLogger.showDateTime=true -Djava.awt.headless=true'
  # As of Maven 3.3.0 instead of this you may define these options in `.mvn/maven.config` so the same config is used
  # when running from the command line.
  # `installAtEnd` and `deployAtEnd` are only effective with recent version of the corresponding plugins.
  MAVEN_CLI_OPTS: '-s $CI_PROJECT_DIR/.m2/settings.xml --batch-mode --errors --fail-at-end --show-version -DinstallAtEnd=true -DdeployAtEnd=true'

stages:
  - build
  - docker
  - deploy

build:
  stage: build
  script:
    - cd frontend
    - mvn package $MAVEN_CLI_OPTS
    - cd ../backend
    - mvn package $MAVEN_CLI_OPTS
    # Escreve versão do Pom num arquivo pra usar no docker build
    - POM_VERSION=$(mvn --non-recursive help:evaluate -Dexpression=project.version | grep -v '\[.*')
    - echo $POM_VERSION >> version.txt
  artifacts:
    paths:
      - backend/target/*.jar
      - backend/version.txt

build_image:
  stage: docker
  image: docker:19.03.0-dind
  only:
    - master
    - release.*
  script:
    # Lê versão do Pom
    - POM_VERSION=$(cat backend/version.txt)
    - echo $POM_VERSION
    - echo $CI_REGISTRY
    - echo $CI_BUILD_TOKEN
    - echo $CI_REGISTRY_IMAGE
    # Build da imagem docker
    - docker login -u $CI_DEPLOY_USER -p $CI_DEPLOY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$POM_VERSION .
    - docker push $CI_REGISTRY_IMAGE:$POM_VERSION
```
