"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["52515"],{93373:function(e,r,t){t.r(r),t.d(r,{metadata:()=>s,contentTitle:()=>c,default:()=>l,assets:()=>p,toc:()=>a,frontMatter:()=>i});var s=JSON.parse('{"id":"service/observability/metrics/prometheus/exporter/exporter-windows","title":"windows_exporter","description":"- prometheus-community/windowsexporter","source":"@site/../notes/service/observability/metrics/prometheus/exporter/exporter-windows.md","sourceDirName":"service/observability/metrics/prometheus/exporter","slug":"/service/observability/metrics/prometheus/exporter/windows","permalink":"/notes/service/observability/metrics/prometheus/exporter/windows","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/exporter/exporter-windows.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689578517000,"frontMatter":{"title":"windows_exporter"},"sidebar":"docs","previous":{"title":"statsd_exporter","permalink":"/notes/service/observability/metrics/prometheus/exporter/statsd"},"next":{"title":"Prometheus Agent Mode","permalink":"/notes/service/observability/metrics/prometheus/agent"}}'),n=t("52676"),o=t("79938");let i={title:"windows_exporter"},c="windows_exporter",p={},a=[];function m(e){let r={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"windows_exporter",children:"windows_exporter"})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:"https://github.com/prometheus-community/windows_exporter",children:"prometheus-community/windows_exporter"})}),"\n"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-bash",children:"msiexec /i <path-to-msi-file> ENABLED_COLLECTORS=os,iis LISTEN_PORT=5000\n"})}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-promql",children:'# hyperv\n(sum (rate(windows_hyperv_vm_cpu_hypervisor_run_time{instance=~""}[1m])))\n  / ignoring(vm) group_left max (windows_cs_logical_processors{instance=~""}) / 100000\n\nsum (rate(windows_hyperv_vm_cpu_hypervisor_run_time[1m])) by (vm)\n(sum (rate(windows_hyperv_vm_cpu_hypervisor_run_time[1m])))\n  / ignoring(vm) group_left max (windows_cs_logical_processors) / 100000\n'})})]})}function l(e={}){let{wrapper:r}={...(0,o.a)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},79938:function(e,r,t){t.d(r,{Z:function(){return c},a:function(){return i}});var s=t(75271);let n={},o=s.createContext(n);function i(e){let r=s.useContext(o);return s.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);