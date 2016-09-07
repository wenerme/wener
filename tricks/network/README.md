
## Tools

### ngrep

[ngrep usage](http://ngrep.sourceforge.net/usage.html)

```
ngrep -q -d eth1 -W byline host stackoverflow.com and port 80
       ^  ^       ^         ^        
       |  |       |         |
       |  |       |         |
       |  |       |         v
       |  |       |         filter expression
       |  |       |         
       |  |       +-->  -W  is set the dump format ("normal", "byline", "single", "none")
       |  |
       |  +---------->  -d  is use specified device instead of the pcap default
       |
       +------------->  -q  is be quiet ("don't print packet reception hash marks")
```
