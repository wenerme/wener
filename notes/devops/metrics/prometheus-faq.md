# Prometheus FAQ

## open /prometheus/queries.active: permission denied
* prometheus operator 部署的话可能在 volume 出现问题的时候出现该错误
* 使用 emptyDir 挂载可避免，或者修复 volume

