---
title: tekton
---

# tekton

- [tektoncd/pipeline](https://github.com/tektoncd/pipeline)
  - Apache-2.0, Golang
  - cloud-native Pipeline
  - 类似 shell on k8s
- CDR
  - Task
  - TaskRun
  - Pipeline
  - PipelineRun
  - Run
- Pipeline -> Task -> Step/Run
- [tektoncd/dashboard](https://github.com/tektoncd/dashboard)
- 参考
  - https://hub.tekton.dev/

# FAQ

## tekton vs argo

- Tekton
  - focuses on source based workflows - CI
  - Tekton 能处理 CI 部分
- Argo Workflows
  - 更通用 - ETL、ML、Data
  - 通过 Argo Events 处理 git webhook

---

- https://github.com/tektoncd/pipeline/graphs/contributors
- https://github.com/argoproj/argo-workflows/graphs/contributors
