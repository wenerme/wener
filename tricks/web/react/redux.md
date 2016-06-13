# Redux

http://redux.js.org/docs/


__中心思想__

* 程序所有状态存储于 Store
* 状态只读
* 通过纯函数来修改状态
  * 相同的参数返回相同的结果

__基本元素__

* Action
  * 仅描述发生了什么事情,不对状态做任何解释.
* Reducer
  * 不要在 Reducer 中进行以下操作
    * 修改参数
    * 进行有单向影响(side effects)的操作,例如 调用 API 或者路由
    * 调用 non-pure 函数,例如 Date.now() 或 Math.random().
* Store
