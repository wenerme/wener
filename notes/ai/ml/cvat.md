---
title: CVAT
---

# CVAT

- [cvat-ai/cvat](https://github.com/cvat-ai/cvat)
  - MIT, Python, TS
  - by Intel
  - 支持 OpenCV
  - 支持基于模型的自动化标注
- 参考
  - YoloV8 serverlesss support [#6471](https://github.com/cvat-ai/cvat/issues/6471)
    - 由于 AGPL 原因无法合并 [#6472](https://github.com/cvat-ai/cvat/pull/6472)
  - https://docs.cvat.ai/docs/manual/advanced/ai-tools/
  - https://github.com/cvat-ai/cvat/issues/5686
    - Tracker 只能单帧运行

```bash
# https://github.com/cvat-ai/cvat/blob/develop/docker-compose.yml
git clone https://github.com/cvat-ai/cvat.git
cd cvat
# grafana, vector, pg, redis, treafik, opa
# ui, utils, server, worker_{analytics_reports, quality_reports, webhooks, annotation, export, import}
docker compose pull
# 推荐修改 volumns
mkdir -p ./data/{db,data,keys,logs,inmem_db,events_db,cache_db}

# http://localhost:8080 cvat
# http://localhost:8070 nuclio
# docker compose up
# 自动化标注 - AI Tool 依赖 nuclio serverless runtime
# https://docs.cvat.ai/docs/administration/advanced/installation_automatic_annotation/
# 如果修改了注意添加  --build
# 部署 nuclio/dashboard
# 为 server 添加 CVAT_SERVERLESS=1
# 添加 额外的 host 信息
docker compose -f docker-compose.yml -f components/serverless/docker-compose.serverless.yml up
```

```yaml
volumes:
  cvat_db:
    driver: local
    driver_opts:
      type: none
      device: ./data/db
      o: bind
  cvat_data:
    driver: local
    driver_opts:
      type: none
      device: ./data/data
      o: bind
  cvat_keys:
    driver: local
    driver_opts:
      type: none
      device: ./data/keys
      o: bind
  cvat_logs:
    driver: local
    driver_opts:
      type: none
      device: ./data/logs
      o: bind
  cvat_inmem_db:
    driver: local
    driver_opts:
      type: none
      device: ./data/inmem_db
      o: bind
  cvat_events_db:
    driver: local
    driver_opts:
      type: none
      device: ./data/events_db
      o: bind
  cvat_cache_db:
    driver: local
    driver_opts:
      type: none
      device: ./data/cache_db
      o: bind
```

- https://docs.cvat.ai/docs/manual/advanced/ai-tools

## serverless

```bash
# https://github.com/nuclio/nuclio/releases/
curl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-darwin-$(uname -m)
# curl -o nuctl -L https://github.com/nuclio/nuclio/releases/download/1.13.3/nuctl-1.13.3-linux-$(dpkg --print-architecture)
chmod +x nuctl
# sudo mv nuctl /usr/local/bin/
# 假设 $HOME/bin 在 PATH 中
mv nuctl ~/bin/

# function.yaml
# 构建过程会访问 github.com dl.fbaipublicfiles.com pip3
# 不配置代理大多数情况下是构建不成功的
./serverless/deploy_cpu.sh serverless/openvino/dextr
./serverless/deploy_cpu.sh serverless/openvino/omz/public/yolo-v3-tf

./serverless/deploy_cpu.sh serverless/pytorch/facebookresearch/sam

# GPU
nuctl deploy --project-name cvat \
  --path serverless/tensorflow/matterport/mask_rcnn/nuclio \
  --platform local --base-image tensorflow/tensorflow:1.15.5-gpu-py3 \
  --desc "GPU based implementation of Mask RCNN on Python 3, Keras, and TensorFlow." \
  --image cvat/tf.matterport.mask_rcnn_gpu \
  --triggers '{"myHttpTrigger": {"maxWorkers": 1}}' \
  --resource-limit nvidia.com/gpu=1

./serverless/deploy_gpu.sh serverless/pytorch/facebookresearch/sam

# quay.io/nuclio/uhttpc:0.0.1-arm6
# quay.io/nuclio/handler-builder-python-onbuild:1.13.0-arm64

# 依赖 gcr
docker pull alpine:3.17
docker tag alpine:3.17 gcr.io/iguazio/alpine:3.17
# mirror
crane copy gcr.io/kaniko-project/executor:v1.9.0 registry-vpc.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0
docker pull registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0
docker tag registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor:v1.9.0 gcr.io/kaniko-project/executor:v1.9.0
```

```bash
nuctl get function
```

- nuctl
- https://github.com/nuclio/nuclio

| env                            | default   | for                                |
| ------------------------------ | --------- | ---------------------------------- |
| CVAT_NUCLIO_HOST               | localhost |
| CVAT_NUCLIO_SCHEME             | http      |
| CVAT_NUCLIO_PORT               | 8070      |
| CVAT_NUCLIO_DEFAULT_TIMEOUT    | 120       |
| CVAT_NUCLIO_FUNCTION_NAMESPACE | nuclio    |
| CVAT_NUCLIO_INVOKE_METHOD      | dashboard | direct for KUBERNETES_SERVICE_HOST |

- https://github.com/cvat-ai/cvat/issues/6714
- [Serverless tutorial](https://docs.cvat.ai/docs/manual/advanced/serverless-tutorial/)
- 返回结果 https://github.com/cvat-ai/cvat/issues/6332
- function.yaml
  - metadata - 提供名字相关信息
    - type detector, interactor, tracker, reid
  - spec.handler - 定义入口

```yaml
metadata:
  name: pth-facebookresearch-detectron2-retinanet-r101
  namespace: cvat
  annotations:
    name: RetinaNet R101
    type: detector
    spec: |
      [
        { "id": 1, "name": "person" }
      ]
```

## AI & OpenCV

- Interactors - 用于 Segmentation, 半自动构建 polygon
  - Segment Anything Model (SAM)
  - Deep extreme cut (DEXTR)
  - Feature backpropagating refinement scheme (f-BRS)
  - High Resolution Net (HRNet)
  - Inside-Outside-Guidance (IOG)
  - Intelligent scissors - OpenCV
- Detectors
  - Mask RCNN
  - Faster RCNN
  - YOLO v3
  - Semantic segmentation for ADAS
  - RetinaNet
    - detectron2
  - Face Detection
- Trackers
  - TrackerMIL - OpenCV - https://learnopencv.com/tag/mil/
  - SiamMask - [foolwood/SiamMask](https://github.com/foolwood/SiamMask)
  - TransT - Transformer Tracking - [chenxin-dlut/TransT](https://github.com/chenxin-dlut/TransT)

## Dataset

- https://docs.cvat.ai/docs/manual/advanced/dataset_manifest/

## yolo

```bash
mkdir -p serverless/pytorch/ultralytics/yolov8
nano serverless/pytorch/ultralytics/yolov8/nuclio/function-gpu.yaml

./serverless/deploy_gpu.sh serverless/pytorch/ultralytics/yolov8
```

```py title="main.py"
import json
import base64
from PIL import Image
import io
from ultralytics import YOLO
import supervision as sv


def init_context(context):
    context.logger.info("Init context...  0%")
    # Change model path for custom model
    model_path = "/opt/nuclio/model.pt"
    model = YOLO(model_path)
    # Read the DL model
    context.user_data.model = model
    context.logger.info("Init context...100%")


def handler(context, event):
    context.logger.info("Run yolo-v8 model")
    data = event.body
    buf = io.BytesIO(base64.b64decode(data["image"]))
    threshold = float(data.get("threshold", 0.5))
    context.user_data.model.conf = threshold
    image = Image.open(buf)
    yolo_results = context.user_data.model(image, conf=threshold)[0]
    labels = yolo_results.names
    # from_ultralytics in supervision-0.16.0+
    detections = sv.Detections.from_ultralytics(yolo_results)
    detections = detections[detections.confidence > threshold]
    boxes = detections.xyxy
    conf = detections.confidence
    class_ids = detections.class_id

    results = []
    if boxes.shape[0] > 0:
        for label, score, box in zip(class_ids, conf, boxes):
            xtl = int(box[0])
            ytl = int(box[1])
            xbr = int(box[2])
            ybr = int(box[3])

            results.append({
                "confidence": str(score),
                "label": labels.get(label, "unknown"),
                "points": [xtl, ytl, xbr, ybr],
                "type": "rectangle", })

    return context.Response(body=json.dumps(results), headers={},
                            content_type='application/json', status_code=200)
```

- 由于 AGPL 原因无法合并 [#6472](https://github.com/cvat-ai/cvat/pull/6472)

# FAQ

## export skip un-anotated frames

```bash
pip install "datumaro[default]"

# 默认导出为 PNG
datum convert -i SRC_DIR -e '/item/annotation' --filter-mode 'i+a' -f yolo -o DST_DIR -- --save-media --image-ext='.jpg'
```

- SRC_DIR 为 cvat 导出的 datumaro 数据集格式
- https://github.com/cvat-ai/cvat/issues/1251

## cvat.openvino.base: pull access denied

- 默认开启了 DOCKER_BUILDKIT=1

```bash
# 是存在的
docker images | grep cvat.openvino.base

# container builder 看不到
docker buildx ls

# 方案 1
docker context use default

# 方案 2
DOCKER_BUILDKIT=0 docker build -t cvat.openvino.base serverless/openvino/base
DOCKER_BUILDKIT=0 docker build -t cvat.openvino.omz.public.yolo-v3-tf.base serverless/openvino/omz/public/yolo-v3-tf/nuclio

nuctl deploy --project-name cvat --path "$func_root" \
  --file "$func_config" --platform local
```

- Apple Silicon macOS 上有问题
  - https://github.com/moby/moby/pull/42951
- https://github.com/docker/buildx/issues/795
- https://github.com/moby/buildkit/issues/2343

## The TensorFlow library was compiled to use AVX instructions, but these aren't available on your machine.

- Apple Silicon 上出现
- https://github.com/tensorflow/tensorflow/issues/24548

## status code 503

```bash
# 检查端口是否通
nuctl get function

# 检查日志
docker logs -f nuclio-nuclio-pth-facebookresearch-sam-vit-h
# 判断容器内端口是否正常
docker exec -it nuclio-nuclio-pth-facebookresearch-sam-vit-h curl -v http://localhost:8080
```

- https://github.com/cvat-ai/cvat/issues/6582

## Failed to parse: http://host.docker.internal:None

- git pull 了新的代码然后重新 deploy 就好了
- https://github.com/cvat-ai/cvat/issues/5205

## ffprobe show frame count

```bash
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4
```

## ffmpeg frames

```bash
# -q:v 1-31 - 16 为中等，1 为最好，31 为最差
ffmpeg -i video.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 16 images/%d.jpg

# 推荐 - 增加视频名称前缀，多个视频可合并，质量调高一点
ffmpeg -i v2.mp4 -start_number 0 -b:v 10000k -vsync 0 -an -y -q:v 4 v2/v2-frame_%06d.jpg
```

- https://github.com/cvat-ai/cvat/issues/818

## hide long label mapper

- 自定义模型的 label 非常多的时候

```js
$$('.cvat-runner-label-mapper').forEach((v) => (v.style.display = 'none'));
```
