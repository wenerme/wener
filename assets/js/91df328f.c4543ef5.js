"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91374"],{24435:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>j,assets:()=>d,toc:()=>h,frontMatter:()=>t});var s=JSON.parse('{"id":"dev/design/design-saas","title":"SaaS","description":"Database","source":"@site/../notes/dev/design/design-saas.md","sourceDirName":"dev/design","slug":"/dev/design/saas","permalink":"/notes/dev/design/saas","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/design/design-saas.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689578517000,"frontMatter":{"title":"SaaS"},"sidebar":"docs","previous":{"title":"Queue","permalink":"/notes/dev/design/queue"},"next":{"title":"Schema Design","permalink":"/notes/dev/design/schema"}}'),l=i("52676"),r=i("79938");let t={title:"SaaS"},c="SaaS",d={},h=[{value:"Database",id:"database",level:2},{value:"Tenant",id:"tenant",level:2},{value:"PostgreSQL",id:"postgresql",level:2},{value:"\u9884\u7559\u540E\u7F00",id:"\u9884\u7559\u540E\u7F00",level:2}];function a(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"saas",children:"SaaS"})}),"\n",(0,l.jsx)(e.h2,{id:"database",children:"Database"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://sso.tax/",children:"https://sso.tax/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"SSO Wall of Shame"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.citusdata.com/blog/2016/10/03/designing-your-saas-database-for-high-scalability/",children:"Designing a SaaS Database for Scale with Postgres"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=12649734",children:"HN"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://msdn.microsoft.com/en-us/library/aa479086.aspx",children:"Multi-Tenant Data Architecture"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://docs.microsoft.com/en-us/azure/sql-database/sql-database-design-patterns-multi-tenancy-saas-applications",children:"Design patterns for multi-tenant SaaS applications and Azure SQL Database"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.slideshare.net/rcandidosilva/supporting-multitenancy-applications-with-java-ee",children:"JavaOne 2014 - Supporting Multi-tenancy Applications with Java EE"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://saasaddict.walkme.com/saas-based-application-architecture-best-practices/",children:"SaaS Based Application Architecture \u2013 Best Practices"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Self Service & Personalization"}),"\n",(0,l.jsx)(e.li,{children:"Multi-tenancy"}),"\n",(0,l.jsxs)(e.li,{children:["Integration\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5E94\u7528\u80FD\u4E0E\u5176\u4ED6\u5E94\u7528\u6216\u5E73\u53F0\u8FDB\u884C\u96C6\u6210"}),"\n",(0,l.jsx)(e.li,{children:"\u5E94\u7528\u53EF\u4EE5\u6709\u9884\u7F6E\u7684\u96C6\u6210"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Operational Performance"}),"\n",(0,l.jsxs)(e.li,{children:["Security and Compliance\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F01\u4E1A\u9009\u62E9 SaaS \u5E73\u53F0\u7684\u9996\u8981\u8003\u8651"}),"\n",(0,l.jsx)(e.li,{children:"\u63D0\u4F9B\u7ED9\u7528\u6237\u66F4\u591A\u7684\u9009\u62E9\u5E76\u4E0D\u4EE3\u8868\u7528\u6237\u4E00\u5B9A\u4F1A\u9009\u62E9, \u4F46\u4F1A\u8BA9\u7528\u6237\u611F\u89C9\u6709\u9000\u8DEF"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Why Multi-tenancy is Critical for the Success of SaaS\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u591A\u79DF\u6237\u662F\u5E73\u53F0\u6210\u529F\u7684\u5173\u952E"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Design Considerations"}),"\n",(0,l.jsx)(e.li,{children:"Security Considerations"}),"\n",(0,l.jsxs)(e.li,{children:["Scalability Considerations\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Application Scalability"}),"\n",(0,l.jsx)(e.li,{children:"Database Scalability"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Monitoring"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Salesforce\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.youtube.com/watch?v=jrKA3cJmoms",children:"Salesforce Multitenant Architecture: How We Do the Magic We Do"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.youtube.com/watch?v=jeysYua6ENs",children:"Understanding Multitenancy and the Architecture of the Salesforce Platform"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://developer.salesforce.com/page/Multi_Tenant_Architecture",children:"The Force.com Multitenant Architecture"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://developer.salesforce.com/page/Architect_Core_Resources",children:"Architect Core Resources"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/ISO/IEC_27001:2013",children:"ISO/IEC 27001:2013"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4FE1\u606F\u5B89\u5168\u89C4\u8303"}),"\n",(0,l.jsx)(e.li,{children:"Information technology \u2014 Security techniques \u2014 Information security management systems \u2014 Requirements"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://tms.dingtalk.com/markets/dingtalk/dingtalksecurity",children:"\u9489\u9489\u5168\u9762\u5B89\u5168\u9632\u62A4"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u79DF\u6237\u7EF4\u5EA6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["1 \u79DF\u6237 -> 1 \u7269\u7406\u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u9694\u79BB"}),"\n",(0,l.jsx)(e.li,{children:"\u5B89\u5168\u5907\u4EFD"}),"\n",(0,l.jsx)(e.li,{children:"\u5907\u4EFD\u6570\u636E\u66F4\u6709\u610F\u4E49"}),"\n",(0,l.jsx)(e.li,{children:"\u5B89\u5168\u7684\u6570\u636E\u5220\u9664"}),"\n",(0,l.jsx)(e.li,{children:"\u72EC\u7ACB\u7684\u8D1F\u8F7D\u548C\u6027\u80FD"}),"\n",(0,l.jsx)(e.li,{children:"\u66F4\u597D\u7684\u6C34\u5E73\u6269\u5BB9"}),"\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u76F4\u63A5\u8BBF\u95EE\u6570\u636E"}),"\n",(0,l.jsxs)(e.li,{children:["\u72EC\u7ACB\u7684\u8FC1\u79FB\u8DEF\u5F84\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u591A\u5E94\u7528\u7248\u672C"}),"\n",(0,l.jsx)(e.li,{children:"\u591A\u6570\u636E\u7248\u672C"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u81EA\u5DF1\u6258\u7BA1\u6570\u636E\u5E93"}),"\n",(0,l.jsxs)(e.li,{children:["\u4E0D\u5229\u4E8E\u7EDF\u8BA1\u5206\u6790\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53EF\u5C06\u6570\u636E\u4E8C\u6B21\u6C47\u603B"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u9700\u8981\u66F4\u591A\u7684\u8FD0\u7EF4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u91CF\u53D7\u9650"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["1 \u79DF\u6237 -> 1 \u903B\u8F91\u6570\u636E\u5E93 - Schema\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u5171\u4EAB\u516C\u5171\u6570\u636E"}),"\n",(0,l.jsxs)(e.li,{children:["\u5355\u5E93\u79DF\u6237\u6570\u6709\u9650\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u5E93\u5907\u4EFD\u6027\u80FD\u6709\u5F71\u54CD"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u540E\u671F\u53EF\u8003\u8651\u5BF9\u79DF\u6237\u5206\u7247\u5230\u4E0D\u540C\u670D\u52A1\u5668"}),"\n",(0,l.jsx)(e.li,{children:"\u65E0\u6CD5\u4FDD\u8BC1 SLA"}),"\n",(0,l.jsx)(e.li,{children:"\u65E0\u6CD5\u9274\u522B\u5BF9\u786C\u4EF6\u7684\u4F7F\u7528\u7387"}),"\n",(0,l.jsx)(e.li,{children:"\u4E8B\u52A1\u5E76\u53D1\u91CF"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["N \u79DF\u6237 -> 1 \u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u6269\u5BB9"}),"\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u8FD0\u7EF4\u7BA1\u7406"}),"\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u7EDF\u8BA1\u5206\u6790"}),"\n",(0,l.jsxs)(e.li,{children:["\u5E94\u7528\u5F00\u53D1\u76F8\u5BF9\u590D\u6742,\u6570\u636E\u98CE\u9669\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6280\u672F\u5C42\u9762\u5C4F\u853D\u79DF\u6237\u6982\u5FF5"}),"\n",(0,l.jsx)(e.li,{children:"\u56E0\u6B64\u5F00\u53D1\u53EF\u8BA4\u4E3A\u662F\u4E00\u4E2A\u79DF\u6237\u4E00\u4E2A\u6570\u636E\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"\u5982\u679C\u4E00\u4E2A\u9519\u8BEF\u4F1A\u53D1\u751F,\u90A3\u4E00\u5B9A\u4F1A\u53D1\u751F,\u9700\u8981\u4ECE\u67B6\u6784\u5C42\u9762\u53BB\u907F\u514D"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5E94\u7528\u7EF4\u5EA6\u6570\u636E\u6A21\u578B\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["N \u5E94\u7528 -> N \u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u81EA\u5B9A\u4E49"}),"\n",(0,l.jsx)(e.li,{children:"\u4FBF\u4E8E\u5E94\u7528\u66F4\u65B0\u5347\u7EA7"}),"\n",(0,l.jsx)(e.li,{children:"\u7528\u6237\u53EF\u9009\u62E9\u4E0D\u540C\u5E94\u7528\u7248\u672C"}),"\n",(0,l.jsx)(e.li,{children:"\u7528\u6237\u53EF\u5B9A\u5236\u5316"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["1 \u5E94\u7528 -> N \u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u53EF\u914D\u7F6E\u6027"}),"\n",(0,l.jsx)(e.li,{children:"\u5171\u4EAB\u4EE3\u7801, \u6613\u4E8E\u6269\u5C55\u548C\u5347\u7EA7\u5E94\u7528\u80FD\u529B"}),"\n",(0,l.jsx)(e.li,{children:"\u5E94\u7528\u5347\u7EA7\u9700\u7EF4\u62A4\u8F83\u591A\u7684\u6570\u636E\u5E93"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["1 \u5E94\u7528 -> 1 \u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6269\u5C55"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u7EFC\u5408\u7EF4\u5EA6\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["1 \u79DF\u6237 -> 1 \u5E94\u7528 -> 1 \u6570\u636E\u5E93\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4F20\u7EDF\u9879\u76EE"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["N \u79DF\u6237 -> 1 \u5E94\u7528\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"-> 1 \u6570\u636E\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"-> N \u6570\u636E\u5E93"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["N \u79DF\u6237 -> N \u5E94\u7528\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4EE5\u5E94\u7528\u8FD8\u662F\u4EE5\u79DF\u6237\u5212\u5206"}),"\n",(0,l.jsx)(e.li,{children:"-> 1 \u6570\u636E\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"-> N \u6570\u636E\u5E93"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u8003\u8651\u56E0\u7D20\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u5B9A\u5236\u5316"}),"\n",(0,l.jsx)(e.li,{children:"\u529F\u80FD\u5B9A\u5236\u5316"}),"\n",(0,l.jsx)(e.li,{children:"\u6D41\u7A0B\u5B9A\u5236\u5316"}),"\n",(0,l.jsx)(e.li,{children:"\u4E00\u4E2A\u5E94\u7528\u4F5C\u4E3A\u5E73\u53F0 vs \u4E00\u4E2A\u5E73\u53F0\u63D0\u4F9B\u591A\u4E2A\u5E94\u7528"}),"\n",(0,l.jsx)(e.li,{children:"Licensing \u7279\u6027"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u8BEF\u533A\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u9694\u79BB\u516C\u53F8\u6570\u636E\u548C\u5176\u4ED6\u79DF\u6237\u6570\u636E\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5982\u679C\u80FD\u9694\u79BB, \u90A3\u4E48\u5176\u4ED6\u79DF\u6237\u4E5F\u662F\u80FD\u591F\u9009\u62E9\u9694\u79BB"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u81EA\u5DF1\u4F7F\u7528\u63A5\u53E3\u548C\u5176\u4ED6\u7528\u6237\u7684\u63A5\u53E3\u4E0D\u662F\u540C\u4E00\u5957\u63A5\u53E3\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5982\u679C\u662F\u5B9A\u5236\u5316\u63A5\u53E3, \u90A3\u4E48\u5176\u4ED6\u79DF\u6237\u4E5F\u662F\u5177\u6709\u5B9A\u5236\u5316\u80FD\u529B"}),"\n",(0,l.jsxs)(e.li,{children:["\u5982\u679C\u53EA\u662F\u5E73\u53F0\u63A5\u53E3, \u90A3\u4E48\u662F\u4E0D\u5E94\u8BE5\u7684\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://zh.wikipedia.org/zh-hans/Eating_your_own_dog_food",children:"Eating your own dog food"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u8BBE\u8BA1\u6743\u8861\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u79DF\u6237\u9694\u79BB"}),"\n",(0,l.jsx)(e.li,{children:"\u8D44\u6E90\u6D88\u8017"}),"\n",(0,l.jsx)(e.li,{children:"\u8FD0\u7EF4\u96BE\u5EA6"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u6269\u5C55\u6027"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4E1A\u52A1\u95EE\u9898\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5546\u4E1A\u6A21\u578B"}),"\n",(0,l.jsx)(e.li,{children:"\u6536\u8D39\u6A21\u5F0F"}),"\n",(0,l.jsx)(e.li,{children:"\u5730\u57DF\u5206\u79BB"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u89E3\u51B3\u65B9\u6848\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5236\u5B9A\u5E73\u53F0\u53D1\u5C55\u7B56\u7565"}),"\n",(0,l.jsx)(e.li,{children:"\u4E3A\u5E73\u53F0\u7528\u6237\u8003\u8651\u53D1\u5C55\u7B56\u7565"}),"\n",(0,l.jsx)(e.li,{children:"\u6CA1\u6709\u4EC0\u4E48\u662F\u5FC5\u7136\u7684"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"\u6570\u636E\u5E93\u7B56\u7565"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{children:"\u7279\u6027"}),(0,l.jsx)(e.th,{children:"\u6570\u636E\u5E93\u5206\u79BB"}),(0,l.jsx)(e.th,{children:"\u8868\u5206\u79BB"}),(0,l.jsx)(e.th,{children:"\u5171\u4EAB\u6570\u636E\u5E93"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"\u6570\u636E\u5B9A\u5236\u5316"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"N"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"\u5B89\u5168"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"N"}),(0,l.jsx)(e.td,{children:"N"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"\u5185\u90E8\u4F9D\u8D56\u548C\u6027\u80FD"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"N"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"\u53EF\u6269\u5C55\u6A21\u578B"}),(0,l.jsx)(e.td,{children:"N"}),(0,l.jsx)(e.td,{children:"Y"}),(0,l.jsx)(e.td,{children:"N"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{children:"Customer Onboarding"}),(0,l.jsx)(e.td,{children:"N"}),(0,l.jsx)(e.td,{children:"N"}),(0,l.jsx)(e.td,{children:"Y"})]})]})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Spring + Hibernate\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://docs.jboss.org/hibernate/orm/4.2/devguide/en-US/html/ch16.html",children:"Hibernate Multi-tenancy"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://anakiou.blogspot.hk/2015/08/multi-tenant-application-with-spring.html",children:"Multi-tenant application with Spring Boot + Spring Data JPA + Hibernate"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u591A\u6570\u636E\u6E90"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://dzone.com/articles/spring-boot-hibernate-multitenancy-implementation",children:"Multi-Tenancy Implementation for Spring Boot + Hibernate Projects"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u591A Schema"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"AbstractDataSourceBasedMultiTenantConnectionProviderImpl"}),"\n",(0,l.jsx)(e.li,{children:"MultiTenantConnectionProvider"}),"\n",(0,l.jsx)(e.li,{children:"CurrentTenantIdentifierResolver"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"tenant",children:"Tenant"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://cloud.google.com/identity-platform/docs/reference/rest/v2/projects.tenants",children:"https://cloud.google.com/identity-platform/docs/reference/rest/v2/projects.tenants"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"postgresql",children:"PostgreSQL"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"RLS"}),"\n",(0,l.jsx)(e.li,{children:"Schema"}),"\n",(0,l.jsx)(e.li,{children:"DB"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"tid="})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"CREATE POLICY tenant_isolation_policy ON student USING (tid = current_setting('auth.current_tenant_id')::int);\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://fabian.ski/posts/nestjs-tenants/",children:"https://fabian.ski/posts/nestjs-tenants/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u9884\u7559\u540E\u7F00",children:"\u9884\u7559\u540E\u7F00"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:".keys"}),"\n",(0,l.jsx)(e.li,{children:".gpg"}),"\n",(0,l.jsx)(e.li,{children:".rss"}),"\n",(0,l.jsx)(e.li,{children:".atom"}),"\n",(0,l.jsx)(e.li,{children:".png"}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return c},a:function(){return t}});var s=i(75271);let l={},r=s.createContext(l);function t(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);