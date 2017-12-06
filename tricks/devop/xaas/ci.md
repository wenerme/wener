# CI


## Spinnaker
https://github.com/spinnaker/spinnaker
Spinnaker is an open source, multi-cloud continuous delivery platform for releasing software changes with high velocity and confidence.

## Jenkins
* [jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)
* 想要禁用 git 的 ssl 验证可以在环境中执行
  * `git config --global http.sslVerify false`

* [Jenkinsfile](https://jenkins.io/doc/book/pipeline/jenkinsfile/)
* Pipeline
  * 支持脚本语法和 DSL 语法


__demo__

```
pipeline {
    agent any

    stages {
      stage('Build') {
          steps {
              echo 'Building..'
          }
      }
      stage('Test') {
          steps {
              echo 'Testing..'
          }
      }
      stage('Deploy') {
          steps {
              echo 'Deploying....'
          }
      }
		  stage('Release check') {
          steps {
              input "可以正式发布了么 ?"
          }
      }
      stage('Release') {
          steps {
              echo 'Releasing....'
          }
      }
    }

   post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
```

* 使用 docker

```
pipeline {

    agent {
        docker { image 'node:7-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
```
