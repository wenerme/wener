---
id: edgeos
title: EdgeOS
---

# EdgeOS
## Tips
* EdgeOS [User Guide](https://dl.ubnt.com/guides/edgemax/EdgeOS_UG.pdf)
* 参考
  * [Policy-Based Routing](https://help.ui.com/hc/en-us/articles/204952274)
    * [策略路由](https://help.ui.com.cn/hc/zh-cn/articles/360000135162)
  * [WAN Load-Balancing](https://help.ui.com/hc/en-us/articles/205145990)
  * [不同网段多出口路由案列](https://help.ui.com.cn/hc/zh-cn/articles/360000019241)
  * [IP策略路由配置](https://help.ui.com.cn/hc/zh-cn/articles/115000121981)
  * [Dual wan, port forwarding](https://community.ui.com/questions/9974c237-ac77-45d3-a074-3675b50412b6)
    * 使用 DNAT
* switch0
  * 类似于交换机，ER-PoE-5 有 switch 芯片
    * 创建失败 interface switch switch0: does not exist
  * 类似于 Linux Bridge
  * 不支持场景可直接接一个 switch

# 配置

## ssh key
* `system/login/user/<USER>/authentication/public-keys`
  * user@example.com
    * key=KEY内容
    * type=ssh-rsa

```bash
# 上传到路由
scp ~/.ssh/id_rsa.pub ubnt@192.168.1.1:/tmp

# 通过 loadkey 配置
ssh ubnt@192.168.1.1
configure
loadkey ubnt /tmp/id_rsa.pub
commit
save
exit
```

# 系统
* [EdgeOS file system layout and firmware images](https://community.ui.com/questions/b5e5f4c8-20b1-4fae-8689-638ab48cb595)
* /proc/mtd

# 版本

### 2.0 - 2019-1-7
* [v2.0.0](https://community.ui.com/releases/38702c1e-4bab-450e-8bc1-ff9ef863bfb4)
  * ER-X/ER-X-SFP/EP-R6
* Debian 9
