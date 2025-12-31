---
title: Software Theory
tags:
  - Theory
---

# Software Theory

- [Category theory is a universal modeling language](https://news.ycombinator.com/item?id=26983192)
- [Fallacies of Distributed Computing Explained](http://www.rgoarchitects.com/Files/fallacies.pdf)
- [The Fallacy Of ReUse](http://udidahan.com/2009/06/07/the-fallacy-of-reuse/)
- [Wrong Ways of Defining Service Boundaries](https://medium.com/@wrong.about/wrong-ways-of-defining-service-boundaries-d9e313007bcc)
- [Entity Services is an Antipattern](https://www.infoq.com/news/2017/12/entity-services-antipattern)

## Reconciliation

- [Wiki: Data validation and reconciliation (DVR)](https://en.wikipedia.org/wiki/Data_validation_and_reconciliation)
- [Wiki: Reconciliation (accounting)](<https://en.wikipedia.org/wiki/Reconciliation_(accounting)>)
- [React Reconciliation](https://reactjs.org/docs/reconciliation.html)
- [How React Reconciliation Works](https://css-tricks.com/how-react-reconciliation-works)
- [Kubernetes Self-healing Reconciliation Loop](https://dev.to/adipolak/kubernetes-self-healing-reconciliation-loop-4aj5)
- [Kubernetes Resources and Controllers](https://kubectl.docs.kubernetes.io/pages/kubectl_book/resources_and_controllers.html)
  - Controllers do not Reconcile events, rather they Reconcile the expected cluster state to the observed cluster state at the time Reconcile is run.

### K8s Controllers

- **Deployment Controller**: creates/deletes ReplicaSets
- **ReplicaSet Controller**: creates/deletes Pods
- **Scheduler (Controller)**: writes Nodes to Pods
- **Node (Controller)**: runs Containers specified in Pods on the Node

## Tools

- [JSON Diff Patch](https://benjamine.github.io/jsondiffpatch/demo/index.html)
