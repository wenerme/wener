"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["2816"],{68570:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>t,default:()=>o,assets:()=>d,toc:()=>h,frontMatter:()=>c});var r=JSON.parse('{"id":"web/framework/nestjs/README","title":"NestJS","description":"- nestjs/nest","source":"@site/../notes/web/framework/nestjs/README.md","sourceDirName":"web/framework/nestjs","slug":"/web/framework/nestjs/","permalink":"/notes/web/framework/nestjs/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/nestjs/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1708697175000,"frontMatter":{"title":"NestJS"},"sidebar":"docs","previous":{"title":"mocha","permalink":"/notes/web/framework/mocha"},"next":{"title":"nestia","permalink":"/notes/web/framework/nestjs/nestia"}}'),l=s("52676"),i=s("79938");let c={title:"NestJS"},t="NestJS",d={},h=[{value:"GraphQL",id:"graphql",level:2},{value:"Standalone",id:"standalone",level:2},{value:"Reflection metadata &#39;design&#39; returning undefined",id:"reflection-metadata-design-returning-undefined",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"nestjs",children:"NestJS"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/nestjs/nest",children:"nestjs/nest"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u8BBE\u8BA1\u6765\u81EA Angular + SpringFramework"}),"\n",(0,l.jsx)(n.li,{children:"http-errors"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6838\u5FC3\u6982\u5FF5\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Module\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@Module()"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Controller\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"request -> response"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@Controller('user/me')"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Get()"}),",",(0,l.jsx)(n.code,{children:"@Post"})," - ",(0,l.jsx)(n.code,{children:"@HttpCode(204)"}),", ",(0,l.jsx)(n.code,{children:"@Header('Cache-Control', 'none')"}),", ",(0,l.jsx)(n.code,{children:"@Redirect('https://nestjs.com', 301)"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Request()"}),", ",(0,l.jsx)(n.code,{children:"@Req() req: Request"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Response()"}),", ",(0,l.jsx)(n.code,{children:"@Res() res: Response"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Param(key?: string)"})," - req.params"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Body(key?: string)"})," - req.body"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Query(key?: string)"})," - req.query"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Headers(name?: string)"})," - req.headers"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@Next() next"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Ip()"})," - req.ip"]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@HostParam()"})," - req.hosts"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@Session()"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Provider\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@Injectable()"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@Optional()"}),", ",(0,l.jsx)(n.code,{children:"@Inject(key?:string)"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Middleware"}),"\n",(0,l.jsx)(n.li,{children:"Exception filter"}),"\n",(0,l.jsx)(n.li,{children:"Pipe"}),"\n",(0,l.jsx)(n.li,{children:"Guard"}),"\n",(0,l.jsx)(n.li,{children:"Interceptor"}),"\n",(0,l.jsx)(n.li,{children:"decorator"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u7279\u6027\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5E95\u5C42\u5E73\u53F0\u65E0\u5173 - \u9ED8\u8BA4 Express\uFF0C\u53EF\u7528 Fastify"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301 GraphQL\u3001WebSocket"}),"\n",(0,l.jsx)(n.li,{children:"combine your config and your code seamlessly by making use of TypeScript decorators"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u96C6\u6210\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["NextJS\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/nestjs/nest/issues/1122",children:"nestjs/nest#1122"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/kyle-mccarthy/nest-next",children:"kyle-mccarthy/nest-next"})}),"\n",(0,l.jsx)(n.li,{children:"\u56E0\u4E3A Next \u53EF\u80FD\u5728\u6784\u5EFA\u65F6\u6709\u4E00\u4E9B\u8BF7\u6C42\uFF0C\u4E24\u8005\u5171\u5B58\u53EF\u80FD\u4F1A\u6709\u4E9B\u95EE\u9898"}),"\n",(0,l.jsx)(n.li,{children:"\u53EF\u80FD\u524D\u540E\u7AEF\u5206\u79BB\u66F4\u597D"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6570\u636E\u5E93\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@nestjs/typeorm"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@nestjs/sequelize"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u914D\u7F6E\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@nestjs/config"})," - dotenv"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6821\u9A8C\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/class-validator",children:"class-validator"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u7F13\u5B58\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/cache-manager",children:"cache-manager"})," - Flexible NodeJS cache module"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u5E8F\u5217\u5316\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/class-transformer",children:"class-transformer"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u4EFB\u52A1\u8C03\u5EA6\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@nestjs/schedule"})," - ",(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/node-cron",children:"node-cron"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u5B89\u5168\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/helmet",children:"helmet"})}),"\n",(0,l.jsxs)(n.li,{children:["CSRF ",(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/csurf",children:"csurf"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u9650\u6D41 ",(0,l.jsx)(n.a,{href:"https://www.npmjs.com/package/express-rate-limit",children:"express-rate-limit"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u961F\u5217\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@nestjs/bull"})," - bull"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u65E5\u5FD7\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/winstonjs/winston",children:"winstonjs/winston"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u6587\u4EF6\u4E0A\u4F20\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/expressjs/multer",children:"expressjs/multer"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["HTTP \u5BA2\u6237\u7AEF\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"axios"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["GraphQL\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@nestjs/graphql"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"@nestjs/apollo"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"apollo-server-express"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@nestjs/mercurius"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"\uD83D\uDCC2 src\n\u251C\u2500 \uD83D\uDCC4 app.controller.spec.ts\n\u251C\u2500 \uD83D\uDCC4 app.controller.ts\n\u251C\u2500 \uD83D\uDCC4 app.module.ts\n\u251C\u2500 \uD83D\uDCC4 app.service.ts\n\u2514\u2500 \uD83D\uDCC4 main.ts\n"})}),"\n",(0,l.jsx)(n.h2,{id:"graphql",children:"GraphQL"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# Express + Apollo \u9ED8\u8BA4\nnpm i @nestjs/graphql @nestjs/apollo @apollo/server graphql\n\n# Fastify + Apollo\nnpm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/fastify graphql\n\n# Fastify + Mercurius\nnpm i @nestjs/graphql @nestjs/mercurius graphql mercurius\n"})}),"\n",(0,l.jsx)(n.h2,{id:"standalone",children:"Standalone"}),"\n",(0,l.jsx)(n.p,{children:"\u4F5C\u4E3A IoC \u5BB9\u5668"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["@nestjs/core\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"172.1kB, 43.9kB"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["@nestjs/common\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"86.9kB, 19.4kB"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { NestFactory } from '@nestjs/core';\n\nconst app = await NestFactory.createApplicationContext(AppModule);\nconst userService = app.get(UserService);\n\nawait app.close();\n"})}),"\n",(0,l.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(n.h2,{id:"reflection-metadata-design-returning-undefined",children:"Reflection metadata 'design:paramtypes' returning undefined"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u9700\u8981 emitDecoratorMetadata"}),"\n",(0,l.jsx)(n.li,{children:"esbuild \u4E0D\u652F\u6301 emitDecoratorMetadata\uFF0Cswc \u652F\u6301"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# \u63A8\u8350 swc + tsx\npnpm swc --watch ./src -d ./dist/out\npnpm tsx watch ./dist/out/main.js\n\n# \u6216 ts-node\nts-node --esm --swc\n"})})]})}function o(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return t},a:function(){return c}});var r=s(75271);let l={},i=r.createContext(l);function c(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);