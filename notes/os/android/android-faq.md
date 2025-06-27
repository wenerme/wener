---
tags:
- FAQ
---

# Android FAQ

- https://developer.android.com/reference/android/view/KeyEvent.html#KEYCODE_PASTE

## shell input utf8

```bash
# 会出错
adb shell input text "你好"

# 使用剪切板
adb shell input keyevent 279
adb shell input keyevent PASTE
```
