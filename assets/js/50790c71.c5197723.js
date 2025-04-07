"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["54360"],{52131:function(e,n,s){s.r(n),s.d(n,{metadata:()=>t,contentTitle:()=>a,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>r});var t=JSON.parse('{"id":"ai/ml/cvat","title":"CVAT","description":"- cvat-ai/cvat","source":"@site/../notes/ai/ml/cvat.md","sourceDirName":"ai/ml","slug":"/ai/ml/cvat","permalink":"/notes/ai/ml/cvat","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/cvat.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1730787686000,"frontMatter":{"title":"CVAT"},"sidebar":"docs","previous":{"title":"ClearML","permalink":"/notes/ai/ml/clearml"},"next":{"title":"datumaro","permalink":"/notes/ai/ml/datumaro"}}'),l=s("52676"),i=s("79938");let r={title:"CVAT"},a="CVAT",c={},o=[{value:"serverless",id:"serverless",level:2},{value:"AI &amp; OpenCV",id:"ai--opencv",level:2},{value:"Dataset",id:"dataset",level:2},{value:"yolo",id:"yolo",level:2},{value:"export skip un-anotated frames",id:"export-skip-un-anotated-frames",level:2},{value:"cvat.openvino.base: pull access denied",id:"cvatopenvinobase-pull-access-denied",level:2},{value:"The TensorFlow library was compiled to use AVX instructions, but these aren&#39;t available on your machine.",id:"the-tensorflow-library-was-compiled-to-use-avx-instructions-but-these-arent-available-on-your-machine",level:2},{value:"status code 503",id:"status-code-503",level:2},{value:"Failed to parse: <code>http://host.docker.internal:None</code>",id:"failed-to-parse-httphostdockerinternalnone",level:2},{value:"ffprobe show frame count",id:"ffprobe-show-frame-count",level:2},{value:"ffmpeg frames",id:"ffmpeg-frames",level:2},{value:"hide long label mapper",id:"hide-long-label-mapper",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"cvat",children:"CVAT"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat",children:"cvat-ai/cvat"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"MIT, Python, TS"}),"\n",(0,l.jsx)(n.li,{children:"Powerful and efficient Computer Vision Annotation Tool (CVAT)"}),"\n",(0,l.jsx)(n.li,{children:"by Intel"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301 OpenCV"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301\u57FA\u4E8E\u6A21\u578B\u7684\u81EA\u52A8\u5316\u6807\u6CE8"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["YoloV8 serverlesss support ",(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/6471",children:"#6471"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u7531\u4E8E AGPL \u539F\u56E0\u65E0\u6CD5\u5408\u5E76 ",(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/pull/6472",children:"#6472"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.cvat.ai/docs/manual/advanced/ai-tools/",children:"https://docs.cvat.ai/docs/manual/advanced/ai-tools/"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/5686",children:"https://github.com/cvat-ai/cvat/issues/5686"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Tracker \u53EA\u80FD\u5355\u5E27\u8FD0\u884C"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# https://github.com/cvat-ai/cvat/blob/develop/docker-compose.yml\ngit clone https://github.com/cvat-ai/cvat.git\ncd cvat\n# grafana, vector, pg, redis, treafik, opa\n# ui, utils, server, worker_{analytics_reports, quality_reports, webhooks, annotation, export, import}\ndocker compose pull\n# \u63A8\u8350\u4FEE\u6539 volumns\nmkdir -p ./data/{db,data,keys,logs,inmem_db,events_db,cache_db}\n\n# http://localhost:8080 cvat\n# http://localhost:8070 nuclio\n# docker compose up\n# \u81EA\u52A8\u5316\u6807\u6CE8 - AI Tool \u4F9D\u8D56 nuclio serverless runtime\n# https://docs.cvat.ai/docs/administration/advanced/installation_automatic_annotation/\n# \u5982\u679C\u4FEE\u6539\u4E86\u6CE8\u610F\u6DFB\u52A0  --build\n# \u90E8\u7F72 nuclio/dashboard\n# \u4E3A server \u6DFB\u52A0 CVAT_SERVERLESS=1\n# \u6DFB\u52A0 \u989D\u5916\u7684 host \u4FE1\u606F\ndocker compose -f docker-compose.yml -f components/serverless/docker-compose.serverless.yml up\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"volumes:\n  cvat_db:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/db\n      o: bind\n  cvat_data:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/data\n      o: bind\n  cvat_keys:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/keys\n      o: bind\n  cvat_logs:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/logs\n      o: bind\n  cvat_inmem_db:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/inmem_db\n      o: bind\n  cvat_events_db:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/events_db\n      o: bind\n  cvat_cache_db:\n    driver: local\n    driver_opts:\n      type: none\n      device: ./data/cache_db\n      o: bind\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.cvat.ai/docs/manual/advanced/ai-tools",children:"https://docs.cvat.ai/docs/manual/advanced/ai-tools"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"serverless",children:"serverless"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'# https://github.com/nuclio/nuclio/releases/\ncurl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-darwin-$(uname -m)\n# curl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-linux-$(dpkg --print-architecture)\nchmod +x nuctl\n# sudo mv nuctl /usr/local/bin/\n# \u5047\u8BBE $HOME/bin \u5728 PATH \u4E2D\nmv nuctl ~/bin/\n\n# function.yaml\n# \u6784\u5EFA\u8FC7\u7A0B\u4F1A\u8BBF\u95EE github.com dl.fbaipublicfiles.com pip3\n# \u4E0D\u914D\u7F6E\u4EE3\u7406\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u662F\u6784\u5EFA\u4E0D\u6210\u529F\u7684\n./serverless/deploy_cpu.sh serverless/openvino/dextr\n./serverless/deploy_cpu.sh serverless/openvino/omz/public/yolo-v3-tf\n\n./serverless/deploy_cpu.sh serverless/pytorch/facebookresearch/sam\n\n# GPU\nnuctl deploy --project-name cvat \\\n  --path serverless/tensorflow/matterport/mask_rcnn/nuclio \\\n  --platform local --base-image tensorflow/tensorflow:1.15.5-gpu-py3 \\\n  --desc "GPU based implementation of Mask RCNN on Python 3, Keras, and TensorFlow." \\\n  --image cvat/tf.matterport.mask_rcnn_gpu \\\n  --triggers \'{"myHttpTrigger": {"maxWorkers": 1}}\' \\\n  --resource-limit nvidia.com/gpu=1\n\n./serverless/deploy_gpu.sh serverless/pytorch/facebookresearch/sam\n\n# quay.io/nuclio/uhttpc:0.0.1-arm6\n# quay.io/nuclio/handler-builder-python-onbuild:1.13.0-arm64\n\n# \u4F9D\u8D56 gcr\ndocker pull alpine:3.17\ndocker tag alpine:3.17 gcr.io/iguazio/alpine:3.17\n# mirror\ncrane copy gcr.io/kaniko-project/executor:v1.9.0 registry-vpc.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0\ndocker pull registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0\ndocker tag registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0 gcr.io/kaniko-project/executor:v1.9.0\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"nuctl get function\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"nuctl"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/nuclio/nuclio",children:"https://github.com/nuclio/nuclio"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"env"}),(0,l.jsx)(n.th,{children:"default"}),(0,l.jsx)(n.th,{children:"for"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_HOST"}),(0,l.jsx)(n.td,{children:"localhost"}),(0,l.jsx)(n.td,{})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_SCHEME"}),(0,l.jsx)(n.td,{children:"http"}),(0,l.jsx)(n.td,{})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_PORT"}),(0,l.jsx)(n.td,{children:"8070"}),(0,l.jsx)(n.td,{})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_DEFAULT_TIMEOUT"}),(0,l.jsx)(n.td,{children:"120"}),(0,l.jsx)(n.td,{})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_FUNCTION_NAMESPACE"}),(0,l.jsx)(n.td,{children:"nuclio"}),(0,l.jsx)(n.td,{})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"CVAT_NUCLIO_INVOKE_METHOD"}),(0,l.jsx)(n.td,{children:"dashboard"}),(0,l.jsx)(n.td,{children:"direct for KUBERNETES_SERVICE_HOST"})]})]})]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/6714",children:"https://github.com/cvat-ai/cvat/issues/6714"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.cvat.ai/docs/manual/advanced/serverless-tutorial/",children:"Serverless tutorial"})}),"\n",(0,l.jsxs)(n.li,{children:["\u8FD4\u56DE\u7ED3\u679C ",(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/6332",children:"https://github.com/cvat-ai/cvat/issues/6332"})]}),"\n",(0,l.jsxs)(n.li,{children:["function.yaml\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["metadata - \u63D0\u4F9B\u540D\u5B57\u76F8\u5173\u4FE1\u606F\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"type detector, interactor, tracker, reid"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"spec.handler - \u5B9A\u4E49\u5165\u53E3"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:'metadata:\n  name: pth-facebookresearch-detectron2-retinanet-r101\n  namespace: cvat\n  annotations:\n    name: RetinaNet R101\n    type: detector\n    spec: |\n      [\n        { "id": 1, "name": "person" }\n      ]\n'})}),"\n",(0,l.jsx)(n.h2,{id:"ai--opencv",children:"AI & OpenCV"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Interactors - \u7528\u4E8E Segmentation, \u534A\u81EA\u52A8\u6784\u5EFA polygon\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Segment Anything Model (SAM)"}),"\n",(0,l.jsx)(n.li,{children:"Deep extreme cut (DEXTR)"}),"\n",(0,l.jsx)(n.li,{children:"Feature backpropagating refinement scheme (f-BRS)"}),"\n",(0,l.jsx)(n.li,{children:"High Resolution Net (HRNet)"}),"\n",(0,l.jsx)(n.li,{children:"Inside-Outside-Guidance (IOG)"}),"\n",(0,l.jsx)(n.li,{children:"Intelligent scissors - OpenCV"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Detectors\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Mask RCNN"}),"\n",(0,l.jsx)(n.li,{children:"Faster RCNN"}),"\n",(0,l.jsx)(n.li,{children:"YOLO v3"}),"\n",(0,l.jsx)(n.li,{children:"Semantic segmentation for ADAS"}),"\n",(0,l.jsxs)(n.li,{children:["RetinaNet\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"detectron2"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Face Detection"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Trackers\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["TrackerMIL - OpenCV - ",(0,l.jsx)(n.a,{href:"https://learnopencv.com/tag/mil/",children:"https://learnopencv.com/tag/mil/"})]}),"\n",(0,l.jsxs)(n.li,{children:["SiamMask - ",(0,l.jsx)(n.a,{href:"https://github.com/foolwood/SiamMask",children:"foolwood/SiamMask"})]}),"\n",(0,l.jsxs)(n.li,{children:["TransT - Transformer Tracking - ",(0,l.jsx)(n.a,{href:"https://github.com/chenxin-dlut/TransT",children:"chenxin-dlut/TransT"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"dataset",children:"Dataset"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://docs.cvat.ai/docs/manual/advanced/dataset_manifest/",children:"https://docs.cvat.ai/docs/manual/advanced/dataset_manifest/"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"yolo",children:"yolo"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"mkdir -p serverless/pytorch/ultralytics/yolov8\nnano serverless/pytorch/ultralytics/yolov8/nuclio/function-gpu.yaml\n\n./serverless/deploy_gpu.sh serverless/pytorch/ultralytics/yolov8\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-py",metastring:'title="main.py"',children:'import json\nimport base64\nfrom PIL import Image\nimport io\nfrom ultralytics import YOLO\nimport supervision as sv\n\n\ndef init_context(context):\n    context.logger.info("Init context...  0%")\n    # Change model path for custom model\n    model_path = "/opt/nuclio/model.pt"\n    model = YOLO(model_path)\n    # Read the DL model\n    context.user_data.model = model\n    context.logger.info("Init context...100%")\n\n\ndef handler(context, event):\n    context.logger.info("Run yolo-v8 model")\n    data = event.body\n    buf = io.BytesIO(base64.b64decode(data["image"]))\n    threshold = float(data.get("threshold", 0.5))\n    context.user_data.model.conf = threshold\n    image = Image.open(buf)\n    yolo_results = context.user_data.model(image, conf=threshold)[0]\n    labels = yolo_results.names\n    # from_ultralytics in supervision-0.16.0+\n    detections = sv.Detections.from_ultralytics(yolo_results)\n    detections = detections[detections.confidence > threshold]\n    boxes = detections.xyxy\n    conf = detections.confidence\n    class_ids = detections.class_id\n\n    results = []\n    if boxes.shape[0] > 0:\n        for label, score, box in zip(class_ids, conf, boxes):\n            xtl = int(box[0])\n            ytl = int(box[1])\n            xbr = int(box[2])\n            ybr = int(box[3])\n\n            results.append({\n                "confidence": str(score),\n                "label": labels.get(label, "unknown"),\n                "points": [xtl, ytl, xbr, ybr],\n                "type": "rectangle", })\n\n    return context.Response(body=json.dumps(results), headers={},\n                            content_type=\'application/json\', status_code=200)\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\u7531\u4E8E AGPL \u539F\u56E0\u65E0\u6CD5\u5408\u5E76 ",(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/pull/6472",children:"#6472"})]}),"\n"]}),"\n",(0,l.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(n.h2,{id:"export-skip-un-anotated-frames",children:"export skip un-anotated frames"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"pip install \"datumaro[default]\"\n\n# \u9ED8\u8BA4\u5BFC\u51FA\u4E3A PNG\ndatum convert -i SRC_DIR -e '/item/annotation' --filter-mode 'i+a' -f yolo -o DST_DIR -- --save-media --image-ext='.jpg'\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"SRC_DIR \u4E3A cvat \u5BFC\u51FA\u7684 datumaro \u6570\u636E\u96C6\u683C\u5F0F"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/1251",children:"https://github.com/cvat-ai/cvat/issues/1251"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"cvatopenvinobase-pull-access-denied",children:"cvat.openvino.base: pull access denied"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u9ED8\u8BA4\u5F00\u542F\u4E86 DOCKER_BUILDKIT=1"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'# \u662F\u5B58\u5728\u7684\ndocker images | grep cvat.openvino.base\n\n# container builder \u770B\u4E0D\u5230\ndocker buildx ls\n\n# \u65B9\u6848 1\ndocker context use default\n\n# \u65B9\u6848 2\nDOCKER_BUILDKIT=0 docker build -t cvat.openvino.base serverless/openvino/base\nDOCKER_BUILDKIT=0 docker build -t cvat.openvino.omz.public.yolo-v3-tf.base serverless/openvino/omz/public/yolo-v3-tf/nuclio\n\nnuctl deploy --project-name cvat --path "$func_root" \\\n  --file "$func_config" --platform local\n'})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Apple Silicon macOS \u4E0A\u6709\u95EE\u9898\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/moby/moby/pull/42951",children:"https://github.com/moby/moby/pull/42951"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/docker/buildx/issues/795",children:"https://github.com/docker/buildx/issues/795"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/moby/buildkit/issues/2343",children:"https://github.com/moby/buildkit/issues/2343"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"the-tensorflow-library-was-compiled-to-use-avx-instructions-but-these-arent-available-on-your-machine",children:"The TensorFlow library was compiled to use AVX instructions, but these aren't available on your machine."}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Apple Silicon \u4E0A\u51FA\u73B0"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/tensorflow/tensorflow/issues/24548",children:"https://github.com/tensorflow/tensorflow/issues/24548"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"status-code-503",children:"status code 503"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# \u68C0\u67E5\u7AEF\u53E3\u662F\u5426\u901A\nnuctl get function\n\n# \u68C0\u67E5\u65E5\u5FD7\ndocker logs -f nuclio-nuclio-pth-facebookresearch-sam-vit-h\n# \u5224\u65AD\u5BB9\u5668\u5185\u7AEF\u53E3\u662F\u5426\u6B63\u5E38\ndocker exec -it nuclio-nuclio-pth-facebookresearch-sam-vit-h curl -v http://localhost:8080\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/6582",children:"https://github.com/cvat-ai/cvat/issues/6582"})}),"\n"]}),"\n",(0,l.jsxs)(n.h2,{id:"failed-to-parse-httphostdockerinternalnone",children:["Failed to parse: ",(0,l.jsx)(n.code,{children:"http://host.docker.internal:None"})]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"git pull \u4E86\u65B0\u7684\u4EE3\u7801\u7136\u540E\u91CD\u65B0 deploy \u5C31\u597D\u4E86"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/5205",children:"https://github.com/cvat-ai/cvat/issues/5205"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"ffprobe-show-frame-count",children:"ffprobe show frame count"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4\n\nffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames src/v1-000.mp4\n\nffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 input.mp4\n"})}),"\n",(0,l.jsx)(n.h2,{id:"ffmpeg-frames",children:"ffmpeg frames"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# -q:v 1-31 - 16 \u4E3A\u4E2D\u7B49\uFF0C1 \u4E3A\u6700\u597D\uFF0C31 \u4E3A\u6700\u5DEE\nffmpeg -i video.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 16 images/%d.jpg\n\n# \u63A8\u8350 - \u589E\u52A0\u89C6\u9891\u540D\u79F0\u524D\u7F00\uFF0C\u591A\u4E2A\u89C6\u9891\u53EF\u5408\u5E76\uFF0C\u8D28\u91CF\u8C03\u9AD8\u4E00\u70B9\nffmpeg -i v2.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 4 v2/v2-frame_%06d.jpg\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://github.com/cvat-ai/cvat/issues/818",children:"https://github.com/cvat-ai/cvat/issues/818"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"hide-long-label-mapper",children:"hide long label mapper"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u81EA\u5B9A\u4E49\u6A21\u578B\u7684 label \u975E\u5E38\u591A\u7684\u65F6\u5019"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"$$('.cvat-runner-label-mapper').forEach((v) => (v.style.display = 'none'));\n"})})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return a},a:function(){return r}});var t=s(75271);let l={},i=t.createContext(l);function r(e){let n=t.useContext(i);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);