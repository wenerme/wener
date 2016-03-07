



## 集群调度
![](https://cdn-images-1.medium.com/max/1600/1*x6-_NFEL4HhVIEelzrEQnw.png)

* Monolithic scheduling
  * Apache Hadoop YARN denote by Yahoo
  * 用于高性能计算
  * an architecture that enforces capacity, fairness and deadlines.
  * 执行大量短期计算任务
* Two-level scheduling
  * Mesos
* Shared-state scheduling
  * Google Omega
  * Kubernetes
  * an architecture that gives control to the developers, assuming that they respect the rules concerning the priority of their jobs in the cluster
  * 执行少量长期运行服务


* [Comparison of Container Schedulers](https://medium.com/@ArmandGrillet/comparison-of-container-schedulers-c427f4f7421)
* [Inproving kubernetes schedulers performance](https://coreos.com/blog/improving-kubernetes-scheduler-performance.html)

## Reference
* [Deis](https://deis.com/)
  PaaS over docker and coreos
  * [deis/deis](https://github.com/deis/deis)
  * [Deisdash](http://deisdash.com/) Dashboard for deis
* [Pivotal platform](http://pivotal.io/platform)
* [Flynn](https://flynn.io/)
  * [flynn](https://github.com/flynn/flynn)
* [Openshift](https://www.openshift.com/)
* [Dokku](http://dokku.viewdocs.io/dokku/)
  Docker based PaaS
  * [dokku/dokku](https://github.com/dokku/dokku)
