---
title: Label Studio
---

# Label-studio

- [HumanSignal/label-studio](https://github.com/HumanSignal/label-studio)
  - Apache-2.0
  - 数据库: SQLite, PostgreSQL
  - 存储: S3
- telementry
  - COLLECT_ANALYTICS
- 参考
  - https://labelstud.io/
  - 前端 https://github.com/HumanSignal/label-studio/tree/develop/web/libs/editor
- /Users/wener/Library/Application Support/label-studio

```bash
uv pip install -U label-studio
LOCAL_FILES_SERVING_ENABLED=true uv run label-studio

# https://hub.docker.com/r/heartexlabs/label-studio
# https://github.com/HumanSignal/label-studio/blob/develop/docker-compose.yml
docker run --rm -it \
  -p 8080:8080 \
  -v $PWD/data:/label-studio/data \
  --name label-studio heartexlabs/label-studio

# label-studio --log-level DEBUG

LABEL_STUDIO_BASE_DATA_DIR=$PWD/data \
  LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED=true \
  LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT=$PWD/files \
  label-studio start
```

| env                                      | flags                         | default                |
| ---------------------------------------- | ----------------------------- | ---------------------- |
| LABEL_STUDIO_DATABASE                    | -db,--database                | label_studio.sqlite3   |
| LABEL_STUDIO_BASE_DATA_DIR               | --data-dir                    |
| CONFIG_PATH                              | -c,--config                   | default_config.json    |
| LABEL_STUDIO_LABEL_CONFIG                | -l,--label-config             | None                   |
| LABEL_STUDIO_PORT                        | -p,--port                     | 8080                   |
| LABEL_STUDIO_HOST                        | --host                        |
| LABEL_STUDIO_PROJECT_DESC                | --initial-project-description |
| LABEL_STUDIO_PASSWORD                    | --password                    |
| LABEL_STUDIO_USERNAME                    | --username                    | default_user@localhost |
| LABEL_STUDIO_USER_TOKEN                  | --user-token                  |
| LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED |                               | False                  |
| LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT   |                               | /                      |

## tags

```xml
<View>
  <TimeSeriesLabels name="label" toName="ts">
    <Label value="Run"/>
    <Label value="Walk"/>
  </TimeSeriesLabels>
  <HyperText name="video" value="$video" inline="true"/>
  <TimeSeries name="ts" value="$csv" valueType="url" timeColumn="time_column">
    <Channel column="first_column"/>
  </TimeSeries>
</View>

<!-- {
    "csv": "/samples/time-series.csv?time=time_column&values=first_column",
    "video": "<video src='/static/samples/opossum_snow.mp4' width='100%' controls onloadeddata=\"setTimeout(function(){ts=Htx.annotationStore.selected.names.get('ts');t=ts.data.time_column;v=document.getElementsByTagName('video')[0];w=parseInt(t.length*(5/v.duration));l=t.length-w;ts.updateTR([t[0], t[w]], 1.001);r=$=>
ts.brushRange.map(n=>(+n).toFixed(2));_=r();setInterval($=>r().some((n,i)=>n!==_[i])&&(_=r())&&(v.currentTime=v.duration*(r()[0]-t[0])/(t.slice(-1)[0]-t[0]-(r()[1]-r()[0]))),300); console.log('video is loaded, starting to sync with time series')}, 3000); \" />"
  } -->
```

- Video+TimeSerias
  - https://github.com/HumanSignal/label-studio/issues/4827
- https://labelstud.io/tags/
- https://github.com/google-research-datasets/Video-Timeline-Tags-ViTT

## structs

```ts
interface Obj {
  id: string;

  data: any;
  value: any;

  from_name: string;
  to_name: string;
  type: string;
}
```

- Label Studio Common Format

## ML Backend

- https://github.com/HumanSignal/label-studio-ml-backend
- https://github.com/seblful/label-studio-yolov8-backend

## Template

- data 是静态的、被观察的对象
- annotations 是动态的、被创建的结果
- value 绑定 data
- 控制标签创建 annotations

```tsx
<Text name='text' value='$prediction' />
```

- name 是内部名字
- value

---

- 参考
  - https://labelstud.io/tags/

## Storage

```
/project-folder/
├── images/
│   ├── image1.jpg
│   ├── image2.png
│   └── subfolder/
│       └── image3.gif
└── my_tasks.json
```

- Treat every bucket object as a source file
- 本地存储
  - `LABEL_STUDIO_LOCAL_FILES_SERVING_ENABLED=true`
  - LABEL_STUDIO_LOCAL_FILES_DOCUMENT_ROOT
    - 限定访问目录
  - `/data/local-files?d=ds/images/1.jpg`
    - 实际相当于访问 `http://localhost:8080/data/local-files?d=ds/images/1.jpg`
- 上传存储
  - `/data/upload/$PROJECT_ID/`
- https://labelstud.io/guide/storage.html

# FAQ

- OCR 指标
  - 字符错误率 (CER)
  - 词错误率 (WER)

## video frameCount

- framerate 默认 24
- https://github.com/HumanSignal/label-studio/issues/3315
- https://labelstud.io/tags/video
