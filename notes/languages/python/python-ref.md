---
tags:
  - Reference
---

# Python Reference

| abbr.  | stand for               | meaning              |
| ------ | ----------------------- | -------------------- |
| dunder | double underscore       | 双下划线             |
| pyc    | Python Compiled         | 编译后的 Python 代码 |
| GIL    | Global Interpreter Lock | 全局解释器锁         |
| co     | code object             | 编译后的代码对象     |

| dunder             | for            |
| ------------------ | -------------- |
| `__init__`         | 构造函数       |
| `__str__`          | 字符串表示     |
| `__repr__`         | 官方字符串表示 |
| `__len__`          | 长度           |
| `__getitem__`      | 索引           |
| `__setitem__`      | 设置索引       |
| `__delitem__`      | 删除索引       |
| `__iter__(self)`   | 可迭代         |
| `__next__(self)`   | 下一个         |
| `__contains__`     | 包含           |
| `__call__`         | 可调用         |
| **Method**         |
| `__getattr__`      | 获取属性       |
| `__getattribute__` | 获取属性       |
| **Math**           |
| `__add__`          | 加法           |
| `__sub__`          | 减法           |
| `__mul__`          | 乘法           |

```py
source_code = "result = a + b"

# 手动将字符串编译成一个代码对象
code_obj = compile(source_code, filename='<string>', mode='exec')

# 准备一个执行环境（命名空间）
namespace = {'a': 10, 'b': 20}

# 执行代码对象
exec(code_obj, namespace)

# 从命名空间中获取结果
print("Result: ",namespace['result'])  # 输出: 30

# 打印代码对象的类型
print(f"Type of __code__: {type(code_obj)}\n")

# 查看代码对象的所有属性
print("Attributes of the code object:")
for attr in dir(code_obj):
    if attr.startswith('co_'):
        print(f"  - {attr}: {getattr(code_obj, attr)}")


import dis
dis.dis(code_obj) # 反汇编
```

```
Type of __code__: <class 'code'>

Attributes of the code object:
  - co_argcount: 0
  - co_cellvars: ()
  - co_code: b'e\x00e\x01\x17\x00Z\x02d\x00S\x00'
  - co_consts: (None,)
  - co_filename: <string>
  - co_firstlineno: 1
  - co_flags: 64
  - co_freevars: ()
  - co_kwonlyargcount: 0
  - co_lnotab: b''
  - co_name: <module>
  - co_names: ('a', 'b', 'result')
  - co_nlocals: 0
  - co_posonlyargcount: 0
  - co_stacksize: 2
  - co_varnames: ()
```

**dis**

```
  1           0 LOAD_NAME                0 (a)
              2 LOAD_NAME                1 (b)
              4 BINARY_ADD
              6 STORE_NAME               2 (result)
              8 LOAD_CONST               0 (None)
             10 RETURN_VALUE
```

- Dunder Methods
  - `__init__`
- Code Object
  - 编译后的对象
  - pyc
  - `func.__code__`

---

- https://docs.python.org/3/reference/index.html
- https://learnxinyminutes.com/docs/python/
- https://www.online-python.com/
