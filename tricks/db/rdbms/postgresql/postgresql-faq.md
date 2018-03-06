# PostgreSQL FAQ

## 如果选择金额类型
* [money](https://www.postgresql.org/docs/current/static/datatype-money.html)
  * 功能有限
  * 比 `numeric` 性能更好
  * 历史遗留
* `decimal` 是 `numeric` 的别名
* 可以考虑直接使用 `integer` 来存分
* 大部分情况会使用 `decimal(12,2)`
* 参考
  * [PostgreSQL: Which Datatype should be used for Currency?](https://stackoverflow.com/q/15726535/1870054)
  * [数字类型](https://www.postgresql.org/docs/current/static/datatype-numeric.html)
