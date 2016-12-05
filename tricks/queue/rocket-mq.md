
## Setup
```bash
wget -cN -O alibaba-rocketmq-3.2.6.tar.gz https://github.com/alibaba/RocketMQ/releases/download/v3.2.6/alibaba-rocketmq-3.2.6.tar.gz
tar zxvf alibaba-rocketmq-*.gz
cd alibaba-rocketmq*
export ROCKETMQ_HOME=$PWD
file bin/* |grep shell|sed -e "s/^\([^:]*\).*/\1/"|xargs chmod +x

./bin/mqnamesrv > ns.log 2>&1 &
./bin/mqbroker -n 127.0.0.1:9876 > bk.log 2>&1 &
./bin/mqadmin  clusterList -n 127.0.0.1:9876
```
