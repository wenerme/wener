---
title: 机器学习
---

# 机器学习

- [训练](./traning.md)
- [标记](./labeling.md)
- [Comparing Deep Learning Frameworks](https://www.infoq.com/presentations/comparison-deep-learning-frameworks)

| -                 | [tiny-cnn](https://github.com/nyanp/tiny-cnn) | [caffe](https://github.com/BVLC/caffe)                                        | [Theano](https://github.com/Theano/Theano)       | [TensorFlow](https://www.tensorflow.org/) |
| ----------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------- |
| Prerequisites     | **Nothing**(Optional:TBB,OpenMP)              | BLAS,Boost,protobuf,glog,gflags,hdf5, (Optional:CUDA,OpenCV,lmdb,leveldb etc) | Numpy,Scipy,BLAS,(optional:nose,Sphinx,CUDA etc) | numpy,six,protobuf,(optional:CUDA,Bazel)  |
| Modeling By       | C++ code                                      | Config File                                                                   | Python Code                                      | Python Code                               |
| GPU Support       | No                                            | Yes                                                                           | Yes                                              | Yes                                       |
| Installing        | Unnecessary                                   | Necessary                                                                     | Necessary                                        | Necessary                                 |
| Windows Support   | Yes                                           | No\*                                                                          | Yes                                              | No\*                                      |
| Pre-Trained Model | Yes(via caffe-converter)                      | Yes                                                                           | No\*                                             | No\*                                      |

- `*` unofficial version is available

- [DL4J vs. Torch vs. Theano vs. Caffe vs. TensorFlow](https://deeplearning4j.org/compare-dl4j-torch7-pylearn)

```Dockerfile
FROM alpine:3.6
LABEL com.nvidia.volumes.needed="nvidia_driver"
ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}
ENV LD_LIBRARY_PATH /usr/local/nvidia/lib:/usr/local/nvidia/lib64

RUN /bin/sh
```

```bash
docker build -t alpine-nvidia
nvidia-docker run -ti --rm alpine-nvidia
```

## 学习资源

- Awesome
  - [awesome-deep-vision](https://github.com/kjw0612/awesome-deep-vision)
  - [awesome-machine-learning](\* https://github.com/josephmisiti/awesome-machine-learning)
  - [awesome-computer-vision](https://github.com/jbhuang0604/awesome-computer-vision)
- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/)
- [Deep Learning](http://www.deeplearningbook.org/)
- [Data Mining:Practical Machine Learning Tools and Techniques](http://www.cs.waikato.ac.nz/ml/weka/book.html)
- [Deep Learning Tutorials](http://deeplearning.net/tutorial/)
- [CS231n: Convolutional Neural Networks for Visual Recognition](http://vision.stanford.edu/teaching/cs231n/index.html)
- http://wiki.jikexueyuan.com/project/tensorflow-zh
- [colah's blog](http://colah.github.io/)
  - A wandering machine learning researcher, bouncing between groups. I want to understand things clearly, and explain them well.
- [Christopher Bourez's blog](http://christopher5106.github.io/)
- [Andrej Karpathy blog](http://karpathy.github.io/)
  - http://karpathy.github.io/neuralnets/
- [hOCR 中文版](https://github.com/clear-datacenter/plan/wiki/hOCR-%E4%B8%AD%E6%96%87%E7%89%88)
- [Intro to Parallel Programming](https://www.udacity.com/course/intro-to-parallel-programming--cs344)
- [What is the class of this image ?](http://rodrigob.github.io/are_we_there_yet/build/classification_datasets_results.html)
  Discover the current state of the art in objects classification.
- http://theopenacademy.com/content/machine-learning
- InfoQ [Machine Learning](https://www.infoq.com/machinelearning/)

- [Tutorial on Deep Learning](https://simons.berkeley.edu/talks/tutorial-deep-learning)
  - [HN](https://news.ycombinator.com/item?id=13505160)
- [Stanford Natural Language Parser](http://nlp.stanford.edu:8080/parser/index.jsp)
  - [HN](https://news.ycombinator.com/item?id=13449820)
- [How To Get Into Natural Language Processing](https://blog.ycombinator.com/how-to-get-into-natural-language-processing/)
  - [HN](https://news.ycombinator.com/item?id=13445255)
- [Best Practices for ML Engineering from Google](http://martin.zinkevich.org/rules_of_ml/rules_of_ml.pdf)
  - [HN](https://news.ycombinator.com/item?id=13414776)
- [Guide on how to design keyboard PCBs](https://github.com/ruiqimao/keyboard-pcb-guide)
  - [HN](https://news.ycombinator.com/item?id=13406772)
- [MIT 6.S094: Deep Learning for Self-Driving Cars](https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf)
  - [HN](https://news.ycombinator.com/item?id=13411679)
- [6.S094: Deep Learning for Self-Driving Cars](http://cars.mit.edu/)
  - [HN](https://news.ycombinator.com/item?id=13365492)
- [Stanford Unsupervised Deep Learning Tutorial (2014)](http://deeplearning.stanford.edu/tutorial/)
  - [HN](https://news.ycombinator.com/item?id=13353941)
- [Deep Learning Gallery – A curated list of deep learning projects](http://deeplearninggallery.com/)
- [AI/ML Reads](http://aireads.top/)
- http://machinelearningmastery.com/
- [The Missing Roadmap to Self-Study Machine Learning](http://machinelearningmastery.com/machine-learning-roadmap-your-self-study-guide-to-machine-learning/)
  - http://www.jianshu.com/p/82f39ed4f089
