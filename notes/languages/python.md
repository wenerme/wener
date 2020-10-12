# Python
* [Which is the best book for learning python for absolute beginners on their own?](https://www.quora.com/Which-is-the-best-book-for-learning-python-for-absolute-beginners-on-their-own)
* [Think Python](http://greenteapress.com/wp/think-python/)
* [Dive Into Python](http://www.diveintopython.net/)
* [Learn Python the Hard Way](https://learnpythonthehardway.org/book/)
* [PyPy](https://pypy.org)
  * Highly performant implementation of Python 2 in Python
  * Python in Python2 with JIT
* [Anaconda](https://github.com/conda/conda)
  * Package, dependency and environment management for any language—Python, R, Ruby, Lua, Scala, Java, JavaScript, C/ C++, FORTRAN, and more.

```bash
# 确保安装 pip
python -m ensurepip

python3 -m venv <MYVENV>  
python -m virtualenv

brew install pyenv

# poetry
python3 -m venv ~/.venvs/poetry
~/.venvs/poetry/bin/pip install poetry
alias poetry=~/.venvs/poetry/bin/poetry

mkdir useful
cd useful
python3 -m venv build/useful
source build/useful/bin/activate
```

## FAQ

### venv, pyvenv, pyenv, virtualenv, virtualenvwrapper, pipenv
* venv - py3 自带，创建隔离环境，不需要拷贝二进制
* virtualenv - 创建虚拟隔离环境，支持 py2 py3
* pyenv - 多版本隔离
* pyvenv - venv+pyenv
* virtualenvwrapper - virtualenv 扩展
* pipenv - Pipefile+pip+virtualenv
* Pipenv、Poetry - 类似于 yanr 和 bundler

* [What is the difference between venv, pyvenv, pyenv, virtualenv, virtualenvwrapper, pipenv, etc?](https://stackoverflow.com/questions/41573587)

## 词汇

* setup.py
  * 使用代码来描述发布（distribution）
  * 区别于包，一个 distribution 可以包含0或多个包，但一般都是保持 1-1-1 关系：1个发布，1个包，1个名字
  * 一般以引入 setuptools 和 distutils 开始
* `__init__.py`
  * py2 认为包含这文件的就是包/模块
* `__main__.py`
  * 入口
* distutils
  * 内建模块，不推荐使用，很久未维护
* setuptools
  * 非内建模块，但一般虚拟环境都有
  * 最小化代码
```py
import setuptools
setuptools.setup(
    name='my_special_package',
    packages=setuptools.find_packages(),
)
```
* tox
  * 管理虚拟环境
  * 主要用于测试和构建
* DevPI
  * PyPI 兼容的本地开发服务
```bash
pip install devpi-server
devpi-server --start --init

# 指定用户、安装包
pip install devpi-client twine
devpi use http://localhost:3141
devpi user -c testuser password=123
devpi login testuser --password=123
devpi index -c dev bases=root/pypi
devpi use testuser/dev
twine upload --repository http://localhost:3141/testuser/dev \
  -u testuser -p 123 my-package-18.6.0.tar.gz
pip install -i http://localhost:3141/testuser/dev my-package
```
* pex
  * Python 转可执行文件
* shiv
  * 类似于 pex，但更简单，直接使用 pip
* xar - eXecutable ARchive)
  * 设计于打包自包含可的可执文件，以 py 为主
```bash
python setup.py bdist_xar --console-scripts=my-script
```
```py
entry_points=dict(
   console_scripts=["my-script = package.module:function"],
)
```

pyproject.toml
flit

