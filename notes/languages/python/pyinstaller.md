---
title: PyInstaller
tags:
- Bundle
---

# PyInstaller

- pyi-makespec
- MEI - MEIPASS
  - sys.\_MEIPASS
  - `C:\Users\<username>\AppData\Local\Temp`

```bash
pyi-makespec --onefile --windowed --name myapp app.py
```

```py
import sys
import os

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)
```
