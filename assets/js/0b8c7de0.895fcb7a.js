"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["25941"],{86576:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>l,default:()=>p,assets:()=>a,toc:()=>c,frontMatter:()=>i});var t=JSON.parse('{"id":"web/nodejs/graphile-worker","title":"graphile-worker","description":"- graphile/worker","source":"@site/../notes/web/nodejs/graphile-worker.md","sourceDirName":"web/nodejs","slug":"/web/nodejs/graphile-worker","permalink":"/notes/web/nodejs/graphile-worker","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/nodejs/graphile-worker.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1721277861000,"frontMatter":{"title":"graphile-worker"},"sidebar":"docs","previous":{"title":"ffi-napi","permalink":"/notes/web/nodejs/ffi-napi"},"next":{"title":"JSR","permalink":"/notes/web/nodejs/jsr"}}'),s=r("52676"),o=r("79938");let i={title:"graphile-worker"},l="graphile-worker",a={},c=[{value:"Library",id:"library",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"graphile-worker",children:"graphile-worker"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/graphile/worker",children:"graphile/worker"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"MIT, TS"}),"\n",(0,s.jsx)(n.li,{children:"\u652F\u6301 cron"}),"\n",(0,s.jsxs)(n.li,{children:["PostgreSQL\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["LISTEN/NOTIFY\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"pgbouncer \u9700\u8981 connection \u6A21\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u9ED8\u8BA4 schema graphile_worker"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm add graphile-worker\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'docker run \\\n  --init \\\n  --rm -it \\\n  --network=host \\\n  -v "$PWD/tasks":/worker/tasks \\\n  graphile/worker \\\n  -c "postgres://postgres:postgres@localhost:5432/postgres"\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"GRAPHILE_ENABLE_DANGEROUS_LOGS"}),"\n",(0,s.jsx)(n.li,{children:"GRAPHILE_LOGGER_DEBUG"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"library",children:"Library"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// worker\nimport { run, quickAddJob } from 'graphile-worker';\nimport type { Task, WorkerUtils } from 'graphile-worker';\n\nconst runner = await run({\n  connectionString: 'postgres:///my_db',\n  concurrency: 5,\n  // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc\n  noHandleSignals: false,\n  pollInterval: 1000,\n  // you can set the taskList or taskDirectory but not both\n  taskList: {\n    hello: async (payload, helpers) => {\n      const { name } = payload;\n      helpers.logger.info(`Hello, ${name}`);\n    },\n  },\n  // or:\n  //   taskDirectory: `${__dirname}/tasks`,\n});\n\nawait runner.promise;\n\n// \u4EFB\u52A1\u5B9A\u4E49\nexport interface TaskSpec {\n  // \u4E00\u4E2A queue \u91CC\u4F1A\u987A\u5E8F\u8FD0\u884C\n  queueName?: string;\n  // \u672A\u6765\u7684\u8FD0\u884C\u65F6\u95F4 - \u9ED8\u8BA4 now\n  runAt?: Date;\n  // \u4EFB\u52A1\u6309\u4F18\u5148\u7EA7\u7684\u6570\u5B57\u5347\u5E8F\u6267\u884C\uFF08\u6570\u5B57\u8F83\u5C0F\u7684\u4F18\u5148\u7EA7\u7684\u4EFB\u52A1\u5148\u8FD0\u884C\uFF09\u3002(\u9ED8\u8BA4\u503C\uFF1A0)\n  priority?: number;\n  // \u8FD9\u4E2A\u4EFB\u52A1\u5E94\u8BE5\u5C1D\u8BD5\u51E0\u6B21\uFF1F\u6700\u5C0F\u503C\u4E3A1\uFF0C\u6B64\u65F6\u4EFB\u52A1\u53EA\u4F1A\u5C1D\u8BD5\u4E00\u6B21\uFF0C\u4E0D\u4F1A\u91CD\u8BD5\u3002 (\u9ED8\u8BA4\u503C\uFF1A25)\n  maxAttempts?: number;\n  // \u4EFB\u52A1\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF0C\u5982\u679C\u9700\u8981\uFF0C\u53EF\u4EE5\u7528\u6765\u7A0D\u540E\u66F4\u65B0\u6216\u5220\u9664\u5B83\u3002 (\u9ED8\u8BA4\u503C\uFF1Anull)\n  jobKey?: string;\n  // \u4FEE\u6539`jobKey`\u7684\u884C\u4E3A\uFF1B\u5F53\u4E3A'replace'\u65F6\uFF0C\u6240\u6709\u5C5E\u6027\u90FD\u4F1A\u88AB\u66F4\u65B0\uFF0C\u5F53\u4E3A'preserve_run_at'\u65F6\uFF0C\u9664'run_at'\u5916\u7684\u6240\u6709\u5C5E\u6027\u90FD\u4F1A\u88AB\u66F4\u65B0\uFF0C\u5F53\u4E3A'unsafe_dedupe'\u65F6\uFF0C\u53EA\u6709\u5728\u4E0D\u5B58\u5728\u5177\u6709\u5339\u914D\u4EFB\u52A1\u952E\u7684\u73B0\u6709\u4EFB\u52A1\uFF08\u5305\u62EC\u9501\u5B9A\u7684\u4EFB\u52A1\u548C\u6C38\u4E45\u5931\u8D25\u7684\u4EFB\u52A1\uFF09\u65F6\uFF0C\u624D\u4F1A\u6DFB\u52A0\u65B0\u4EFB\u52A1\u3002 (\u9ED8\u8BA4\u503C\uFF1A'replace')\n  jobKeyMode?: 'replace' | 'preserve_run_at' | 'unsafe_dedupe';\n  // \u4EFB\u52A1\u7684\u6807\u5FD7\uFF0C\u53EF\u4EE5\u7528\u6765\u52A8\u6001\u8FC7\u6EE4\u54EA\u4E9B\u4EFB\u52A1\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u8FD0\u884C\uFF0C\u54EA\u4E9B\u4EFB\u52A1\u4E0D\u80FD\u8FD0\u884C\u3002 (\u9ED8\u8BA4\u503C\uFF1Anull)\n  flags?: string[];\n}\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 UTC minute (0 - 59)\n\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 UTC hour (0 - 23)\n\u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 UTC day of the month (1 - 31)\n\u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 UTC month (1 - 12)\n\u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 UTC day of the week (0 - 6) (Sunday to Saturday)\n\u2502 \u2502 \u2502 \u2502 \u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 task (identifier) to schedule\n\u2502 \u2502 \u2502 \u2502 \u2502 \u2502    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 optional scheduling options\n\u2502 \u2502 \u2502 \u2502 \u2502 \u2502    \u2502     \u250C\u2500\u2500\u2500\u2500\u2500\u2500 optional payload to merge\n\u2502 \u2502 \u2502 \u2502 \u2502 \u2502    \u2502     \u2502\n\u2502 \u2502 \u2502 \u2502 \u2502 \u2502    \u2502     \u2502\n* * * * * task ?opts {payload}\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"parsedCronItems"}),"\n",(0,s.jsx)(n.li,{children:"graphile.config.ts"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="graphile.config.ts"',children:'import type {} from "graphile-config";\nimport type {} from "graphile-worker";\n\nconst preset: GraphileConfig.Preset = {\n  worker: {\n    connectionString: process.env.DATABASE_URL,\n    maxPoolSize: 10,\n    pollInterval: 2000,\n    preparedStatements: true,\n    schema: "graphile_worker",\n    crontabFile: "crontab",\n    concurrentJobs: 1,\n    fileExtensions: [".js", ".cjs", ".mjs"],\n  },\n};\n\nexport default preset;\n'})})]})}function p(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return l},a:function(){return i}});var t=r(75271);let s={},o=t.createContext(s);function i(e){let n=t.useContext(o);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);