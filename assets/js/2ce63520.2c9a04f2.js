"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["26831"],{50623:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>l,default:()=>h,assets:()=>a,toc:()=>c,frontMatter:()=>d});var s=JSON.parse('{"id":"java/spring/data","title":"Spring Data","description":"Tips","source":"@site/../notes/java/spring/spring-data.md","sourceDirName":"java/spring","slug":"/java/spring/data","permalink":"/notes/java/spring/data","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/spring/spring-data.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1602516815000,"frontMatter":{"id":"data","title":"Spring Data"},"sidebar":"docs","previous":{"title":"Spring Data REST","permalink":"/notes/java/spring/data-rest"},"next":{"title":"Spring FAQ","permalink":"/notes/java/spring/faq"}}'),t=r("52676"),i=r("79938");let d={id:"data",title:"Spring Data"},l="Spring Data",a={},c=[{value:"Tips",id:"tips",level:2},{value:"Note",id:"note",level:2},{value:"\u6620\u5C04 - org.springframework.data.mapping",id:"\u6620\u5C04---orgspringframeworkdatamapping",level:3},{value:"MongoDB",id:"mongodb",level:2},{value:"Entity Versions",id:"entity-versions",level:2},{value:"Spring Data \u67E5\u8BE2\u5173\u952E\u5B57",id:"spring-data-\u67E5\u8BE2\u5173\u952E\u5B57",level:2},{value:"Spring Data \u8FD4\u56DE\u7ED3\u679C\u7C7B\u578B",id:"spring-data-\u8FD4\u56DE\u7ED3\u679C\u7C7B\u578B",level:2},{value:"JPA Repository \u65B9\u6CD5\u8BED\u6CD5",id:"jpa-repository-\u65B9\u6CD5\u8BED\u6CD5",level:2},{value:"\u5355\u72EC\u4F7F\u7528 Repository",id:"\u5355\u72EC\u4F7F\u7528-repository",level:2},{value:"\u5B9E\u73B0\u81EA\u5B9A\u4E49\u63A5\u53E3",id:"\u5B9E\u73B0\u81EA\u5B9A\u4E49\u63A5\u53E3",level:2},{value:"\u4E3A\u6240\u6709 Repository \u6DFB\u52A0\u81EA\u5B9A\u4E49\u65B9\u6CD5",id:"\u4E3A\u6240\u6709-repository-\u6DFB\u52A0\u81EA\u5B9A\u4E49\u65B9\u6CD5",level:2},{value:"\u5728 Query \u4E2D\u4F7F\u7528 SpEL \u6765\u4E66\u5199\u901A\u7528\u7684 SQL",id:"\u5728-query-\u4E2D\u4F7F\u7528-spel-\u6765\u4E66\u5199\u901A\u7528\u7684-sql",level:2},{value:"Spring Web \u96C6\u6210",id:"spring-web-\u96C6\u6210",level:2},{value:"\u76F4\u63A5\u4F7F\u7528\u5B9E\u4F53\u548C\u7279\u6B8A\u53C2\u6570",id:"\u76F4\u63A5\u4F7F\u7528\u5B9E\u4F53\u548C\u7279\u6B8A\u53C2\u6570",level:3},{value:"\u4F7F\u7528\u591A\u4E2A\u5206\u9875\u53C2\u6570",id:"\u4F7F\u7528\u591A\u4E2A\u5206\u9875\u53C2\u6570",level:3},{value:"Spring HATEOAS \u652F\u6301\u5206\u9875",id:"spring-hateoas-\u652F\u6301\u5206\u9875",level:3},{value:"\u4F7F\u7528 Querydsl \u5B9E\u73B0\u67E5\u8BE2\u53C2\u6570\u7ED1\u5B9A",id:"\u4F7F\u7528-querydsl-\u5B9E\u73B0\u67E5\u8BE2\u53C2\u6570\u7ED1\u5B9A",level:3},{value:"\u4F7F\u7528 Hibernate \u5B9E\u73B0\u8F6F\u5220\u9664",id:"\u4F7F\u7528-hibernate-\u5B9E\u73B0\u8F6F\u5220\u9664",level:2},{value:"\u81EA\u52A8\u751F\u6210\u521B\u5EFA\u65F6\u95F4\u5B57\u6BB5\u548C\u66F4\u65B0\u65F6\u95F4\u5B57\u6BB5",id:"\u81EA\u52A8\u751F\u6210\u521B\u5EFA\u65F6\u95F4\u5B57\u6BB5\u548C\u66F4\u65B0\u65F6\u95F4\u5B57\u6BB5",level:2},{value:"\u94FE\u63A5\u65AD\u5F00\u5F02\u5E38",id:"\u94FE\u63A5\u65AD\u5F00\u5F02\u5E38",level:2},{value:"Not a managed type",id:"not-a-managed-type",level:2},{value:"\u4F7F\u7528 QueryDSL \u6784\u5EFA\u52A8\u6001\u67E5\u8BE2",id:"\u4F7F\u7528-querydsl-\u6784\u5EFA\u52A8\u6001\u67E5\u8BE2",level:2}];function o(e){let n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"spring-data",children:"Spring Data"})}),"\n",(0,t.jsx)(n.h2,{id:"tips",children:"Tips"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/spring-projects/spring-data-examples",children:"Spring Data \u793A\u4F8B"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://docs.spring.io/spring-data/commons/docs/current/reference/html/",children:"Spring Data Commons \u6587\u6863"})}),"\n",(0,t.jsxs)(n.li,{children:["\u5B9E\u73B0\u5C06 PathVariable \u4ECE\u4E3B\u952E\u8F6C\u4E3A\u5B9E\u4F53\u7684\u8F6C\u6362\u5668\u4E3A DomainClassConverter\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E3B\u8981\u4F7F\u7528: Repositories, RepositoryInformation, RepositoryInvoker \u8FDB\u884C\u64CD\u4F5C"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"note",children:"Note"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"RepositoryMetadata"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"RepositoryInformation"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"RepositoryQuery"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u62BD\u8C61\u63A5\u53E3, \u7528\u4E8E\u6267\u884C\u6240\u6709\u6570\u636E\u4ED3\u5E93\u64CD\u4F5C"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"PartTree"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u7528\u4E8E\u5C06\u65B9\u6CD5\u540D\u8F6C\u6362\u4E3A\u67E5\u8BE2\u65B9\u6CD5"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"^(find|read|get|query|stream|count|exists|delete|remove)((\\p{Lu}.*?))??By"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.code,{children:"PersistenceExceptionTranslationInterceptor"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5904\u7406\u6570\u636E\u4ED3\u5E93\u8C03\u7528\u8FC7\u7A0B\u4E2D\u7684\u5F02\u5E38"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"\u67E5\u8BE2\u65B9\u6CD5\u5904\u7406\u94FE"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"SurroundingTransactionDetectorMethodInterceptor"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E8B\u52A1\u8BBE\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"ExposeInvocationInterceptor"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DefaultMethodInvokingMethodInterceptor"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u5904\u7406 ",(0,t.jsx)(n.code,{children:"default"})," \u65B9\u6CD5"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"RepositoryFactorySupport$QueryExecutorMethodInterceptor"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u6620\u5C04---orgspringframeworkdatamapping",children:"\u6620\u5C04 - org.springframework.data.mapping"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5904\u7406\u4E0D\u540C SpringData \u6301\u4E45\u5316\u7684\u4E2D\u95F4\u5C42\u6620\u5C04"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"PersistentEntity<T, P extends PersistentProperty<P>> extends Iterable<P>"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E00\u4E2A\u6301\u4E45\u5316\u5BF9\u8C61"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"PersistentProperty"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E00\u4E2A\u6301\u4E45\u5316\u5BF9\u8C61\u7684\u5C5E\u6027"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Association"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u8868\u793A\u5C5E\u6027\u4E4B\u95F4\u7684\u5173\u8054"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u4E3B\u8981\u5B9E\u73B0\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"JpaPersistentPropertyImpl"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"JPA \u6301\u4E45\u5316\u5BF9\u8C61\u7684\u5C5E\u6027"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"MutablePersistentEntity<T, P extends PersistentProperty<P>> extends PersistentEntity<T, P>"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5305\u542B\u4E86\u4FEE\u6539\u65B9\u6CD5"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"IdentifierAccessor"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"PersistentPropertyAccessor"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"MappingContext"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6620\u5C04\u4E0A\u4E0B\u6587"}),"\n",(0,t.jsx)(n.li,{children:"\u8BB0\u5F55\u4E86\u6240\u6709\u5DF2\u77E5\u7684\u5B9E\u4F53\u7C7B\u578B"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"PersistentPropertyPath"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u8868\u793A\u4E00\u4E2A\u6301\u4E45\u5C5E\u6027\u7684\u8DEF\u5F84"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"mongodb",children:"MongoDB"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"// SpringData \u67E5\u8BE2\u65E5\u5FD7\nlogging.level.org.springframework.data.mongodb.core.MongoTemplate: DEBUG\n\n// MongoDB \u7684\u65E5\u5FD7\u5DE5\u5177\u7C7B com.mongodb.diagnostics.logging.Loggers\n// \u524D\u7F00 org.mongodb.driver \u4F8B\u5982 \u64CD\u4F5C operation\nlogging.level.org.mongodb.driver.operation: INFO\n// \u6216\u8005\u6253\u5F00\u5168\u91CF\u7684\n// \u6CE8\u610F, \u4F9D\u7136\u662F\u770B\u4E0D\u5230\u53D1\u9001\u7684\u67E5\u8BE2\nlogging.level.org.mongodb.driver: INFO\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["MongoDB \u7684 Repository \u5B9E\u73B0\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"org.springframework.data.mongodb.repository.support.SimpleMongoRepository"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"org.springframework.data.mongodb.repository.support.QueryDslMongoRepository"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"MongoQueryMethod"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u89E3\u6790 Mongo \u7684 Query \u6CE8\u89E3"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"PartTreeMongoQuery"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u901A\u8FC7\u65B9\u6CD5\u89E3\u6790\u540E\u7684 Query \u5B9E\u4F8B"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"org.springframework.data.mongodb.core.query.Query"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5B9E\u9645\u67E5\u8BE2"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"org.springframework.data.mongodb.repository.support.SpringDataMongodbQuery"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"QueryDSL Mongo \u7684\u67E5\u8BE2\u5BF9\u8C61"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"\ninterface MyRepo{\n  // \u53EA\u8FD4\u56DE tags \u5B57\u6BB5\n  // \u6CE8\u610F: QueryDSL \u7684 Predicate \u4E0D\u4F1A\u88AB\u4F7F\u7528\n  @Query(fields = \"{'tags':1}\")\n  List<PageDocument> findTagsBy(Predicate predicate);\n  // \u5EFA\u8BAE\u57FA\u4E8E QueryDslMongoRepository \u5C06\u67E5\u8BE2\u5BF9\u8C61\u4E0A\u7684 Path \u53C2\u6570\u66B4\u9732\u51FA\u6765, \u4F8B\u5982\n  List<T> findAll(Predicate predicate, Path<?>... paths);\n}\n\n"})}),"\n",(0,t.jsx)(n.h2,{id:"entity-versions",children:"Entity Versions"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/spring-projects/spring-data-envers",children:"spring-projects/spring-data-envers"})}),"\n",(0,t.jsx)(n.li,{children:"JPA \u6269\u5C55, \u57FA\u4E8E hibernate envers"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"spring-data-\u67E5\u8BE2\u5173\u952E\u5B57",children:"Spring Data \u67E5\u8BE2\u5173\u952E\u5B57"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"\u903B\u8F91\u5173\u952E\u8BCD"}),(0,t.jsx)(n.th,{children:"\u5173\u952E\u8BCD\u8868\u8FBE\u5F0F"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"AND"}),(0,t.jsx)(n.td,{children:"And"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"OR"}),(0,t.jsx)(n.td,{children:"Or"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"AFTER"}),(0,t.jsx)(n.td,{children:"After, IsAfter"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"BEFORE"}),(0,t.jsx)(n.td,{children:"Before, IsBefore"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CONTAINING"}),(0,t.jsx)(n.td,{children:"Containing, IsContaining, Contains"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"BETWEEN"}),(0,t.jsx)(n.td,{children:"Between, IsBetween"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"ENDING_WITH"}),(0,t.jsx)(n.td,{children:"EndingWith, IsEndingWith, EndsWith"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"EXISTS"}),(0,t.jsx)(n.td,{children:"Exists"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"FALSE"}),(0,t.jsx)(n.td,{children:"False, IsFalse"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GREATER_THAN"}),(0,t.jsx)(n.td,{children:"GreaterThan, IsGreaterThan"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GREATER_THAN_EQUALS"}),(0,t.jsx)(n.td,{children:"GreaterThanEqual, IsGreaterThanEqual"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IN"}),(0,t.jsx)(n.td,{children:"In, IsIn"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IS"}),(0,t.jsx)(n.td,{children:"Is, Equals, (or no keyword)"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IS_NOT_NULL"}),(0,t.jsx)(n.td,{children:"NotNull, IsNotNull"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IS_NULL"}),(0,t.jsx)(n.td,{children:"Null, IsNull"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"LESS_THAN"}),(0,t.jsx)(n.td,{children:"LessThan, IsLessThan"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"LESS_THAN_EQUAL"}),(0,t.jsx)(n.td,{children:"LessThanEqual, IsLessThanEqual"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"LIKE"}),(0,t.jsx)(n.td,{children:"Like, IsLike"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NEAR"}),(0,t.jsx)(n.td,{children:"Near, IsNear"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NOT"}),(0,t.jsx)(n.td,{children:"Not, IsNot"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NOT_IN"}),(0,t.jsx)(n.td,{children:"NotIn, IsNotIn"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NOT_LIKE"}),(0,t.jsx)(n.td,{children:"NotLike, IsNotLike"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"REGEX"}),(0,t.jsx)(n.td,{children:"Regex, MatchesRegex, Matches"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"STARTING_WITH"}),(0,t.jsx)(n.td,{children:"StartingWith, IsStartingWith, StartsWith"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"TRUE"}),(0,t.jsx)(n.td,{children:"True, IsTrue"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"WITHIN"}),(0,t.jsx)(n.td,{children:"Within, IsWithin"})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"spring-data-\u8FD4\u56DE\u7ED3\u679C\u7C7B\u578B",children:"Spring Data \u8FD4\u56DE\u7ED3\u679C\u7C7B\u578B"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"\u8FD4\u56DE\u7C7B\u578B"}),(0,t.jsx)(n.th,{children:"\u63CF\u8FF0"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"void"}),(0,t.jsx)(n.td,{children:"\u4E0D\u8FD4\u56DE\u503C"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"\u539F\u5B50\u7C7B\u578B"}),(0,t.jsx)(n.td,{children:"Java \u539F\u5B50\u7C7B\u578B\u503C"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"\u5305\u88C5\u7C7B\u578B"}),(0,t.jsx)(n.td,{children:"Java \u5305\u88C5\u7C7B\u578B\u503C"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"T"}),(0,t.jsx)(n.td,{children:"An unique entity. Expects the query method to return one result at most. In case no result is found null is returned. More than one result will trigger an IncorrectResultSizeDataAccessException."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Iterator<T>"}),(0,t.jsx)(n.td,{children:"An Iterator."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Collection<T>"}),(0,t.jsx)(n.td,{children:"A Collection."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"List<T>"}),(0,t.jsx)(n.td,{children:"A List."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Optional<T>"}),(0,t.jsx)(n.td,{children:"A Java 8 or Guava Optional. Expects the query method to return one result at most. In case no result is found Optional.empty()/Optional.absent() is returned. More than one result will trigger an IncorrectResultSizeDataAccessException."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Stream<T>"}),(0,t.jsx)(n.td,{children:"A Java 8 Stream."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Future<T>"}),(0,t.jsx)(n.td,{children:"A Future. Expects method to be annotated with @Async and requires Spring\u2019s asynchronous method execution capability enabled."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"CompletableFuture<T>"}),(0,t.jsx)(n.td,{children:"A Java 8 CompletableFuture. Expects method to be annotated with @Async and requires Spring\u2019s asynchronous method execution capability enabled."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"ListenableFuture"}),(0,t.jsx)(n.td,{children:"A org.springframework.util.concurrent.ListenableFuture. Expects method to be annotated with @Async and requires Spring\u2019s asynchronous method execution capability enabled."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Slice"}),(0,t.jsx)(n.td,{children:"A sized chunk of data with information whether there is more data available. Requires a Pageable method parameter."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Page<T>"}),(0,t.jsx)(n.td,{children:"A Slice with additional information, e.g. the total number of results. Requires a Pageable method parameter."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GeoResult<T>"}),(0,t.jsx)(n.td,{children:"A result entry with additional information, e.g. distance to a reference location."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GeoResults<T>"}),(0,t.jsx)(n.td,{children:"A list of GeoResult<T> with additional information, e.g. average distance to a reference location."})]})]})]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"\u7A7A\u95F4\u5750\u6807\u7C7B\u578B(GeoResult, GeoResults, GeoPage)\u53EA\u6709\u5728\u5B58\u50A8\u7C7B\u578B\u652F\u6301\u7A7A\u95F4\u7C7B\u578B\u65F6\u8FD4\u56DE"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"jpa-repository-\u65B9\u6CD5\u8BED\u6CD5",children:"JPA Repository \u65B9\u6CD5\u8BED\u6CD5"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://docs.spring.io/spring-data/data-jpa/docs/current/reference/html/#jpa.query-methods.query-creation",children:"Repository \u65B9\u6CD5\u8BED\u6CD5"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Keyword"}),(0,t.jsx)(n.th,{children:"Sample"}),(0,t.jsx)(n.th,{children:"JPQL snippet"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"And"}),(0,t.jsx)(n.td,{children:"findByLastnameAndFirstname"}),(0,t.jsx)(n.td,{children:"\u2026 where x.lastname = ?1 and x.firstname = ?2"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Or"}),(0,t.jsx)(n.td,{children:"findByLastnameOrFirstname"}),(0,t.jsx)(n.td,{children:"\u2026 where x.lastname = ?1 or x.firstname = ?2"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Is,Equals"}),(0,t.jsx)(n.td,{children:"findByFirstname,findByFirstnameIs,findByFirstnameEquals"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname = ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Between"}),(0,t.jsx)(n.td,{children:"findByStartDateBetween"}),(0,t.jsx)(n.td,{children:"\u2026 where x.startDate between ?1 and ?2"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"LessThan"}),(0,t.jsx)(n.td,{children:"findByAgeLessThan"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age < ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"LessThanEqual"}),(0,t.jsx)(n.td,{children:"findByAgeLessThanEqual"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age \u21D0 ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GreaterThan"}),(0,t.jsx)(n.td,{children:"findByAgeGreaterThan"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age > ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"GreaterThanEqual"}),(0,t.jsx)(n.td,{children:"findByAgeGreaterThanEqual"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age >= ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"After"}),(0,t.jsx)(n.td,{children:"findByStartDateAfter"}),(0,t.jsx)(n.td,{children:"\u2026 where x.startDate > ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Before"}),(0,t.jsx)(n.td,{children:"findByStartDateBefore"}),(0,t.jsx)(n.td,{children:"\u2026 where x.startDate < ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IsNull"}),(0,t.jsx)(n.td,{children:"findByAgeIsNull"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age is null"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IsNotNull,NotNull"}),(0,t.jsx)(n.td,{children:"findByAge(Is)NotNull"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age not null"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Like"}),(0,t.jsx)(n.td,{children:"findByFirstnameLike"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname like ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NotLike"}),(0,t.jsx)(n.td,{children:"findByFirstnameNotLike"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname not like ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"StartingWith"}),(0,t.jsx)(n.td,{children:"findByFirstnameStartingWith"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname like ?1 (parameter bound with appended %)"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"EndingWith"}),(0,t.jsx)(n.td,{children:"findByFirstnameEndingWith"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname like ?1 (parameter bound with prepended %)"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Containing"}),(0,t.jsx)(n.td,{children:"findByFirstnameContaining"}),(0,t.jsx)(n.td,{children:"\u2026 where x.firstname like ?1 (parameter bound wrapped in %)"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"OrderBy"}),(0,t.jsx)(n.td,{children:"findByAgeOrderByLastnameDesc"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age = ?1 order by x.lastname desc"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Not"}),(0,t.jsx)(n.td,{children:"findByLastnameNot"}),(0,t.jsx)(n.td,{children:"\u2026 where x.lastname <> ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"In"}),(0,t.jsx)(n.td,{children:"findByAgeIn(Collection<Age> ages)"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age in ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"NotIn"}),(0,t.jsx)(n.td,{children:"findByAgeNotIn(Collection<Age> age)"}),(0,t.jsx)(n.td,{children:"\u2026 where x.age not in ?1"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"True"}),(0,t.jsx)(n.td,{children:"findByActiveTrue()"}),(0,t.jsx)(n.td,{children:"\u2026 where x.active = true"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"False"}),(0,t.jsx)(n.td,{children:"findByActiveFalse()"}),(0,t.jsx)(n.td,{children:"\u2026 where x.active = false"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"IgnoreCase"}),(0,t.jsx)(n.td,{children:"findByFirstnameIgnoreCase"}),(0,t.jsx)(n.td,{children:"\u2026 where UPPER(x.firstame) = UPPER(?1)"})]})]})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'// Enables the distinct flag for the query\nList<Person> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);\nList<Person> findPeopleDistinctByLastnameOrFirstname(String lastname, String firstname);\n\n\n// \u4F7F\u7528 Top \u548C First\nUser findFirstByOrderByLastnameAsc();\nUser findTopByOrderByAgeDesc();\nPage<User> queryFirst10ByLastname(String lastname, Pageable pageable);\nSlice<User> findTop3ByLastname(String lastname, Pageable pageable);\nList<User> findFirst10ByLastname(String lastname, Sort sort);\nList<User> findTop10ByLastname(String lastname, Pageable pageable);\n\n// \u8FD4\u56DE\u7ED3\u679C\u6D41\n@Query("select u from User u")\nStream<User> findAllByCustomQueryAndStream();\n// \u53EA\u8FD4\u56DE\u7ED3\u679C\u7247\u6BB5\nSlice<User> findTop3ByLastname(String lastname, Pageable pageable);\n\n// \u9009\u62E9\u5355\u4E2A\u8FD4\u56DE,\u53EF\u8FD4\u56DE Optional\nUser findFirstByOrderByLastnameAsc();\nOptional<User> findTopByOrderByAgeDesc();\n\n// \u5F02\u6B65\u64CD\u4F5C\n@Async\nFuture<User> findByFirstname(String firstname);               \n@Async\nCompletableFuture<User> findOneByFirstname(String firstname);\n@Async\nListenableFuture<User> findOneByLastname(String lastname);\n\nLong countByLastname(String lastname);\nLong deleteByLastname(String lastname);\nList<User> removeByLastname(String lastname);\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u5355\u72EC\u4F7F\u7528-repository",children:"\u5355\u72EC\u4F7F\u7528 Repository"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"RepositoryFactorySupport factory = \u2026 // Instantiate factory here\nUserRepository repository = factory.getRepository(UserRepository.class);\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u5B9E\u73B0\u81EA\u5B9A\u4E49\u63A5\u53E3",children:"\u5B9E\u73B0\u81EA\u5B9A\u4E49\u63A5\u53E3"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"interface UserRepositoryCustom {\n  public void someCustomMethod(User user);\n}\nclass UserRepositoryImpl implements UserRepositoryCustom {\n\n  public void someCustomMethod(User user) {\n    // Your custom implementation\n  }\n}\ninterface UserRepository extends CrudRepository<User, Long>, UserRepositoryCustom {\n\n  // Declare query methods here\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u4E3A\u6240\u6709-repository-\u6DFB\u52A0\u81EA\u5B9A\u4E49\u65B9\u6CD5",children:"\u4E3A\u6240\u6709 Repository \u6DFB\u52A0\u81EA\u5B9A\u4E49\u65B9\u6CD5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"@NoRepositoryBean\npublic interface MyRepository<T, ID extends Serializable>\n  extends PagingAndSortingRepository<T, ID> {\n\n  void sharedCustomMethod(ID id);\n}\n\npublic class MyRepositoryImpl<T, ID extends Serializable>\n  extends SimpleJpaRepository<T, ID> implements MyRepository<T, ID> {\n\n  private final EntityManager entityManager;\n\n  // \u6784\u9020\u51FD\u6570\u5FC5\u987B\u8981\u8981\u6709\u8FD9\u6837\u7684\u4F9D\u8D56\u6CE8\u5165\n  public MyRepositoryImpl(JpaEntityInformation entityInformation, EntityManager entityManager) {\n    super(entityInformation, entityManager);\n\n    // Keep the EntityManager around to used from the newly introduced methods.\n    this.entityManager = entityManager;\n  }\n\n  public void sharedCustomMethod(ID id) {\n    // implementation goes here\n  }\n}\n\n@Configuration\n@EnableJpaRepositories(repositoryBaseClass = MyRepositoryImpl.class)\nclass ApplicationConfiguration { \u2026 }\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u5728-query-\u4E2D\u4F7F\u7528-spel-\u6765\u4E66\u5199\u901A\u7528\u7684-sql",children:"\u5728 Query \u4E2D\u4F7F\u7528 SpEL \u6765\u4E66\u5199\u901A\u7528\u7684 SQL"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'@MappedSuperclass\npublic abstract class AbstractMappedType {\n  String attribute;\n}\n\n@Entity\npublic class ConcreteType extends AbstractMappedType { \u2026 }\n\n@NoRepositoryBean\npublic interface MappedTypeRepository<T extends AbstractMappedType> extends Repository<T, Long> {\n  @Query("select t from #{#entityName} t where t.attribute = ?1")\n  List<T> findAllByAttribute(String attribute);\n}\n\npublic interface ConcreteRepository extends MappedTypeRepository<ConcreteType> { \u2026 }\n'})}),"\n",(0,t.jsx)(n.h2,{id:"spring-web-\u96C6\u6210",children:"Spring Web \u96C6\u6210"}),"\n",(0,t.jsx)(n.h3,{id:"\u76F4\u63A5\u4F7F\u7528\u5B9E\u4F53\u548C\u7279\u6B8A\u53C2\u6570",children:"\u76F4\u63A5\u4F7F\u7528\u5B9E\u4F53\u548C\u7279\u6B8A\u53C2\u6570"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'@Controller\n@RequestMapping("/users")\npublic class UserController {\n\n  @RequestMapping("/{id}")\n  public String showUserForm(@PathVariable("id") User user, Model model) {\n\n    model.addAttribute("user", user);\n    return "userForm";\n  }\n}\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u901A\u8FC7 ",(0,t.jsx)(n.code,{children:"DomainClassConverter"})," \u5B9E\u73B0\u53C2\u6570\u5B9E\u4F53\u7684\u6CE8\u5165"]}),"\n",(0,t.jsxs)(n.li,{children:["\u901A\u8FC7 ",(0,t.jsx)(n.code,{children:"HandlerMethodArgumentResolver"})," \u5B9E\u73B0\u7279\u6B8A\u53C2\u6570(Pageable,Sort)\u7684\u6CE8\u5165"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u4F7F\u7528\u591A\u4E2A\u5206\u9875\u53C2\u6570",children:"\u4F7F\u7528\u591A\u4E2A\u5206\u9875\u53C2\u6570"}),"\n",(0,t.jsxs)(n.p,{children:["\u4EE5\u4E0B\u4E24\u4E2A\u53C2\u6570\u5206\u522B\u901A\u8FC7 ",(0,t.jsx)(n.code,{children:"foo_page"})," \u548C ",(0,t.jsx)(n.code,{children:"bar_page"})," \u6307\u5B9A"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'public String showUsers(Model model,\n      @Qualifier("foo") Pageable first,\n      @Qualifier("bar") Pageable second) { \u2026 }\n'})}),"\n",(0,t.jsx)(n.h3,{id:"spring-hateoas-\u652F\u6301\u5206\u9875",children:"Spring HATEOAS \u652F\u6301\u5206\u9875"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'@Controller\nclass PersonController {\n\n  @Autowired PersonRepository repository;\n\n  @RequestMapping(value = "/persons", method = RequestMethod.GET)\n  HttpEntity<PagedResources<Person>> persons(Pageable pageable,\n    PagedResourcesAssembler assembler) {\n\n    Page<Person> persons = repository.findAll(pageable);\n    return new ResponseEntity<>(assembler.toResources(persons), HttpStatus.OK);\n  }\n}\n'})}),"\n",(0,t.jsx)(n.h3,{id:"\u4F7F\u7528-querydsl-\u5B9E\u73B0\u67E5\u8BE2\u53C2\u6570\u7ED1\u5B9A",children:"\u4F7F\u7528 Querydsl \u5B9E\u73B0\u67E5\u8BE2\u53C2\u6570\u7ED1\u5B9A"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'@Controller\nclass UserController {\n\n  @Autowired UserRepository repository;\n\n  @RequestMapping(value = "/", method = RequestMethod.GET)\n  String index(Model model, @QuerydslPredicate(root = User.class) Predicate predicate,    \n          Pageable pageable, @RequestParam MultiValueMap<String, String> parameters) {\n\n    model.addAttribute("users", repository.findAll(predicate, pageable));\n\n    return "index";\n  }\n}\n\n/* \u5B9A\u5236\u5316\u7ED1\u5B9A\u65B9\u5F0F */\ninterface UserRepository extends CrudRepository<User, String>,\n                                 QueryDslPredicateExecutor<User>,                \n                                 QuerydslBinderCustomizer<QUser> {               \n\n  @Override\n  default public void customize(QuerydslBindings bindings, QUser user) {\n\n    bindings.bind(user.username).first((path, value) -> path.contains(value))    \n    bindings.bind(String.class)\n      .first((StringPath path, String value) -> path.containsIgnoreCase(value));\n    bindings.excluding(user.password);                                           \n  }\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u4F7F\u7528-hibernate-\u5B9E\u73B0\u8F6F\u5220\u9664",children:"\u4F7F\u7528 Hibernate \u5B9E\u73B0\u8F6F\u5220\u9664"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'@Entity\n@Where("deleted = 0") // Hibernate \u6CE8\u89E3\nclass User{\n  String name;\n  Integer deleted;\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u81EA\u52A8\u751F\u6210\u521B\u5EFA\u65F6\u95F4\u5B57\u6BB5\u548C\u66F4\u65B0\u65F6\u95F4\u5B57\u6BB5",children:"\u81EA\u52A8\u751F\u6210\u521B\u5EFA\u65F6\u95F4\u5B57\u6BB5\u548C\u66F4\u65B0\u65F6\u95F4\u5B57\u6BB5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:'// ==================== #1 =======================\n\n@EntityListeners({AuditingEntityListener.class})\n@MappedSuperclass\n@Data\n@ToString\n@EqualsAndHashCode\npublic abstract class AbstractEntity implements Serializable { }\n\n// ==================== #2 =======================\n\n@Entity\n@Table(name = "entities")    \npublic class Entity {\n  ...\n\n  private Date created;\n  private Date updated;\n\n  @PrePersist\n  protected void onCreate() {\n    created = new Date();\n  }\n\n  @PreUpdate\n  protected void onUpdate() {\n    updated = new Date();\n  }\n}\n\n// =================== #3 ========================\n\n@MappedSuperclass\npublic abstract class AbstractTimestampEntity {\n    @Temporal(TemporalType.TIMESTAMP)\n    @Column(name = "created", nullable = false)\n    private Date created;\n\n    @Temporal(TemporalType.TIMESTAMP)\n    @Column(name = "updated", nullable = false)\n    private Date updated;\n\n    @PrePersist\n    protected void onCreate() {\n      updated = created = new Date();\n    }\n\n    @PreUpdate\n    protected void onUpdate() {\n      updated = new Date();\n    }\n}\n\n@Entity\n@Table(name = "campaign")\npublic class Campaign extends AbstractTimestampEntity implements Serializable {\n  // ...\n}\n// =================== #4 ========================\n\n@EqualsAndHashCode(callSuper = true)\n@Entity\n@Data\n@Accessors(chain = true)\n@EntityListeners(AuditingEntityListener.class)\npublic class User extends AbstractPersistable<Long> {\n    String username;\n    String address;\n\n    @CreatedDate\n    @Temporal(TemporalType.TIMESTAMP)\n    private Date createdDate;\n\n    @LastModifiedDate\n    @Temporal(TemporalType.TIMESTAMP)\n    private Date lastModifiedDate;\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u94FE\u63A5\u65AD\u5F00\u5F02\u5E38",children:"\u94FE\u63A5\u65AD\u5F00\u5F02\u5E38"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"DataAccessResourceFailureException: could not prepare statement; nested exception is org.hibernate.exception.JDBCConnectionException: could not prepare statement\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Caused by: com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: The last packet successfully received from the server was 48,054,727 milliseconds ago.  The last packet sent successfully to the server was 48,054,727 milliseconds ago. is longer than the server configured value of 'wait_timeout'. You should consider either expiring and/or testing connection validity before use in your application, increasing the server configured values for client timeouts, or using the Connector/J connection property 'autoReconnect=true' to avoid this problem.\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u4E3A MySQL \u4F7F\u7528 ",(0,t.jsx)(n.code,{children:"&autoReconnect=true&failOverReadOnly=false&maxReconnects=10"})," \u94FE\u63A5\u53C2\u6570"]}),"\n",(0,t.jsx)(n.h2,{id:"not-a-managed-type",children:"Not a managed type"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"@SpringBootApplication\n@EntityScan(basePackageClasses = MyEntityPackage.class)\nclass MyApp{\n\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u4F7F\u7528-querydsl-\u6784\u5EFA\u52A8\u6001\u67E5\u8BE2",children:"\u4F7F\u7528 QueryDSL \u6784\u5EFA\u52A8\u6001\u67E5\u8BE2"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"public interface BaseRepository<T, ID extends Serializable>\n        extends JpaRepository<T, ID>, JpaSpecificationExecutor<T>, QueryDslPredicateExecutor<T> {\n}\npublic interface UserRepository extends BaseRepository<User,Long> {\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-java",children:"PathBuilder builder = new PathBuilder<>(entityType, Preconditions.checkNotNull(CaseFormat.UPPER_CAMEL.converterTo(CaseFormat.LOWER_CAMEL).convert(entityType.getSimpleName())));\n\npublic Page<T> query(Map<String, Object> params, Pageable pageable) {\n    BooleanExpression[] expressions = new BooleanExpression[params.size()];\n    int i = 0;\n    for (Map.Entry<String, Object> entry : params.entrySet()) {\n        expressions[i++] = builder.get(entry.getKey()).eq(entry.getValue());\n        Expressions.path(entityType, entry.getKey());\n    }\n    return repository.findAll(BooleanExpression.allOf(expressions), pageable);\n}\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return d}});var s=r(75271);let t={},i=s.createContext(t);function d(e){let n=s.useContext(i);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);