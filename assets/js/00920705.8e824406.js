"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["87730"],{4389:function(n,e,s){s.r(e),s.d(e,{metadata:()=>l,contentTitle:()=>d,default:()=>x,assets:()=>c,toc:()=>a,frontMatter:()=>t});var l=JSON.parse('{"id":"service/forge/gitlab/gitlab-ci-yml","title":"gitlab-ci.yml","description":"- Gitlab CI YAML","source":"@site/../notes/service/forge/gitlab/gitlab-ci-yml.md","sourceDirName":"service/forge/gitlab","slug":"/service/forge/gitlab/ci-yml","permalink":"/notes/service/forge/gitlab/ci-yml","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/gitlab/gitlab-ci-yml.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1652772118000,"frontMatter":{"title":"gitlab-ci.yml"},"sidebar":"docs","previous":{"title":"Gitlab CI \u6280\u5DE7","permalink":"/notes/service/forge/gitlab/ci-cookbook"},"next":{"title":"GitaLab\u6301\u7EED\u96C6\u6210\u6301\u7EED\u4EA4\u4ED8","permalink":"/notes/service/forge/gitlab/cicd"}}'),r=s("52676"),i=s("79938");let t={title:"gitlab-ci.yml"},d="gitlab-ci.yml",c={},a=[{value:"\u73AF\u5883\u53D8\u91CF",id:"\u73AF\u5883\u53D8\u91CF",level:2},{value:"job/except",id:"jobexcept",level:2},{value:"job",id:"job",level:2},{value:"cache",id:"cache",level:2},{value:"workflow",id:"workflow",level:2},{value:"release",id:"release",level:2},{value:"\u90E8\u7F72 pages",id:"\u90E8\u7F72-pages",level:2},{value:"\u6709 Tag \u7684\u65F6\u5019\u624D\u6267\u884C",id:"\u6709-tag-\u7684\u65F6\u5019\u624D\u6267\u884C",level:2},{value:"\u9ED8\u8BA4\u5206\u652F",id:"\u9ED8\u8BA4\u5206\u652F",level:2}];function h(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"gitlab-ciyml",children:"gitlab-ci.yml"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["Gitlab CI ",(0,r.jsx)(e.a,{href:"https://docs.gitlab.com/ce/ci/yaml/index.html",children:"YAML"})]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://gitlab.com/gitlab-org/gitlab/tree/master/lib/gitlab/ci/templates",children:"\u6A21\u677F"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://docs.gitlab.com/ee/ci/examples/",children:"\u793A\u4F8B"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://docs.gitlab.com/ce/ci/variables/README.html",children:"\u53D8\u91CF\u8BF4\u660E"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://docs.gitlab.com/ee/ci/variables/predefined_variables.html",children:"\u9884\u5B9A\u4E49\u7684\u53D8\u91CF"})}),"\n"]}),"\n",(0,r.jsx)(e.admonition,{type:"tip",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F7F\u7528 extends \u590D\u7528\u73B0\u6709\u903B\u8F91"}),"\n",(0,r.jsxs)(e.li,{children:["\u4F7F\u7528 ",(0,r.jsx)(e.code,{children:"!reference [.setup, before_script]"})," \u590D\u7528\u90E8\u5206\u903B\u8F91 - \u4F8B\u5982\u5408\u5E76\u591A\u4E2A before_script"]}),"\n",(0,r.jsx)(e.li,{children:"\u53EF\u4EE5\u4F7F\u7528 YAML \u5F15\u7528\u903B\u8F91"}),"\n"]})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"# \u81EA\u5B9A\u4E49\u9ED8\u8BA4\u914D\u7F6E\ndefault:\n  # \u57FA\u7840\u955C\u50CF\n  image: wener/node:docker\n  cache:\n    # \u7F13\u5B58\u4ED3\u5E93\u91CC\u6240\u6709 untracked \u6587\u4EF6\n    untracked: true\n    # \u7F13\u5B58\u6309\u5206\u652F\u5212\u5206 - \u5982\u679C\u6709 tag \u8FD9\u4E2A\u4F1A\u662F tag \u540D\u5B57\n    key: '$CI_COMMIT_REF_NAME'\n    # \u5E38\u89C1\u7684\u7F13\u5B58\u76EE\u5F55\n    paths:\n      - node_modules/\n      - .yarn/\n      - .cache/\n      - .next/\n      - packages/server/.next/cache/\n"})}),"\n",(0,r.jsx)(e.h2,{id:"\u73AF\u5883\u53D8\u91CF",children:"\u73AF\u5883\u53D8\u91CF"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"env"}),(0,r.jsx)(e.th,{children:"e.g"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"\u8868\u793A\u5728\u8FD0\u884C CI"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"GITLAB_CI"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_REGISTRY"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"gitlab registry"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_REGISTRY_USER"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"gitlab registry user"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_REGISTRY_PASSWORD"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"gitlab registry password"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_REGISTRY_IMAGE"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"\u9879\u76EE\u5BB9\u5668\u955C\u50CF"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_DEFAULT_BRANCH"}),(0,r.jsx)(e.td,{children:"main"}),(0,r.jsx)(e.td,{children:"\u9ED8\u8BA4 branch \u540D\u5B57"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_REF_NAME"}),(0,r.jsx)(e.td,{children:"main"}),(0,r.jsx)(e.td,{children:"branch or tag"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_REF_SLUG"}),(0,r.jsx)(e.td,{children:"main"}),(0,r.jsxs)(e.td,{children:["CI_COMMIT_REF_NAME \u7528\u4E8E url \u6216\u540D\u5B57\u65F6,63 \u4F4D,\u66FF\u4EE3",(0,r.jsx)(e.code,{children:"[^0-9a-z]"})," \u4E3A ",(0,r.jsx)(e.code,{children:"-"})]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_REF_PROTECTED"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"\u4FDD\u62A4\u5206\u652F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_BRANCH"}),(0,r.jsx)(e.td,{children:"main"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_SHA"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_SHORT_SHA"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_TAG"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_TIMESTAMP"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"ISO 8601"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_COMMIT_TITLE"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"\u7B2C\u4E00\u884C commit \u4FE1\u606F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_ENVIRONMENT_NAME"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_ENVIRONMENT_SLUG"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_ENVIRONMENT_URL"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_ENVIRONMENT_ACTION"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"start, prepare, stop"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_ENVIRONMENT_TIER"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"production,staging,testing,development,other"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_KUBERNETES_ACTIVE"}),(0,r.jsx)(e.td,{children:"true"}),(0,r.jsx)(e.td,{children:"\u5173\u8054\u4E86 k8s \u90E8\u7F72\u96C6\u7FA4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_ID"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_NAME"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_NAMESPACE"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"\u7528\u6237\u540D \u6216 \u7EC4\u540D"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_ROOT_NAMESPACE"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_PATH_SLUG"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"CI_PROJECT_PATH"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY\n# \u5E38\u7528 $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG\ndocker build --pull -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG" ./build\ndocker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG"\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://docs.gitlab.com/ee/ci/variables/predefined_variables.html",children:"Predefined variables reference"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"jobexcept",children:"job:only/except"}),"\n",(0,r.jsx)(e.admonition,{type:"caution",children:(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5F00\u53D1\u4E0D\u6D3B\u8DC3\uFF0C\u63A8\u8350\uFF0C\u4F7F\u7528 rules"}),"\n"]})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:'build:\n  script: npm run build\n  only:\n    # \u7B80\u5355\u914D\u7F6E - refs\n    # \u5B8C\u6574\u5339\u914D - master \u5206\u652F\u8FD0\u884C\n    - master\n    # \u652F\u6301\u6B63\u5219 \u5339\u914D tag \u6216 branch - \u5982\u679C \u6392\u9664\u4E86 branches \u5219\u662F\u5339\u914D tag\n    - /^issue-.*$/i\n\n    # \u9AD8\u7EA7\u914D\u7F6E\n    # \u4E0D\u6307\u5B9A\u9ED8\u8BA4\u5219\u662F refs \u5339\u914D\n    refs:\n      - master\n      - schedules\n    # \u53D8\u91CF\u5339\u914D\n    variables:\n      - $CI_COMMIT_MESSAGE =~ /run-end-to-end-tests/ # \u5339\u914D\u53D8\u91CF\n      - $RELEASE == "staging" # \u53D8\u91CF\u6EE1\u8DB3\n      - $STAGING # \u6709\u53D8\u91CF\n      # \u590D\u6742\u6761\u4EF6\u53D8\u91CF\n      - ($CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "develop") && $MY_VARIABLE\n    # \u5339\u914D\u53D8\u5316\u6587\u4EF6\n    # \u53EA\u6709\u5728 branches external_pull_requests merge_requests \u6709\u6548\n    changes:\n      - README.md\n      - "*.md" # \u4F8B\u5982 \u4ECE\u65B0\u751F\u6210\u6587\u6863\n      - base/Dockerfile # \u4F8B\u5982 \u91CD\u6784\u57FA\u7840\u955C\u50CF\n      - "**/*.sql" # \u4F8B\u5982 \u6570\u636E\u5E93\u8FC1\u79FB\n    # \u8981\u6C42\u5F00\u542F\u4E86 k8s \u670D\u52A1\n    kubernetes: active\n  except:\n    # \u652F\u6301\u4F7F\u7528\u5173\u952E\u8BCD - \u5206\u652F\u4E0D\u89E6\u53D1\n    - branches\n    # \u53EF\u5305\u542B\u4ED3\u5E93\u4FE1\u606F\u5339\u914D - \u7528\u4E8E fork \u573A\u666F\n    - /^release/.*$/@gitlab-org/gitlab\n'})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"value"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"api"}),(0,r.jsx)(e.td,{children:"Pipline API \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"branches"}),(0,r.jsx)(e.td,{children:"ref \u662F\u5206\u652F"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"chat"}),(0,r.jsx)(e.td,{children:"ChatOps \u521B\u5EFA\u7684 Pipeline"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"external"}),(0,r.jsx)(e.td,{children:"\u5916\u90E8 CI \u670D\u52A1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"external_pull_requests"}),(0,r.jsx)(e.td,{children:"\u5916\u90E8\u4ED3\u5E93 PR\uFF0C\u4F8B\u5982 Github"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"merge_requests"}),(0,r.jsx)(e.td,{children:"\u4ED3\u5E93\u6536\u5230 pr"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"pipelines"}),(0,r.jsx)(e.td,{children:"\u6D41\u6C34\u7EBF\u4E2D\u521B\u5EFA\u7684\u591A\u9879\u76EE pipeline"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"pushes"}),(0,r.jsx)(e.td,{children:"git push \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"schedules"}),(0,r.jsx)(e.td,{children:"\u8C03\u5EA6\u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"tags"}),(0,r.jsx)(e.td,{children:"ref \u662F tag"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"triggers"}),(0,r.jsx)(e.td,{children:"trigger token \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"web"}),(0,r.jsx)(e.td,{children:"Web \u89E6\u53D1/\u8FD0\u884C\u6D41\u6C34\u7EBF"})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"job",children:"job:rules"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9650\u5B9A job \u662F\u5426\u8FD0\u884C"}),"\n",(0,r.jsxs)(e.li,{children:["\u57FA\u7840\u8BED\u53E5\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["if\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7C7B\u4F3C only:variables \u914D\u7F6E"}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"&&"}),", ",(0,r.jsx)(e.code,{children:"||"}),", ",(0,r.jsx)(e.code,{children:"=="}),", ",(0,r.jsx)(e.code,{children:"!="}),", ",(0,r.jsx)(e.code,{children:"=~"}),", ",(0,r.jsx)(e.code,{children:"!~"})]}),"\n",(0,r.jsx)(e.li,{children:"CI_PIPELINE_SOURCE \u7528\u4E8E\u652F\u6301\u7C7B\u4F3C rules \u7684\u5173\u952E\u5B57"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["changes\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7C7B\u4F3C only:changes \u914D\u7F6E"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["exists\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5305\u542B\u6307\u5B9A\u6587\u4EF6"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u8BED\u53E5\u5C5E\u6027\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["when - \u9650\u5B9A\u8FD0\u884C\u6761\u4EF6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"on_success, delayed, always"}),"\n",(0,r.jsx)(e.li,{children:"never - \u4E0D\u89E6\u53D1 - \u7B49\u540C\u4E8E rules:except"}),"\n",(0,r.jsx)(e.li,{children:"manual - \u624B\u52A8\u89E6\u53D1\u65F6"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"allow_failure - \u662F\u5426\u5141\u8BB8\u8FD0\u884C\u9519\u8BEF"}),"\n",(0,r.jsx)(e.li,{children:"changes \u6587\u4EF6\u53D8\u5316"}),"\n",(0,r.jsx)(e.li,{children:"variables \u5B9A\u4E49\u989D\u5916\u53D8\u91CF"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"build:\n  script: npm run build\n  rules:\n    - if: '$CI_COMMIT_BRANCH == \"master\"'\n      when: delayed\n      start_in: '3 hours'\n      allow_failure: true\n    # \u8981\u6C42\u6709\u53D8\u5316\u6587\u4EF6\n    - if: '$CI_PIPELINE_SOURCE == \"merge_request_event\"'\n      changes:\n        - Dockerfile\n      when: manual\n      allow_failure: true\nbuild:\n  script: npm run build\n  rules:\n    # \u524D\u4E24\u4E2A\u6761\u4EF6\u4E0D\u6EE1\u8DB3\u624D\u8FD0\u884C\n    - if: '$CI_PIPELINE_SOURCE == \"merge_request_event\"'\n      when: never\n    - if: '$CI_PIPELINE_SOURCE == \"schedule\"'\n      when: never\n    - when: on_success\n\nbuild:\n  script: npm run build\n  rules:\n    # \u5E38\u89C1\n    - if: $CI_COMMIT_TAG # \u6709 tag\n    - if: $CI_COMMIT_BRANCH # \u5206\u652F\u63A8\u9001\n    - if: '$CI_COMMIT_BRANCH == \"main\"' # \u4E3B\u5206\u652F\n    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH' # \u9ED8\u8BA4\u5206\u652F\n    - if: '$CI_COMMIT_BRANCH =~ /regex-expression/' # \u5206\u652F\u5339\u914D\n\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"if CI_PIPELINE_SOURCE"}),(0,r.jsx)(e.th,{children:"desc"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"api"}),(0,r.jsx)(e.td,{children:"Pipline API \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"chat"}),(0,r.jsx)(e.td,{children:"ChatOps \u521B\u5EFA\u7684 Pipeline"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"external"}),(0,r.jsx)(e.td,{children:"\u5916\u90E8 CI \u670D\u52A1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"external_pull_request_event"}),(0,r.jsx)(e.td,{children:"\u5916\u90E8\u4ED3\u5E93 PR\uFF0C\u4F8B\u5982 Github"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"merge_request_event"}),(0,r.jsx)(e.td,{children:"\u4ED3\u5E93\u6536\u5230 pr"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"parent_pipeline"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"pipeline"}),(0,r.jsx)(e.td,{children:"\u6D41\u6C34\u7EBF\u4E2D\u521B\u5EFA\u7684\u591A\u9879\u76EE pipeline"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"push"}),(0,r.jsx)(e.td,{children:"git push \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"schedule"}),(0,r.jsx)(e.td,{children:"\u8C03\u5EA6\u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"tags"}),(0,r.jsx)(e.td,{children:"ref \u662F tag"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"trigger"}),(0,r.jsx)(e.td,{children:"trigger token \u89E6\u53D1"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"web"}),(0,r.jsx)(e.td,{children:"Web \u89E6\u53D1/\u8FD0\u884C\u6D41\u6C34\u7EBF"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"webide"}),(0,r.jsx)(e.td,{children:"WebIDE"})]})]})]}),"\n",(0,r.jsx)(e.h2,{id:"cache",children:"cache"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u4F4D\u7F6E"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["cache\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5168\u5C40 - \u4E0D\u63A8\u8350\uFF0C\u5EFA\u8BAE\u4F7F\u7528 default"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["defaul:cache\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"job \u9ED8\u8BA4\u7F13\u5B58"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["job:cache\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"job \u7EF4\u5EA6\u7F13\u5B58\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5C5E\u6027"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["cache:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53EF\u914D\u7F6E\u4E3A\u6570\u7EC4 - \u591A\u4E2A\u7F13\u5B58"}),"\n",(0,r.jsxs)(e.li,{children:["key:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9ED8\u8BA4 default - \u5168\u5C40\u5171\u7528"}),"\n",(0,r.jsxs)(e.li,{children:["\u53EF\u8BBE\u7F6E\u4E3A ",(0,r.jsx)(e.code,{children:"$CI_COMMIT_REF_SLUG"})," - \u5206\u652F\u72EC\u7ACB\u7F13\u5B58"]}),"\n",(0,r.jsxs)(e.li,{children:["files:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["prefix:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"${CI_JOB_NAME}"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["untracked:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7F13\u5B58\u4ED3\u5E93\u91CC\u6240\u6709 untracked \u6587\u4EF6"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["paths:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7F13\u5B58\u7684\u76EE\u5F55"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["when:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"on_success - \u9ED8\u8BA4 \u6210\u529F\u65F6\u4FDD\u5B58\u7F13\u5B58"}),"\n",(0,r.jsx)(e.li,{children:"on_failure"}),"\n",(0,r.jsx)(e.li,{children:"always"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["policy:\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"pull-push - \u9ED8\u8BA4 - \u542F\u52A8\u524D\u62C9\uFF0C\u5B8C\u6210\u540E\u63A8"}),"\n",(0,r.jsx)(e.li,{children:"pull \u53EA\u62C9 - \u7528\u4E8E\u5DF2\u77E5\u4E0D\u4F1A\u4FEE\u6539\u7F13\u5B58\u573A\u666F"}),"\n",(0,r.jsx)(e.li,{children:"push \u53EA\u63A8"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"cache:\n  paths:\n    - my/files\n\nrspec:\n  script: test\n  cache:\n    key: rspec\n    paths:\n      - binaries/\n"})}),"\n",(0,r.jsx)(e.h2,{id:"workflow",children:"workflow"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u9650\u5B9A pipeline \u662F\u5426\u8FD0\u884C/\u521B\u5EFA"}),"\n",(0,r.jsx)(e.li,{children:"\u8FD0\u884C\u65F6\u8FD0\u884C\u8986\u76D6\u53D8\u91CF"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"workflow:\n  rules:\n    - if: $CI_COMMIT_MESSAGE =~ /-draft$/\n      when: never\n    - if: $CI_COMMIT_REF_NAME =~ /feature/\n      variables:\n        IS_A_FEATURE: 'true' # \u8986\u76D6\u53D8\u91CF\n    - when: always #\n"})}),"\n",(0,r.jsx)(e.h2,{id:"release",children:"release"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4F9D\u8D56 ",(0,r.jsx)(e.a,{href:"https://gitlab.com/gitlab-org/release-cli/-/tree/master/docs",children:"release-cli"})," \u547D\u4EE4\u884C\u5DE5\u5177\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"image: registry.gitlab.com/gitlab-org/release-cli:latest"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://gitlab.com/gitlab-org/release-cli/-/tree/master/docs/examples/release-assets-as-generic-package/",children:"Release assets as Generic packages"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'# AlpineLinux\napk add gitlab-release-cli -X https://mirrors.aliyun.com/alpine/edge/testing\n\n# shell executor \u9700\u8981\u5B89\u88C5\u547D\u4EE4\u884C\u6839\u636E\ncurl --location --output /usr/local/bin/release-cli "https://release-cli-downloads.s3.amazonaws.com/latest/release-cli-linux-amd64"\nchmod +x /usr/local/bin/release-cli\n\n# \u786E\u4FDD\u53EF\u7528\nrelease-cli -v\n'})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"# \u57FA\u4E8E tag release\njob:\n  release:\n    tag_name: $CI_COMMIT_TAG\n    description: 'Release description'\n    # name - \u9ED8\u8BA4\u4E3A tag_name\n    # ref - \u5982\u679C\u6CA1\u6709 tag_name \u53EF\u4EE5\u901A\u8FC7 ref \u521B\u5EFA\n    # milestones - \u5173\u8054\u91CC\u7A0B\u7891\n    # released_at: '2021-03-15T08:00:00Z' # \u4E0D\u6307\u5B9A\u4F1A\u81EA\u52A8\u751F\u6210\n\n---\n# \u76F4\u63A5\u8C03\u7528\u547D\u4EE4\u884C - \u53EF\u4EE5\u6DFB\u52A0 assets-link\n# gitlab \u5185\u7F6E artifact https://gitlab.com/org/proj/-/jobs/<JOB_ID>/artifacts/browse\nrelease:\n  stage: release\n  image: registry.gitlab.com/gitlab-org/release-cli:v0.4.0\n  # \u624B\u52A8\u89E6\u53D1\n  when: manual\n  rules:\n    - if: $CI_COMMIT_TAG\n      when: never\n\n  script:\n    - >\n      release-cli create --name release-branch-$CI_JOB_ID --description release-branch-$CI_COMMIT_REF_NAME-$CI_JOB_ID\n      --tag-name job-$CI_JOB_ID --ref $CI_COMMIT_SHA\n      --assets-link '{\"name\":\"Asset1\",\"url\":\"https://<domain>/some/location/1\",\"link_type\":\"other\",\"filepath\":\"xzy\"}'\n      --assets-link '{\"name\":\"Asset2\",\"url\":\"https://<domain>/some/location/2\"}'\n      --milestone \"v1.0.0\" --milestone \"v1.0.0-rc\"\n      --released-at \"2020-06-30T07:00:00Z\"\n\n---\nrelease_job:\n  stage: release\n  image: registry.gitlab.com/gitlab-org/release-cli:latest\n  rules:\n    - if: $CI_COMMIT_TAG # Run this job when a tag is created manually\n  script:\n    - echo 'running release_job'\n  release:\n    name: 'Release $CI_COMMIT_TAG'\n    description: 'Created using the release-cli $EXTRA_DESCRIPTION' # $EXTRA_DESCRIPTION must be defined\n    tag_name: '$CI_COMMIT_TAG' # elsewhere in the pipeline.\n    ref: '$CI_COMMIT_TAG'\n    milestones:\n      - 'm1'\n      - 'm2'\n      - 'm3'\n    released_at: '2020-07-15T08:00:00Z' # Optional, is auto generated if not defined, or can use a variable.\n---\nprepare_job:\n  stage: prepare # This stage must run before the release stage\n  rules:\n    - if: $CI_COMMIT_TAG\n      when: never # Do not run this job when a tag is created manually\n    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # Run this job when commits are pushed or merged to the default branch\n  script:\n    - echo \"EXTRA_DESCRIPTION=some message\" >> variables.env # Generate the EXTRA_DESCRIPTION and TAG environment variables\n    - echo \"TAG=v$(cat VERSION)\" >> variables.env # and append to the variables.env file\n  artifacts:\n    reports:\n      dotenv: variables.env # Use artifacts:reports:dotenv to expose the variables to other jobs\n\nrelease_job:\n  stage: release\n  image: registry.gitlab.com/gitlab-org/release-cli:latest\n  needs:\n    - job: prepare_job\n      artifacts: true\n  rules:\n    - if: $CI_COMMIT_TAG\n      when: never # Do not run this job when a tag is created manually\n    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # Run this job when commits are pushed or merged to the default branch\n  script:\n    - echo 'running release_job for $TAG'\n  release:\n    name: 'Release $TAG'\n    description: 'Created using the release-cli $EXTRA_DESCRIPTION' # $EXTRA_DESCRIPTION and the $TAG\n    tag_name: '$TAG' # variables must be defined elsewhere\n    ref: '$CI_COMMIT_SHA' # in the pipeline. For example, in the\n    milestones: # prepare_job\n      - 'm1'\n      - 'm2'\n      - 'm3'\n    released_at: '2020-07-15T08:00:00Z' # Optional, is auto generated if not defined, or can use a variable.\n"})}),"\n",(0,r.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h2,{id:"\u90E8\u7F72-pages",children:"\u90E8\u7F72 pages"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"pages:\n  script:\n    - yarn\n    - yarn build:public\n  artifacts:\n    # \u5FC5\u987B\u662F public \u76EE\u5F55\n    paths:\n      - public\n  only:\n    - master\n"})}),"\n",(0,r.jsx)(e.h2,{id:"\u6709-tag-\u7684\u65F6\u5019\u624D\u6267\u884C",children:"\u6709 Tag \u7684\u65F6\u5019\u624D\u6267\u884C"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u4E0D\u80FD\u6709 tag \u4E14\u6392\u9664\u5206\u652F - ",(0,r.jsx)(e.a,{href:"https://gitlab.com/gitlab-org/gitlab-foss/-/issues/23251",children:"https://gitlab.com/gitlab-org/gitlab-foss/-/issues/23251"})]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"build-tag:\n  only:\n    # \u6307\u5B9A\u5206\u652F\n    - master\n    # \u5FC5\u987B\u6709 tag\n    - tags\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u6216\u8005"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:'rules:\n  # \u6CA1\u6709 tag \u7684\u65F6\u5019\u624D\u6267\u884C\n  - if: $CI_COMMIT_TAG != ""\n    when: on_success\n  - when: never\n'})}),"\n",(0,r.jsx)(e.h2,{id:"\u9ED8\u8BA4\u5206\u652F",children:"\u9ED8\u8BA4\u5206\u652F"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"master \u6216 main \u6216 \u81EA\u5B9A\u4E49\u7684\u9ED8\u8BA4\u5206\u652F"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"only:\n  variables:\n    - $CI_DEFAULT_BRANCH == $CI_COMMIT_REF_NAME\n"})})]})}function x(n={}){let{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return d},a:function(){return t}});var l=s(75271);let r={},i=l.createContext(r);function t(n){let e=l.useContext(i);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:t(n.components),l.createElement(i.Provider,{value:e},n.children)}}}]);