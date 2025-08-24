---
title: Jupyter Lab
---

# Jupyter Lab

- [jupyterlab/jupyterlab](https://github.com/jupyterlab/jupyterlab)
  - BSD-3
  - next-generation user interface for Project Jupyter
- .ipynb
  - JSON
  - Jupyter Notebook Document Format
- 参考
  - https://jupyter.org/

```bash
uv add jupyterlab
# http://localhost:8888/lab
uv run jupyter lab --ip=0.0.0.0

jupyter lab list

docker run -p 8888:8888 -v "$(pwd):/home/jovyan/work" quay.io/jupyter/scipy-notebook
```
