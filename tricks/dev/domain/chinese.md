# Chinese

## Tips
* http://www.zdic.net/
* 《现代汉语常用字表》
  * 常用字, 2500字 http://www.zdic.net/z/zb/cc1.htm
  * 次常用字, 1000字 http://www.zdic.net/z/zb/cc2.htm
* 《现代汉语通用字表》
  * 7000字
  * http://www.zdic.net/z/zb/ty.htm
https://zh.wikipedia.org/wiki/通用规范汉字表
http://www.gov.cn/gzdt/att/att/site1/20130819/tygfhzb.pdf
https://zh.wikisource.org/zh-hans/通用规范汉字表

* 词库
  * 搜狗
    * http://pinyin.sogou.com/dict/


“”

https://zh.wikipedia.org/wiki/标点符号

https://zh.wikipedia.org/wiki/GB_13000
GB 13000.1-93《信息技术　通用多八位编码字符集（UCS）第一部分：体系结构与基本多文种平面》
“GB 13000.1-93”等同于Unicode 1.1版本。
GB 13000.1-93的字符集包含20,902个汉字，附录是GBK。
http://web.archive.org/web/20160728025407/http://www.china-language.gov.cn/wenziguifan/scanning/zfjhzzx/gfbz30.htm

GB 13000-2010
http://www.gb688.cn/bzgk/gb/newGbInfo?hcno=F8C3F74E28446DBFC80F349933CFDAD5
2011-11-01实施,代替GB 13000.1-1993 根据2017年第7号公告和强制性标准整合精简结论，自2017年3月23日起,该标准转化为推荐性标准，不再强制执行。
中国标准分类号（CCS） L71 国际标准分类号（ICS） 35.040

江苏标注信息查询
http://www.tsinfo.js.cn/standardSearch/quickly_search.aspx

https://wenku.baidu.com/view/c30c6e66866fb84ae45c8dee.html

https://web.archive.org/web/20101130205224/http://www.yys.ac.cn:80/gfbz/




## 笔画
http://www.soehs.com/liveislove/upfile/doc/bihua.pdf
汉字笔画名称表

笔画查询
https://bihua.51240.com/

## 拼音
* https://github.com/belerweb/pinyin4j
* https://github.com/stuxuhai/jpinyin


https://github.com/mozillazg/pinyin-data


在注音的符号, ɑ 和 a 可互换, 一般用后者即可
```
ɑaeiouüAEIOUÜ
ɑ̄āēīōūǖĀĒĪŌŪǕ
ɑ́áéíóúǘÁÉÍÓÚǗ
ɑ̌ǎěǐǒǔǚǍĚǏǑǓǙ
ɑ̀àèìòùǜÀÈÌÒÙǛ
```

声调, 在前面加一个字母会将音调加在上面
```
̄
́
̌
̀
```

## 繁體字
* https://github.com/stuxuhai/jpinyin/blob/master/src/main/java/com/github/stuxuhai/jpinyin/ChineseHelper.java

## 笔画

## 搜狗 scel 格式

搜狗的scel词库就是保存的文本的unicode编码，每两个字节一个字符（中文汉字或者英文字母）
找出其每部分的偏移位置即可
主要两部分

1. 全局拼音表，貌似是所有的拼音组合，字典序
      格式为(index,len,pinyin)的列表
      index: 两个字节的整数 代表这个拼音的索引
      len: 两个字节的整数 拼音的字节长度
      pinyin: 当前的拼音，每个字符两个字节，总长len

2. 汉语词组表
      格式为(same,py_table_len,py_table,{word_len,word,ext_len,ext})的一个列表
      same: 两个字节 整数 同音词数量
      py_table_len:  两个字节 整数
      py_table: 整数列表，每个整数两个字节,每个整数代表一个拼音的索引

      word_len:两个字节 整数 代表中文词组字节数长度
      word: 中文词组,每个中文汉字两个字节，总长度word_len
      ext_len: 两个字节 整数 代表扩展信息的长度，好像都是10
      ext: 扩展信息 前两个字节是一个整数(不知道是不是词频) 后八个字节全是0
