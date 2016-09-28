# OpenShift

## Tips
```bash
# 使用快速启动的方法启动停止后,可能挂载的目录不会取消挂载
echo openshift.local.volumes/pods/*/volumes/kub*/* | xargs -n 1 umount


```
