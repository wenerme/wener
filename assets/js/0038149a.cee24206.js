"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["22077"],{83610:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>d,default:()=>o,assets:()=>c,toc:()=>a,frontMatter:()=>l});var i=JSON.parse('{"id":"web/nodejs/fastify","title":"fastify","description":"- fastify/fastify","source":"@site/../notes/web/nodejs/fastify.md","sourceDirName":"web/nodejs","slug":"/web/nodejs/fastify","permalink":"/notes/web/nodejs/fastify","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/nodejs/fastify.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1700666411000,"frontMatter":{"title":"fastify"},"sidebar":"docs","previous":{"title":"drizzle","permalink":"/notes/web/nodejs/drizzle"},"next":{"title":"ffi-napi","permalink":"/notes/web/nodejs/ffi-napi"}}'),r=s("52676"),t=s("79938");let l={title:"fastify"},d="fastify",c={},a=[{value:"\u751F\u547D\u5468\u671F",id:"\u751F\u547D\u5468\u671F",level:2},{value:"\u8DEF\u7531",id:"\u8DEF\u7531",level:2},{value:"ecosystem",id:"ecosystem",level:2},{value:"nextjs",id:"nextjs",level:3},{value:"@fastify/autoload",id:"fastifyautoload",level:2},{value:"@fastify/static",id:"fastifystatic",level:2},{value:"fastify-cli",id:"fastify-cli",level:2},{value:"eject",id:"eject",level:3},{value:"ajv",id:"ajv",level:2},{value:"You cannot use <code>send</code> inside the <code>onError</code> hook",id:"you-cannot-use-send-inside-the-onerror-hook",level:2},{value:"Request body is too large",id:"request-body-is-too-large",level:2},{value:"FST_ERR_CTP_INVALID_MEDIA_TYPE",id:"fst_err_ctp_invalid_media_type",level:2},{value:"FST_ERR_CTP_INVALID_CONTENT_LENGTH",id:"fst_err_ctp_invalid_content_length",level:2}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"fastify",children:"fastify"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify",children:"fastify/fastify"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"MIT, JS+d.ts"}),"\n",(0,r.jsx)(e.li,{children:"\u76EE\u524D\u6027\u80FD\u6700\u597D"}),"\n",(0,r.jsx)(e.li,{children:"\u63A8\u8350\u4F7F\u7528 schema \u6821\u9A8C\u8F93\u5165\u8F93\u51FA"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.fastify.io",children:"fastify.io"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"\u751F\u547D\u5468\u671F",children:"\u751F\u547D\u5468\u671F"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"phase"}),(0,r.jsx)(e.th,{children:"hook"}),(0,r.jsx)(e.th,{children:"abort"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Incoming"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Routing"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Instance Logger"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"onRequest"}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"preParsing"}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Parsing"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"preValidation"}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Validation"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"400"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"preHandler"}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"User Handler"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Reply"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"preSerialization"}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"onSend"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Outgoing Response"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"4xx,5xx"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"onResponse"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"\u8DEF\u7531",children:"\u8DEF\u7531"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"/data/*"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"req.prams['*']"})," \u83B7\u53D6\u4E4B\u540E\u7684\u53C2\u6570"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"ecosystem",children:"ecosystem"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["fastify\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["ajv - \u9A8C\u8BC1\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/ajv-compiler",children:"fastify/ajv-compiler"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u907F\u514D\u76F4\u63A5\u4F9D\u8D56 ajv"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["pino - \u65E5\u5FD7\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/jsumners/abstract-logging",children:"jsumners/abstract-logging"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53EF\u52A8\u6001\u5F00\u5173"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"avvio - \u4F9D\u8D56\u8C03\u5EA6\u987A\u5E8F"}),"\n",(0,r.jsx)(e.li,{children:"find-my-way - \u8DEF\u7531"}),"\n",(0,r.jsx)(e.li,{children:"light-my-request"}),"\n",(0,r.jsx)(e.li,{children:"secure-json-parse - JSON \u89E3\u6790"}),"\n",(0,r.jsxs)(e.li,{children:["fast-json-stringify - JSON \u5E8F\u5217\u5316\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u66F4\u5FEB - 2x faster than JSON.stringify()"}),"\n",(0,r.jsx)(e.li,{children:"\u5229\u7528 schema \u4FE1\u606F\u751F\u6210 stringify"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/fastify/fast-json-stringify-compiler",children:"@fastify/fast-json-stringify-compiler"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"rfdc - Really Fast Deep Clone"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://www.fastify.io/ecosystem/#Core%20Plugins",children:"Core Plugins"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"cookie, cors, compress, caching, rate-limit, helmet, etag"}),"\n",(0,r.jsx)(e.li,{children:"formbody - \u89E3\u6790 x-www-form-urlencoded"}),"\n",(0,r.jsx)(e.li,{children:"multipart"}),"\n",(0,r.jsxs)(e.li,{children:["swagger - \u652F\u6301\u751F\u6210\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/Eomm/json-schema-resolver",children:"json-schema-resolver"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5904\u7406 JSON Schema"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"env - \u9A8C\u8BC1 ENV"}),"\n",(0,r.jsx)(e.li,{children:"request-context - AsyncLocalStorage - NodeJS v16.4"}),"\n",(0,r.jsx)(e.li,{children:"reply-from - \u8F6C\u53D1"}),"\n",(0,r.jsx)(e.li,{children:"schedule - CRON"}),"\n",(0,r.jsxs)(e.li,{children:["session - \u6709\u72B6\u6001\u4F1A\u8BDD\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F7F\u7528 connect-redis \u8FDE\u63A5 redis"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["stateless-session - \u65E0\u72B6\u6001\u4F1A\u8BDD\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6570\u636E\u52A0\u5BC6\u5B58\u5728 Cookie"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"static - serve \u9759\u6001\u6587\u4EF6"}),"\n",(0,r.jsx)(e.li,{children:"under-pressure - \u81EA\u52A8\u7194\u65AD"}),"\n",(0,r.jsx)(e.li,{children:"websocket - \u57FA\u4E8E ws"}),"\n",(0,r.jsx)(e.li,{children:"middie - \u4E2D\u95F4\u4EF6"}),"\n",(0,r.jsx)(e.li,{children:"@fastify/routes - \u6C47\u805A\u6240\u6709\u8DEF\u7531\u5230 Map fastify.routes"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-sensible",children:"@fastify/sensible"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4F9D\u8D56\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"forwarded - \u5904\u7406\u8F6C\u53D1\u5934"}),"\n",(0,r.jsx)(e.li,{children:"http-errors - \u6784\u9020\u5F02\u5E38"}),"\n",(0,r.jsx)(e.li,{children:"vary - \u6784\u9020 vary \u5934"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"fastify.httpErrors - \u6784\u9020 error"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"reply.<httpError>"})}),"\n",(0,r.jsx)(e.li,{children:"reply.vary"}),"\n",(0,r.jsx)(e.li,{children:"reply.cacheControl"}),"\n",(0,r.jsx)(e.li,{children:"reply.preventCache"}),"\n",(0,r.jsx)(e.li,{children:"reply.revalidate"}),"\n",(0,r.jsx)(e.li,{children:"reply.staticCache"}),"\n",(0,r.jsx)(e.li,{children:"reply.stale"}),"\n",(0,r.jsx)(e.li,{children:"reply.maxAge"}),"\n",(0,r.jsx)(e.li,{children:"request.forwarded"}),"\n",(0,r.jsx)(e.li,{children:"request.is - \u68C0\u6D4B mime \u7C7B\u578B"}),"\n",(0,r.jsx)(e.li,{children:"fastify.assert"}),"\n",(0,r.jsx)(e.li,{children:"fastify.to - async \u9519\u8BEF\u5904\u7406"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"autoload - \u626B\u63CF\u76EE\u5F55\u52A0\u8F7D \u63D2\u4EF6\u3001\u8DEF\u7531"}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-nextjs",children:"@fastify/nextjs"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"nextjs \u96C6\u6210 - \u4E0D\u662F\u66FF\u4EE3 NextJS \u5185\u90E8\u7684 WebServer"}),"\n",(0,r.jsx)(e.li,{children:"nextjs \u5185\u90E8\u9ED8\u8BA4 express"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-redis",children:"@fastify/redis"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"redis \u8FDE\u63A5\u63D2\u4EF6"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/luin/ioredis",children:"ioredis"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"@fastify/postgres"}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-auth",children:"@fastify/auth"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u63D0\u4F9B auth \u76F8\u5173 hook"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u591A\u79CD auth \u903B\u8F91"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-jwt",children:"@fastify/jwt"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"jwt \u9A8C\u8BC1\u548C\u7B7E\u540D"}),"\n",(0,r.jsx)(e.li,{children:"fast-jwt"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-error",children:"@fastify/error"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6784\u9020 error"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["@fastify/env\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"env-schema"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/mercurius-js/mercurius",children:"mercurius-js/mercurius"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"GraphQL servers and gateways"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/zalando-incubator/graphql-jit",children:"zalando-incubator/graphql-jit"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.fastify.io/docs/latest/Guides/Ecosystem/",children:"https://www.fastify.io/docs/latest/Guides/Ecosystem/"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"const warning = require('process-warning')();\nwarning.create('FastifyDeprecation', 'FST_ERROR_CODE', 'message');\nwarning.emit('FST_ERROR_CODE');\n"})}),"\n",(0,r.jsx)(e.h3,{id:"nextjs",children:"nextjs"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const fastify = require('fastify')();\n\nfastify.register(require('@fastify/nextjs')).after(() => {\n  fastify.next('/*');\n});\n\nfastify.listen(3000, (err) => {\n  if (err) throw err;\n  console.log('Server listening on http://localhost:3000');\n});\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://dev.to/applicazza/serve-next-js-with-fastify-5e67",children:"Serve Next.js with Fastify"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"fastifyautoload",children:"@fastify/autoload"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"fastify.register(Autoload, {\n  dir: path.join(__dirname, 'plugins'),\n  dirNameRoutePrefix: false\n  // ignorePattern\n  // indexPattern\n  forceESM: true,\n  // fastify-plugin\n  encapsulate: false\n})\n"})}),"\n",(0,r.jsx)(e.h2,{id:"fastifystatic",children:"@fastify/static"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"fastify.register(require('@fastify/static'), {\n  root: path.join(__dirname, 'public'),\n  prefix: '/public/', // optional: default '/'\n});\n"})}),"\n",(0,r.jsx)(e.h2,{id:"fastify-cli",children:"fastify-cli"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"npm add -g fastify-cli\n\n# fastify\n# fastify-plugin\n# fastify-cli\n# @fastify/sensible\n# https://github.com/tapjs/node-tap\nfastify generate my-server --lang=ts\n\ncd my-server\nnpm install # dependencies\nnpm start   # build:ts - fastify start -l info dist/app.js\nnpm build:ts\nnpm run dev # build:ts - watch:ts+dev:start pino-colada pretty logging\nnpm test\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/fastify/fastify-cli",children:"fastify/fastify-cli"})}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"eject",children:"eject"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u751F\u6210 server"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Read the .env file.\nimport * as dotenv from 'dotenv';\ndotenv.config();\n\n// Require the framework\nimport Fastify from 'fastify';\n\n// Require library to exit fastify process, gracefully (if possible)\nimport closeWithGrace from 'close-with-grace';\n\n// Instantiate Fastify with some config\nconst app = Fastify({\n  logger: true,\n});\n\n// Register your application as a normal plugin.\napp.register(import('./app'));\n\n// delay is the number of milliseconds for the graceful close to finish\nconst closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {\n  if (err) {\n    app.log.error(err);\n  }\n  await app.close();\n} as closeWithGrace.CloseWithGraceAsyncCallback);\n\napp.addHook('onClose', async (instance, done) => {\n  closeListeners.uninstall();\n  done();\n});\n\n// Start listening.\napp.listen({ port: parseInt(process.env.PORT) || 3000 }, (err: any) => {\n  if (err) {\n    app.log.error(err);\n    process.exit(1);\n  }\n});\n"})}),"\n",(0,r.jsx)(e.h2,{id:"ajv",children:"ajv"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 Ajv v8, Draft 07"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/fastify/ajv-compiler/blob/main/index.js#L9-L18",children:"https://github.com/fastify/ajv-compiler/blob/main/index.js#L9-L18"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"const defaultAjvOptions = {\n  coerceTypes: 'array',\n  useDefaults: true,\n  removeAdditional: true,\n  uriResolver: fastUri,\n  addUsedSchema: false,\n  // Explicitly set allErrors to `false`.\n  // When set to `true`, a DoS attack is possible.\n  allErrors: false,\n};\n"})}),"\n",(0,r.jsxs)(e.h2,{id:"you-cannot-use-send-inside-the-onerror-hook",children:["You cannot use ",(0,r.jsx)(e.code,{children:"send"})," inside the ",(0,r.jsx)(e.code,{children:"onError"})," hook"]}),"\n",(0,r.jsx)(e.h2,{id:"request-body-is-too-large",children:"Request body is too large"}),"\n",(0,r.jsx)(e.p,{children:"\u9ED8\u8BA4 1MiB"}),"\n",(0,r.jsx)(e.h2,{id:"fst_err_ctp_invalid_media_type",children:"FST_ERR_CTP_INVALID_MEDIA_TYPE"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"fastify-multipart"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://fastify.dev/docs/latest/Reference/ContentTypeParser",children:"https://fastify.dev/docs/latest/Reference/ContentTypeParser"})}),"\n",(0,r.jsxs)(e.li,{children:["text/xml\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9700\u8981\u505A\u989D\u5916 middleware \u5904\u7406"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"fst_err_ctp_invalid_content_length",children:"FST_ERR_CTP_INVALID_CONTENT_LENGTH"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"post multipart/form"}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return l}});var i=s(75271);let r={},t=i.createContext(r);function l(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);