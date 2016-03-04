# Logstash

```
# Get started
bin/logstash -e 'input { stdin { } } output { stdout {} }'

bin/logstash -e 'input { generator { } } filter { ruby { code => "sleep 10000" } } output { stdout { codec => dots } }' -w 1 --allow-unsafe-shutdown
```

```
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


## 参考
* [elastic/logstash](https://github.com/elastic/logstash)
* [grokdebug](http://grokdebug.herokuapp.com/)
