# API


## Tips

* GCP [API](https://cloud.google.com/apis/design)
* [Web API Design](https://pages.apigee.com/rs/351-WXY-166/images/ebook-2013-03-wad.pdf)
  * RESTful Web APIs
* https://apiary.io/
  * Powerful API Design Stack. Built for Developers.
* https://www.3scale.net/



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
