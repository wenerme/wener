# Structure

* http://courses.csail.mit.edu/6.851/spring12/lectures/

## 前缀
* trie tree
  * 前缀树
* radix tree
  * 根树
  * 基数树
  * 压缩前缀树
* patricia tree
  * radix = 2 时



hello,hat,have

__trie__

```
   e - l - l - o
  /
h - a - t
    \
     v - e
```

__radix__

```
           *
          /
      (ello)
        /
* - h - * -(a) - * - (t) - *
                  \
                  (ve)
                    \
                     *
```

## Suffix

* 后缀数组
* http://stackoverflow.com/questions/9452701
* suffix trie
  * 主要用于
    * 判断 q 是否是 T 的子串
    * 检查 q 是否是 T 的后缀
    * 计算 q 在 T 中出现了几次
    * 找到 T 中重复最长的段
    * 找到 T 和 q 最长的公共子串
  * 空间: 大约每个字符 20 byte,如果要索引的内容很多这个空间还是很大的
  * O(n)
* suffix array
  * [wikipedia](https://en.wikipedia.org/wiki/Suffix_array)
  * 速度比 trie 慢,但是空间更小
  * 基本思路
    * 对所有后缀进行排序
    * 将起始索引的后缀存储到数组
    * 使用二分搜索
  * O(n2 log n)
* https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/suffixtrees.pdf
* https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/
