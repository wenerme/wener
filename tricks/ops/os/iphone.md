# iPhone

## 铃声

```bash
# 将下载好的 mp3 转换为铃声格式
ffmpeg -i ringtone.mp3 -y ringtone.m4a
# 然后需要将 m4a 重命名为 m4r
mv ringtone.m4a ringtone.m4r
# 或者一步到位
ffmpeg -i ringtone.mp3 -ac 1 -ab 128000 -f mp4 -acodec libfaac -y ringtone.m4r
# 因为铃声只能大约 30s 所以可以直接裁剪
ffmpeg -i ringtone.mp3 -t 30 -ac 1 -ab 128000 -f mp4 -acodec libfaac -genre Ringtone -y ringtone.m4r
```
