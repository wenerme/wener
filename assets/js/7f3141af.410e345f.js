"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91170"],{318:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>d,assets:()=>c,toc:()=>a,frontMatter:()=>t});var i=JSON.parse('{"id":"db/relational/postgresql/README","title":"PostgresSQL","description":"- postgres/postgres","source":"@site/../notes/db/relational/postgresql/README.md","sourceDirName":"db/relational/postgresql","slug":"/db/relational/postgresql/","permalink":"/notes/db/relational/postgresql/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/relational/postgresql/README.md","tags":[{"inline":true,"label":"Topic","permalink":"/notes/tags/topic"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1726657654000,"frontMatter":{"title":"PostgresSQL","tags":["Topic"]},"sidebar":"docs","previous":{"title":"MySQL Version","permalink":"/notes/db/relational/mysql/version"},"next":{"title":"Citus Columnar","permalink":"/notes/db/relational/postgresql/citus-columnar"}}'),l=s("52676"),r=s("79938");let t={title:"PostgresSQL",tags:["Topic"]},o="PostgresSQL",c={},a=[{value:"Notes",id:"notes",level:2},{value:"\u5347\u7EA7",id:"\u5347\u7EA7",level:3},{value:"\u5907\u4EFD",id:"\u5907\u4EFD",level:3},{value:"optimize",id:"optimize",level:3},{value:"Install",id:"install",level:3},{value:"\u6570\u636E\u7C7B\u578B",id:"\u6570\u636E\u7C7B\u578B",level:3},{value:"JSON",id:"json",level:4},{value:"Admin",id:"admin",level:3},{value:"NOTIFY",id:"notify",level:3},{value:"Graph",id:"graph",level:3},{value:"Extension",id:"extension",level:3},{value:"postgres-fdw",id:"postgres-fdw",level:4}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"postgressql",children:"PostgresSQL"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/postgres/postgres",children:"postgres/postgres"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"C"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.enterprisedb.com/blog/postgres-vs-postgresql",children:"Postgres vs. PostgreSQL"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostgreSQL \u4E3A\u4E3B\uFF0CPostgres \u4F5C\u4E3A\u522B\u540D"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/manuals/",children:"Manual"})}),"\n",(0,l.jsxs)(e.li,{children:["Current ",(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/index.html",children:"Document"})]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/dhamaniasad/awesome-postgres",children:"Awesome PostgreSQL"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://www.slideshare.net/quipo/trees-in-the-database-advanced-data-structures/",children:"Trees In The Database"})}),"\n",(0,l.jsx)(e.li,{children:"\u9ED8\u8BA4\u7AEF\u53E3: 5432"}),"\n",(0,l.jsxs)(e.li,{children:["PG \u6240\u5E26\u7684 bin ",(0,l.jsx)(e.a,{href:"https://pkgs.alpinelinux.org/contents?file=&path=*bin*&name=postgresql&branch=edge&repo=main&arch=x86_64",children:"\u5217\u8868"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"pgbench"}),"\n",(0,l.jsx)(e.li,{children:"pg_resetxlog"}),"\n",(0,l.jsx)(e.li,{children:"pg_controldata"}),"\n",(0,l.jsx)(e.li,{children:"pg_test_fsync"}),"\n",(0,l.jsx)(e.li,{children:"pg_upgrade"}),"\n",(0,l.jsx)(e.li,{children:"pg_test_timing"}),"\n",(0,l.jsx)(e.li,{children:"pg_xlogdump"}),"\n",(0,l.jsx)(e.li,{children:"pg_rewind"}),"\n",(0,l.jsx)(e.li,{children:"initdb"}),"\n",(0,l.jsx)(e.li,{children:"pg_ctl"}),"\n",(0,l.jsx)(e.li,{children:"postgres"}),"\n",(0,l.jsx)(e.li,{children:"postmaster"}),"\n",(0,l.jsx)(e.li,{children:"pg_archivecleanup"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5176\u4ED6\u5DE5\u5177\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://pgfoundry.org/projects/pgtune",children:"pgtune"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Tuning wizard for postgresql.conf"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://pgtune.leopard.in.ua/",children:"http://pgtune.leopard.in.ua/"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.pgconfig.org",children:"https://www.pgconfig.org"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://ptop.projects.postgresql.org/",children:"pg_top"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Monitor PostgreSQL processes"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/dalibo/pgbadger/",children:"pgbadger"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u65E5\u5FD7\u5206\u6790"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.pgcli.com/",children:"pgcli"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/dbcli/pgcli",children:"dbcli/pgcli"})}),"\n",(0,l.jsx)(e.li,{children:"\u5E26\u9AD8\u4EAE\u548C\u81EA\u52A8\u8865\u5168\u7684\u547D\u4EE4\u884C"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://pgloader.io",children:"pgloader"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/dimitri/pgloader",children:"dimitri/pgloader"})}),"\n",(0,l.jsx)(e.li,{children:"Migrate to PostgreSQL in a single command"}),"\n",(0,l.jsx)(e.li,{children:"\u652F\u6301 csv,fixed,db3,ixf,sqlite,mysql,mssql"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://sqlformat.darold.net/",children:"pgformatter"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostgreSQL syntax beautifier"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.pgpool.net",children:"pgpool-ii"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Connection Pooling"}),"\n",(0,l.jsx)(e.li,{children:"Replication"}),"\n",(0,l.jsx)(e.li,{children:"Load Balancing"}),"\n",(0,l.jsx)(e.li,{children:"Limiting Exceeding Connections"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://www.pgrouting.org",children:"pgrouting"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Provides geospatial routing for PostGIS/PostgreSQL database"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://pgroonga.github.io/",children:"pgroonga"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/pgroonga/pgroonga",children:"pgroonga/pgroonga"})}),"\n",(0,l.jsx)(e.li,{children:"PostgreSQL extension to use Groonga as the index."}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/wal-e/wal-e",children:"https://github.com/wal-e/wal-e"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/ankane/pgsync",children:"pgsync"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Sync Postgres data between databases"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u8D44\u6E90\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/dhamaniasad/awesome-postgres",children:"dhamaniasad/awesome-postgres"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u6570\u636E\u7ED3\u6784\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Database / Schema / table"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u6570\u636E\u8FC1\u79FB\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL",children:"https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://it.toolbox.com/blogs/josh-berkus/why-postgresql-doesnt-have-query-hints-020411",children:"Why PostgreSQL doesn't have query hints"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=2179433",children:"HN"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://thebuild.com/presentations/uber-perconalive-2017.pdf",children:"A PostgreSQL Response to Uber"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Write Amplification\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostgreSQL must update every index if a change to the row updates an index."}),"\n",(0,l.jsx)(e.li,{children:"PostgreSQL keeps each version of the tuple on disk until it is vacuumed."}),"\n",(0,l.jsx)(e.li,{children:"Each page changed here must be pushed down the binary replication link."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Replication\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostgreSQL does not have logical replication in core. (Coming in 10!)"}),"\n",(0,l.jsx)(e.li,{children:"Existing logical replication tools (Slony, Bucardo, etc.) are somewhat fiddly to set up and manage."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Replica MVCC\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Incoming streaming replication activity can be blocked by queries, or queries can be cancelled."}),"\n",(0,l.jsx)(e.li,{children:"Na\xefve users can be surprised by query cancellation messages."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Upgrade\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostgreSQL does not have in-place major version upgrade."}),"\n",(0,l.jsx)(e.li,{children:"You have to do some kind of process to get low-downtime upgrades."}),"\n",(0,l.jsxs)(e.li,{children:["pg_upgrade, while a big improvement, is not a panacea.\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"PostGIS, for example, is a huge pain."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Buffer Pool\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["PostgreSQL\u2019s shared buffer management performance peaks at 8-32GB.\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"[citation required]"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Larger shared_buffers than that (usually) mean diminishing returns."}),"\n",(0,l.jsx)(e.li,{children:"Retrieving things from file system cache is slower than from shared buffers."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Connection Management\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"The PostgreSQL forking model is not efficient for lots of connections, or fast connection cycling."}),"\n",(0,l.jsx)(e.li,{children:"While basic RAM statistics can be misleading, each backend does consume a notable amount of memory."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://www.craigkerstiens.com/2018/01/31/postgres-hidden-gems/",children:"Postgres Hidden Gems"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Hosted Provider\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.heroku.com/pricing",children:"Heroku"})," \u514D\u8D39 10K \u884C\u6570\u636E"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.elephantsql.com/plans.html",children:"ElephantSQL"})," \u514D\u8D39 20MB 5 \u94FE\u63A5"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Docker \u955C\u50CF\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/supabase/postgres",children:"supabase/postgres"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5305\u542B\u5927\u591A\u63D2\u4EF6"}),"\n",(0,l.jsx)(e.li,{children:"\u7248\u672C\u53F7\u5339\u914D Postgres"}),"\n",(0,l.jsx)(e.li,{children:"\u57FA\u7840\u955C\u50CF\u4E3A postgres"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/supabase/postgres/blob/develop/Dockerfile",children:"Dockerfile"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/zalando/spilo",children:"zalando/spilo"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/PostgREST/postgrest",children:"PostgREST/postgrest"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://hub.docker.com/r/postgrest/postgrest/tags",children:"https://hub.docker.com/r/postgrest/postgrest/tags"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://postgrest.org/en/stable/ecosystem.html",children:"Extensions"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"brew install postgresql\nbrew postgresql-update database\n\n# POSTGRES_USER=postgres\n# POSTGRES_PASSWORD\n# POSTGRES_DB\n# PGDATA=/var/lib/postgresql/data\n# \u53EF\u4EE5\u7528\u4EFB\u610F --user \u542F\u52A8\ndocker run -it --rm -v $PWD/pg:/var/lib/postgresql/data postgres:alpine\n\n# \u8BBE\u7F6E\u6570\u636E\u76EE\u5F55, \u514D\u5F97\u540E\u9762\u518D\u6307\u5B9A\nexport PGDATA=$HOME/data/pg/data\n# \u67E5\u770B\u914D\u7F6E, -W \u53EF\u8981\u6C42\u63D0\u793A\u8F93\u5165\u5BC6\u7801\ninitdb -kU postgres -s\n# \u751F\u6210\u6570\u636E\u5E93\ninitdb -kU postgres\n# \u542F\u52A8\u6570\u636E\u5E93\npg_ctl -D $PGDATA -l $HOME/data/pg/logfile start\npg_ctl -D $PGDATA -l $PGDATA/pg.log start\n# \u67E5\u770B\u8FD0\u884C\u72B6\u6001\npg_ctl -D $PGDATA status\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"-- \u67E5\u770B\u5F53\u524D\u7248\u672C\nselect version();\n\n-- \u5C06\u5B57\u7B26\u4E32\u98CE\u683C\u4E3A\u5B57\u7B26\u6570\u7EC4\nselect regexp_split_to_array('abc','');\n"})}),"\n",(0,l.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,l.jsx)(e.h3,{id:"\u5347\u7EA7",children:"\u5347\u7EA7"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"pg_dumpall -U postgres > dumpfile\n/etc/init.d/postgresql stop\napk add -u postgresql\n/etc/init.d/postgresql setup\n/etc/init.d/postgresql start\npsql -U postgres -f dumpfile\n"})}),"\n",(0,l.jsx)(e.h3,{id:"\u5907\u4EFD",children:"\u5907\u4EFD"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/app-psql.html",children:"https://www.postgresql.org/docs/current/static/app-psql.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://wiki.postgresql.org/wiki/Incremental_backup",children:"https://wiki.postgresql.org/wiki/Incremental_backup"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/continuous-archiving.html",children:"https://www.postgresql.org/docs/current/static/continuous-archiving.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/app-pgdump.html",children:"https://www.postgresql.org/docs/current/static/app-pgdump.html"})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u8F6C\u50A8\u5355\u4E2A\u5E93\npg_dump dbname > outfile\npsql dbname < infile\n\n# -j 8 \u5E76\u53D1\u6570\n# -F d \u76EE\u5F55\u683C\u5F0F, \u5E76\u53D1\u8981\u6C42\u4F7F\u7528\u76EE\u5F55\n# -t \u6307\u5B9A\u8868\n# -O --no-owner\n# -f backup \u6587\u4EF6/\u76EE\u5F55\u540D\npg_dump -F d -f backup -j 8 db -t a -t b -O\n\n# \u4F7F\u7528\u538B\u7F29\npg_dump dbname | gzip > filename.gz\ngunzip -c filename.gz | psql dbname\n\n# \u4F7F\u7528\u81EA\u5B9A\u4E49\u683C\u5F0F, \u5FC5\u987B\u8981\u4F7F\u7528 pg_restore \u6062\u590D\npg_dump -Fc dbname > filename\npg_restore -d dbname filename\n\n# \u8F6C\u50A8\u6240\u6709\npg_dumpall > outfile\npsql -f infile postgres\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"-- \u5BFC\u5165 CSV\n\n-- COPY\n-- https://www.postgresql.org/docs/current/static/sql-copy.html\n-- COPY table_name [ ( column_name [, ...] ) ] FROM { 'filename' | PROGRAM 'command' | STDIN } [ [ WITH ] ( option [, ...] ) ]\n-- COPY { table_name [ ( column_name [, ...] ) ] | ( query ) } TO { 'filename' | PROGRAM 'command' | STDOUT } [ [ WITH ] ( option [, ...] ) ]\n-- \u9700\u8981\u7BA1\u7406\u5458\u6743\u9650\n-- \u652F\u6301 text,binary,csv\n-- Windows users might need to use an E'' string and double any backslashes used in the path name.\n-- \u8981\u6C42\u6587\u4EF6\u5728\u670D\u52A1\u5668\u4E0A\nCOPY phonebook (id,name, phone) FROM '/tmp/phonebook.csv' DELIMITER ',' CSV;\n-- \u5E26\u5934\u5BFC\u51FA\nCOPY phonebook TO '/tmp/data.csv' DELIMITER ',' CSV HEADER;\n\n-- \\copy\n-- https://www.postgresql.org/docs/current/static/app-psql.html#APP-PSQL-META-COMMANDS-COPY\n-- \\copy { table [ ( column_list ) ] | ( query ) } { from | to } { 'filename' | program 'command' | stdin | stdout | pstdin | pstdout } [ [ with ] ( option [, ...] ) ]\n-- \u4ECE\u5BA2\u6237\u7AEF\u8FDB\u884C\u5BFC\u5165\n-- \u53EF\u4EE5\u4F7F\u7528\u76F8\u5BF9\u8DEF\u5F84, \u4F1A\u5148\u5C06\u6587\u4EF6\u4E0A\u4F20\u5230\u670D\u52A1\u5668\n\\copy out_tmp (id,name) from 'out.csv' DELIMITER ',' CSV;\n-- \u5BFC\u51FA\n\\copy my_table to 'filename' csv header\n\\copy (select id,name from out_tmp) to 'exp.csv' DELIMITER ',' CSV;\n-- \u5E26\u5934\n\\copy (select id,name from out_tmp) to 'exp.csv' DELIMITER ',' CSV HEADER;\n\n\n\n"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# \u5BFC\u5165 JSON\n# JSON \u5982\u679C\u5305\u542B\u8F6C\u79FB\u53EF\u80FD\u4F1A\u6709\u95EE\u9898, \u4F8B\u5982\u5305\u542B \\n\ncat data.json | psql -h localhost -p 5432 feeds -c "COPY news_feed (data) FROM STDIN;"\n\n# \u652F\u6301\u5BFC\u5165 CSV \u548C JSON\n# https://github.com/lukasmartinelli/pgfutter\n# create table raw_data(id serial primary key, data jsonb);\npgfutter --host localhost --db db-name --user myuser --schema myschema --table raw_data --jsonb json data.json\n'})}),"\n",(0,l.jsx)(e.h3,{id:"optimize",children:"optimize"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://www.revsys.com/writings/postgresql-performance.html",children:"http://www.revsys.com/writings/postgresql-performance.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://wiki.postgresql.org/wiki/Performance_Optimization",children:"https://wiki.postgresql.org/wiki/Performance_Optimization"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line/",children:"https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line/"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/parallel-query.html",children:"https://www.postgresql.org/docs/current/static/parallel-query.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://confluence.atlassian.com/kb/optimize-and-improve-postgresql-performance-with-vacuum-analyze-and-reindex-885239781.html",children:"Optimize and Improve PostgreSQL Performance with VACUUM, ANALYZE, and REINDEX"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.slideshare.net/PGExperts/really-big-elephants-postgresql-dw-15833438",children:"Really Big Elephants: PostgreSQL DW"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["DW-datawarehouse\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"BI/DW"}),"\n",(0,l.jsx)(e.li,{children:"\u5206\u6790\u6570\u636E\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"OLAP"}),"\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u6316\u6398"}),"\n",(0,l.jsx)(e.li,{children:"\u51B3\u7B56\u652F\u6301"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["JOIN \u4F18\u5316\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"5 JOIN \u7C7B\u578B"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u8FDB\u884C 20+ \u7684\u8868 JOIN"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5728\u4EFB\u4F55\u8BED\u53E5\u4E2D\u90FD\u53EF\u6267\u884C\u5B50\u67E5\u8BE2\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5D4C\u5957\u5B50\u67E5\u8BE2"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"Window \u67E5\u8BE2"}),"\n",(0,l.jsx)(e.li,{children:"\u9012\u5F52\u67E5\u8BE2"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["PG \u7684 MVCC \u5B9E\u73B0\u4F7F\u5F97\u66F4\u65B0\u64CD\u4F5C\u975E\u5E38\u6602\u8D35. \u5982\u679C\u9700\u8981\u66F4\u65B0\u8868\u91CC\u7684\u6BCF\u4E00\u884C, \u90A3\u6BCF\u4E00\u884C\u90FD\u4F1A\u62F7\u8D1D\u4E3A\u4E00\u4E2A\u65B0\u7684\u7248\u672C, \u65E7\u7684\u7248\u672C\u4F1A\u6807\u8BB0\u4E3A\u5DF2\u5220\u9664.\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u56E0\u6B64\u4E00\u822C\u6765\u8BF4\u91CD\u5199\u6574\u4E2A\u8868\u4F1A\u6BD4\u66F4\u65B0\u6765\u7684\u66F4\u5FEB"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"DROP COLUMN"})," \u4E0D\u4F1A\u505A\u7269\u7406\u5220\u9664, \u800C\u662F\u5C06\u5217\u6807\u8BB0\u4E3A\u4E0D\u53EF\u89C1, \u56E0\u6B64\u64CD\u4F5C\u4F1A\u975E\u5E38\u5FEB"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"-- \u8FD9\u4E2A\u64CD\u4F5C\u4F1A\u975E\u5E38\u6162\nupdate a set name = b.name from b where a.id = b.id;\n-- \u8FD9\u4E2A\u64CD\u4F5C\u4F1A\u6BD4\u6574\u4E2A\u66F4\u65B0\u5FEB\ncreate table c as (select a.age, b.name from a left join b on a.id = b.id);\n\n-- \u6240\u4EE5\u6574\u8868\u66F4\u65B0\u5EFA\u8BAE\nbegin;\ncreate table T as select col1, col2, colN from orders;\ndrop table orders;\nalter table T rename to orders;\ncommit;\n\n-- \u7F6E\u7A7A\u4E00\u5217\n-- \u6570\u636E\u5927\u4E86\u540E\u8BE5\u64CD\u4F5C\u975E\u5E38\u6162\nUPDATE orders SET status = null;\n-- \u56E0\u6B64\u53EF\u4EE5\u8003\u8651\u8FD9\u6837\nALTER TABLE orders DROP column status\n                 , ADD  column status text;\n\n\n"})}),"\n",(0,l.jsx)(e.h3,{id:"install",children:"Install"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/postgresql",children:"https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/postgresql"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://pkgs.alpinelinux.org/package/edge/testing/x86_64/postgis",children:"https://pkgs.alpinelinux.org/package/edge/testing/x86_64/postgis"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://hub.docker.com/_/postgres/",children:"https://hub.docker.com/_/postgres/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/docker-library/postgres",children:"https://github.com/docker-library/postgres"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"\u6570\u636E\u7C7B\u578B",children:"\u6570\u636E\u7C7B\u578B"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/10/static/datatype.html",children:"https://www.postgresql.org/docs/10/static/datatype.html"})}),"\n",(0,l.jsxs)(e.li,{children:["\u6570\u7EC4\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u53EF\u4EE5\u4F7F\u7528 GIN \u7D22\u5F15\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/indexes-types.html",children:"https://www.postgresql.org/docs/current/static/indexes-types.html"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u64CD\u4F5C\u9700\u8981\u4F7F\u7528\u6570\u7EC4\u64CD\u4F5C\u7B26"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h4,{id:"json",children:"JSON"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u652F\u6301 hstore, json \u548C jsonb \u7C7B\u578B\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5927\u90E8\u5206\u65F6\u5019\u9009\u62E9 JSONB"}),"\n",(0,l.jsx)(e.li,{children:"\u5982\u679C\u53EA\u5199\u5165\u6216\u8005\u8981\u6C42\u5FEB\u901F\u5199\u5165, \u5F88\u5C11\u67E5\u8BE2\u53EF\u4EE5\u9009\u62E9 JSON"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/datatype-json.html",children:"https://www.postgresql.org/docs/current/static/datatype-json.html"})}),"\n",(0,l.jsx)(e.li,{children:"json \u6587\u672C, \u64CD\u4F5C\u66F4\u8017\u65F6, \u6BCF\u6B21\u9700\u8981\u89E3\u6790, \u4F1A\u4FDD\u5B58\u91CD\u590D\u952E\u503C, \u4EE5\u6700\u540E\u4E00\u6B21\u4E3A\u51C6"}),"\n",(0,l.jsx)(e.li,{children:"josnb \u4E8C\u8FDB\u5236, \u4E00\u822C\u78C1\u76D8\u7A7A\u95F4\u66F4\u5927, \u5199\u5165\u66F4\u8017\u65F6, \u652F\u6301\u7D22\u5F15"}),"\n",(0,l.jsxs)(e.li,{children:["\u64CD\u4F5C\u7B26\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"->"})," \u53D6\u5B57\u6BB5, \u53EF\u4EE5\u662F\u6570\u7EC4\u7D22\u5F15"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"->>"})," \u8FD4\u56DE\u7684\u503C\u59CB\u7EC8\u4E3A text, \u4E0D\u4F1A\u6709\u5F15\u53F7"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"#>"})," \u6307\u5B9A\u591A\u4E2A\u8DEF\u5F84, \u83B7\u53D6\u4E3A text\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"SELECT '{\"a\":[1,2,3],\"b\":[4,5,6]}'::json#>>'{a,2}';"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"@>"})," jsonb, \u68C0\u6D4B\u5DE6\u4FA7\u662F\u5426\u5305\u542B\u53F3\u4FA7"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"<@"})," jsonb, \u68C0\u6D4B\u53F3\u4FA7\u662F\u5426\u5305\u542B\u5DE6\u4FA7"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"?"})," jsonb, \u68C0\u6D4B\u662F\u5426\u5305\u542B key \u6216\u6570\u7EC4\u5143\u7D20\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"SELECT '{\"a\":1, \"b\":2}'::jsonb ? 'b';"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"?|"})," jsonb, \u68C0\u6D4B\u662F\u5426\u5305\u542B\u67D0\u4E2A key\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"SELECT '{\"a\":1, \"b\":2, \"c\":3}'::jsonb ?| array['b', 'ceeee', 'e'];"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"?&"})," jsonb, \u662F\u5426\u5305\u542B\u6240\u6709 key"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"||"})," jsonb, \u62FC\u63A5\u4E24\u4E2A jsonb"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"-"})," \u5220\u9664 kv \u6216\u6570\u7EC4\u5143\u7D20\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"SELECT '{\"a\": \"b\"}'::jsonb - 'a';"})," ",(0,l.jsx)(e.code,{children:"SELECT '[\"a\", \"b\"]'::jsonb - 'a';"})]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:'SELECT \'["a", "b"]\'::jsonb - (-1);'})," ",(0,l.jsx)(e.code,{children:'SELECT \'["a", "b"]\'::jsonb - (1);'})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"#-"})," \u5220\u9664\u8DEF\u5F84"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["FAQ\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://dba.stackexchange.com/questions/54283/how-to-turn-json-array-into-postgres-array",children:"https://dba.stackexchange.com/questions/54283/how-to-turn-json-array-into-postgres-array"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"SELECT '5'::json;\nSELECT '[1, 2, \"foo\", null]'::json;\nSELECT '{\"bar\": \"baz\", \"balance\": 7.77, \"active\": false}'::json;\n\n-- \u68C0\u6D4B\u662F\u5426\u5305\u542B\nSELECT '\"foo\"'::jsonb @> '\"foo\"'::jsonb;\nSELECT '[1, 2, 3]'::jsonb @> '[3, 1]'::jsonb;\n-- \u6307\u5B9A\u4E00\u4E2A\u5B57\u6BB5\nSELECT data->'field' FROM doc;\n\n-- \u521B\u5EFA\u7D22\u5F15\nCREATE INDEX idxgin ON api USING GIN (jdoc);\nCREATE INDEX idxginp ON api USING GIN (jdoc jsonb_path_ops);\n\n-- \u5C06\u6570\u7EC4\u4F5C\u4E3A\u884C\nSELECT\n  s ->> 'name'\nFROM tab t, jsonb_array_elements(t.family -> 'children') s;\n"})}),"\n",(0,l.jsx)(e.h3,{id:"admin",children:"Admin"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:'-- \u76F8\u5F53\u4E8E\u7ED9\u5176\u4ED6\u4EBA root \u6743\u9650\ngrant postgres to someone;\n\n\nGRANT ALL PRIVILEGES ON DATABASE "my_db" to my_user;\nGRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;\n\n-- What GRANT USAGE ON SCHEMA exactly do? https://stackoverflow.com/q/17338621/1870054\n\n--ACCESS DB\nREVOKE CONNECT ON DATABASE nova FROM PUBLIC;\nGRANT  CONNECT ON DATABASE nova  TO user;\n\n--ACCESS SCHEMA\nREVOKE ALL     ON SCHEMA public FROM PUBLIC;\nGRANT  USAGE   ON SCHEMA public  TO user;\n\n--ACCESS TABLES\ngrant usage , select on all sequences in schema s to u;\n\nREVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC ;\nGRANT SELECT                         ON ALL TABLES IN SCHEMA public TO read_only ;\nGRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO read_write ;\nGRANT ALL                            ON ALL TABLES IN SCHEMA public TO admin ;\n'})}),"\n",(0,l.jsx)(e.h3,{id:"notify",children:"NOTIFY"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"LISTEN virtual;\nNOTIFY virtual;\nNOTIFY virtual, 'This is the payload';\n\n\nLISTEN foo;\nSELECT pg_notify('fo' || 'o', 'pay' || 'load');\n\n-- NOTIFY on insert\n-- Send Notify Procedure\nCREATE OR REPLACE FUNCTION my_tab()\n  RETURNS TRIGGER AS $$\nDECLARE\nBEGIN\n  PERFORM pg_notify('my_tab_insert_notify', new.id::TEXT);\n  RETURN new;\nEND;\n$$ LANGUAGE plpgsql;\n-- Trigger\nCREATE TRIGGER my_tab_after_insert\nAFTER INSERT ON my_tab\nFOR EACH ROW EXECUTE PROCEDURE my_tab_notify_insert();\n"})}),"\n",(0,l.jsx)(e.h3,{id:"graph",children:"Graph"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/queries-with.html",children:"https://www.postgresql.org/docs/current/static/queries-with.html"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.slideshare.net/JoshuaBae/pg-conf-implementing-graph-database-basedon-postgresql",children:"Pg Conf - Implementing Graph Database based-on PostgreSQL"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://static.googleusercontent.com/media/research.google.com/zh-CN//pubs/archive/43287.pdf",children:"SQLGraph: An Efficient Relational-Based Property Graph Store"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/pietermartin/sqlg",children:"https://github.com/pietermartin/sqlg"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/cayleygraph/cayley/pull/289",children:"https://github.com/cayleygraph/cayley/pull/289"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"graph: Postgres backend"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://bitnine.net/agensgraph/",children:"http://bitnine.net/agensgraph/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u57FA\u4E8E PG"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.slideshare.net/quipo/rdbms-in-the-social-networks-age",children:"Graphs in the Database: Rdbms In The Social Networks Age"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.slideshare.net/quipo/trees-in-the-database-advanced-data-structures",children:"Trees In The Database - Advanced data structures"})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{})}),"\n",(0,l.jsx)(e.h3,{id:"extension",children:"Extension"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.a,{href:"https://pgxn.org/",children:"https://pgxn.org/"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/contrib.html",children:"Additional Supplied Modules"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u81EA\u5E26\u7684\u6269\u5C55"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"FDW"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.postgresql.org/docs/current/static/postgres-fdw.html",children:"https://www.postgresql.org/docs/current/static/postgres-fdw.html"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://multicorn.org/",children:"http://multicorn.org/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Multicorn is a PostgreSQL 9.1+ extension meant to make Foreign Data Wrapper development easy, by allowing the programmer to use the Python programming language."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-sql",children:"--  \u67E5\u770B\u5B89\u88C5\u7684\n\\dX;\nselect * from pg_extension;\n\n-- \u67E5\u770B\u6240\u6709\u7684\nSELECT * FROM pg_available_extensions;\n\n-- \u67E5\u770B\u6240\u6709\u7684\nCREATE EXTENSION IF NOT EXISTS file_fdw;\n"})}),"\n",(0,l.jsx)(e.h4,{id:"postgres-fdw",children:"postgres-fdw"}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.a,{href:"https://wiki.postgresql.org/wiki/Autonomous_subtransactions",children:"https://wiki.postgresql.org/wiki/Autonomous_subtransactions"})})]})}function d(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return o},a:function(){return t}});var i=s(75271);let l={},r=i.createContext(l);function t(n){let e=i.useContext(r);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);