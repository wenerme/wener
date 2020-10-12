# API


## Tips
* Query String
  * [REST Query Language with Spring Data JPA and Querydsl](http://www.baeldung.com/rest-api-search-language-spring-data-querydsl)
  * [Don't Design A Query String You Will One Day Regret](http://www.bizcoder.com/don-t-design-a-query-string-you-will-one-day-regret)


* https://apiary.io/
  * Powerful API Design Stack. Built for Developers.
* https://www.3scale.net/

* 接口设计
  * GCP [API](https://cloud.google.com/apis/design)
  * [Web API Design](https://pages.apigee.com/rs/351-WXY-166/images/ebook-2013-03-wad.pdf)
    * RESTful Web APIs
  * [REST API Design - Resource Modeling](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling)
    * 接口粗细粒度
    * 将复杂操作作为粗粒度资源
  * [shieldfy/API-Security-Checklist](https://github.com/shieldfy/API-Security-Checklist)
    * 开发安全的 API 所需要核对的清单
  * https://github.com/Microsoft/api-guidelines
* 接口参考
  * [github/v3](https://developer.github.com/v3/)
  * [](https://stripe.com/docs/api)
  * [googleapis/googleapis](https://github.com/googleapis/googleapis)
    * Interface definitions for a small (but growing) set of Google APIs
  * [toddmotto/public-apis](https://github.com/toddmotto/public-apis)
    * A collective list of public JSON APIs for use in web development. 
  * https://github.com/Thibaut/devdocs
  * [abhishekbanthia/Public-APIs](https://github.com/abhishekbanthia/Public-APIs)
    * A public list of APIs from round the web.


## Document
* [Top 10 Free Templates for API Documentation](http://techslides.com/top-10-free-templates-for-api-documenation)
* https://github.com/lord/slate
Beautiful static documentation for your API


https://github.com/apidoc/apidoc
http://apidocjs.com/
RESTful web API Documentation Generator
Inline Documentation for RESTful web APIs

https://apiblueprint.org/
https://github.com/apiaryio/api-blueprint/
A powerful high-level API design language for web APIs.

https://swagger.io/


```dockerfile
FROM ruby:2.3-alpine

RUN echo http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/main/ > /etc/apk/repositories; \
    echo http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/community/ >> /etc/apk/repositories

RUN apk add --update nodejs g++ make

COPY . /usr/src/app
VOLUME /usr/src/app
EXPOSE 4567
WORKDIR /usr/src/app

RUN gem source -r https://rubygems.org/ && gem source -a http://mirrors.aliyun.com/rubygems/
RUN bundle install

CMD ["bundle", "exec", "middleman", "server", "--watcher-force-polling"]
```

```bash
docker build -t wener/slate .
# 静态构建
docker run --rm -v $PWD:/usr/src/app/source -w /usr/src/app/source wener/slate bundle exec middleman build --clean


```

### slate
