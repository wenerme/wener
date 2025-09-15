---
tags:
  - FAQ
---

# Printing FAQ

- 喷墨是摄影师和实验室优先选择的类型
- L3250


```bash
# nmap 发现 printer
nmap -p 9100 192.168.1.1

dns-sd -B _ipps._tcp
lpinfo -v
ippfind

# "/System/Library/Frameworks/ApplicationServices.framework/Versions/A/Frameworks /PrintCore.framework/Versions/A/Resources/Generic.ppd"
lpadmin -p Printer_Name -L "Printer Location" -E -v ipp://10.1.20.12  -P /Library/Printers/PPDs/Contents/Resources/Printer_Driver.gz
```

## 染料墨水 vs 颜料墨水

- 染料/Dye
  - 天然原料（例如某些植物）或合成原料（主要来源）的染料溶于水制成
  - 办公打印或者业余摄影作品打印
  - 优点
    - 仅有非常少的光线被漫射，因此打印作品的颜色饱满而鲜艳。
    - 墨水可在纸张涂层更好地分散，以保持相同类型纸张的光泽。
    - 生产成本不高
  - 缺点
    - 对于光线、湿度和氧化很敏感
- 颜料/Pigmentaires
  - 颜料（有机分子原料），在合成树脂中封装，然后在液体内悬浮放置
  - 颜料的分子远大于染料的分子
  - 用于专业或者半专业打印机，用于打印注重保存的作品。
  - 优点
    - 耐光性、抗潮性以及抗氧化（包括臭氧）等
  - 缺点
    - 墨水不能够完全的附着到涂层并会改变一些纸张的原始表面外观 （主要光面纸张）。
    - 对同色异谱以及烫金的不利影响是这项墨水技术的另一缺点。
    - 颜料墨水非常复杂，生产成本高昂

## 喷墨相纸时间长了变黄

- 染料墨水，不抗紫外线，时间长了褪色
- 颜料墨水耐光，但不是所有打印机都支持
