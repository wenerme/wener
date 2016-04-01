# Logstash

```bash
# Get started
bin/logstash -e 'input { stdin { } } output { stdout {} }'

bin/logstash -e 'input { generator { } } filter { ruby { code => "sleep 10000" } } output { stdout { codec => dots } }' -w 1 --allow-unsafe-shutdown
```

```bash
git clone https://github.com/logstash-plugins/logstash-input-example.git
cd logstash-input-example
rm -rf .git
cp -R * /path/to/logstash-input-mypluginname/

cd /path/to/logstash-input-mypluginname
mv logstash-input-example.gemspec logstash-input-mypluginname.gemspec
mv lib/logstash/inputs/example.rb lib/logstash/inputs/mypluginname.rb
mv spec/inputs/example_spec.rb spec/inputs/mypluginname_spec.rb
```

需要 Java7u51

## Tips
* 所有处理的数据都在内存中.
* 接收到 SIGTERM 时,会等待正在处理的事件处理完


## FAQ

### Elasticsearch 503 索引建立成功,但没有数据录入

可能出现的情况是在 bulk 时,服务端满足不了写的要求,导致操作阻塞,问题很难定位,因为 ELasticsearch 没有记录具体的错误信息.目前是通过 Tcpdump 定位到的问题.

例如配置为一个主分片两个副分片,那此时至少需要两个节点才能录入数据.


## 参考
* [elastic/logstash](https://github.com/elastic/logstash)
* [grokdebug](http://grokdebug.herokuapp.com/)
