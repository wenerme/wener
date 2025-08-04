---
title: crawl4ai
---

# crawl4ai

- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai)
  - Apache-2.0, Python, Redis
  - Open-source LLM Friendly Web Crawler & Scraper
  - 支持脚本
  - 支持非常复杂的场景
- Features
  - Generate Clean Markdown
  - Structured Extraction
  - Advanced Browser Control
- 参考
  - https://docs.crawl4ai.com/

```bash
# unclecode/crawl4ai:basic
# http://0.0.0.0:11235/
docker run --rm -it \
  -p 11235:11235 \
  -v $(pwd)/data:/data \
  --name crawl4ai unclecode/crawl4ai:latest
```

| env                 | Default Value |
| ------------------- | ------------- |
| `OPENAI_API_KEY`    |
| `DEEPSEEK_API_KEY`  |
| `ANTHROPIC_API_KEY` |
| `GROQ_API_KEY`      |
| `TOGETHER_API_KEY`  |
| `MISTRAL_API_KEY`   |
| `GEMINI_API_TOKEN`  |

- Caching
  - https://github.com/unclecode/crawl4ai/discussions/784


```py
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    # Create an instance of AsyncWebCrawler
    async with AsyncWebCrawler() as crawler:
        # Run the crawler on a URL
        result = await crawler.arun(url="https://crawl4ai.com")

        # Print the extracted content
        print(result.markdown)

# Run the async main function
asyncio.run(main())
```

- https://docs.crawl4ai.com/api/parameters/
- CrawlerRunConfig
- BrowserConfig
