ketama 
======

该算法最开始是开发来替代`memcached`键到服务器的映射算法的.
在这之前,客户端映射键到服务器的方法类似于:
 ` server = serverlist[hash(key)%serverlist.length];`
这就意味着,不管我们从池中增加或删除节点,都会导致所有已经hash的值从新hash到不同的节点,这会导致所有`memcached`的所有缓存失效.

Ketama 使用以下方式来解决了该问题:

* 使用指定的一组服务(例如: 1.2.3.4:11211, 5.6.7.8:11211, 9.8.7.6:11211)
* 将每个服务的字符串都hash为多个(100-200个)无符号整数
* 概念上,这些数字是放置在一个环上的.(想象一个时钟那样,从 0 - 2^32 次方的一个环)
* 每个数组都关联它hash之前的那个服务器地址,因此,一个服务会在环上出现多次.出现的方式会以他们hash后的数字来表示
* 为了将一个键映射到服务器,首先将键值hash为一个无符号整数,然后在环上找到下一个最大的数字.该服务会被选择来存放该键值
* 如果hash的键值接近2^32次方,那么可能在环上没有比该hash值大的的hash,此时返回环上的第一个服务.

这样实现以后,在该服务列表上进行添加和删除只会对一小部分的键值映射产生影响,因此只需要从新映射一小部分值.

此外,如果想要控制服务器的权重,则可以通过增加该服务的hash值数量来实现.

_原文_

This was initially written to replace how our memcached clients mapped keys to servers. 

Previously, clients mapped keys->servers like this:
` server = serverlist[hash(key)%serverlist.length];`

This meant that whenever we added or removed servers from the pool, everything hashed to different servers, which effectively wiped the entire cache.

Ketama solves this problem in the following way:

* Take your list of servers (eg: 1.2.3.4:11211, 5.6.7.8:11211, 9.8.7.6:11211)
* Hash each server string to several (100-200) unsigned ints
* Conceptually, these numbers are placed on a circle called the continuum. (imagine a clock face that goes from 0 to 2^32)
* Each number links to the server it was hashed from, so servers appear at several points on the continuum, by each of the numbers they hashed to.
* To map a key->server, hash your key to a single unsigned int, and find the next biggest number on the continuum. The server linked to that number is the correct server for that key.
* If you hash your key to a value near 2^32 and there are no points on the continuum greater than your hash, return the first server in the continuum.

If you then add or remove a server from the list, only a small proportion of keys end up mapping to different servers.

参考
----

* [原文](http://www.audioscrobbler.net/development/ketama/)
* [参考Java实现](https://github.com/RJ/ketama/blob/master/java_ketama/SockIOPool.java)
* [维基百科 Consistent hashing](http://en.wikipedia.org/wiki/Consistent_hashing)