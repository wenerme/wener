---
title: Jackson 使用总结
slug: jackson-summary
tags:
  - Java
  - Jackson
  - Json
  - 阿里
---

## 动态策略

动态策略概念相对宽泛，在进入正式的内容之前容我先明确题目中动态策略的范畴。

这里的动态策略指，现在以 A 方式来做某件事，在过程中可能被切换为 B 方案，但对上层来说是无感的。策略可以映射为策略模式（Strategy Pattern），例如

_图片缺失_

<!-- ![undefined](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/140424/1565334699201-7c97dc59-48a8-4327-aa3e-4bd562230017.png) -->

上下文依赖了一个 IStrategy 接口，而 IStrategy 有两种实现，StrategyA、StrategyB，在运行中可能是选择的 A 策略或 B 策略。再一个现实一点的例子

_图片缺失_

<!-- ![undefined](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/140424/1565335036438-50a9b700-1498-4153-96be-f5764341edb5.png) -->

图例描述了一个具体的存储策略，CachedStrategy 是带缓存的存储策略， cache 和 backend 实现缓存逻辑，IStorage 本身是抽象的接口，因此缓存逻辑也只需要依赖接口而不需要关心具体实现。MemoryStorage 是一个内存存储，数据存在内存的 Map 中，RedisStorage 是访问远程的存储。所有的这些策略细节对上层而言都是无感的，最上层使用的依然是一个存储接口。

这样的策略是还可以叠加的，这样做策略的目的是简化了单个策略实现的复杂度，专注于实现一个功能点，如果不使用策略，则需要在一个实现类里实现过多的逻辑，当面临新的需求，接入新的适配的时候，导致改动会异常困难，以下的伪代码展示了这样的区别

**单个类实现**

```js
class StorageImpl {
  constructor({ redisUrl, redisPort }) {
    this.cache = {};
    this.redis = new Redis({ url: redisUrl, port: redisPort });
  }
  get(key) {
    if (this.cache[key]) {
      return this.cache[key];
    }
    let val = this.redis.get(key);
    if (val) {
      this.cache[key] = val;
    }
    return val;
  }
  set(key, value) {
    delete this.cache[key];
    this.redis.set(key, value);
  }
}
```

**接口策略实现**

```js
class CachedStorage {
  constructor({ cache, backend }) {
    this.cache = cache;
    this.backend = backend;
  }
  get(key) {
    let val = this.cache.get(key);
    if (!val) {
      val = this.backend.get(key);
      if (val) {
        this.cache.set(key, val);
      }
    }
    return val;
  }
  set(key, val) {
    this.cache.set(key, null);
    this.backend.set(key, val);
  }
}

class MemoryStorage {
  constructor() {
    this.data = {};
  }
  get(key) {
    return this.data[key];
  }
  set(key, val) {
    this.data[key] = val;
  }
}

class RedisStorage {
  constructor({ url, host }) {
    this.redis = new Redis({ url, port });
  }
  get(key) {
    return this.redis.get(key);
  }
  set(key, val) {
    this.redis.set(key, val);
  }
}
```

当代码和策略较少的时候，可能直接实现是更简单的，但当策略逐渐增多，业务逻辑越加复杂的时候，写在单个实现中是非常难以维护的，一些简单的例子，例如 后端访问需要支持按 key 进行分片访问，支持从另外一种存储加载数据。

策略可以很灵活，且不可预知的，因此需要实现这样的策略管理直接硬编码的方式是不可行的。

## 基于 JSON 的动态策略配置

每个策略都是一个通用的接口实现，一个策略的实现可能依赖其它策略，这样的结构是一个树形的，那么配置也是一个树形的结构，例如

```json
{
  "type": "cached",
  "cache": {
    "type": "memory"
  },
  "backend": {
    "type": "redis",
    "port": 6379,
    "host": "127.0.0.1"
  }
}
```

整体结构与策略的组成一致，从配置角度来说，非常直观便于理解。但实际使用时需要进行解析处理并映射为具体的策略实现。

在现有的 Java JSON 解析库中，Jackson 功能最为丰富，要实现这样的策略配置有三种方式

1. JSON -> 配置对象 -> 实现
   - 何时选用：实现复杂，有较多运行状态
   - 需要额外的一次实现映射
   - 序列化反序列化简单
2. JSON -> 实现
   - 何时选用：实现简单，运行状态可控
   - 需要额外方法进行初始化
   - 状态字段需要注意不要被序列化 - `@JsonIgnore` 或 transient
3. JSON->抽象配置对象->抽象实现->实际配置对象->实际实现
   - 何时选用：实现复杂且有继承关系，每一层实现复杂处理不同的配置
   - 需要基于配置对象，配置对象有继承关系
   - 配置对象能持有任意配置内容，不同配置对象可在不丢失数据的前提下互相转换

### 配置过程

以下代码演示了使用配置对象来实现配置的抽象序列化和反序列化

```java
public class ConfigObjectDemo {
    @Test
    public void test() throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        String config = "{\"type\":\"cached\",\"cache\":{\"type\":\"memory\"},\"backend\":{\"type\":\"redis\",\"port\":6379,\"host\":\"127.0.0.1\"}}";
        StorageConfig storageConfig = mapper.readValue(config, StorageConfig.class);
        // 输出 CachedStorageConfig(cache=MemoryConfig(), backend=RedisConfig(host=127.0.0.1, port=6379))
        System.out.println(storageConfig);
        // 输出 {"type":"cached","cache":{"type":"memory"},"backend":{"type":"redis","host":"127.0.0.1","port":6379}}
        System.out.println(mapper.writeValueAsString(storageConfig));
    }
}

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CachedStorageConfig.class, name = "cached"),
        @JsonSubTypes.Type(value = MemoryConfig.class, name = "memory"),
        @JsonSubTypes.Type(value = RedisConfig.class, name = "redis")
})
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE)
interface StorageConfig{ String getType();}

@Data
class CachedStorageConfig implements StorageConfig{
    private StorageConfig cache;private StorageConfig backend;
    @Override public String getType() { return "cached"; }
}
@Data
class MemoryConfig implements StorageConfig{ @Override public String getType() { return "memory"; }}
@Data
class RedisConfig implements StorageConfig{
    private String host; private int port;
    @Override public String getType() { return "redis"; }
}
```

在这里看到比较复杂的注解是 `@JsonSubTypes`，该注解配置了类型与实际实现的映射关系，而 `@JsonTypeInfo` 配置了那个字段作为类型信息字段。通过注解的方式配置不太灵活，可能有时候会忽略配置或配置错误，且不能动态增加。

解决配置比较问题也有两种办法，第一种办法是保留 `@JsonTypeInfo` 注解，然后手动进行映射关系的配置，例如

```java
ObjectMapper mapper = new ObjectMapper();
mapper.registerSubtypes(new NamedType(CachedStorageConfig.class,"cached"));
mapper.registerSubtypes(new NamedType(MemoryConfig.class,"memory"));
mapper.registerSubtypes(new NamedType(RedisConfig.class,"redis"));
```

结果与通过注解的方式配置是相同的，这样就可以动态配置了。如果连 `@JsonTypeInfo` 也不想要，希望通过代码完全动态添加，这样的过程会比较复杂。最终的结果类似于

```java
// 注册一个动态类型，且说明如何获取到类型
MyJson.registerDynamicType(StorageConfig.class, StorageConfig::getType);
MyJson.registerDynamicSubtypes(StorageConfig.class, new NamedType(CachedStorageConfig.class, "cached"));
MyJson.registerDynamicSubtypes(StorageConfig.class, new NamedType(MemoryConfig.class, "memory"));
MyJson.registerDynamicSubtypes(StorageConfig.class, new NamedType(RedisConfig.class, "redis"));
```

`registerDynamicType` 和 `registerDynamicSubtypes` 的实现可参考[这里](https://github.com/wenerme/wava/blob/a216dfe8e92fe4822c9659949fbe862b9419eef4/wava-common/src/main/java/me/wener/wava/util/JSON.java#L114)。

至此便完成了所有的动态配置，反序列化为配置对象和实现没有特别大的区别，只需要控制好字段可见性即可。

使用抽象配置，则需要能够记录完整的信息，从抽象配置转换为实际配置时不能丢配置内容，使用 Jackson，可使用 `@JsonAnyGetter` 和 `@JsonAnySetter` 实现，因为我会定义一个类似如下的基础类

```java
public class PropertyObject {
    @JsonIgnore @Setter private Map<String, Object> properties;

    @JsonAnyGetter public Map<String, Object> getProperties() { return properties; }
    @JsonAnySetter
    public Object set(String name, Object value) {
        if (properties == null) { properties = Maps.newHashMap(); }
        return properties.put(name, value);
    }
}
```

完整定义参考 [PropertyObject](https://github.com/wenerme/wava/blob/a216dfe8e92fe4822c9659949fbe862b9419eef4/wava-common/src/main/java/me/wener/wava/model/PropertyObject.java)。

对配置的处理则可以使用类似责任链的方式，如果实现对配置感兴趣，则将其转换为自己感兴趣的配置对象，这样也便于添加注解进行校验和验证。

> 实现过程
>
> 配置的正确处理和校验使得实现过程相对简单，相当于确定了程序的所有入参，实现便不在此赘述。

## 策略扩展

每一种策略实际对应的都是一部分业务逻辑，那么 `1+1` 和 `1-1` 也是可以被认为是两种策略，在[从 0 到 1 实现自定义语言](https://wener.me/story/get-started-with-dsl/)中有提到，语言被解析后会生成语法树，而语法树也可以理解为是一种树形的策略逻辑。表达式中的通用节点一般叫做 Expression，而每个 Expression 都可以计算出来一个值，这个值可以隐含在其它的一个 Expression 中，例如 1+1 可以表示为

```json
{
  "type": "BinaryOperation",
  "operator": "ADD",
  "left": { "type": "Literal", "value": 1 },
  "right": { "type": "Literal", "value": 1 }
}
```

而 1+1+1 则表示为

```json
{
  "type": "BinaryOperation",
  "operator": "ADD",
  "left": { "type": "Literal", "value": 1 },
  "right": {
    "type": "BinaryOperation",
    "operator": "ADD",
    "left": { "type": "Literal", "value": 1 },
    "right": { "type": "Literal", "value": 1 }
  }
}
```

其序列化和反序列化之前讨论的配置是完全一致的。很多的业务逻辑本身也是可以通过表达式来表述的，而使用表达式则能是的场景配置更为灵活。

## 实际应用

以下列举在实例开发中使用到的场景，三种场景各不相同。

### 奥格存储

在 奥格人群二方包开发总结 中有提到底层存储的复杂性

_图片缺失_

<!-- ![人群二方包文章素材 (2).png](https://intranetproxy.alipay.com/skylark/lark/0/2018/png/140424/1546074626769-bb495d37-803f-4dc6-8dc5-d2f3b373d263.png) -->

该配置的实现便是基于这样的配置逻辑实现的。分别对应接口

- CrowdStorage
- CrowdStore

如果集成了奥格二方包 是看得到相应实现的。

使用的是 JSON 直接反序列化为实现的方式。

### 任务调度

奥格的渠道管理底层实现是一套相对通用的，在总结中提到多层级的支持便是通过抽象配置实现

- 任务调度支持
  _ 渠道投放
  _ 渠道支持 - 短信、外呼、邮件/SMTP
  _ 数据源支持 - 接口、人群、ODPS
  _ 调度支持 - 单次、周期、手动

配置对象类图如下

_图片缺失_

<!-- ![undefined](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/140424/1565503501772-e6e9f241-72c2-41d5-94f4-95c4d9effa32.png) -->

### 状态人群表达式

奥格二方包现有表达式处理能力，但在下一个版本中该功能会被增强，将不在客户端解析编译，而是在服务端处理后下发语法树，下发的语法树其实就是一个策略配置，表达式的类图如下

_图片缺失_

<!-- ![undefined](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/140424/1565504216442-e28b054c-0c3e-4b6d-b957-7f29600754f7.png) -->

## 总结

熟练的掌握和使用各种场景下的配置可以减少大量的不必要的处理逻辑，且能减少不少的 BUG，一些 Bad Smell 例如 `JSON.parse(jsonString).get("someThing").asLong()` 是应该被避免的，因为没有人能知道这是在做什么，也不知道里面都有什么，像是一个黑盒。开发时往往业务逻辑是相对简单的，但是确保拿到正确的配置很难，面向失败设计，开闭原则，有问题的地方必然会出问题，往往我们用来校验是否正确的代码比实际的代码还要多，当遇到这样问题的时候，思考是否有更好的方式来做这些事情。
