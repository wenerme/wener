"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["494"],{51215:function(e,n,t){t.r(n),t.d(n,{metadata:()=>l,contentTitle:()=>r,default:()=>h,assets:()=>a,toc:()=>c,frontMatter:()=>d});var l=JSON.parse('{"id":"ai/ml/label-studio","title":"Label Studio","description":"- HumanSignal/label-studio","source":"@site/../notes/ai/ml/label-studio.md","sourceDirName":"ai/ml","slug":"/ai/ml/label-studio","permalink":"/notes/ai/ml/label-studio","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/label-studio.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1717134008000,"frontMatter":{"title":"Label Studio"},"sidebar":"docs","previous":{"title":"Jupyter Lab","permalink":"/notes/ai/ml/jupyter/jupyterlab"},"next":{"title":"LabelImg","permalink":"/notes/ai/ml/labelImg"}}'),s=t("52676"),i=t("79938");let d={title:"Label Studio"},r="Label-studio",a={},c=[{value:"tags",id:"tags",level:2},{value:"structs",id:"structs",level:2},{value:"ML Backend",id:"ml-backend",level:2},{value:"video frameCount",id:"video-framecount",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"label-studio",children:"Label-studio"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/HumanSignal/label-studio",children:"HumanSignal/label-studio"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Apache-2.0"}),"\n",(0,s.jsx)(n.li,{children:"\u6570\u636E\u5E93: SQLite, PostgreSQL"}),"\n",(0,s.jsx)(n.li,{children:"\u5B58\u50A8: S3"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["telementry\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"COLLECT_ANALYTICS"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://labelstud.io/",children:"https://labelstud.io/"})}),"\n",(0,s.jsxs)(n.li,{children:["\u524D\u7AEF ",(0,s.jsx)(n.a,{href:"https://github.com/HumanSignal/label-studio/tree/develop/web/libs/editor",children:"https://github.com/HumanSignal/label-studio/tree/develop/web/libs/editor"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install -U label-studio\nlabel-studio\n\n# https://hub.docker.com/r/heartexlabs/label-studio\n# https://github.com/HumanSignal/label-studio/blob/develop/docker-compose.yml\ndocker run --rm -it \\\n  -p 8080:8080 \\\n  -v $PWD/data:/label-studio/data \\\n  --name label-studio heartexlabs/label-studio\n\n# label-studio --log-level DEBUG\n\nLABEL_STUDIO_BASE_DATA_DIR=$PWD/data \\\nLABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED=true \\\nLABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT=$PWD/files \\\n  label-studio start\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"env"}),(0,s.jsx)(n.th,{children:"flags"}),(0,s.jsx)(n.th,{children:"default"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_DATABASE"}),(0,s.jsx)(n.td,{children:"-db,--database"}),(0,s.jsx)(n.td,{children:"label_studio.sqlite3"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_BASE_DATA_DIR"}),(0,s.jsx)(n.td,{children:"--data-dir"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"CONFIG_PATH"}),(0,s.jsx)(n.td,{children:"-c,--config"}),(0,s.jsx)(n.td,{children:"default_config.json"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_LABEL_CONFIG"}),(0,s.jsx)(n.td,{children:"-l,--label-config"}),(0,s.jsx)(n.td,{children:"None"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_PORT"}),(0,s.jsx)(n.td,{children:"-p,--port"}),(0,s.jsx)(n.td,{children:"8080"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_HOST"}),(0,s.jsx)(n.td,{children:"--host"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_PROJECT_DESC"}),(0,s.jsx)(n.td,{children:"--initial-project-description"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_PASSWORD"}),(0,s.jsx)(n.td,{children:"--password"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_USERNAME"}),(0,s.jsx)(n.td,{children:"--username"}),(0,s.jsx)(n.td,{children:"default_user@localhost"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_USER_TOKEN"}),(0,s.jsx)(n.td,{children:"--user-token"}),(0,s.jsx)(n.td,{})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED"}),(0,s.jsx)(n.td,{}),(0,s.jsx)(n.td,{children:"False"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT"}),(0,s.jsx)(n.td,{}),(0,s.jsx)(n.td,{children:"/"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"tags",children:"tags"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-xml",children:'<View>\n  <TimeSeriesLabels name="label" toName="ts">\n    <Label value="Run"/>\n    <Label value="Walk"/>\n  </TimeSeriesLabels>\n  <HyperText name="video" value="$video" inline="true"/>\n  <TimeSeries name="ts" value="$csv" valueType="url" timeColumn="time_column">\n    <Channel column="first_column"/>\n  </TimeSeries>\n</View>\n\n\x3c!-- {\n    "csv": "/samples/time-series.csv?time=time_column&values=first_column",\n    "video": "<video src=\'/static/samples/opossum_snow.mp4\' width=\'100%\' controls onloadeddata=\\"setTimeout(function(){ts=Htx.annotationStore.selected.names.get(\'ts\');t=ts.data.time_column;v=document.getElementsByTagName(\'video\')[0];w=parseInt(t.length*(5/v.duration));l=t.length-w;ts.updateTR([t[0], t[w]], 1.001);r=$=>\nts.brushRange.map(n=>(+n).toFixed(2));_=r();setInterval($=>r().some((n,i)=>n!==_[i])&&(_=r())&&(v.currentTime=v.duration*(r()[0]-t[0])/(t.slice(-1)[0]-t[0]-(r()[1]-r()[0]))),300); console.log(\'video is loaded, starting to sync with time series\')}, 3000); \\" />"\n  } --\x3e\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Video+TimeSerias\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/HumanSignal/label-studio/issues/4827",children:"https://github.com/HumanSignal/label-studio/issues/4827"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://labelstud.io/tags/",children:"https://labelstud.io/tags/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/google-research-datasets/Video-Timeline-Tags-ViTT",children:"https://github.com/google-research-datasets/Video-Timeline-Tags-ViTT"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"structs",children:"structs"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"interface Obj {\n  id: string;\n\n  data:any\n  value:any\n\n  from_name: string;\n  to_name: string;\n  type: string;\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"ml-backend",children:"ML Backend"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/HumanSignal/label-studio-ml-backend",children:"https://github.com/HumanSignal/label-studio-ml-backend"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/seblful/label-studio-yolov8-backend",children:"https://github.com/seblful/label-studio-yolov8-backend"})}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"video-framecount",children:"video frameCount"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"framerate \u9ED8\u8BA4 24"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/HumanSignal/label-studio/issues/3315",children:"https://github.com/HumanSignal/label-studio/issues/3315"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://labelstud.io/tags/video",children:"https://labelstud.io/tags/video"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return r},a:function(){return d}});var l=t(75271);let s={},i=l.createContext(s);function d(e){let n=l.useContext(i);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),l.createElement(i.Provider,{value:n},e.children)}}}]);