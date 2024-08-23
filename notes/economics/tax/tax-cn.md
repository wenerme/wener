---
tags:
  - China
---

# China Tax

- 增值税发票开票软件（税务 UKey 版）
- https://inv-veri.chinatax.gov.cn/index.html
- https://inv-veri.chinatax.gov.cn/xgxz.html
  - 下载
- 增值税电子普通发票资料统计
- https://shanghai.chinatax.gov.cn/newxbwz/wsbs/wsbsdtll/WSBSdtllCtrl-cxfjcxdom.pfv?qjdm=13102260000
  - 办税大厅流量
- https://wlpage-file-manage.oss-cn-beijing.aliyuncs.com/home/%E7%AD%BE%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BA%B3%E7%A8%8E%E4%BA%BA%E8%AF%81%E4%B9%A6%E5%88%B6%E4%BD%9C%E7%94%B3%E8%AF%B7%E6%98%8E%E7%BB%86%E8%A1%A8%2828%29.xlsx
  - 杭州晟易网络技术服务有限公司

## Service

- https://etax.guangdong.chinatax.gov.cn/xxmh/portalSer/checkLogin.do
- https://tpass.guangdong.chinatax.gov.cn:8443/
- https://tpass.shanghai.chinatax.gov.cn:8443/#/login
- tpass
  - 新版登录
  - 税务行政管理系统
  - 税务公共管理服务系统

```json
{
  "120000": ["tpass.tianjin.chinatax.gov.cn", "dppt.tianjin.chinatax.gov.cn"],
  "150000": ["tpass.neimenggu.chinatax.gov.cn", "dppt.neimenggu.chinatax.gov.cn"],
  "310000": ["tpass.shanghai.chinatax.gov.cn", "dppt.shanghai.chinatax.gov.cn"],
  "330200": ["tpass.ningbo.chinatax.gov.cn", "dppt.ningbo.chinatax.gov.cn"],
  "350000": ["tpass.fujian.chinatax.gov.cn", "dppt.fujian.chinatax.gov.cn"],
  "350200": ["tpass.xiamen.chinatax.gov.cn", "dppt.xiamen.chinatax.gov.cn"],
  "410000": ["tpass.henan.chinatax.gov.cn", "dppt.henan.chinatax.gov.cn"],
  "440300": ["tpass.shenzhen.chinatax.gov.cn", "dppt.shenzhen.chinatax.gov.cn"],
  "500000": ["tpass.chongqing.chinatax.gov.cn", "dppt.chongqing.chinatax.gov.cn"],
  "510000": ["tpass.sichuan.chinatax.gov.cn", "dppt.sichuan.chinatax.gov.cn"],
  "610000": ["tpass.shaanxi.chinatax.gov.cn", "dppt.shaanxi.chinatax.gov.cn"],
  "620000": ["tpass.gansu.chinatax.gov.cn", "dppt.gansu.chinatax.gov.cn"]
}
```

- 直接进入
  - `https://etax.shanghai.chinatax.gov.cn/wszx-web/bszm/apps/views/companyPage/desktopTax.html?DZSWJ_TGC={DZSWJ_TGC}&_lot={CODE}#/change`
- https://etax.shanghai.chinatax.gov.cn/yhzx-web/api/user/userInfo/get
  - loginType=gswb
  - dzswjTgc
- 企业登录
  - 短信验证码登录
- CA 登录
- 证书登录
- 税务数字证书
  - https://127.0.0.1:28000/api/getVersion
    - https://tpass.shanghai.chinatax.gov.cn:8443/#/driver
- 其他数字证书
  - https://xk.sheca.com:18456/sheca/checkKey
    - xk.sheca.com -> 127.0.0.1
    - https://xkapp.sheca.com/pages/download.html

<!--
https://180.168.250.141/was5/web/search?page=19&channelid=198173&searchword=%E6%89%80%E5%BE%97%E7%A8%8E%E6%B3%95&keyword=%E6%89%80%E5%BE%97%E7%A8%8E%E6%B3%95&perpage=10&outlinepage=10
-->

## chinatax

```
shanghai.chinatax.gov.cn
etax.shanghai.chinatax.gov.cn
tpass.shanghai.chinatax.gov.cn
```

- 电子税务局存在封 IP 的情况，可以考虑统一解析指向一个 IP
- etax 应该是使用的 aliyun，虽然 ping 得到的 IP 不一样但实际效果应该一样

```
shanghai.chinatax.gov.cn 180.168.250.141
etax.shanghai.chinatax.gov.cn 222.73.150.175
tpass.shanghai.chinatax.gov.cn 112.64.206.161
```

```
etax.shanghai.chinatax.gov.cn. CNAME gtm-cn-zvp2lk6hz05.shanghai.chinatax.gov.cn.
tpass.shanghai.chinatax.gov.cn.	CNAME	gtm-cn-7pp2po3y80a.shanghai.chinatax.gov.cn
```

- gtm-cn-
  - GTM 阿里云 全局流量管理
- vbrqh41
  - 境外 WAF
- ga-
  - GA 加速、全球加速
- https://help.aliyun.com/zh/gtm/gtm-works-with-waf-ga-and-slb
