# WeChat

## Tips
* 企业号
  * [企业号开发文档](http://qydev.weixin.qq.com/wiki/index.php?title=首页)
  * [微信企业号接口调试工具](http://qydev.weixin.qq.com/debug)
* 企业微信
  * [企业微信开发文档](https://work.weixin.qq.com/api/doc)
* 微信
  * [微信公众平台技术文档](https://mp.weixin.qq.com/wiki)
* [chanxuehong/wechat.v2](https://github.com/chanxuehong/wechat.v2)
  * 微信 Go SDK


http://qydev.weixin.qq.com/wiki/index.php?title=微信_JS接口


https://github.com/zxlie/WeixinApi

https://github.com/Tencent/weui/wiki//微信JSAPI

微信开发平台 vs 微信公众平台


https://open.weixin.qq.com/




```js


wx.error(function (e) {
    console.log('WX JS-SDK FAILED', e);
//   location.replace('http://nokian.seventyagency.com.cn/saicheh5/index.html');
});

wx.ready(function(){ console.log('WX JS-SDK Ready'); });

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var sign = JSON.parse(this.responseText);
        wx.config({
            appId: sign.appId,
            timestamp: sign.timestamp,
            nonceStr: sign.nonce,
            signature: sign.signature,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
        });
    }
};
xhttp.open("GET", "http://nils.seventyagency.com.cn/saiche.php", true);
xhttp.send();


var nowUrl = location.href;
var baseUrl = nowUrl.substring(0, nowUrl.lastIndexOf("/"));
shareData = {
    title: "哥们儿，雪地飙车走一个！",
    desc: "启动『熊大护雪地保卫战』，赢重磅装备！",
    link: "http://nokian.seventyagency.com.cn/saicheh5/index.html",
    imgUrl: "http://nokian.seventyagency.com.cn/saicheh5/title.jpg"
};
wx.ready(function() {
    wx.onMenuShareTimeline({
        title: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
    wx.onMenuShareQQ({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    });
    wx.onMenuShareWeibo({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    })
    wx.onMenuShareQZone({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl: shareData.imgUrl
    })
});


```
