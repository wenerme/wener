---
title: FastAPI
---

# FastAPI

```bash
pip install fastapi uvicorn python-multipart python-dotenv

# for dev
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# for simple prod
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --log-level info
# for prod
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
