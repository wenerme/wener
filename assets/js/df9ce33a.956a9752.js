"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["88867"],{26111:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>l,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>a});var s=JSON.parse('{"id":"db/search/elastic/elastic-v2.yml","title":"elasticsearch.yml v2.x","description":"elasticsearch.yml","source":"@site/../notes/db/search/elastic/elastic-v2.yml.md","sourceDirName":"db/search/elastic","slug":"/db/search/elastic/v2.yml","permalink":"/notes/db/search/elastic/v2.yml","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/search/elastic/elastic-v2.yml.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1687329439000,"frontMatter":{"title":"elasticsearch.yml v2.x"},"sidebar":"docs","previous":{"title":"Elasticsearch v2.x","permalink":"/notes/db/search/elastic/v2"},"next":{"title":"Logstash","permalink":"/notes/db/search/elastic/logstash"}}'),r=t("52676"),i=t("79938");let a={title:"elasticsearch.yml v2.x"},l=void 0,c={},o=[{value:"elasticsearch.yml",id:"elasticsearchyml",level:2},{value:"2.x \u914D\u7F6E\u6587\u4EF6\u53CA\u8BF4\u660E",id:"2x-\u914D\u7F6E\u6587\u4EF6\u53CA\u8BF4\u660E",level:2},{value:"\u53C2\u8003",id:"\u53C2\u8003",level:3}];function d(n){let e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",pre:"pre",ul:"ul",...(0,i.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{id:"elasticsearchyml",children:"elasticsearch.yml"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u914D\u7F6E\u6587\u4EF6\u4E2D\u53EF\u901A\u8FC7 ",(0,r.jsx)(e.code,{children:"${...}"})," \u6765\u5F15\u7528\u73AF\u5883\u53D8\u91CF,\u4F8B\u5982:"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yml",children:"node.rack: ${RACK_ENV_VAR}\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u6240\u6709\u7684\u914D\u7F6E\u9879\u90FD\u53EF\u901A\u8FC7\u542F\u52A8\u53C2\u6570\u6307\u5B9A,\u4F8B\u5982 ",(0,r.jsx)(e.code,{children:"./bin/elasticsearch -Dpath.conf=my-config"})," \u4FEE\u6539\u914D\u7F6E\u8DEF\u5F84"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"2x-\u914D\u7F6E\u6587\u4EF6\u53CA\u8BF4\u660E",children:"2.x \u914D\u7F6E\u6587\u4EF6\u53CA\u8BF4\u660E"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yml",children:"# ==================================================\n# \u96C6\u7FA4\u914D\u7F6E\n# ==================================================\ncluster:\n  # \u7528\u4E8E\u6807\u793A\u81EA\u52A8\u53D1\u73B0\u7684\u96C6\u7FA4\u660E. \u5982\u679C\u540C\u65F6\u542F\u52A8\u4E86\u591A\u4E2A\u96C6\u7FA4\u4F1A\u901A\u8FC7\u8BE5\u6807\u793A\u7B26\u6765\u533A\u5206\n  name: friends\n\n\n# ==================================================\n# \u8282\u70B9\u914D\u7F6E\n# ==================================================\nnode:\n  # \u8282\u70B9\u540D\u5982\u679C\u4E0D\u914D\u7F6E\u5728\u542F\u52A8\u65F6\u4F1A\u81EA\u52A8\u751F\u6210.\n  name: joey\n  # \u6807\u8BC6\u8BE5\u8282\u70B9\u662F\u5426\u80FD\u6210\u4E3A\u4E3B\u8282\u70B9.\n  master: true\n  # \u6807\u8BC6\u8BE5\u8282\u70B9\u662F\u5426\u5B58\u50A8\u6570\u636E\n  data: true\n  # \u53EF\u4E3A\u8282\u70B9\u914D\u7F6E\u4EFB\u610F\u989D\u5916\u7684\u5C5E\u6027,\u7528\u4E8E\u5728\u9009\u62E9\u5206\u533A\u65F6\u8FDB\u884C\u6807\u8BC6,\u4F8B\u5982:\n  rack: abc\n  # \u9ED8\u8BA4\u60C5\u51B5\u4E0B\u5728\u5355\u4E2A\u5B89\u88C5\u76EE\u5F55(\u6570\u636E\u76EE\u5F55)\u53EF\u542F\u52A8\u591A\u4E2A\u8282\u70B9,\u53EF\u901A\u8FC7\u8BE5\u914D\u7F6E\u6765\u7981\u6B62\n  max_local_storage_nodes: 1\n\n# ==================================================\n# \u7D22\u5F15\u914D\u7F6E\n# ==================================================\n# \u53C2\u8003\n# http://elasticsearch.org/guide/en/elasticsearch/reference/current/index-modules.html\n# http://elasticsearch.org/guide/en/elasticsearch/reference/current/indices-create-index.html\nindex:\n  # \u9ED8\u8BA4\u5206\u7247\u6570, \u4E0D\u80FD\u88AB\u4FEE\u6539, \u53EF\u5728\u521B\u5EFA\u7D22\u5F15\u65F6\u6307\u5B9A\n  number_of_shards: 5\n  # \u9ED8\u8BA4\u526F\u672C\u6570, \u53EF\u8FD0\u884C\u65F6\u4FEE\u6539\n  number_of_replicas: 1\n  # \u9ED8\u8BA4\u4F7F\u7528 lz4, best_compression \u4F1A\u4F7F\u7528 DEFLATE\n  codec: best_compression\n  # \u81EA\u52A8\u6269\u5C55\u5206\u7247,\u5F53\u5197\u4F59\u8282\u70B9\u8DB3\u591F\u7684\u65F6\u5019,\u81EA\u52A8\u589E\u52A0\u526F\u672C\u6570\u91CF,\u9ED8\u8BA4\u4E3A false, \u53EF\u914D\u7F6E 0-5,3-all\u8FD9\u6837\u7684\u8303\u56F4\u503C\n  auto_expand_replicas: 0-5\n  # \u7D22\u5F15\u5237\u65B0\u95F4\u9694, \u5237\u65B0\u540E\u624D\u80FD\u88AB\u641C\u7D22,\u53EF\u4F7F\u7528 -1 \u7981\u7528\n  refresh_interval: 1s\n  # \u8FD4\u56DE\u7684\u6700\u5927\u7ED3\u679C\u6570\u91CF, \u5F71\u54CD from+size\n  max_result_window: 10000\n  blocks:\n    # \u8BBE\u7F6E\u4E3A true \u4F7F\u7D22\u5F15\u548C\u7D22\u5F15\u5143\u6570\u636E\u53EA\u8BFB\n    read_only: false\n    read: True\n    write: True\n    metadata: True\n  requests:\n    # \u5F53\u4E00\u4E2A\u641C\u7D22\u8BF7\u6C42\u5BF9\u4E00\u4E2A\u6216\u591A\u4E2A\u7D22\u5F15\u6267\u884C\u65F6,\u6BCF\u4E2A\u9700\u8981\u67E5\u8BE2\u7684\u5206\u7247\u90FD\u4F1A\u6267\u884C\u8BE5\u8BF7\u6C42\u7136\u540E\u8FD4\u56DE\u672C\u5730\u7ED3\u679C\u5230\u8C03\u5EA6\u8282\u70B9,\u6700\u7EC8\u5408\u5E76\u4E00\u4E2A\u5168\u5C40\u7684\u7ED3\u679C\u96C6.\n    # \u5206\u7247\u7EA7\u522B\u7684\u8BF7\u6C42\u7F13\u5B58\u548C\u7528\u4E8E\u7F13\u5B58\u6BCF\u4E2A\u5206\u7247\u7684\u672C\u5730\u8BA1\u7B97\u7ED3\u679C. \u8FD9\u53EF\u4EE5\u4F7F\u5E38\u7528(\u590D\u6742)\u7684\u67E5\u8BE2\u7ACB\u5373\u5F97\u5230\u8FD4\u56DE\u7ED3\u679C.\n    # \u8BF7\u6C42\u7F13\u5B58\u975E\u5E38\u9002\u7528\u4E8E\u65E5\u5FD7\u5B58\u50A8, \u56E0\u4E3A\u53EA\u6709\u6700\u8FD1\u7684\u7D22\u5F15\u6570\u636E\u4F1A\u88AB\u66F4\u65B0,\u65E7\u7684\u7D22\u5F15\u6570\u636E\u53EF\u4ECE\u7F13\u5B58\u76F4\u63A5\u8FD4\u56DE.\n    # \u76EE\u524D\u53EA\u80FD\u7F13\u5B58 size=0 \u7684\u641C\u7D22\u8BF7\u6C42,\u56E0\u6B64\u4E0D\u4F1A\u7F13\u5B58 `hits`,\u4F46\u4F1A\u7F13\u5B58 `hots.total` \u805A\u5408\u548C\u5EFA\u8BAE\n    # \u67E5\u8BE2\u4E2D\u4F7F\u7528\u4E86 `now` \u7684\u4E0D\u80FD\u88AB\u7F13\u5B58\n    #\n    # \u5BF9\u4E8E\u672A\u7F13\u5B58\u7684\u641C\u7D22\u4E5F\u80FD\u4FDD\u8BC1\u8FD1\u5B9E\u65F6\n    # \u7F13\u5B58\u4F1A\u5728\u5206\u7247\u5237\u65B0\u65F6\u81EA\u52A8\u5931\u6548,\u4F46\u53EA\u6709\u5B9E\u9645\u88AB\u6539\u53D8\u7684\u6570\u636E\u624D\u4F1A\u5931\u6548.\n    # \u5373\u4FDD\u8BC1\u7F13\u5B58\u8BF7\u6C42\u67E5\u8BE2\u7ED3\u679C\u548C\u672A\u7F13\u5B58\u8BF7\u6C42\u662F\u76F8\u540C\u7684.\n    # \u5237\u65B0\u95F4\u9694\u8D8A\u4E45, \u7F13\u5B58\u7684\u6709\u6548\u65F6\u95F4\u8D8A\u4E45.\n    # \u7F13\u5B58\u4F7F\u7528 LRU \u89C4\u5219\n    # \u53EF\u624B\u52A8\u4F7F\u7F13\u5B58\u5931\u6548\n    #   curl -XPOST 'localhost:9200/kimchy,elasticsearch/_cache/clear?request_cache=true'\n    #\n    # \u7F13\u5B58\u7684 KEY \u4E3A\u8BF7\u6C42\u7684 JSON\n    # \u67E5\u770B\u7F13\u5B58\u4F7F\u7528\u7EDF\u8BA1\n    # curl 'localhost:9200/_stats/request_cache?pretty&human'\n    # curl 'localhost:9200/_nodes/stats/indices/request_cache?pretty&human'\n    # https://www.elastic.co/guide/en/elasticsearch/reference/current/shard-request-cache.html\n    cache:\n      enable: true\n      # \u5806\u4E2D\u6700\u5927\u7F13\u5B58\u91CF\n      size: 1%\n    # https://www.elastic.co/guide/en/elasticsearch/reference/current/recovery.html\n\n\n\nindices:\n  # \u5B57\u6BB5\u6570\u636E\u7F13\u5B58\u4E3B\u8981\u5728\u5BF9\u5B57\u6BB5\u6392\u5E8F\u548C\u805A\u5408\u8BA1\u7B97\u7684\u65F6\u5019\u4F7F\u7528.\n  # \u5728\u57FA\u4E8E\u5B57\u6BB5\u6587\u6863\u8FDB\u884C\u8BBF\u95EE\u65F6,\u4E3A\u4E86\u63D0\u9AD8\u8BBF\u95EE\u901F\u5EA6\u56DE\u5C06\u6240\u6709\u5B57\u6BB5\u503C\u90FD\u52A0\u8F7D\u5230\u5185\u5B58.\n  # \u6784\u5EFA\u5B57\u6BB5\u6570\u636E\u7F13\u5B58\u662F\u76F8\u5F53\u6602\u8D35\u7684,\u56E0\u6B64\u5EFA\u8BAE\u914D\u7F6E\u8DB3\u591F\u7684\u5185\u5B58\u6765\u7F13\u5B58\u8BE5\u6570\u636E.\n  # https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-fielddata.html\n  # curl -XGET 'http://localhost:9200/_stats/fielddata/?fields=field1,field2&pretty'\n  fielddata:\n    cache:\n      # #\u8C03\u4F18# \u8BE5\u503C\u53EF\u4E3A\u767E\u5206\u6BD4\u6216\u5177\u4F53\u7684\u503C,\u4F8B\u5982 12GB\n      size: 30%\n  # \u67E5\u8BE2\u7F13\u5B58\u8D1F\u8D23\u7F13\u5B58\u67E5\u8BE2\u7684\u7ED3\u679C\u503C.\n  # \u6BCF\u4E2A\u8282\u70B9\u90FD\u6709\u81EA\u5DF1\u7684\u67E5\u8BE2\u7F13\u5B58,\u4F9B\u6240\u6709\u5206\u7247\u5171\u4EAB.\n  # \u7F13\u5B58\u91C7\u7528 LRU \u89C4\u5219\n  # \u53EA\u4F1A\u7F13\u5B58\u5728\u8FC7\u6EE4\u4E0A\u4E0B\u6587\u4E2D\u7684\u67E5\u8BE2\n  # \u8BE5\u914D\u7F6E\u4E3A\u9759\u6001\u914D\u7F6E,\u9700\u8981\u5728\u6BCF\u4E2A\u6570\u636E\u8282\u70B9\u914D\u7F6E\n  queries:\n    cache:\n      size: 10%\n  memory:\n    # \u7D22\u5F15\u7F13\u51B2\u4F1A\u7528\u4E8E\u5B58\u50A8\u65B0\u7D22\u5F15\u7684\u6587\u6863. \u5F53\u6EE1\u4E86\u8FC7\u540E, \u7F13\u51B2\u4E2D\u7684\u6587\u6863\u4F1A\u88AB\u5199\u5230\u78C1\u76D8\u6BB5\u4E2D. \u6BCF\u4E2A\u8282\u70B9\u7684\u6BCF\u4E2A\u5206\u7247\u90FD\u6709\u81EA\u5DF1\u7684\u7F13\u51B2.\n    # \u8BE5\u914D\u7F6E\u4E3A\u9759\u6001\u914D\u7F6E,\u9700\u8981\u5728\u6BCF\u4E2A\u6570\u636E\u8282\u70B9\u914D\u7F6E\n    # \u53EF\u914D\u7F6E\u767E\u5206\u6BD4\u6216\u5177\u4F53\u7684\u503C\n    # https://www.elastic.co/guide/en/elasticsearch/reference/current/indexing-buffer.html\n    index_buffer_size: 10%\n    min_index_buffer_size: 48mb\n    # \u9ED8\u8BA4\u4E3A\u65E0\u9650\n    max_index_buffer_size: 50%\n    # \u4E3A\u6BCF\u4E2A\u5206\u7247\u8BBE\u7F6E\u4E00\u4E2A\u7528\u4E8E\u7D22\u5F15\u7F13\u51B2\u7684\u6700\u5C0F\u7F13\u5B58\u503C\n    min_shard_index_buffer_size: 4mb\n  # \u6062\u590D\u76F8\u5173\u8BBE\u7F6E\n  # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-cache.html\n  recovery:\n    # \u6062\u590D\u5206\u7247\u7684\u5E76\u53D1\u6D41\u6570\n    concurrent_streams: 3\n    # \u6BCF\u4E2A\u8282\u70B9\u5141\u8BB8\u7684\u5C0F\u6587\u4EF6(<5mb)\u6062\u590D\u6D41\n    concurrent_small_file_streams: 2\n    file_chunk_size: 512kb\n    translog_ops: 1000\n    translog_size: 512kb\n    compress: true\n    # \u6062\u590D\u65F6\u7684\u6570\u636E\u9650\u6D41\n    max_bytes_per_sec: 100mb\n  # \u6709 ttl \u7684\u6587\u6863\u4F1A\u6709\u4E13\u95E8\u7684\u7EBF\u7A0B\u6765\u64CD\u4F5C\n  # https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-ttl.html\n  ttl:\n    # \u5220\u9664\u8FDB\u7A0B\u7684\u8FD0\u884C\u95F4\u9694\n    interval: 60s\n    # \u5220\u9664\u4E3A\u6279\u91CF\u64CD\u4F5C,\u901A\u8FC7\u8BE5\u914D\u7F6E\u6765\u63A7\u5236\u6279\u5904\u7406\u91CF\n    bulk_size: 10000\n\n\n# ==================================================\n# \u8DEF\u5F84\u914D\u7F6E\n# ==================================================\n\npath:\n  # \u914D\u7F6E\u8DEF\u5F84, \u5305\u542B logging.yml \u548C elasticsearch.yml, \u901A\u5E38\u901A\u8FC7\u547D\u4EE4\u884C\u53C2\u6570\u6307\u5B9A\n  conf: config\n  # \u8BE5\u8282\u70B9\u5B58\u50A8\u7D22\u5F15\u6570\u636E\u7684\u76EE\u5F55, \u53EF\u914D\u7F6E\u591A\u4E2A\n  # path.data: data1,data2\n  data: data\n  # \u65E5\u5FD7\u8DEF\u5F84\n  logs: logs\n  # \u63D2\u4EF6\u8DEF\u5F84\n  plugins: plugins\n\n# ==================================================\n# \u63D2\u4EF6\u914D\u7F6E\n# ==================================================\n# \u5982\u679C\u8FD9\u91CC\u5B89\u88C5\u7684\u63D2\u4EF6\u672A\u5B89\u88C5,\u5219\u8BE5\u8282\u70B9\u4E0D\u4F1A\u542F\u52A8\nplugin.mandatory: mapper-attachments,lang-groovy\n\n# ==================================================\n# \u5185\u5B58\u914D\u7F6E\n# ==================================================\n# \u5185\u5B58\u9501,\u907F\u514D\u5185\u5B58\u4EA4\u6362,\u63D0\u5347\u6027\u80FD,\u4F46\u5360\u7528\u7684\u5185\u5B58\u4E0D\u80FD\u88AB\u522B\u7684\u8FDB\u7A0B\u4F7F\u7528\nbootstrap.mlockall: true\n# \u786E\u4FDD ES_MIN_MEM \u548C ES_MAX_MEM \u73AF\u5883\u53D8\u91CF\u90FD\u662F\u540C\u6837\u7684\u503C, \u5E76\u786E\u4FDD\u670D\u52A1\u5668\u6709\u8DB3\u591F\u7684\u5185\u5B58.\n# \u540C\u65F6\u8FD8\u9700\u8981\u786E\u4FDD Elasticsearch \u80FD\u591F\u64CD\u4F5C\u5185\u5B58\u9501, `ulimit -l unlimited`\n\n# ==================================================\n# \u7F51\u7EDC\u548C HTTP\n# ==================================================\nnetwork:\n  # \u7ED1\u5B9A\u7684\u4E3B\u673A\u5730\u5740\n  bind_host: 0.0.0.0\n  # \u5176\u4ED6\u8282\u70B9\u7528\u6765\u4E0E\u8BE5\u8282\u70B9\u4EA4\u4E92\u7684\u5730\u5740.\u5982\u679C\u4E0D\u914D\u7F6E\u5219\u4F1A\u81EA\u884C\u5224\u65AD.\u9700\u8981\u6307\u5B9A\u4E3A\u771F\u5B9E IP \u5730\u5740\n  publish_host: 192.168.0.1\n  # \u540C\u65F6\u6307\u5B9A bind_host, publish_host\n  host: 0.0.0.0\n\n# \u4F20\u8F93\u6A21\u5757\u8D1F\u8D23\u96C6\u7FA4\u5185\u8282\u70B9\u4E4B\u95F4\u7684\u901A\u8BAF.\u6240\u6709\u7684\u4F20\u8F93\u672C\u8D28\u4E0A\u90FD\u662F\u4E00\u90E8\u7684,\u56E0\u6B64\u4E0D\u4F1A\u6709\u7EBF\u7A0B\u963B\u585E\u7B49\u5F85\u54CD\u5E94.\n# \u53C2\u8003\n#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html\ntransport:\n    # \u57FA\u4E8E TCP \u5B9E\u73B0\u7684\u4F20\u8F93\u6A21\u5757\n    tcp:\n      # \u8282\u70B9\u4E4B\u95F4\u901A\u4FE1\u7AEF\u53E3\n      port: 9300-9400\n      # \u96C6\u7FA4\u4E2D\u5176\u4ED6\u8282\u70B9\u4E0E\u8BE5\u8282\u70B9\u901A\u8BAF\u65F6\u4F7F\u7528\u7684\u7AEF\u53E3.\u5F53\u5728\u9632\u706B\u5899\u6216\u8005\u4EE3\u7406\u540E\u9762\u7684\u65F6\u5019\u5F88\u6709\u7528.\n      # \u5982\u679C\u4E0D\u8BBE\u7F6E\u4E0E port \u503C\u76F8\u540C\n      publish_port: 9300-9400\n      # \u7ED1\u5B9A\u4F20\u8F93\u7AEF\u53E3\u7684\u4E3B\u673A\u5730\u5740\n      # \u9ED8\u8BA4 network.bind_host\n      bind_host: 0.0.0.0\n      # \u96C6\u7FA4\u4E2D\u5176\u4ED6\u8282\u70B9\u4E0E\u8BE5\u8282\u70B9\u901A\u8BAF\u65F6\u4F7F\u7528\u7684\u4E3B\u673A\u5730\u5740\n      # \u9ED8\u8BA4 transport.host \u6216 network.publish_host\n      publish_host: 0.0.0.0\n      # \u540C\u65F6\u8BBE\u7F6E transport.bind_host \u548C transport.publish_host\n      # \u9ED8\u8BA4 network.host\n      host: 0.0.0.0\n      connect_timeout: 30s\n      # \u8282\u70B9\u4E4B\u95F4\u901A\u4FE1\u662F\u5426\u542F\u7528\u538B\u7F29 LZF\n      compress: false\n      # \u5B9A\u671F\u53D1\u9001 PING \u4FDD\u8BC1\u94FE\u63A5\u5B58\u6D3B\n      ping_schedule: 5s\n# HTTP \u6A21\u5757\u7528\u4E8E\u901A\u8FC7 HTTP \u66B4\u9732 Elasticsearch \u7684 API\n# HTTP \u5747\u4E3A\u5F02\u6B65,\u6CA1\u6709\u7EBF\u7A0B\u4F1A\u88AB\u7B49\u5F85\u54CD\u5E94\u963B\u585E,\u89E3\u51B3\u4E86 C10K \u95EE\u9898\n# \u5C3D\u91CF\u4F7F\u7528 HTTP keep-alive, \u4E0D\u8981\u4F7F\u7528 HTTP chunking\n# \u53C2\u8003\n#     https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html\nhttp:\n  # \u76D1\u542C\u7684 HTTP \u7AEF\u53E3\n  port: 9200-9300\n  # \u5BA2\u6237\u7AEF\u5E94\u8BE5\u8FDE\u63A5\u7684\u8282\u70B9\n  # \u9ED8\u8BA4 http.port \u7684\u5B9E\u9645\u503C\n  publish_port: 9200-9300\n  # \u7ED1\u5B9A HTTP \u7AEF\u53E3\u7684\u4E3B\u673A\u5730\u5740\n  # \u9ED8\u8BA4 network.bind_host\n  bind_host: 0.0.0.0\n  # \u5BA2\u6237\u7AEF\u5E94\u8BE5\u8FDE\u63A5\u7684\u4E3B\u673A\u5730\u5740\n  publish_host: 0.0.0.0\n  # \u540C\u65F6\u8BBE\u7F6E bind_host \u548C publish_host\n  host: 0.0.0.0\n  # \u5141\u8BB8\u7684\u6700\u5927\u5185\u5BB9\u957F\u5EA6\n  # \u5982\u679C\u5927\u4E8E Integer.MAX_VALUE \u4F1A\u88AB\u91CD\u7F6E\u4E3A 100mb\n  max_content_length: 100mb\n  # URL \u6700\u5927\u957F\u5EA6\n  max_initial_line_length: 4kb\n  max_header_size: 8kb\n  # \u662F\u5426\u5728\u652F\u6301\u538B\u7F29\u7684\u65F6\u5019\u4F7F\u7528\u538B\u7F29\n  compression: false\n  # \u538B\u7F29\u7EA7\u522B\n  compression_level: 6\n  # \u662F\u5426\u7981\u7528 HTTP\n  enabled: false\n  cors:\n    # \u662F\u5426\u542F\u7528\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB\n    enabled: false\n    allow-origin: *\n    # \u9ED8\u8BA4 1728000 = 20 \u5929\n    max-age: 1728000\n    allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE\n    allow-headers: X-Requested-With, Content-Type, Content-Length\n    allow-credentials: false\n  # \u662F\u5426\u5728\u54CD\u5E94\u4E2D\u663E\u793A\u5177\u4F53\u7684\u9519\u8BEF\u5806\u6808\n  # \u5982\u679C\u8BBE\u7F6E\u4E3A false, \u5F53\u8BF7\u6C42\u5E26\u4E86 error_trace \u53C2\u6570\u4E5F\u4F1A\u8FD4\u56DE\u9519\u8BEF\u4FE1\u606F\n  detailed_errors:\n    enabled: true\n  pipelining: true\n  pipelining:\n    # HTTP \u94FE\u63A5\u5173\u95ED\u524D\u5806\u79EF\u5728\u5185\u5B58\u4E2D\u7684\u6700\u5927\u4E8B\u4EF6\u6570\u91CF\n    max_events: 10000\n\n\n# ==================================================\n# \u7F51\u5173\n# ==================================================\n# \u7F51\u5173\u7528\u4E8E\u6301\u4E45\u5316\u96C6\u7FA4\u72B6\u6001,\u5373\u4FBF\u96C6\u7FA4\u91CD\u542F\u72B6\u6001\u4E5F\u4E0D\u4F1A\u4E22\u5931.\u6240\u6709\u5BF9\u72B6\u6001\u7684\u53D8\u66F4(\u4F8B\u5982 \u6DFB\u52A0\u7D22\u5F15)\u90FD\u4F1A\u5B58\u50A8\u5230\u7F51\u5173.\u5F53\u96C6\u7FA4\u542F\u52A8\u65F6\u4F1A\u4ECE\u7F51\u5173\u8BFB\u53D6\u72B6\u6001.\n# \u53C2\u8003\n#   http://elasticsearch.org/guide/en/elasticsearch/reference/current/modules-gateway.html\n# \u8FD9\u4E9B\u8BBE\u7F6E\u53EA\u6709\u5728\u6574\u4E2A\u96C6\u7FA4\u5168\u90E8\u91CD\u542F\u540E\u624D\u4F1A\u751F\u6548\ngateway:\n  # \u96C6\u7FA4\u7C7B\u578B\n  type: local\n  # \u5F53\u8282\u70B9\u91CC\u6709\u6307\u5B9A\u8282\u70B9\u6570\u91CF\u540E\u5F00\u59CB\u6062\u590D\n  recover_after_nodes: 1\n  recover_after_master_nodes: 1\n  recover_after_data_nodes: 1\n  # \u5F53\u8FBE\u5230\u6307\u5B9A\u65F6\u95F4\u540E\u5F00\u59CB\u6062\u590D\n  recover_after_time: 10m\n  # \u96C6\u7FA4\u4E2D\u5E94\u6709\u8282\u70B9\u6570\u91CF,\u5F53\u6570\u91CF\u8FBE\u5230\u5E76\u4E14\u6EE1\u8DB3 recover_after_time, \u7ACB\u5373\u5F00\u59CB\u6062\u590D\n  expected_nodes: 0\n  expected_master_nodes: 0\n  expected_data_nodes: 0\n\naction:\n  # \u662F\u5426\u5141\u8BB8\u81EA\u52A8\u521B\u5EFA\u7D22\u5F15\n  auto_create_index: true\n  # \u7981\u6B62\u5173\u95ED\u6240\u6709\u7D22\u5F15\n  disable_close_all_indices: true\n  # \u7981\u6B62\u5220\u9664\u6240\u6709\u7D22\u5F15\n  disable_delete_all_indices: true\n  # \u7981\u6B62\u5173\u505C\u8BE5\u8282\u70B9\n  disable_shutdown: true\n\n# ==================================================\n# \u6062\u590D\u63A7\u5236\n# ==================================================\n# \u53C2\u8003\n#   https://www.elastic.co/guide/en/elasticsearch/reference/current/shards-allocation.html\n#   https://www.elastic.co/guide/en/elasticsearch/reference/current/disk-allocator.html\n\ncluster:\n  routing:\n    allocation:\n      # all \u5141\u8BB8\u5BF9\u6240\u6709\u5206\u7247\u7C7B\u578B\u8FDB\u884C\u5206\u7247\u7533\u8BF7\n      # primaries \u53EA\u5141\u8BB8\u4E3B\u5206\u7247\u7684\u5206\u7247\u7533\u8BF7\n      # new_primaries \u53EA\u5141\u8BB8\u65B0\u589E\u7D22\u5F15\u7684\u4E3B\u5206\u7247\u5206\u7247\u7533\u8BF7\n      # none \u4E0D\u5141\u8BB8\u5206\u7247\u7533\u8BF7\n      enable: all\n      # \u5F53\u521D\u59CB\u6062\u590D\u65F6\u7684\u5E76\u53D1\u6062\u590D\u6570\u91CF\n      node_initial_primaries_recoveries: 2\n      # \u5F53\u6DFB\u52A0,\u5220\u9664\u6216\u5747\u8861\u8D1F\u8F7D\u65F6\u7684\u5E76\u53D1\u6062\u590D\u6570\u91CF\n      node_concurrent_recoveries: 4\n      same_shard:\n        # \u662F\u5426\u5141\u8BB8\u5728\u540C\u4E00\u4E2A\u4E3B\u673A\u7533\u8BF7\u5206\u7247\n        host: false\n    rebalance:\n      # \u53EF\u9009\u503C all, primaries, new_primaries, none\n      enable: all\n      # \u914D\u7F6E\u5141\u8BB8\u4EC0\u4E48\u6837\u7684\u8D1F\u8F7D\u5747\u8861\n      # always \u5141\u8BB8\u6240\u6709\u7684\u8D1F\u8F7D\u5747\u8861\n      # indices_primaries_active \u53EA\u6709\u5F53\u6240\u6709\u4E3B\u5206\u7247\u90FD\u5B58\u5728\u65F6\n      # indices_all_active \u53EA\u6709\u5F53\u6240\u6709\u4E3B\u5206\u7247\u548C\u5206\u7247\u526F\u672C\u5728\u96C6\u7FA4\u4E2D\u90FD\u5B58\u5728\u65F6.\n      allow_rebalance: indices_all_active\n      # \u6574\u4E2A\u96C6\u7FA4\u4E2D\u5141\u8BB8\u540C\u65F6\u8FDB\u884C\u8D1F\u8F7D\u5747\u8861\u7684\u6570\u91CF\n      cluster_concurrent_rebalance: 2\n    balance:\n      # \u5728\u4E00\u4E2A\u8282\u70B9\u4E0A\u5141\u8BB8\u7533\u8BF7\u5206\u7247\u7684\u6743\u91CD\u56E0\u5B50. \u589E\u52A0\u8BE5\u503C,\u4F1A\u4F7F\u96C6\u7FA4\u4E2D\u8282\u70B9\u4E0A\u7684\u5206\u7247\u6570\u91CF\u8D8B\u4E8E\u76F8\u7B49.\n      shard: 0.45\n      # \u7D22\u5F15\u5206\u7247\u9009\u62E9\u4E00\u4E2A\u8282\u70B9\u7684\u6743\u91CD\u56E0\u5B50. \u589E\u52A0\u8BE5\u503C,\u4F1A\u4F7F\u6BCF\u4E2A\u8282\u70B9\u4E0A\u6BCF\u4E2A\u7D22\u5F15\u5206\u7247\u7684\u6570\u91CF\u8D8B\u4E8E\u76F8\u7B49.\n      index: 0.55\n      # \u5E94\u6267\u884C\u7684\u64CD\u4F5C\u6700\u5C0F\u4F18\u5316\u503C. \u589E\u52A0\u8BE5\u503C, \u4F1A\u4F7F\u96C6\u7FA4\u8D8B\u5411\u4E8E\u4E0D\u5747\u8861\u5206\u7247.\n      threshold: 1.0\n    disk:\n      # \u9009\u62E9\u5206\u914D\u65F6\u662F\u5426\u8003\u8651\u78C1\u76D8\u60C5\u51B5\n      threshold_enabled: true\n      watermark:\n        # Controls the low watermark for disk usage.\n        # \u5F53\u78C1\u76D8\u4F7F\u7528\u91CF\u8FBE\u5230 85% \u65F6\u4FBF\u4E0D\u4F1A\u518D\u5728\u8BE5\u8282\u70B9\u7533\u8BF7\u5230\u5206\u7247.\n        # \u4E5F\u53EF\u5C06\u8BE5\u503C\u8BBE\u7F6E\u4E3A\u5177\u4F53\u7684\u91CF,\u4F8B\u5982 500mb, \u8868\u793A\u5F53\u78C1\u76D8\u5269\u4F59\u7A7A\u95F4\u5C0F\u4E8E\u8BE5\u503C\u540E\u4FBF\u4E0D\u80FD\u518D\u8BE5\u8282\u70B9\u7533\u8BF7\u5230\u5206\u7247.\n        low: 85%\n        # Controls the high watermark.\n        # \u5F53\u78C1\u76D8\u4F7F\u7528\u91CF\u8FBE\u5230 90% \u65F6,\u4FBF\u4F1A\u5F00\u59CB\u8BB2\u8BE5\u8282\u70B9\u4E0A\u7684\u5206\u7247\u8FC1\u79FB\u5230\u5176\u4ED6\u8282\u70B9.\n        high: 90%\n      # \u5728\u8BA1\u7B97\u8282\u70B9\u78C1\u76D8\u4F7F\u7528\u91CF\u7684\u65F6\u5019\u5C06\u6B63\u5728\u8FC1\u79FB\u7684\u5206\u7247\u8003\u8651\u5728\u5185.\u56E0\u6B64\u5728\u4F30\u7B97\u78C1\u76D8\u4F7F\u7528\u91CF\u7684\u65F6\u5019\u53EF\u80FD\u4E0D\u51C6\u786E.\n      include_relocations: true\n    update:\n      # \u68C0\u67E5\u96C6\u7FA4\u4E2D\u6BCF\u4E2A\u8282\u70B9\u78C1\u76D8\u72B6\u6001\u7684\u95F4\u9694\n      interval: 30s\n    # \u5206\u7247\u611F\u77E5 https://www.elastic.co/guide/en/elasticsearch/reference/current/allocation-awareness.html\n    # \u5206\u7247\u8FC7\u6EE4 https://www.elastic.co/guide/en/elasticsearch/reference/current/allocation-filtering.html\n    awareness:\n      # \u8FD9\u91CC\u7684\u5C5E\u6027\u662F\u6307\u8282\u70B9\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\n      attributes: rack_id\n      force.zone.values: zone1,zone2\n# \u53EA\u6709\u5F53\u526F\u672C\u6570\u91CF\u6EE1\u8DB3\u8BE5\u914D\u7F6E\u65F6,\u4E3B\u5206\u7247\u624D\u4F1A\u5F00\u59CB\u6062\u590D,\u53EF\u9009\u503C\u4E3A\n#   quorum \u9ED8\u8BA4,quorum-1 \u6216 half, full, full -1, \u6216\u56FA\u5B9A\u6570\u5B57\nindex:\n  recovery:\n    initial_shards: quorum\n\n# ==================================================\n# \u7EBF\u7A0B\u6C60\n# ==================================================\n# \u6BCF\u4E2A\u8282\u70B9\u4E2D\u90FD\u6709\u591A\u4E2A\u7EBF\u7A0B\u6C60, \u5927\u591A\u7684\u7EBF\u7A0B\u6C60\u8FD8\u6709\u4E00\u4E2A\u5173\u8054\u7684\u8BF7\u6C42\u961F\u5217, \u4F7F\u5F97\u8BF7\u6C42\u53EF\u4EE5\u7B49\u5F85\u5904\u7406\u800C\u4E0D\u662F\u88AB\u629B\u5F03.\n# \u7EBF\u7A0B\u6570\u91CF\u53EF\u5728\u8FD0\u884C\u65F6\u4FEE\u6539\n# \u53C2\u8003\n#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-threadpool.html\n\nthreadpool:\n    # \u5E38\u89C4\u64CD\u4F5C\u7EBF\u7A0B\u6C60, \u4F8B\u5982 \u540E\u53F0\u7684\u8282\u70B9\u53D1\u73B0, type: cached\n    generic:\n    # \u7528\u4E8E\u7D22\u5F15\u548C\u5220\u9664\u64CD\u4F5C\u7684\u7EBF\u7A0B\u6C60\n    index:\n      size: N\n      queue_size: 200\n    # \u7528\u641C\u7D22\u548C count \u64CD\u4F5C\u7684\u7EBF\u7A0B\u6C60.\n    search:\n      size: (N * 3) / 2 + 1\n      queue_size: 1000\n    # \u63A8\u8350\u64CD\u4F5C.\n    suggest:\n      size: N\n      queue_size: 1000\n    # \u83B7\u53D6\u64CD\u4F5C\n    get:\n      size: N\n      queue_size: 1000\n    # \u6279\u91CF\u64CD\u4F5C\n    bulk:\n      size: N\n      queue_size: 50\n    percolate:\n      size: N\n      queue_size: 1000\n    # \u5907\u4EFD\u548C\u6062\u590D\u64CD\u4F5C\n    snapshot:\n      keep_alive: 5m\n      size: min(5, N/2)\n    warmer:\n      keep_alive: 5m\n      size: min(5, N/2)\n    refresh:\n      keep_alive: 5m\n      size: min(10, N/2)\n    listener:\n      size: min(10, N/2)\n\n\n\n# ==================================================\n# \u81EA\u52A8\u53D1\u73B0\n# ==================================================\n# \u53C2\u8003\n#   http://elasticsearch.org/guide/en/elasticsearch/reference/current/modules-discovery-zen.html\ndiscovery:\n  zen:\n    # \u8FDB\u884C\u4E3B\u8282\u70B9\u9009\u4E3E\u65F6\u7684\u6700\u5C11\u53C2\u4E0E\u9009\u4E3E\u7684\u8282\u70B9\u6570\n    minimum_master_nodes: 1\n    ping:\n      # \u81EA\u52A8\u53D1\u73B0\u65F6\u7B49\u5F85\u8282\u70B9\u54CD\u5E94\u65F6\u95F4\n      timeout: 3s\n      multicast:\n        # \u662F\u5426\u4F7F\u7528\u5E7F\u64AD\u53D1\u73B0\n        enabled: true\n      unicast:\n        # \u5355\u64AD\u53D1\u73B0\u5176\u4ED6\u8282\u70B9\u7684\u5730\u5740\n        hosts: [\"host1\", \"host2:port\"]\n\n# ==================================================\n# \u6162\u65E5\u5FD7\n# ==================================================\n# \u5206\u7247\u7EA7\u522B\u7684\u67E5\u8BE2\u548C\u83B7\u53D6\u9650\u6D41\u65E5\u5FD7\nindex:\n  search:\n    slowlog:\n      threshold:\n        query:\n          # \u4E3A\u65F6\u95F4\u8FBE\u5230 10s \u7684\u67E5\u8BE2\u8BB0\u5F55 warn \u65E5\u5FD7\n          warn: 10s\n          info: 5s\n          debug: 2s\n          trace: 500ms\n\n        fetch:\n          warn: 1s\n          info: 800ms\n          debug: 500ms\n          trace: 200ms\n\n        index:\n          # \u4E3A\u65F6\u95F4\u8FBE\u5230 10s \u7684\u7D22\u5F15\u8BB0\u5F55 warn \u65E5\u5FD7\n          warn: 10s\n          info: 5s\n          debug: 2s\n          trace: 500ms\n\n# ==================================================\n# GC \u65E5\u5FD7\n# ==================================================\nmonitor:\n  jvm:\n    gc:\n      ParNew:\n        warn: 1000ms\n        info: 700ms\n        debug: 400ms\n\n      ConcurrentMarkSweep:\n        warn: 10s\n        info: 5s\n        debug: 2s\n\n# ==================================================\n# \u811A\u672C\u914D\u7F6E\n# ==================================================\n# \u53C2\u8003\n#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html\nscript.inline: sandbox\nscript.indexed: sandbox\nscript.file: true\nscript.update: false\nscript.mapping: false\nscript.auto_reload_enabled: true\n\nscript.engine.groovy.file.aggs: true\nscript.engine.groovy.file.mapping: true\nscript.engine.groovy.file.search: true\nscript.engine.groovy.file.update: true\nscript.engine.groovy.file.plugin: true\nscript.engine.groovy.indexed.aggs: true\nscript.engine.groovy.indexed.mapping: false\nscript.engine.groovy.indexed.search: true\nscript.engine.groovy.indexed.update: false\nscript.engine.groovy.indexed.plugin: false\nscript.engine.groovy.inline.aggs: true\nscript.engine.groovy.inline.mapping: false\nscript.engine.groovy.inline.search: false\nscript.engine.groovy.inline.update: false\nscript.engine.groovy.inline.plugin: false\n"})}),"\n",(0,r.jsx)(e.h3,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration.html",children:"\u914D\u7F6E\u8BF4\u660E"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://gist.github.com/zsprackett/8546403",children:"\u4E00\u4EFD ES \u914D\u7F6E"})}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return l},a:function(){return a}});var s=t(75271);let r={},i=s.createContext(r);function a(n){let e=s.useContext(i);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:a(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);