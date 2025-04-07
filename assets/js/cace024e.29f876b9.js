"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["74215"],{69363:function(e,t,r){r.r(t),r.d(t,{metadata:()=>s,contentTitle:()=>o,default:()=>l,assets:()=>c,toc:()=>p,frontMatter:()=>i});var s=JSON.parse('{"id":"service/observability/metrics/prometheus/exporter/exporter-statsd","title":"statsd_exporter","description":"- prometheus/statsdexporter","source":"@site/../notes/service/observability/metrics/prometheus/exporter/exporter-statsd.md","sourceDirName":"service/observability/metrics/prometheus/exporter","slug":"/service/observability/metrics/prometheus/exporter/statsd","permalink":"/notes/service/observability/metrics/prometheus/exporter/statsd","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/exporter/exporter-statsd.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1689578517000,"frontMatter":{"title":"statsd_exporter"},"sidebar":"docs","previous":{"title":"Redis","permalink":"/notes/service/observability/metrics/prometheus/exporter/redis"},"next":{"title":"windows_exporter","permalink":"/notes/service/observability/metrics/prometheus/exporter/windows"}}'),n=r("52676"),a=r("79938");let i={title:"statsd_exporter"},o="statsd_exporter",c={},p=[{value:"asterisk",id:"asterisk",level:2}];function d(e){let t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"statsd_exporter",children:"statsd_exporter"})}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/prometheus/statsd_exporter",children:"prometheus/statsd_exporter"})}),"\n",(0,n.jsx)(t.li,{children:"statsd \u9ED8\u8BA4\u7AEF\u53E3 8125/udp"}),"\n",(0,n.jsx)(t.li,{children:"statsd_exporter metrics 9102, statsd 9125"}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:'docker run --rm -it -p 9102:9102 -p 9125:9125 -p 9125:9125/udp \\\n  --name statsd-exporter prom/statsd-exporter\n\ndocker run --rm -it -p 9102:9102 -p 9125:9125 -p 9125:9125/udp \\\n  -v $PWD/statsd_mapping.yml:/tmp/statsd_mapping.yml \\\n  --name statsd-exporter prom/statsd-exporter --statsd.mapping-config=/tmp/statsd_mapping.yml\n\n# \u6D4B\u8BD5\n# -c close - \u4F46 busybox \u7684 nc \u4E0D\u652F\u6301\necho "deploys.test.myservice:1|c" | nc -w 1 -u 127.0.0.1 8125\necho "deploys.test.myservice:1|c" | socat -t 0 STDIN UDP:127.0.0.1:8125\n'})}),"\n",(0,n.jsx)(t.h2,{id:"asterisk",children:"asterisk"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"statsd.conf"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ini",children:"[general]\nenabled = yes\nserver = 192.168.1.1:8125\nprefix = ast-1\n"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"asterisk -R -x 'module reload res_statsd.so'\n"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:'<PREFIX>_PJSIP_contacts_<CONTACT>__<ID>_rtt{quantile="0.5"} -0.001\n'})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:"mappings:\n  - match: '([^.]+)[.]PJSIP[.]contacts[.]([^;]+)(;[^.]*)?[.]rtt'\nmatch_type: regex\nname: 'pjsip_contacts_rtt'\nlabels:\nasterisk: '$1'\nconact: '$2'\nsummary_options:\nquantiles:\n  - quantile: 0.99\n    error: 0.001\n  - quantile: 0.9\n    error: 0.05\n  - quantile: 0.5\n    error: 0.005\nmax_summary_age: 60s\nsummary_age_buckets: 3\nstream_buffer_size: 1000\n"})})]})}function l(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},79938:function(e,t,r){r.d(t,{Z:function(){return o},a:function(){return i}});var s=r(75271);let n={},a=s.createContext(n);function i(e){let t=s.useContext(a);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);