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
