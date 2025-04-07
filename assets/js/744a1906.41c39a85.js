"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["85270"],{13356:function(e,n,s){s.r(n),s.d(n,{metadata:()=>r,contentTitle:()=>c,default:()=>d,assets:()=>o,toc:()=>h,frontMatter:()=>l});var r=JSON.parse('{"id":"service/observability/metrics/prometheus/README","title":"Prometheus","description":"- Prometheus","source":"@site/../notes/service/observability/metrics/prometheus/README.md","sourceDirName":"service/observability/metrics/prometheus","slug":"/service/observability/metrics/prometheus/","permalink":"/notes/service/observability/metrics/prometheus/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/metrics/prometheus/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1646989992000,"frontMatter":{"title":"Prometheus"},"sidebar":"docs","previous":{"title":"\u6307\u6807\u670D\u52A1\u5E38\u89C1\u95EE\u9898","permalink":"/notes/service/observability/metrics/faq"},"next":{"title":"Prometheus Exporter","permalink":"/notes/service/observability/metrics/prometheus/exporter/"}}'),t=s("52676"),i=s("79938");let l={title:"Prometheus"},c="Prometheus",o={},h=[{value:"Config",id:"config",level:2},{value:"\u670D\u52A1\u53D1\u73B0",id:"\u670D\u52A1\u53D1\u73B0",level:2},{value:"\u96C6\u6210",id:"\u96C6\u6210",level:2},{value:"Pushing",id:"pushing",level:2},{value:"Proxy",id:"proxy",level:2},{value:"label",id:"label",level:2},{value:"Push vs Pull",id:"push-vs-pull",level:2}];function a(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"prometheus",children:"Prometheus"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://prometheus.io",children:"Prometheus"})}),"\n",(0,t.jsxs)(n.li,{children:["Prometheus ",(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/introduction/comparison/",children:"vs"})]}),"\n",(0,t.jsxs)(n.li,{children:["Prometheus \u53EF\u4EE5\u548C Grafana \u96C6\u6210, \u5728 ",(0,t.jsx)(n.a,{href:"https://grafana.net/dashboards",children:"https://grafana.net/dashboards"})," \u53EF\u4EE5\u627E\u5230\u5F88\u591A\u9884\u5B9A\u4E49\u7684\u9762\u677F\u5B9A\u4E49"]}),"\n",(0,t.jsxs)(n.li,{children:["Prometheus vs TICK\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Pull vs Push"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus/pushgateway",children:"prometheus/pushgateway"})}),"\n",(0,t.jsxs)(n.li,{children:["\u78C1\u76D8\u7A7A\u95F4\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"needed_disk_space = retention_time_seconds * ingested_samples_per_second * bytes_per_sample"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"bytes_per_sample \u4E00\u822C\u4E3A 1\u30012 bytes"}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"--storage.tsdb.retention.time"})," \u9ED8\u8BA4 15d"]}),"\n",(0,t.jsx)(n.li,{children:"node_exporter \u5927\u7EA6 3000 \u6307\u6807"}),"\n",(0,t.jsx)(n.li,{children:"scrape_interval 15s"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"(3000/15*2 * 15*24*60*60) /1000/1000 = 518M"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.robustperception.io/configuring-prometheus-storage-retention",children:"https://www.robustperception.io/configuring-prometheus-storage-retention"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Prometheus \u4E0D\u652F\u6301 auth\uFF0C\u5982\u679C\u8981\u5BF9\u5916\u66B4\u9732\u5EFA\u8BAE\u6DFB\u52A0\u53CD\u5411\u4EE3\u7406"}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# \u5B89\u88C5\nbrew install prometheus\n# \u4ECE\u6E90\u7801\u7F16\u8BD1\u5B89\u88C5\ngo install github.com/prometheus/prometheus@latest\n\n# \u542F\u52A8 \u9ED8\u8BA4\u524D\u7AEF\u9875\u9762 http://localhost:9090\nprometheus --config.file ~/.config/prometheus.yml\n\n# docker \u542F\u52A8\ndocker run \\\n  -p 9090:9090 \\\n  -v /etc/prometheus:/etc/prometheus \\\n  prom/prometheus\n\n# \u6216\u901A\u8FC7 brew \u542F\u52A8\u670D\u52A1\n# \u5982\u679C\u6CA1\u6709 --storage.tsdb.path \u53EF\u80FD\u51FA\u73B0\u6743\u9650\u95EE\u9898\necho "--config.file $HOME/.config/prometheus.yml --storage.tsdb.path $HOME/.data/prometheus" > /usr/local/etc/prometheus.args\nbrew services start prometheus\n# \u9519\u8BEF\u65E5\u5FD7\ncat /usr/local/var/log/prometheus.err.log\n# \u6B63\u5E38\u65E5\u5FD7\ncat /usr/local/var/log/prometheus.log\n\n# \u7BA1\u7406\u63A5\u53E3\n# --web.enable-admin-api \u542F\u7528 /api/*/admin/ \u76F8\u5173\u63A5\u53E3\n# --web.enable-lifecycle \u542F\u7528 reload \u548C quite\n# \u53C2\u8003 https://prometheus.io/docs/operating/security/\nprometheus --config.file ~/.config/prometheus.yml --web.enable-admin-api --web.enable-lifecycle\n# brew \u53C2\u6570\necho "--config.file $HOME/.config/prometheus.yml --storage.tsdb.path $HOME/.data/prometheus --web.enable-admin-api --web.enable-lifecycle" > /usr/local/etc/prometheus.args\n# \u91CD\u542F\u670D\u52A1\nbrew services restart prometheus\n# \u91CD\u8F7D\u914D\u7F6E\ncurl -X POST http://localhost:9090/-/reload\n\n# \u4E3B\u673A\u8282\u70B9\u76D1\u63A7\nbrew install node_exporter\n# \u901A\u8FC7 service \u542F\u52A8\necho --web.listen-address :9101 > /usr/local/etc/node_exporter.args\nbrew services start node_exporter\n\n# \u76F4\u63A5\u542F\u52A8\nnode_exporter --web.listen-address :9101\n\n# Docker\n# ===================\ndocker pull prom/prometheus\ndocker pull prom/alertmanager\n# \u9700\u8981\u6302\u8F7D /proc\ndocker pull prom/node-exporter\ndocker pull prom/blackbox-exporter\ndocker pull prom/container-exporter\ndocker pull prom/mysqld-exporter\n\n# node_exporter \u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u7684\u4E0D\u592A\u597D\ngo get github.com/prometheus/node_exporter\n\n# \u9ED8\u8BA4\u8D26\u53F7\u5BC6\u7801\u4E3A admin/admin\ndocker pull grafana/grafana\n\ndocker network create --subnet=172.18.0.0/16 mon-net\n\ndocker run --net mon-net --ip 172.18.0.10 -i -p 12000:3000 grafana/grafana\ndocker run --net mon-net --ip 172.18.0.20 -i -p 12001:9090 prom/prometheus\n\n# http://docs.grafana.org/installation/docker/\ndocker run -d --restart always -v /etc/localtime:/etc/localtime:ro \\\n  -p 12000:3000 \\\n  -e "GF_SERVER_ROOT_URL=http://grafana.server.name"  \\\n  -e "GF_SECURITY_ADMIN_PASSWORD=secret"  \\\n  grafana/grafana\n'})}),"\n",(0,t.jsx)(n.h2,{id:"config",children:"Config"}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u914D\u7F6E\u4E0D\u652F\u6301\u73AF\u5883\u53D8\u91CF\u66FF\u6362\uFF0C\u4F46\u6D89\u53CA\u5230\u51ED\u8BC1\u4FE1\u606F\u7684\u5730\u65B9\u90FD\u652F\u6301 \u6587\u4EF6 \u6216\u4F7F\u7528 \u5E38\u7528\u7684 \u73AF\u5883\u53D8\u91CF"}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# \u5168\u5C40\u914D\u7F6E\nglobal:\n  # \u6293\u53D6\u95F4\u9694\uFF0C\u9ED8\u8BA4 1m\n  scrape_interval: 15s\n  # \u6293\u53D6\u8D85\u65F6\uFF0C\u9ED8\u8BA4 10s\n  scrape_timeout: 10s\n  # \u8BA1\u7B97\u89C4\u5219\u95F4\u9694\uFF0C\u9ED8\u8BA4 1m\n  evaluation_interval: 15s\n\n# \u544A\u8B66\u914D\u7F6E\nalerting:\n  alertmanagers:\n    - static_configs:\n        - targets:\n          # - alertmanager:9093\n\n# \u5468\u671F\u6027\u8BA1\u7B97\u7684\u89C4\u5219\u6587\u4EF6\nrule_files:\n  # - \"first_rules.yml\"\n  # - \"second_rules.yml\"\n\n# \u6293\u53D6\u914D\u7F6E\nscrape_configs:\n  # \u4EFB\u52A1\u540D\u5B57\uFF0C\u4F1A\u6DFB\u52A0\u4E00\u4E2A job=$job_name \u7684\u6807\u7B7E\n  - job_name: 'prometheus'\n    # \u6307\u6807\u8DEF\u5F84\uFF0C\u9ED8\u8BA4 '/metrics'\n    metrics_path: '/metrics'\n    # \u8BF7\u6C42 schema\uFF0C\u9ED8\u8BA4 'http'\n    scheme: 'http'\n    # \u9759\u6001\u914D\u7F6E\n    static_configs:\n      # \u6293\u53D6\u76EE\u6807\n      - targets: ['localhost:9090']\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u670D\u52A1\u53D1\u73B0",children:"\u670D\u52A1\u53D1\u73B0"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/prometheus/latest/configuration/configuration",children:"\u652F\u6301\u914D\u7F6E"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"azure"}),"\n",(0,t.jsx)(n.li,{children:"consul - \u670D\u52A1 catalog"}),"\n",(0,t.jsx)(n.li,{children:"digitalocean"}),"\n",(0,t.jsx)(n.li,{children:"dockerswarm"}),"\n",(0,t.jsx)(n.li,{children:"dns - SVR \u8BB0\u5F55"}),"\n",(0,t.jsx)(n.li,{children:"ec2"}),"\n",(0,t.jsx)(n.li,{children:"openstack"}),"\n",(0,t.jsxs)(n.li,{children:["file - \u68C0\u6D4B\u6587\u4EF6\u53D8\u5316\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u683C\u5F0F\u4E0E static_config \u76F8\u540C"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"gce"}),"\n",(0,t.jsxs)(n.li,{children:["kubernetes\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"node\u3001service\u3001pod\u3001endpoints\u3001ingress"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"marathon"}),"\n",(0,t.jsx)(n.li,{children:"nerve"}),"\n",(0,t.jsx)(n.li,{children:"serverset"}),"\n",(0,t.jsx)(n.li,{children:"triton"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["mDNS\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/prometheus/prometheus/issues/2537",children:"#2537"})," - Cannot scrape targets specified by mDNS name"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/msiebuhr/prometheus-mdns-sd",children:"msiebuhr/prometheus-mdns-sd"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u5199\u5165\u6587\u4EF6\uFF0C\u4F7F\u7528\u6587\u4EF6\u53D1\u73B0"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# _prometheus-http._tcp\n# _prometheus-https._tcp\ngo get github.com/msiebuhr/prometheus-mdns-sd\n#\nprometheus-mdns-sd -out /etc/prometheus/mdns-sd.json\n\ncat <<XML > /etc/avahi/services/node-exporter.service\n<service-group>\n  <name replace-wildcards="yes">%h</name>\n\n  <service>\n    <type>_prometheus-http._tcp</type>\n    <port>9100</port>\n  </service>\n</service-group>\nXML\n\n# macOS\ndns-sd -R "node_exporter metrics" _prometheus-http._tcp. . 9100 path=/metrics\n'})}),"\n",(0,t.jsx)(n.h2,{id:"\u96C6\u6210",children:"\u96C6\u6210"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/operating/integrations",children:"INTEGRATIONS"})}),"\n",(0,t.jsxs)(n.li,{children:["\u652F\u6301\u8BFB\u5199\u7684\u5B58\u50A8\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Azure Data Explorer"}),"\n",(0,t.jsx)(n.li,{children:"Cortex"}),"\n",(0,t.jsx)(n.li,{children:"CrateDB"}),"\n",(0,t.jsx)(n.li,{children:"Google BigQuery"}),"\n",(0,t.jsx)(n.li,{children:"Google Cloud Spanner"}),"\n",(0,t.jsx)(n.li,{children:"InfluxDB"}),"\n",(0,t.jsx)(n.li,{children:"IRONdb"}),"\n",(0,t.jsx)(n.li,{children:"M3DB"}),"\n",(0,t.jsx)(n.li,{children:"MetricFire"}),"\n",(0,t.jsx)(n.li,{children:"PostgreSQL/TimescaleDB"}),"\n",(0,t.jsx)(n.li,{children:"QuasarDB"}),"\n",(0,t.jsx)(n.li,{children:"Splunk"}),"\n",(0,t.jsx)(n.li,{children:"TiKV"}),"\n",(0,t.jsx)(n.li,{children:"Thanos"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"pushing",children:"Pushing"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/practices/pushing/",children:"https://prometheus.io/docs/practices/pushing/"})}),"\n",(0,t.jsx)(n.li,{children:"only valid use case for the Pushgateway is for capturing the outcome of a service-level batch job"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"proxy",children:"Proxy"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/prometheus-community/PushProx",children:"https://github.com/prometheus-community/PushProx"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"scrape_configs:\n  - job_name: node\n    # \u4EE3\u7406\n    proxy_url: http://proxy:8080/\n    static_configs:\n      - targets: ['client:9100'] # Presuming the FQDN of the client is \"client\".\n"})}),"\n",(0,t.jsx)(n.h2,{id:"label",children:"label"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"__"})," \u5F00\u5934\u7684\u4E3A\u5185\u90E8 label"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"__meta"})," \u53EF\u80FD\u7531 Service Discovery \u6DFB\u52A0"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"__tmp"})," \u53EF\u7531\u7528\u6237\u4F7F\u7528"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Label"}),(0,t.jsx)(n.th,{children:"Desc"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__address__"})}),(0,t.jsx)(n.td,{children:"\u76EE\u6807\u5730\u5740"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__schema__"})}),(0,t.jsx)(n.td,{children:"http/https"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__name__"})}),(0,t.jsx)(n.td,{children:"\u6807\u7B7E\u540D\u5B57"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__param_target"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"?target="})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"__param_module"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"?module="})})]})]})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- job_name: 'printer'\n  static_configs:\n    - targets:\n        - 192.168.1.2\n  metrics_path: /snmp\n  params:\n    module: [printer_mib]\n  relabel_configs:\n    # __param_target=__address__\n    - source_labels: [__address__]\n      target_label: __param_target\n    # instance=__param_target\n    - source_labels: [__param_target]\n      target_label: instance\n    - target_label: __address__\n      # snmp exporter \u5730\u5740\n      replacement: 192.168.1.3:9116\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"push-vs-pull",children:"Push vs Pull"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Push\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"IoT \u573A\u666F"}),"\n",(0,t.jsx)(n.li,{children:"\u7F51\u7EDC\u9694\u79BB\u573A\u666F"}),"\n",(0,t.jsx)(n.li,{children:"\u6570\u636E\u5BFC\u5165"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.google.com/document/d/1H47v7WfyKkSLMrR8_iku6u9VB73WrVzBHb2SB6dL9_g",children:"Pros/Cons of allowing push in Prometheus"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return l}});var r=s(75271);let t={},i=r.createContext(t);function l(e){let n=r.useContext(i);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);