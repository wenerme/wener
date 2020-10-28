# bridge vs macvlan
* bridge
  * 完整功能
  * 会学习 Mac 地址
  * 会内部转发匹配 Mac 的包
* macvlan
  * 可理解为简单的 bridge
  * 不会学习 Mac 地址，不会内部转发 - 因此稍微会快一点，内存少一点
* [Bridge vs Macvlan](https://hicu.be/bridge-vs-macvlan)
