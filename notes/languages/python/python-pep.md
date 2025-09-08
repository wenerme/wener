---
title: PEPs
---

# Python Enhancement Proposals

- PEPs
- [PEP 508 – Dependency specification for Python Software Packages](https://peps.python.org/pep-0508/)
  - Environment Markers
    - `python_version` - `'.'.join(platform.python_version_tuple()[:2])` - 3.4, 2.7
    - `python_full_version`
    - `os_name` - `os.name` - posix, java
    - `sys_platform` - `sys.platform` - linux
    - `platform_release` - `platform.release()` - 5.4.0-42-generic
    - `platform_system` - `platform.system()` - Linux, Windows, Java
    - `platform_version` - `platform.version()` - #42-Ubuntu SMP Fri Jan 15 12:00:00 UTC 2021
    - `platform_machine` - `platform.machine()` - x86_64
    - `platform_python_implementation` - `platform.python_implementation()` - CPython, Jython
    - `implementation_name` - `sys.implementation.name` - cpython
    - `implementation_version` - 3.4.0, 3.5.0b1
    - `extra` - test
