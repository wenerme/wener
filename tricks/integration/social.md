# 社交

* [微信企业号开发者文档](http://qydev.weixin.qq.com/wiki/index.php?title=%E9%A6%96%E9%A1%B5)
* [微信企业号接口调试工具](http://qydev.weixin.qq.com/debug)

* [企业微信帮助中心](http://kf.qq.com/product/qyweixin.html)

* [微信 Go SDK](https://github.com/chanxuehong/wechat.v2)

相册列表

http://h5.qzone.qq.com/proxy/domain/shalist.photo.qq.com/fcgi-bin/fcg_list_album_v3?g_tk=800335054&callback=shine0_Callback&t=213849123&hostUin=514403150&uin=514403150&appid=4&inCharset=utf-8&outCharset=utf-8&source=qzone&plat=qzone&format=jsonp&notice=0&filter=1&handset=4&pageNumModeSort=40&pageNumModeClass=15&needUserInfo=1&idcNum=4&callbackFun=shine0&_=1474515492220

照片列表

http://shplist.photo.qzone.qq.com/fcgi-bin/fcg_list_photo_v2?uin=514403150&albumid=2900c729-4dad-4b6c-b62b-0d9124ccf36d&json_esc=1&hostUin=514403150&inCharset=gbk&outCharset=gbk&source=qzone&plat=qzone&callbackFun=&t=0.2665610800362377&g_tk=800335054

别人的照片列表

http://h5.qzone.qq.com/proxy/domain/plist.photo.qzone.qq.com/fcgi-bin/cgi_list_photo?g_tk=790505095&callback=shine0_Callback&t=699085741&mode=0&idcNum=0&hostUin=760355495&topicId=V14Gvn6t2JkjgJ&noTopic=0&uin=514403150&pageStart=0&pageNum=30&skipCmtCount=0&singleurl=1&batchId=&notice=0&appid=4&inCharset=utf-8&outCharset=utf-8&source=qzone&plat=qzone&outstyle=json&format=jsonp&json_esc=1&question=&answer=&callbackFun=shine0&_=1474726098094

http://h5.qzone.qq.com/proxy/domain/plist.photo.qzone.qq.com/fcgi-bin/cgi_list_photo?g_tk=790505095&mode=0&idcNum=0&hostUin=760355495&topicId=V14Gvn6t2JkjgJ&uin=514403150&pageStart=0&pageNum=30&skipCmtCount=0&singleurl=1&batchId=&notice=0&appid=4&inCharset=utf-8&outCharset=utf-8&format=json


curl 'http://h5.qzone.qq.com/proxy/domain/shalist.photo.qq.com/fcgi-bin/fcg_list_album_v3?g_tk=800335054&callback=shine0_Callback&t=213849123&hostUin=514403150&uin=514403150&appid=4&inCharset=utf-8&outCharset=utf-8&source=qzone&plat=qzone&format=jsonp&notice=0&filter=1&handset=4&pageNumModeSort=40&pageNumModeClass=15&needUserInfo=1&idcNum=4&callbackFun=shine0&_=1474515492220' -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Cookie: pgv_pvi=9016539136; pgv_si=s7253185536; pgv_pvid=654800756; pgv_info=ssid=s6738369114; zzpaneluin=; zzpanelkey=; ptisp=ctc; RK=1RnPAkpGH8; ptcz=f239c3d67cee310eaa25308b8dab5ca609cf41bd061b7048465e89f7dd101fd8; pt2gguin=o0514403150; uin=o0514403150; skey=MYV3j8OmVx; p_uin=o0514403150; p_skey=zSBPky-YJYLTObB*F5At-w8z425FUSHhgCxfbBEZhvY_; pt4_token=7O5oYxtAeVVGCXVRaXrSB8U9Kn*VHUZ55V6EngTvqkQ_; qzone_check=514403150_1474515455; randomSeed=610364; Loading=Yes; qzspeedup=sdch; blabla=dynamic' -H 'Connection: keep-alive' --compressed

curl 'http://shplist.photo.qzone.qq.com/fcgi-bin/fcg_list_photo_v2?uin=514403150&albumid=2900c729-4dad-4b6c-b62b-0d9124ccf36d&json_esc=1&hostUin=514403150&inCharset=utf-8&outCharset=utf-8&source=qzone&plat=qzone&callbackFun=&t=0.2665610800362377&g_tk=800335054' -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Cookie: pgv_pvi=9016539136; pgv_si=s7253185536; pgv_pvid=654800756; pgv_info=ssid=s6738369114; zzpaneluin=; zzpanelkey=; ptisp=ctc; RK=1RnPAkpGH8; ptcz=f239c3d67cee310eaa25308b8dab5ca609cf41bd061b7048465e89f7dd101fd8; pt2gguin=o0514403150; uin=o0514403150; skey=MYV3j8OmVx; p_uin=o0514403150; p_skey=zSBPky-YJYLTObB*F5At-w8z425FUSHhgCxfbBEZhvY_; pt4_token=7O5oYxtAeVVGCXVRaXrSB8U9Kn*VHUZ55V6EngTvqkQ_; qzone_check=514403150_1474515455; randomSeed=610364; Loading=Yes; qzspeedup=sdch; blabla=dynamic' -H 'Connection: keep-alive' --compressed

```bash
curl 'http://b208.photo.store.qq.com/psbe?/V14Gvn6t3FhWlL/rfKexL5BwurAhmb*sbEYgDn13sp5dc.9Hkcsruc**yKcTPZqGtLRYpSJse.ZsTkP/b/dNAAAAAAAAAA&bo=AgMABQIDAAUFByQ!' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cookie: pvid=4307327424; _ga=GA1.2.1044020706.1453442668; o_cookie=514403150; pgv_info=ssid=s703166573; pgv_pvid=6690325544; pgv_pvi=1238622208; pgv_si=s1496416256; ptisp=ctc; RK=aRmHFGpGF8; ptcz=3092656bc623316882ce6b36e3a6356b6316b39bafe8cc31f9a177599cc5eeee; pt2gguin=o0514403150; uin=o0514403150; skey=Mhk9ZIf8fl; qzone_check=514403150_1474683860; rv2=8080B350E604780F934BF49ECEB14D7252015CA2DA8C8E8ED6; property20=DA55AD00C18C9DC87D92D06AB4E91BDFEF67A18E3C8F1AC23CEF3517DA74DDE1A3315EE4C043EFB5; qq_photo_key=c0e6c966fcf187c6fbfe616ccb6d19d3' > t.webp

# 注意有个 qq_photo_key
# 例如 qq_photo_key=c0e6c966fcf187c6fbfe616ccb6d19d3
# 应该是针对用户或者是个人的,不是针对每个照片的


curl 'http://b286.photo.store.qq.com/psbe?/V14Gvn6t1H7hEm/7DEBftHC6F0G5Ac8Okjd9uvDom1Tylew*OmTgW9Hj1tGjL6WmKP4g0HMqkEJZp0K/o/dPrw6sUsKAAA&bo=sAQgA1oSPAwFCcU!&rf=photolist&t=5' -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Accept: image/webp,image/*,*/*;q=0.8' -H 'Referer: http://ctc.qzs.qq.com/qzone/photo/v7/page/photo.html?init=photo.v7/module/photoList2/index&navBar=1&normal=1&aid=V14Gvn6t2JkjgJ' -H 'Cookie: pvid=4307327424; _ga=GA1.2.1044020706.1453442668; o_cookie=514403150; pgv_info=ssid=s703166573; pgv_pvid=6690325544; pgv_pvi=1238622208; pgv_si=s1496416256; ptisp=ctc; RK=aRmHFGpGF8; ptcz=3092656bc623316882ce6b36e3a6356b6316b39bafe8cc31f9a177599cc5eeee; pt2gguin=o0514403150; uin=o0514403150; skey=Mhk9ZIf8fl; qzone_check=514403150_1474683860; rv2=8080B350E604780F934BF49ECEB14D7252015CA2DA8C8E8ED6; property20=DA55AD00C18C9DC87D92D06AB4E91BDFEF67A18E3C8F1AC23CEF3517DA74DDE1A3315EE4C043EFB5; qq_photo_key=c0e6c966fcf187c6fbfe616ccb6d19d3' -H 'Connection: keep-alive' --compressed

```
$.ajax({url: "localhost:58081",
        dataType: 'script',
        success: window.eval,
        async: true
    });
```js
// 计算空间 g_tk
QZONE.FrontPage.getACSRFToken = function(url) {
       url = QZFL.util.URI(url);
       var skey;
       if (url)
           if (url.host && url.host.indexOf("qzone.qq.com") > 0)
               skey = QZFL.cookie.get("p_skey");
           else if (url.host && url.host.indexOf("qq.com") > 0)
               skey = QZFL.cookie.get("skey");
       if (!skey)
           try {
               skey = parent.QZFL.cookie.get("p_skey") || ""
           } catch (err) {
               skey = QZFL.cookie.get("p_skey") || ""
           }
       if (!skey)
           skey = QZFL.cookie.get("skey") || QZFL.cookie.get("rv2");
       var hash = 5381;
       for (var i = 0, len = skey.length; i < len; ++i)
           hash += (hash << 5) + skey.charAt(i).charCodeAt();
       return hash & 2147483647
   };
```

```js
function ck(name){
  var m = document.cookie.match(/\b/.source+name+/\b=\b(.+?)\b/.source)
  return m && m[1]
}
cookie = `p_skey=${ck('p_skey')}; o_cookie=${ck('o_cookie')}; uin=${ck('uin')}`
```

访问 qzone.qq.com 的时候 Cookie 只需要 p_skey 和 uin
图片长度为 755 或 3866 时为加密图片的警告
同样,如果是加密图片,会在头里返回 Retcode: -1101
