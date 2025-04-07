"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["53648"],{9469:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>d,assets:()=>i,toc:()=>c,frontMatter:()=>l});var r=JSON.parse('{"id":"web/framework/nextjs/nextjs-internal","title":"NextJS Internal","description":"- target","source":"@site/../notes/web/framework/nextjs/nextjs-internal.md","sourceDirName":"web/framework/nextjs","slug":"/web/framework/nextjs/internal","permalink":"/notes/web/framework/nextjs/internal","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/framework/nextjs/nextjs-internal.md","tags":[{"inline":true,"label":"Internal","permalink":"/notes/tags/internal"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1701580433000,"frontMatter":{"title":"NextJS Internal","tags":["Internal"]},"sidebar":"docs","previous":{"title":"NextJS FAQ","permalink":"/notes/web/framework/nextjs/faq"},"next":{"title":"NextJS \u7248\u672C\u5386\u53F2","permalink":"/notes/web/framework/nextjs/version"}}'),s=t("52676"),a=t("79938");let l={title:"NextJS Internal",tags:["Internal"]},o="NextJS Internal",i={},c=[{value:"\u9ED8\u8BA4 next start",id:"\u9ED8\u8BA4-next-start",level:2},{value:"\u6700\u7B80\u81EA\u5B9A\u4E49 server",id:"\u6700\u7B80\u81EA\u5B9A\u4E49-server",level:2}];function p(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"nextjs-internal",children:"NextJS Internal"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["target\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"server"}),"\n",(0,s.jsxs)(n.li,{children:["serverless\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4F1A bundle node_modules \u5185\u5BB9"}),"\n",(0,s.jsx)(n.li,{children:"\u4F7F\u7528\u5E76\u4E0D\u7406\u60F3"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["serverless-trace\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"serverless \u4F46\u4E0D bundle node_modules"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u9ED8\u8BA4-next-start",children:"\u9ED8\u8BA4 next start"}),"\n",(0,s.jsx)(n.p,{children:"\u9ED8\u8BA4\u670D\u52A1\u542F\u52A8\u903B\u8F91"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import http from 'http';\nimport next from 'next';\n\n// https://github.com/zeit/next.js/blob/canary/packages/next/server/lib/start-server.ts\nexport default async function start(serverOptions: any, port?: number, hostname?: string) {\n  const app = next(serverOptions);\n  const srv = http.createServer(app.getRequestHandler());\n  await new Promise((resolve, reject) => {\n    // This code catches EADDRINUSE error if the port is already in use\n    srv.on('error', reject);\n    srv.on('listening', () => resolve());\n    srv.listen(port, hostname);\n  });\n  // It's up to caller to run `app.prepare()`, so it can notify that the server\n  // is listening before starting any intensive operations.\n  return app;\n}\n\n// https://github.com/zeit/next.js/blob/canary/packages/next/cli/next-start.ts\nimport {resolve} from 'path';\n\nconst dir = resolve(args._[0] || '.');\nconst port = args['--port'] || 3000;\n\nstart({dir}, port, args['--hostname'])\n  .then(async (app) => {\n    // tslint:disable-next-line\n    console.log(`> Ready on http://${args['--hostname'] || 'localhost'}:${port}`);\n    await app.prepare();\n  })\n  .catch((err) => {\n    // tslint:disable-next-line\n    console.error(err);\n    process.exit(1);\n  });\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u6700\u7B80\u81EA\u5B9A\u4E49-server",children:"\u6700\u7B80\u81EA\u5B9A\u4E49 server"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4F7F\u7528\u81EA\u5B9A\u4E49 server \u5219\u4E0D\u9700\u8981 next start"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const { createServer } = require('http');\nconst { parse } = require('url');\nconst next = require('next');\n\nconst port = parseInt(process.env.PORT, 10) || 3000;\nconst dev = process.env.NODE_ENV !== 'production';\nconst app = next({ dev });\nconst handle = app.getRequestHandler();\n\napp.prepare().then(() => {\n  createServer((req, res) => {\n    const parsedUrl = parse(req.url, true);\n    handle(req, res, parsedUrl);\n  }).listen(port, (err) => {\n    if (err) throw err;\n    console.log(`> Ready on http://localhost:${port}`);\n  });\n});\n"})})]})}function d(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return l}});var r=t(75271);let s={},a=r.createContext(s);function l(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);