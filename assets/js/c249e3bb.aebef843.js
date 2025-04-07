"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20058"],{65140:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>a,frontMatter:()=>c});var r=JSON.parse('{"id":"web/framework/nestjs/nestjs-microservices","title":"\u5FAE\u670D\u52A1","description":"- \u4F20\u8F93","source":"@site/../notes/web/framework/nestjs/nestjs-microservices.md","sourceDirName":"web/framework/nestjs","slug":"/web/framework/nestjs/microservices","permalink":"/notes/web/framework/nestjs/microservices","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/nestjs/nestjs-microservices.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"\u5FAE\u670D\u52A1"},"sidebar":"docs","previous":{"title":"NestJS FAQ","permalink":"/notes/web/framework/nestjs/faq"},"next":{"title":"NestJS Version","permalink":"/notes/web/framework/nestjs/version"}}'),t=s("52676"),i=s("79938");let c={title:"\u5FAE\u670D\u52A1"},l="microservices",o={},a=[{value:"Hybrid application",id:"hybrid-application",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"microservices",children:"microservices"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u4F20\u8F93\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"TCP"}),"\n",(0,t.jsxs)(n.li,{children:["Redis Pub/Sub\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E0D\u505A\u5904\u7406\u4F1A\u88AB\u591A\u4E2A \u670D\u52A1\u7AEF \u5904\u7406"}),"\n",(0,t.jsxs)(n.li,{children:["\u7528 redis stream \u53EF\u4EE5\u907F\u514D\u91CD\u590D\u6D88\u8D39\u95EE\u9898\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/tamimaj/nestjs-redis-streams",children:"tamimaj/nestjs-redis-streams"})}),"\n",(0,t.jsx)(n.li,{children:"\u4F46\u4F1A\u6709 stale \u95EE\u9898\uFF0C\u9700\u8981\u6CE8\u610F"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["MQTT Pub/Sub - ",(0,t.jsx)(n.code,{children:"{data,headers}"})]}),"\n",(0,t.jsx)(n.li,{children:"NATS reqreply, pubsub"}),"\n",(0,t.jsx)(n.li,{children:"RabbitMQ"}),"\n",(0,t.jsx)(n.li,{children:"Kafka"}),"\n",(0,t.jsx)(n.li,{children:"gRPC"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u6838\u5FC3\u6A21\u5757\u4E0D\u4F1A\u589E\u52A0\u989D\u5916\u7684\u4F20\u8F93\u7B56\u7565\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/nestjs/nest/issues/3960#issuecomment-771647374",children:"https://github.com/nestjs/nest/issues/3960#issuecomment-771647374"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["pattern\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F1A\u5E8F\u5217\u5316\u4E3A JSON - \u56E0\u6B64\u53EF\u4EE5\u7528 Object"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"@MessagePattern({ cmd: '' })"})," - \u8BF7\u6C42\u54CD\u5E94\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u652F\u6301\u8FD4\u56DE Promise, Observable"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"@EventPattern('')"})," - \u4E8B\u4EF6"]}),"\n",(0,t.jsxs)(n.li,{children:["ClientProxy\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ClientsModule.register()"})," - \u6CE8\u518C\u540E\u4F7F\u7528"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"@Client({ transport: Transport.TCP }) client: ClientProxy;"})," - \u76F4\u63A5\u6CE8\u89E3\u4F7F\u7528"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["adopted by\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/amplication/amplication",children:"amplication/amplication"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u5B9E\u73B0\u4F9D\u8D56 rxjs"}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://amplication.com/blog/working-with-microservices-with-nestjs",children:"https://amplication.com/blog/working-with-microservices-with-nestjs"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm add rxjs @nestjs/microservices\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { NestFactory } from '@nestjs/core';\nimport { Transport, MicroserviceOptions } from '@nestjs/microservices';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {\n    transport: Transport.TCP,\n  });\n  await app.listen();\n}\nbootstrap();\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { Controller } from '@nestjs/common';\nimport { MessagePattern } from '@nestjs/microservices';\n\n@Controller()\nexport class MathController {\n  @MessagePattern({ cmd: 'sum' })\n  accumulate(data: number[]): number {\n    return (data || []).reduce((a, b) => a + b);\n  }\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { Injectable, Scope, Inject } from '@nestjs/common';\nimport { CONTEXT, RequestContext } from '@nestjs/microservices';\n\n@Injectable({ scope: Scope.REQUEST })\nexport class CatsService {\n  constructor(@Inject(CONTEXT) private ctx: RequestContext) {}\n}\n\nexport interface RequestContext<T = any> {\n  pattern: string | Record<string, any>;\n  data: T;\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"hybrid-application",children:"Hybrid application"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"HTTP + Microservice"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const app = await NestFactory.create(AppModule);\nconst microservice = app.connectMicroservice<MicroserviceOptions>({\n  transport: Transport.TCP,\n});\n\nawait app.startAllMicroservices();\nawait app.listen(3001);\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.nestjs.com/faq/hybrid-application",children:"https://docs.nestjs.com/faq/hybrid-application"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return c}});var r=s(75271);let t={},i=r.createContext(t);function c(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);