---
title: Rate Limits
---

# Rate Limits

| abbr. | stand for             | meaning          |
| ----- | --------------------- | ---------------- |
| IPM   | Image Per Minute      | 每分钟图像数     |
| RPD   | Requests Per Day      | 每天请求数       |
| RPM   | Requests Per Minute   | 每分钟请求数     |
| TPD   | Tokens Per Day        | 每天令牌数       |
| TPM   | Tokens Per Minute     | 每分钟令牌数     |
| TTFT  | Tokens To First Token | 第一个令牌的时间 |
| TPOT  | Time Per Output Token | 每个输出的时间   |
| E2EL  | End To End Latency    | 端到端延迟       |
| RPS   | Requests Per Second   | 每秒请求数       |
| TPS   | Tokens Per Second     | 每秒令牌数       |

- 保护被调用方
- 持续的流量整形（Shaping）或节流（Throttling）
- Bucket Algorithm - 漏桶算法
- TPOT - Inter Token Latency
- HTTP 402：Payment Required/需要付费。通常用于表示后续请求需要支付费用。
- HTTP 429：Too Many Requests/请求过多。表示用户在限定时间内发送了过多请求（即触发了速率限制）。
- [OpenAI Rate Limits](https://platform.openai.com/docs/guides/rate-limits)
  - 会基于 max_tokens 和估算的 input tokens 来限制请求
- [Anthropic Rate Limits](https://docs.anthropic.com/en/api/rate-limits)
- [Google Cloud Gemini Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- https://openrouter.ai/docs/api-reference/limits
- https://bentoml.com/llm/inference-optimization/llm-inference-metrics

## 令牌桶

- Token bucket
- 用于流量整形（Traffic Shaping）和速率限制（Rate Limiting）
- https://en.wikipedia.org/wiki/Token_bucket

```ts
class TokenBucket {
  // 桶的容量，即桶中最多可以存放的令牌数
  private readonly capacity: number;

  // 令牌的补充速率 (每秒补充多少个令牌)
  private readonly refillRatePerSecond: number;

  // 当前桶中的令牌数量
  private tokens: number;

  // 上一次补充令牌的时间戳 (毫秒)
  private lastRefillTimestamp: number;

  constructor(capacity: number, refillRatePerSecond: number) {
    this.capacity = capacity;
    this.refillRatePerSecond = refillRatePerSecond;

    // 初始时，桶是满的
    this.tokens = capacity;
    // 记录初始时间
    this.lastRefillTimestamp = Date.now();
  }

  /**
   * 尝试消耗指定数量的令牌。
   * 这是外部调用的主要方法。
   * @param count 需要消耗的令牌数量
   * @returns 如果令牌足够则返回 true，否则返回 false
   */
  public tryConsume(count: number): boolean {
    // 1. 在消耗之前，先根据流逝的时间补充令牌
    this.refill();

    // 2. 检查当前令牌是否足够
    if (this.tokens >= count) {
      // 如果足够，则扣除相应数量的令牌
      this.tokens -= count;
      return true;
    }

    // 3. 如果令牌不足，则不允许消耗
    return false;
  }

  /**
   * 内部方法：补充令牌。
   * 根据距离上次补充的时间，计算应增加多少新令牌。
   */
  private refill(): void {
    const now = Date.now();
    const elapsedTime = now - this.lastRefillTimestamp;

    if (elapsedTime > 0) {
      // 计算在这段时间内应该补充多少令牌
      // (速率 / 1000) 得到每毫秒的速率
      const tokensToAdd = elapsedTime * (this.refillRatePerSecond / 1000);

      // 增加令牌，但确保总数不超过桶的容量
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);

      this.lastRefillTimestamp = now;
    }
  }
}
```



