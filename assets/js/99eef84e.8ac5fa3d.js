"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73182"],{42342:function(e,t,s){s.r(t),s.d(t,{metadata:()=>n,contentTitle:()=>o,default:()=>m,assets:()=>p,toc:()=>u,frontMatter:()=>a});var n=JSON.parse('{"id":"service/observability/metrics/prometheus/prometheus-api","title":"Prometheus API","description":"- https://prometheus.io/docs/prometheus/latest/querying/api/","source":"@site/../notes/service/observability/metrics/prometheus/prometheus-api.md","sourceDirName":"service/observability/metrics/prometheus","slug":"/service/observability/metrics/prometheus/api","permalink":"/notes/service/observability/metrics/prometheus/api","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/prometheus-api.md","tags":[{"inline":true,"label":"API","permalink":"/notes/tags/api"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1685087225000,"frontMatter":{"title":"Prometheus API","tags":["API"]},"sidebar":"docs","previous":{"title":"Prometheus Agent Mode","permalink":"/notes/service/observability/metrics/prometheus/agent"},"next":{"title":"Prometheus FAQ","permalink":"/notes/service/observability/metrics/prometheus/faq"}}'),i=s("52676"),r=s("79938");let a={title:"Prometheus API",tags:["API"]},o="Prometheus API",p={},u=[];function l(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"prometheus-api",children:"Prometheus API"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"GET /api/v1/query\nPOST /api/v1/query\n\nGET /api/v1/query_range\nPOST /api/v1/query_range\n\nGET /api/v1/format_query\nPOST /api/v1/format_query\n\nGET /api/v1/series\nPOST /api/v1/series\n\nGET /api/v1/labels\nPOST /api/v1/labels\n\nGET /api/v1/label/<label_name>/values\n\nGET /api/v1/query_exemplars\nPOST /api/v1/query_exemplars\n\nGET /api/v1/targets\n\nGET /api/v1/rules\nGET /api/v1/alerts\n\nGET /api/v1/targets/metadata\nGET /api/v1/metadata\n\nGET /api/v1/alertmanagers\n\nGET /api/v1/status/config\nGET /api/v1/status/flags\nGET /api/v1/status/runtimeinfo\nGET /api/v1/status/buildinfo\n\nGET /api/v1/status/tsdb\nGET /api/v1/status/walreplay\n\nPOST /api/v1/admin/tsdb/snapshot\nPUT /api/v1/admin/tsdb/snapshot\n\nPOST /api/v1/admin/tsdb/delete_series\nPUT /api/v1/admin/tsdb/delete_series\n\nPOST /api/v1/admin/tsdb/clean_tombstones\nPUT /api/v1/admin/tsdb/clean_tombstones\n"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://prometheus.io/docs/prometheus/latest/querying/api/",children:"https://prometheus.io/docs/prometheus/latest/querying/api/"})}),"\n"]})]})}function m(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},79938:function(e,t,s){s.d(t,{Z:function(){return o},a:function(){return a}});var n=s(75271);let i={},r=n.createContext(i);function a(e){let t=n.useContext(r);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);