---
tags:
  - Practice
---

# Poker

- https://github.com/Stephy-Cheung/Yolov4_project-Object_detection_pokercards
- https://juejin.cn/post/7312046910045650983
- https://www.kaggle.com/datasets/jaypradipshah/the-complete-playing-card-dataset
- https://universe.roboflow.com/roboflow-100/poker-cards-cxcvz
  - 完整
- https://universe.roboflow.com/augmented-startups/playing-cards-ow27d

| 类型    | 记号       | English / Alias                      | 中文             |
| ------- | ---------- | ------------------------------------ | ---------------- |
| Suit    | S          | Spade, Spades, Pique, Pikes          | ♠️, 黑桃         |
| Suit    | H          | Heart, Hearts                        | ♥️, 红桃, 红心   |
| Suit    | D          | Diamond, Diamonds, Carreaux, Tiles   | ♦️, 方块         |
| Suit    | C          | Club, Clubs, Trefoil, Clover, Trèfle | ♣️, 梅花, 三叶草 |
| Rank    | A          | Ace                                  | A 牌, 尖         |
| Rank    | J          | Jack, Knave                          | J, 侍从          |
| Rank    | Q          | Queen                                | Q, 王后          |
| Rank    | K          | King                                 | K, 国王          |
| Special | Joker      | Joker                                | 鬼牌             |
| Special | BlackJoker | Black Joker, Little Joker            | 小王             |
| Special | RedJoker   | Red Joker, Big Joker                 | 大王             |
| Special | Wild       | Wild Card                            | 百搭牌, 替用牌   |

- 常见 label 约定：`AS` 表示 Ace of Spades，`10H` 表示 Ten of Hearts
- CV/检测任务里常额外标注 `Card`、`Front`、`Back`，用于只识别牌、正面、背面
- 如果数据集包含 Joker，建议统一为 `RedJoker` / `BlackJoker`，避免和 52 张标准牌混排时歧义

**Labels**

```js
['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].flatMap((v) => ['S', 'H', 'D', 'C'].map((s) => v + s)).join('\n');
// 有些 label 会做 sort
['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  .flatMap((v) => ['S', 'H', 'D', 'C'].map((s) => v + s))
  .sort()
  .join('\n');

['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  .flatMap((v) => ['S', 'H', 'D', 'C'].map((s) => v + s))
  .sort()
  .map((v) => ({ name: v, type: 'any', attributes: [] }));

let base = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  .flatMap((v) => ['S', 'H', 'D', 'C'].map((s) => v + s))
  .sort();
base.unshift('Front', 'Back'); // 正面背面
base.push('RedJoker', 'BlackJoker'); // 如果需要 Joker, 可能还存在 替用牌, Wild Card
base.unshift('Card'); // 如果只需要识别牌
base.map((v) => ({ name: v, type: 'any', attributes: [] }));

/* CVAT
[
  {
    "name": "10C",
    "type": "any",
    "color": "#ff007c",
    "attributes": [{
      "name": "a",
      "input_type": "radio",
      "mutable": true,
      "values": [
        "b"
      ],
      "default_value": "b"
    }]
  }
]
*/
```

| abbr. | en                          | cn              |
| ----- | --------------------------- | --------------- |
| BAC   | Baccarat                    | 百家樂 / 百乐   |
| BJ    | Blackjack                   | 21 点           |
| DDZ   | Dou Dizhu                   | 斗地主          |
| ZJH   | Zha Jin Hua / Golden Flower | 炸金花          |
| TSG   | Tui San Gong                | 推三公          |
| NLH   | No-Limit Texas Hold'em      | 德州扑克 / 德州 |
| PLO   | Pot-Limit Omaha             | 奥马哈          |

**BAC**

| label                    | en                          | cn                |
| ------------------------ | --------------------------- | ----------------- |
| IdleState                | Idle State                  | 空闲 / 等待下一局 |
| Shuffling                | Shuffling                   | 洗牌              |
| Cutting                  | Cutting                     | 切牌              |
| Burning                  | Burning Cards               | 烧牌              |
| PlayerBetting            | Player Betting              | 玩家下注          |
| BettingClosed            | Betting Closed              | 停止下注 / 封盘   |
| Dealing                  | Dealing Cards               | 发牌              |
| RevealingPlayerCards     | Revealing Player Cards      | 揭示闲家牌        |
| RevealingBankerCards     | Revealing Banker Cards      | 揭示庄家牌        |
| DrawingPlayerCard        | Drawing Player Card         | 闲家补牌          |
| DrawingBankerCard        | Drawing Banker Card         | 庄家补牌          |
| CalculatingResults       | Calculating Results         | 计算结果          |
| AnnouncingResults        | Announcing Results          | 宣布结果          |
| CollectingAndPayingChips | Collecting and Paying Chips | 收集和支付筹码    |

- 标注动作阶段时建议使用 `label` 列的 PascalCase，避免空格和大小写不一致
- 如果只做粗粒度识别，可合并 `DrawingPlayerCard` / `DrawingBankerCard` 到 `Dealing`
- 如果只识别桌面状态，可保留 `IdleState`、`PlayerBetting`、`Dealing`、`CalculatingResults`、`CollectingAndPayingChips`
