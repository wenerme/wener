---
title: Conditional Random Field (CRF)
tags:
  - Algorithm
  - NLP
---

# Conditional Random Field (CRF)

## Overview

- [Wikipedia: Conditional random field](https://en.wikipedia.org/wiki/Conditional_random_field)
- [Paper: An Introduction to Conditional Random Fields](https://arxiv.org/abs/1011.4088)
- [CRF as Recurrent Neural Networks](http://www.robots.ox.ac.uk/~szheng/papers/CRFasRNN.pdf)

## Implementations

- **C++**:
  - [taku910/crfpp](https://taku910.github.io/crfpp/) (CRF++)
  - [chokkan/crfsuite](https://github.com/chokkan/crfsuite) (Fast)
- **Java**:
  - [isher-stern/CRF](https://github.com/asher-stern/CRF)
  - [vinhkhuc/jcrfsuite](https://github.com/vinhkhuc/jcrfsuite) (CRFsuite wrapper)
- **TensorFlow**: [contrib.crf](https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/crf)

## Tools & Corpora

- [YamCha](http://chasen.org/~taku/software/yamcha/) - Yet Another Multipurpose CHunk Annotator.
- [CoNLL-2000 Chunking Task](https://www.clips.uantwerpen.be/conll2000/chunking/)

## CRF++ Usage

```bash
# Installation
git clone https://github.com/taku910/crfpp.git
cd crfpp
./configure --prefix $PWD/dist
# Fix windows include on Linux/Mac if needed
# sed -i '/#include "winmain.h"/d' crf_test.cpp crf_learn.cpp
make install

# Training
crf_learn pattern.txt train.data model.bin -t
```
