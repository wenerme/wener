"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["26911"],{74184:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>i,default:()=>j,assets:()=>c,toc:()=>x,frontMatter:()=>l});var s=JSON.parse('{"id":"service/storage/juicefs/juicefs-conf","title":"JuiceFS Configuration","description":"- \u53C2\u8003","source":"@site/../notes/service/storage/juicefs/juicefs-conf.md","sourceDirName":"service/storage/juicefs","slug":"/service/storage/juicefs/conf","permalink":"/notes/service/storage/juicefs/conf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/storage/juicefs/juicefs-conf.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1713894098000,"frontMatter":{"tags":["Configuration"]},"sidebar":"docs","previous":{"title":"juicefs","permalink":"/notes/service/storage/juicefs/"},"next":{"title":"JuiceFS FAQ","permalink":"/notes/service/storage/juicefs/faq"}}'),d=t("52676"),r=t("79938");let l={tags:["Configuration"]},i="JuiceFS Configuration",c={},x=[{value:"Flags",id:"flags",level:2},{value:"Metadata",id:"metadata",level:2},{value:"Storage",id:"storage",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.header,{children:(0,d.jsx)(e.h1,{id:"juicefs-configuration",children:"JuiceFS Configuration"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.a,{href:"https://github.com/juicedata/juicefs/blob/main/pkg/sync/config.go",children:"https://github.com/juicedata/juicefs/blob/main/pkg/sync/config.go"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"\u73AF\u5883\u53D8\u91CF\u5217\u8868"}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://juicefs.com/docs/community/reference/how_to_set_up_object_storage",children:"https://juicefs.com/docs/community/reference/how_to_set_up_object_storage"})}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://juicefs.com/docs/community/databases_for_metadata",children:"https://juicefs.com/docs/community/databases_for_metadata"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.h2,{id:"flags",children:"Flags"}),"\n",(0,d.jsx)(e.admonition,{type:"caution",children:(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"macOS \u9700\u8981 macFUSE - \u5B89\u88C5\u4F1A\u6709\u70B9\u9EBB\u70E6"}),"\n"]})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"flag"}),(0,d.jsx)(e.th,{children:"env"}),(0,d.jsx)(e.th,{children:"for"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--access-key value"}),(0,d.jsx)(e.td,{children:"ACCESS_KEY"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--secret-key value"}),(0,d.jsx)(e.td,{children:"SECRET_KEY"}),(0,d.jsx)(e.td,{})]})]})]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"flag"}),(0,d.jsx)(e.th,{children:"for"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"FUSE"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--enable-xattr"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--enable-ioctl"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--root-squash UID:GID"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--prefix-internal"}),(0,d.jsx)(e.td,{children:".jfs"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"-o allow_other"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"Metadata"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--subdir=PATH"}),(0,d.jsx)(e.td,{children:"\u6302\u8F7D\u5B50\u76EE\u5F55"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--backup-meta=3600"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--backup-skip-trash"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--heartbeat=12"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--read-only"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--no-bgjob"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--atime-mode=noatime"}),(0,d.jsx)(e.td,{children:"noatime,relatime,strictatime"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--skip-dir-nlink=20"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"Metadata cache"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--attr-cache=1"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--entry-cache=1"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--dir-entry-cache=1"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--open-cache=0"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--open-cache-limit=10000"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"Data storage"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--storage=file"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--storage-class VALUE"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--bucket=VALUE"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--get-timeout=60"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--put-timeout=60"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--io-retries=10"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--max-uploads=20"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--max-deletes=10"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--upload-limit=0"}),(0,d.jsx)(e.td,{children:"BW in MiB/s"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--download-limit=0"}),(0,d.jsx)(e.td,{children:"BW in MiB/s"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"Data cache"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--buffer-size=300"}),(0,d.jsx)(e.td,{children:"read/write in MiB"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--writeback"}),(0,d.jsx)(e.td,{children:"\u5F02\u6B65\u4E0A\u4F20"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--prefetch=1"}),(0,d.jsx)(e.td,{children:"\u9884\u8BFB"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--upload-delay=0"}),(0,d.jsx)(e.td,{children:"\u5728\u4E0A\u4F20\u524D\u672C\u5730\u5220\u9664\u4E86\u5219\u4E0D\u4E0A\u4F20"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-dir=$HOME/.juicefs/cache"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-mode=0600"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-size=102400"}),(0,d.jsx)(e.td,{children:"MiB"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--free-space-ratio=0.1"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-partial-only"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--verify-cache-checksum VALUE"}),(0,d.jsx)(e.td,{children:"none,full,shrink,extend"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-eviction=2-random"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cache-scan-interval=3600"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"Metrics"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--metrics=127.0.0.1:9567"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--custom-labels key:val"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--consul=127.0.0.1:8500"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--no-usage-report"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"gateway"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--no-banner"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--multi-buckets"}),(0,d.jsx)(e.td,{children:"\u5C06\u9876\u7EA7\u76EE\u5F55\u4F5C\u4E3A bucket"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--keep-etag"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--umask=022"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--domain value"}),(0,d.jsx)(e.td,{children:"virtual-host-style"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:(0,d.jsx)(e.strong,{children:"webdav"})}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--cert-file"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--key-file"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--gzip"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--disallowList"}),(0,d.jsx)(e.td,{children:"\u7981\u6B62\u76EE\u5F55"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--log PATH"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--access-log=path"}),(0,d.jsx)(e.td,{})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"--background, -d"}),(0,d.jsx)(e.td,{})]})]})]}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://juicefs.com/docs/community/command_reference/",children:"https://juicefs.com/docs/community/command_reference/"})}),"\n",(0,d.jsxs)(e.li,{children:[(0,d.jsx)(e.code,{children:"juicefs gateway $META_URL ADDRESS"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"MINIO_ROOT_USER"}),"\n",(0,d.jsx)(e.li,{children:"MINIO_ROOT_PASSWORD"}),"\n",(0,d.jsx)(e.li,{children:"\u57FA\u4E8E minio gateway"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"# fuse\njuicefs mount -o allow_other,writeback_cache sqlite3://myjfs.db ~/jfs --no-usage-report\n\nexport WEBDAV_USER=root\nexport WEBDAV_PASSWORD=1234\njuicefs webda --gzip $JUICEFS_META_URL localhost:9007 --no-usage-report\n"})}),"\n",(0,d.jsx)(e.h2,{id:"metadata",children:"Metadata"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:["Redis\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"300b \u4E00\u4E2A\u6587\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(e.li,{children:["META_PASSWORD\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"\u6570\u636E\u5E93\u5BC6\u7801"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"juicefs format \\\n  --storage sqlite3 \\\n  --bucket data.db \\\n  sqlite3://meta.db jfs\n\n# \u4E0D\u652F\u6301 fsck, gc\n# \u4E0D\u80FD\u591A\u8FDB\u7A0B\u6302\u8F7D\njuicefs format \\\n  --storage sqlite3 \\\n  --bucket data.db \\\n  badger://$PWD/meta jfs\n"})}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"REDIS_PASSWORD"}),"\n",(0,d.jsx)(e.li,{children:"META_PASSWORD"}),"\n",(0,d.jsxs)(e.li,{children:["redis\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"maxmemory-policy noeviction"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"redis[s]://[<username>:<password>@]<host>[:<port>]/<db>\nunix://[<username>:<password>@]<socket-file-path>?db=<db>\n\npostgres://[username][:<password>]@<host>[:5432]/<database-name>[?parameters]\npostgres://[username][:<password>]@/<database-name>?host=<socket-directories-path>[&parameters]\n\nmysql://<username>[:<password>]@(<host>:3306)/<database-name>\nmysql://<username>[:<password>]@unix(<socket-file-path>)/<database-name>\n\nsqlite3://my-jfs.db?cache=shared&_busy_timeout=5000\n\nbadger://$HOME/badger-data myjfs\n\ntikv://<pd_addr>[,<pd_addr>...]/<prefix>\n\netcd://[user:password@]<addr>[,<addr>...]/<prefix>\n\nfdb://[config file address]?prefix=<prefix>\n"})}),"\n",(0,d.jsx)(e.h2,{id:"storage",children:"Storage"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{style:{textAlign:"right"},children:"storage"}),(0,d.jsx)(e.th,{style:{textAlign:"left"},children:"service"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Amazon S3"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"gs"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Google Cloud Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"wasb"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Azure Blob Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"b2"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Backblaze B2"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"ibmcos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"IBM Cloud Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Oracle Cloud Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"scw"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Scaleway Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"space"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"DigitalOcean Spaces"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"wasabi"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Wasabi"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Storj DCS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Vultr Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Cloudflare R2"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"oss"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Alibaba Cloud OSS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"cos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Tencent Cloud COS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"obs"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Huawei Cloud OBS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"bos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Baidu Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"tos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Volcano Engine TOS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"ks3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Kingsoft Cloud KS3"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"qingstor"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"QingStor"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"qiniu"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Qiniu"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"scs"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Sina Cloud Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"oos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"CTYun OOS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"eos"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"ECloud Object Storage"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"JD Cloud OSS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"ufile"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"UCloud US3"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"ceph"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Ceph RADOS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Ceph RGW"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"gluster"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Gluster"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"swift"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Swift"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"minio"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"MinIO"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"webdav"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"WebDAV"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"hdfs"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"HDFS"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"s3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Apache Ozone"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"redis"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Redis"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"tikv"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"TiKV"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"etcd"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"etcd"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"sqlite3"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"SQLite"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"mysql"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"MySQL"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"postgres"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"PostgreSQL"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"file"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"Local disk"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{style:{textAlign:"right"},children:(0,d.jsx)(e.code,{children:"sftp"})}),(0,d.jsx)(e.td,{style:{textAlign:"left"},children:"SFTP/SSH"})]})]})]})]})}function j(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,d.jsx)(e,{...n,children:(0,d.jsx)(h,{...n})}):h(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return l}});var s=t(75271);let d={},r=s.createContext(d);function l(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:l(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);