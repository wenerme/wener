---
id: data-rest
title: Spring Data REST
---

# Spring Data REST


## Tips
* [Spring HATEOAS 文档](http://docs.spring.io/spring-hateoas/docs/current/reference/html/)
* 单个 Item 会使用 E-Tag 做缓存

```java
@Component
public class SpringDataRestCustomization extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

    config.withEntityLookup().
      // 修改 URL 路径上的 ID 属性
      forRepository(UserRepository.class, User::getUsername, UserRepository::findByUsername);
  }
}
```

## NOTES
* `ExcerptProjection`
  * 片段映射
  * 只针对集合有效
  * 添加额外字段
* `RepositoryRestConfigurer`
  * Spring Data WebMVC 的配置接口
* `RepositoryEntityController`
  * WebMVC 入口
* RestMediaTypes
  * `application/hal+json`
  * `application/x-spring-data-compact+json`
  * `text/uri-list`
  * `application/json-patch+json`
  * `application/merge-patch+json`
  * `application/alps+json`
  * `application/schema+json`
  * `application/x-spring-data-verbose+json`
* `BackendIdConverter`
  * 配置 URL 上 id 生成方式
  * `@BackendId` 可用于注解该配置
* `ResourceAssembler`
  * 用于构建资源
  * `PersistentEntityResourceAssembler` : ResourceAssembler<Object, PersistentEntityResource>
    * 将任意对象转换为 `PersistentEntityResource`
* `PersistentEntityJackson2Module`
  * PersistentEntityResource 序列化模块
  * `AssociationOmittingSerializerModifier`
    * 将关联字段移除
    * 不能改动态修改, 因为序列化器构建成功后会缓存

## HATEOAS
* `Resources`
  * 表示一组资源内容
* `ResourceProcessor<T extends ResourceSupport>`
  * 资源预处理接口
  * `ResourceProcessorInvoker`
    * 统一调用方法


## 如何实现动态映射 ?
* 例如通过参数 `select=id,name,parent(id,name)` 来确定
* `PersistentEntityResourceAssemblerArgumentResolver` 实现了 `PersistentEntityResourceAssembler` 的注入
* 注入的 `PersistentEntityProjector` 是根据参数中的 projection 来创建的
* 通过 `ProjectionDefinitions` 拿到映射类
* 通过 `ProjectionFactory` 创建映射, 映射的最终结果就是映射后的内容
* 映射后的内容被封装为 `PersistentEntityResource`
  * 包含 Link ,Embededs, Content, Entity
* Spel 的映射是通过方法拦截实现的
* TODO

## 使用虚拟映射字段
```java
@Projection(name = "virtual", types = { Person.class })
public interface VirtualProjection {
  @Value("#{target.firstName} #{target.lastName}")
  String getFullName();
}
```

## 覆盖处理方法
```java
@RepositoryRestController
public class ScannerController {

    private final ScannerRepository repository;

    @Autowired
    public ScannerController(ScannerRepository repo) {
        repository = repo;
    }

    @RequestMapping(method = GET, value = "/scanners/search/listProducers")
    public @ResponseBody ResponseEntity<?> getProducers() {
        List<String> producers = repository.listProducers();

        //
        // do some intermediate processing, logging, etc. with the producers
        //

        Resources<String> resources = new Resources<String>(producers);

        resources.add(linkTo(methodOn(ScannerController.class).getProducers()).withSelfRel());

        // add other links as needed

        return ResponseEntity.ok(resources);
    }

}
```

## 自定义实体处理
```java
@Bean
public ResourceProcessor<Resource<Person>> personProcessor() {

   return new ResourceProcessor<Resource<Person>>() {

     @Override
     public Resource<Person> process(Resource<Person> resource) {

      resource.add(new Link("http://localhost:8080/people", "added-link"));
      return resource;
     }
   };
}
```

## 添加 Spring Data REST 到现有 Spring MVC 项目
```java
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.webmvc.RepositoryRestMvcConfiguration;

@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class MyApplicationConfiguration {
  …
}
```
## 自定义资源类型处理
```java
@Controller
@ExposesResourceFor(Order.class)
@RequestMapping("/orders")
class OrderController {

  @RequestMapping
  ResponseEntity orders(…) { … }

  @RequestMapping("/{id}")
  ResponseEntity order(@PathVariable("id") … ) { … }
}
```
