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
https://zhidao.baidu.com/question/937649441306960572

微信最多可添加5000个好友，其中包括个人好友+关注的公众账号+所在的群的好友数量，这个数量足以满足一般人的需求。如果人数超过5000个，微信团队会提示您删除部分好友再添加。每天加好友的数量也有限制,最多可以加20个。

微信（WeChat）是腾讯公司于2011年1月21日推出的一个为智能终端提供即时通讯服务的免费应用程序，由张小龙所带领的腾讯广州研发中心产品团队打造。微信支持跨通信运营商、跨操作系统平台通过网络快速发送免费（需消耗少量网络流量）语音短信、视频、图片和文字，同时，也可以使用通过共享流媒体内容的资料和基于位置的社交插件“摇一摇”、“漂流瓶”、“朋友圈”、”公众平台“、”语音记事本“等服务插件。

截止到2016年第二季度，微信已经覆盖中国 94% 以上的智能手机，月活跃用户达到 8.06亿，用户覆盖 200 多个国家、超过 20 种语言。 此外，各品牌的微信公众账号总数已经超过 800 万个，移动应用对接数量超过 85000 个，广告收入增至36.79亿人民币，微信支付用户则达到了 4 亿左右。

微信提供公众平台、朋友圈、消息推送等功能，用户可以通过“摇一摇”、“搜索号码”、“附近的人”、扫二维码方式添加好友和关注公众平台，同时微信将内容分享给好友以及将用户看到的精彩内容分享到微信朋友圈。
