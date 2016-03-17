
# Simulate fast tap

```
adb shell "while true;do cat /mnt/sdcard/events > /dev/input/event1 && sleep 0.01; done;"
```
