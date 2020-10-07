# Arduino

* [arduino/arduino-cli](https://github.com/arduino/arduino-cli)

## managers
* http://arduino.esp8266.com/stable/package_esp8266com_index.json
* http://digistump.com/package_digistump_index.json
* http://drazzy.com/package_drazzy.com_index.json

## cli
* [How to compile, upload and monitor via the Linux command line?](https://arduino.stackexchange.com/questions/15893)
* https://github.com/arduino/serial-discovery
* 配置
  * macOS - $HOME/Library/Arduino15/arduino-cli.yaml
```bash
# macos
brew install arduino-cli

# linux
curl -LO https://downloads.arduino.cc/arduino-cli/arduino-cli_latest_Linux_64bit.tar.gz
tar zxvf arduino-cli_latest_Linux_64bit.tar.gz
sudo mv arduino-cli /usr/local/bin/

arduino-cli config init

arduino-cli core update-index
arduino-cli core search

arduino-cli core update-index --additional-urls http://digistump.com/package_digistump_index.json
arduino-cli core install digistump:avr --additional-urls http://digistump.com/package_digistump_index.json

arduino-cli board list

arduino-cli sketch new FirstSketch

```
