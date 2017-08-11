# Chinese

* 《现代汉语常用字表》
  * 常用字, 2500字 http://www.zdic.net/z/zb/cc1.htm
  * 次常用字, 1000字 http://www.zdic.net/z/zb/cc2.htm
* 《现代汉语通用字表》
  * 7000字
  * http://www.zdic.net/z/zb/ty.htm
* 词库
  * 搜狗
    * http://pinyin.sogou.com/dict/

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
