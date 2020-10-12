# Caffe
* http://christopher5106.github.io/deep/learning/2015/09/04/Deep-learning-tutorial-on-Caffe-Technology.html
* http://adilmoujahid.com/posts/2016/06/introduction-deep-learning-python-caffe/
* https://github.com/Kaixhin/dockerfiles

* [Caffe 深度学习框架上手教程](http://suanfazu.com/t/caffe/281)
* [Caffe tutorial](http://tutorial.caffe.berkeleyvision.org/)
## Tips

* [Caffe Tutorial](http://caffe.berkeleyvision.org/tutorial/)
* jupyter [Caffe Tutorial](http://nbviewer.jupyter.org/github/BVLC/caffe/tree/master/examples/)
* [Caffe Demo](http://demo.caffe.berkeleyvision.org/)

```bash
# https://github.com/BVLC/caffe/tree/master/docker
docker run -ti bvlc/caffe:cpu caffe --version

docker run --rm -u $(id -u):$(id -g) -v $(pwd):$(pwd) -w $(pwd) bvlc/caffe:cpu caffe train --solver=example_solver.prototxt
docker run -ti bvlc/caffe:cpu ipython
# run py
docker run -ti --rm -v $CAFFE_ROOT:$CAFFE_ROOT -w $PWD  bvlc/caffe:cpu ipython

# ipynb
ipython nbconvert --to python <YourNotebook>.ipynb
pip install mistune

jupyter nbconvert --execute <notebook>
alias nbx="jupyter nbconvert --execute --to notebook"
nbx [--inplace] <notebook>
```

## FAQ

### NameError: name 'get_ipython' is not defined
使用 ipython 运行, 或者
```py
from IPython import get_ipython
```

### UsageError: Invalid GUI request u'inline', valid ones are: pyglet, osx, qt5, qt, glut, gtk, gtk3, tk, wx

使用 auto, 而不使用 inline

```bash
get_ipython().magic(u'matplotlib inline')
```
