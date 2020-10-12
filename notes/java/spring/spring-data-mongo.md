# Spring Data Mongo

## Tips
* 支持和 JPA 类似的定义和操作
* `DBRef` 支持懒加载
  * 懒加载的拦截处理对象为 `LazyLoadingInterceptor`
```java
// 默认情况下取懒加载对象的 ID 会导致对象初始化, 可以通过判断绕过
if (s instanceof LazyLoadingProxy) {
    // 对于懒加载的 DBRef, 这里的 id 应该为 ObjectId, 直接 toString 即可
    return ((LazyLoadingProxy) s).toDBRef().getId().toString();
}
```
