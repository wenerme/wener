# Spring Data REST
* [Spring HATEOAS 文档](http://docs.spring.io/spring-hateoas/docs/current/reference/html/)

## Tips
* 可提供 `RepositoryRestConfigurer` (或扩展 `RepositoryRestConfigurerAdapter`) 来实现对 Spring Data REST 的定制化配置.


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
