"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87514"],{82911:function(n,e,s){s.r(e),s.d(e,{metadata:()=>l,contentTitle:()=>r,default:()=>d,assets:()=>c,toc:()=>o,frontMatter:()=>t});var l=JSON.parse('{"id":"platform/aliyun/aliyun-ecs","title":"ECS","description":"Agent","source":"@site/../notes/platform/aliyun/aliyun-ecs.md","sourceDirName":"platform/aliyun","slug":"/platform/aliyun/ecs","permalink":"/notes/platform/aliyun/ecs","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/platform/aliyun/aliyun-ecs.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1709090151000,"frontMatter":{"title":"ECS"},"sidebar":"docs","previous":{"title":"Aliyun ACL","permalink":"/notes/platform/aliyun/acl"},"next":{"title":"\u963F\u91CC\u4E91 FAQ","permalink":"/notes/platform/aliyun/faq"}}'),a=s("52676"),i=s("79938");let t={title:"ECS"},r="ECS",c={},o=[{value:"Agent",id:"agent",level:2},{value:"Logtail",id:"logtail",level:2}];function u(n){let e={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"ecs",children:"ECS"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"# \u83B7\u53D6\u5F53\u524D\u5B9E\u4F8B\u7684\u533A\u57DF ID\ncurl http://100.100.100.200/latest/meta-data/region-id\n"})}),"\n",(0,a.jsx)(e.h2,{id:"agent",children:"Agent"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:'mkdir -p /tmp/dl && cd $_\n\n# \u5185\u7F51 "https://aliyun-client-assist-{regionId}.oss-{regionId}-internal.aliyuncs.com/linux/aliyun_assist_latest.rpm"\ncurl -LO "https://aliyun-client-assist.oss-accelerate.aliyuncs.com/linux/aliyun_assist_latest_update.zip"\n\nsudo unzip aliyun_assist_latest_update.zip -d /usr/local/share/aliyun-assist/\nVERSION=$(cat /usr/local/share/aliyun-assist/version)\n\nsudo apk add psutils procps-ng\n\nsudo chmod a+x /usr/local/share/aliyun-assist/$VERSION/update_install\nsudo bash /usr/local/share/aliyun-assist/$VERSION/update_install\n\nservice aliyun-service status\n'})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"/opt/local/share/assist-daemon"}),"\n",(0,a.jsxs)(e.li,{children:["/usr/local/share/assist-daemon\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"assist_daemon"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.li,{children:"/usr/local/share/aliyun-assist"}),"\n",(0,a.jsx)(e.li,{children:"/usr/local/share/aliyun-assist/version"}),"\n",(0,a.jsx)(e.li,{children:"/usr/local/share/aliyun-assist/$VERSION/"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:'# by RPM\ncurl -LO "https://aliyun-client-assist.oss-accelerate.aliyuncs.com/linux/aliyun_assist_latest.rpm"\napk add rpm2cpio\nrpm2cpio aliyun_assist_latest.rpm | cpio -idmv\nsudo rsync -av ./usr/local/share/aliyun-assist/ /usr/local/share/aliyun-assist/\n'})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{children:"bash: line 1: chkconfig: command not found\n\n * service: Exec format error\n"})}),"\n",(0,a.jsx)(e.h2,{id:"logtail",children:"Logtail"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"/usr/local/ilogtail"}),"\n",(0,a.jsx)(e.li,{children:"ca-bundle.crt"}),"\n",(0,a.jsx)(e.li,{children:"ilogtail_config.json"}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"apk add libuuid\n\nwget http://logtail-release-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/linux64/logtail.sh -O logtail.sh\nchmod 755 logtail.sh\n./logtail.sh install auto\n"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-json",children:'{\n  "UUID": "",\n  "hostname": "test-debian",\n  "instance_id": "XXX",\n  "ip": "1.1.1.1",\n  "logtail_version": "1.6.0",\n  "os": "Linux; 6.1.44-0-virt; #1-Alpine SMP PREEMPT_DYNAMIC Wed, 09 Aug 2023 09:39:37 +0000; x86_64",\n  "update_time": "2023-08-18 17:30:07"\n}\n'})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"cat /usr/local/ilogtail/ilogtail_config.json\n"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-json",children:'{\n  "config_server_address": "http://logtail.cn-chengdu-intranet.log.aliyuncs.com",\n  "data_server_list": [\n    {\n      "cluster": "cn-chengdu",\n      "endpoint": "cn-chengdu-intranet.log.aliyuncs.com"\n    }\n  ],\n  "cpu_usage_limit": 0.4,\n  "mem_usage_limit": 384,\n  "max_bytes_per_sec": 20971520,\n  "bytes_per_sec": 1048576,\n  "buffer_file_num": 25,\n  "buffer_file_size": 20971520,\n  "buffer_map_num": 5,\n  "streamlog_open": false,\n  "streamlog_pool_size_in_mb": 50,\n  "streamlog_rcv_size_each_call": 1024,\n  "streamlog_formats": [],\n  "streamlog_tcp_port": 11111\n}\n'})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-bash",children:"tail -f /usr/local/ilogtail/ilogtail.LOG\n"})})]})}function d(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(u,{...n})}):u(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return r},a:function(){return t}});var l=s(75271);let a={},i=l.createContext(a);function t(n){let e=l.useContext(i);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:t(n.components),l.createElement(i.Provider,{value:e},n.children)}}}]);