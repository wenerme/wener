"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["53004"],{20239:function(n,e,s){s.r(e),s.d(e,{metadata:()=>d,contentTitle:()=>h,default:()=>j,assets:()=>l,toc:()=>c,frontMatter:()=>i});var d=JSON.parse('{"id":"dev/design/design-webhook","title":"Webhook \u8BBE\u8BA1","description":"- \u4E00\u822C POST + \u5934","source":"@site/../notes/dev/design/design-webhook.md","sourceDirName":"dev/design","slug":"/dev/design/webhook","permalink":"/notes/dev/design/webhook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/design/design-webhook.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689238697000,"frontMatter":{"title":"Webhook \u8BBE\u8BA1"},"sidebar":"docs","previous":{"title":"Design UI","permalink":"/notes/dev/design/ui"},"next":{"title":"Design Window","permalink":"/notes/dev/design/window"}}'),t=s("52676"),r=s("79938");let i={title:"Webhook \u8BBE\u8BA1"},h="Webhook \u8BBE\u8BA1",l={},c=[{value:"Headers",id:"headers",level:2},{value:"Payload",id:"payload",level:2},{value:"Pathname",id:"pathname",level:2},{value:"coding.net",id:"codingnet",level:2},{value:"\u53C2\u8003",id:"\u53C2\u8003",level:2}];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"webhook-\u8BBE\u8BA1",children:"Webhook \u8BBE\u8BA1"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u4E00\u822C POST + \u5934"}),"\n",(0,t.jsx)(e.li,{children:"\u5934\u5305\u542B \u4E8B\u4EF6+Key"}),"\n",(0,t.jsx)(e.li,{children:"\u4E5F\u6709\u901A\u8FC7 query \u4F20\u9012 key \u7684"}),"\n",(0,t.jsx)(e.li,{children:"key \u4E00\u822C\u4E3A\u4E00\u4E2A UUID"}),"\n",(0,t.jsx)(e.li,{children:"Event-driven automation framework"}),"\n",(0,t.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/go-playground/webhooks",children:"go-playground/webhooks"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/octokit/webhooks.js",children:"octokit/webhooks.js"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"Gitlab \u7FA4\u7EC4 webhook \u662F\u6536\u8D39\u7684"}),"\n"]})}),"\n",(0,t.jsx)(e.h2,{id:"headers",children:"Headers"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-yaml",children:"# Gitlab\n# ==========================\nX-Gitlab-Token:\nX-Gitlab-Event:\n\n# hmac\nX-Hub-Signature:\nX-GitHub-Event:\n\n# bitbucket\n# ==========================\nX-Hook-UUID:\nX-Event-Key:\n# bitbucket server\nX-Hub-Signature:\n\n# Gitee\n# ==========================\nUser-Agent: git-oschina-hook\n# true/false - true \u4E0D\u9700\u8981\u5904\u7406\nX-Gitee-Ping: true\n# Merge Request Hook\nX-Gitee-Event: Push Hook\nX-Git-Oschina-Event: Push Hook\n# uuid\nX-Request-ID: 00000000000000000000000000000000\nX-Gitee-Timestamp: 1675844156127\n# \u914D\u7F6E\u7684\u5BC6\u7801\u6216\u7B7E\u540D - \u540C payload \u91CC\u7684 password\nX-Gitee-Token:\n\n# Gitea\n# ==========================\nX-Gitea-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473\nX-Gitea-Event: push\nX-GitHub-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473\nX-GitHub-Event: push\nX-Gogs-Delivery: f6266f16-1bf3-46a5-9ea4-602e06ead473\nX-Gogs-Event: push\nAuthorization:\n"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads",children:"https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"payload",children:"Payload"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"application/x-www-form-urlencoded"}),"\n",(0,t.jsx)(e.li,{children:"application/json"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.strong,{children:"argo-events"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["argo-events ",(0,t.jsx)(e.a,{href:"https://argoproj.github.io/argo-events/eventsources/setup/webhook/",children:"https://argoproj.github.io/argo-events/eventsources/setup/webhook/"})]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-json",children:'{\n  "context": {\n    "type": "type_of_event_source",\n    "specversion": "cloud_events_version",\n    "source": "name_of_the_event_source",\n    "id": "unique_event_id",\n    "time": "event_time",\n    "datacontenttype": "type_of_data",\n    "subject": "name_of_the_configuration_within_event_source"\n  },\n  "data": {\n    "header": {\n      /* the headers from the request received by the event-source from the external entity */\n    },\n    "body": {\n      /* the payload of the request received by the event-source from the external entity */\n    }\n  }\n}\n'})}),"\n",(0,t.jsx)(e.h2,{id:"pathname",children:"Pathname"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"/api/webhook"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["ArgoCD ",(0,t.jsx)(e.a,{href:"https://argo-cd.readthedocs.io/en/stable/operator-manual/webhook/",children:"https://argo-cd.readthedocs.io/en/stable/operator-manual/webhook/"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.a,{href:"https://github.com/argoproj/argo-events/blob/master/api/event-source.md#webhookcontext",children:"https://github.com/argoproj/argo-events/blob/master/api/event-source.md#webhookcontext"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"codingnet",children:"coding.net"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://coding.net/help/docs/project-settings/service-hook/intro.html",children:"https://coding.net/help/docs/project-settings/service-hook/intro.html"})}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:"212.129.144.0/24\n212.64.105.0/24\n49.234.127.0/24\n49.235.224.0/24\n49.234.65.0/24\n81.69.101.0/24\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"code"}),(0,t.jsx)(e.th,{children:"for"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ITERATION_CREATED"}),(0,t.jsx)(e.td,{children:"\u521B\u5EFA\u8FED\u4EE3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ITERATION_DELETED"}),(0,t.jsx)(e.td,{children:"\u5220\u9664\u8FED\u4EE3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ITERATION_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u8FED\u4EE3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ITERATION_PLANNED"}),(0,t.jsx)(e.td,{children:"\u89C4\u5212\u8FED\u4EE3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_CREATED"}),(0,t.jsx)(e.td,{children:"\u521B\u5EFA\u4E8B\u9879"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_DELETED"}),(0,t.jsx)(e.td,{children:"\u5220\u9664\u4E8B\u9879"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_STATUS_UPDATED"}),(0,t.jsx)(e.td,{children:"\u72B6\u6001\u53D8\u66F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_ASSIGNEE_CHANGED"}),(0,t.jsx)(e.td,{children:"\u5206\u914D\u5904\u7406\u4EBA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_ITERATION_CHANGED"}),(0,t.jsx)(e.td,{children:"\u89C4\u5212\u8FED\u4EE3"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_RELATIONSHIP_CHANGED"}),(0,t.jsx)(e.td,{children:"\u5173\u8054\u5173\u7CFB\u53D8\u66F4"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u4E8B\u9879\u4FE1\u606F"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_COMMENT_CREATED"}),(0,t.jsx)(e.td,{children:"\u589E\u52A0\u8BC4\u8BBA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ISSUE_HOUR_RECORD_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u5DE5\u65F6\u4FE1\u606F"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_MR_CREATED"}),(0,t.jsx)(e.td,{children:"\u5408\u5E76\u8BF7\u6C42\u521B\u5EFA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_MR_UPDATED"}),(0,t.jsx)(e.td,{children:"\u5408\u5E76\u8BF7\u6C42\u66F4\u65B0"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_MR_MERGED"}),(0,t.jsx)(e.td,{children:"\u5408\u5E76\u8BF7\u6C42\u5408\u5E76"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_MR_CLOSED"}),(0,t.jsx)(e.td,{children:"\u5408\u5E76\u8BF7\u6C42\u5173\u95ED"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_MR_NOTE"}),(0,t.jsx)(e.td,{children:"\u5408\u5E76\u8BF7\u6C42\u8BC4\u8BBA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GIT_PUSHED"}),(0,t.jsx)(e.td,{children:"\u4EE3\u7801\u63A8\u9001"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CI_JOB_CREATED"}),(0,t.jsx)(e.td,{children:"\u521B\u5EFA\u6784\u5EFA\u8BA1\u5212"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CI_JOB_UPDATED"}),(0,t.jsx)(e.td,{children:"\u4FEE\u6539\u6784\u5EFA\u8BA1\u5212"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CI_JOB_DELETED"}),(0,t.jsx)(e.td,{children:"\u5220\u9664\u6784\u5EFA\u8BA1\u5212"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CI_JOB_STARTED"}),(0,t.jsx)(e.td,{children:"\u542F\u52A8\u6784\u5EFA\u8BA1\u5212"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"CI_JOB_FINISHED"}),(0,t.jsx)(e.td,{children:"\u6784\u5EFA\u8BA1\u5212\u6267\u884C\u7ED3\u675F"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_CREATED"}),(0,t.jsx)(e.td,{children:"\u63A8\u9001\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_DOWNLOADED"}),(0,t.jsx)(e.td,{children:"\u4E0B\u8F7D\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_DELETED"}),(0,t.jsx)(e.td,{children:"\u5220\u9664\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_RELEASED"}),(0,t.jsx)(e.td,{children:"\u53D1\u5E03\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_DOWNLOAD_FORBIDDEN"}),(0,t.jsx)(e.td,{children:"\u7981\u6B62\u4E0B\u8F7D\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_DOWNLOAD_ALLOWED"}),(0,t.jsx)(e.td,{children:"\u6062\u590D\u4E0B\u8F7D\u5236\u54C1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_VERSION_DOWNLOAD_BLOCKED"}),(0,t.jsx)(e.td,{children:"\u4E0B\u8F7D\u5236\u54C1\u963B\u65AD"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_REPO_CREATED"}),(0,t.jsx)(e.td,{children:"\u521B\u5EFA\u5236\u54C1\u4ED3\u5E93"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_REPO_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u5236\u54C1\u4ED3\u5E93\u914D\u7F6E"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"ARTIFACTS_REPO_DELETED"}),(0,t.jsx)(e.td,{children:"\u5220\u9664\u5236\u54C1\u4ED3\u5E93"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_CREATED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u65B0\u5EFA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_UPDATED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u66F4\u65B0"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_MOVED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u79FB\u52A8"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_SHARE_UPDATED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u66F4\u6539\u5206\u4EAB\u72B6\u6001"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_ACCESS_UPDATED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u66F4\u6539\u8BBF\u95EE\u8BBE\u7F6E"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_COPIED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863 / \u6587\u6863\u6811\u590D\u5236"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_MOVED_TO_RECYCLE_BIN"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u79FB\u52A8\u5230\u56DE\u6536\u7AD9"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_RESTORED_FROM_RECYCLE_BIN"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u4ECE\u56DE\u6536\u7AD9\u6062\u590D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_DELETED"}),(0,t.jsx)(e.td,{children:"\u6587\u6863\u5F7B\u5E95\u5220\u9664"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_CREATED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6\u65B0\u5EFA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_UPDATED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6\u66F4\u65B0"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_RENAMED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6\u91CD\u547D\u540D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_SHARE_UPDATED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6\u66F4\u6539\u5206\u4EAB\u72B6\u6001"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_MOVED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6 / \u6587\u4EF6\u5939\u79FB\u52A8"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_COPIED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6 / \u6587\u4EF6\u5939\u590D\u5236"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_MOVED_TO_RECYCLE_BIN"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6 / \u6587\u4EF6\u5939\u79FB\u52A8\u5230\u56DE\u6536\u7AD9"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_RESTORED_FROM_RECYCLE_BIN"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6 / \u6587\u4EF6\u5939\u4ECE\u56DE\u6536\u7AD9\u6062\u590D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"FILE_DELETED"}),(0,t.jsx)(e.td,{children:"\u6587\u4EF6 / \u6587\u4EF6\u5939\u5F7B\u5E95\u5220\u9664"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"WIKI_DELETED"}),(0,t.jsx)(e.td,{children:"\u6DFB\u52A0\u9879\u76EE\u6210\u5458"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MEMBER_DELETED"}),(0,t.jsx)(e.td,{children:"\u79FB\u9664\u9879\u76EE\u6210\u5458"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MEMBER_ROLE_UPDATED"}),(0,t.jsx)(e.td,{children:"\u66F4\u65B0\u9879\u76EE\u6210\u5458\u7528\u6237\u7EC4"})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"header"}),(0,t.jsx)(e.th,{children:"for"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"X-Coding-Service-Hook-Event"}),(0,t.jsx)(e.td,{children:"\u4E8B\u4EF6\u6807\u8BC6"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"X-Coding-Service-Hook-Id"}),(0,t.jsx)(e.td,{children:"Service Hook \u7F16\u53F7"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"X-Coding-Service-Hook-Action"}),(0,t.jsx)(e.td,{children:"\u53D1\u9001\u884C\u4E3A\uFF0C\u5982\uFF1Awecom_group_chat_robot"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"X-Coding-Delivery"}),(0,t.jsx)(e.td,{children:"\u53D1\u9001\u9001\u8FBE\u7F16\u53F7"})]})]})]}),"\n",(0,t.jsx)(e.h2,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.a,{href:"https://docs.docker.com/docker-hub/webhooks/",children:"Docker Hub Automated Build webhook"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["Docker Trusted Registry webhook\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.docker.com/ee/dtr/user/create-and-manage-webhooks/",children:"https://docs.docker.com/ee/dtr/user/create-and-manage-webhooks/"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks",children:"Github"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.gitlab.com/ee/user/project/integrations/webhooks.html",children:"Gitlab"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://docs.gitea.io/en-us/webhooks/",children:"Gitea"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://gitee.com/help/categories/40",children:"Gitee"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://coding.net/help/docs/project-settings/open/webhook.html",children:"coding.net"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(o,{...n})}):o(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return h},a:function(){return i}});var d=s(75271);let t={},r=d.createContext(t);function i(n){let e=d.useContext(r);return d.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function h(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:i(n.components),d.createElement(r.Provider,{value:e},n.children)}}}]);