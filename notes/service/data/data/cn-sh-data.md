---
title: 上海与法院数据源
tags:
  - Data
  - China
  - Shanghai
  - Court
  - Government
---

# 上海与法院数据源

## 上海政府数据

- [上海市市场监督管理局: 许可列表](http://xk.scjgj.sh.gov.cn/xzxk_wbjg/#/licenceListscjgj) (需浏览器交互)
- [上海市高级人民法院: 执行信息](http://www.hshfy.sh.cn/shfy/web/zxxx.jsp)
- [上海市高级人民法院: 裁判文书](http://www.hshfy.sh.cn/shfy/web/cpws.jsp)

## 全国法院系统

- [中国执行信息公开网 (失信被执行人)](http://zxgk.court.gov.cn/shixin/)
- [中国庭审公开网](http://tingshen.court.gov.cn/)
- [执行信息文件 (PDF)](http://zxgk.court.gov.cn/xglfile/1118/2020-06-19/7bba39576a7a40d9872896798b4b8423.pdf)

## 其他政府与公共数据

- [国家标准全文公开系统 (SAMR)](http://std.samr.gov.cn/gb/search/gbQueryPage?searchText=&ics=&state=&ISSUE_DATE=&sortOrder=asc&pageSize=50&pageNumber=1)
- [全国标准信息公共服务平台 (SAC)](http://hbba.sacinfo.org.cn/)
  - [详情示例](http://hbba.sacinfo.org.cn/rnDetail/748c1243c96d6757b744c22adec730abff06c7537174fb9c463809a3fe2b028c)
- [人力资源和社会保障部 (MOHRSS)](http://www.mohrss.gov.cn/SYrlzyhshbzb/jiuye/gzdt/202108/t20210816_420736.html) (可参考归档)

## 技术参考

- **CDN**: `anyu.qianxin.com`

### 访问脚本

```bash
# 生成 SAMR 分页 URL
for i in $(seq 1222); do echo "http://std.samr.gov.cn/gb/search/gbQueryPage?searchText=&ics=&state=&ISSUE_DATE=&sortOrder=asc&pageSize=50&pageNumber=$i"; done | pbcopy
```
