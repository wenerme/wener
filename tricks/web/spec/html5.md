# HTML5

## navigator.permissions
* [navigator.permissions](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions)

## geolocation
* [Using geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
* https://test.wener.me/geo.html

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Geo Test</title>
</head>
<body>

<div id="pos"></div>
<div id="timer"></div>
<div id="log"></div>
<script>

    var $timer = document.getElementById("timer");
    var $pos = document.getElementById("pos");
    var $log = document.getElementById("log");

    function log(msg) {
        $log.innerHTML += new Date().toISOString() + " - " + msg + '<br>'
    }

    function updatePos(position) {
        var c = position.coords;
        var s = "定位 " + c.latitude + " , " + c.longitude + " 精度 " + c.accuracy + "米 <br>";
        s += "高度 " + c.altitude + " 高度精度 " + c.altitudeAccuracy + "米 <br>";
        s += "朝向 " + c.heading + " 速度 " + c.speed + "<br>";
        $pos.innerHTML = s + " 时间 " + new Date(position.timestamp).toISOString();
    }

    if ("geolocation" in navigator) {
        log("有 geolocation 支持");
        if ("permissions" in navigator) {
            log("有 permissions 支持");
            navigator.permissions.query({name: 'geolocation'}).then(function (result) {
                if (result.state === 'granted') {
                    log("已授权");
                } else if (result.state === 'prompt') {
                    log("待请求授权");
                } else {
                    log("未授权 " + JSON.stringify(result));
                }
            });
        } else {
            log("无 permissions 支持");
        }

        log("开始获取定位 15秒 超时");
        try {
            var sec = 0;
            setInterval(function () {
                $timer.innerText = "时间 " + (sec++) + " 秒";
            }, 1000);
            navigator.geolocation.getCurrentPosition(function (position) {
                log("获取成功");

                updatePos(position);

                log("开始进行持续定位");
                navigator.geolocation.watchPosition(function (position) {
                    log("更新定位");
                    updatePos(position);
                }, function (error) {
                    log("持续定位失败 code:" + error.code + "  message:" + error.message)
                }, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                });

            }, function (error) {
                log("获取失败 code:" + error.code + "  message:" + error.message)
            }, {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            });
        } catch (e) {
            log("操作异常 " + e);
        }
    } else {
        log("无 geolocation 支持")
    }
</script>
</body>
</html>
```
