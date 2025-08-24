---
tags:
  - Learning
---

# PyTorch Learning

- 以下划线结尾的操作（如 xxx_）会原地执行，避免不必要的内存拷贝

```py
import torch.nn as nn

# 定义模型
class RegressionModel(nn.Module):
  def __init__(self):
    super().__init__()
    self.a =  nn.Parameter(torch.randn(1,
                                         requires_grad=True,
                                         dtype=torch.float))
    self.b = nn.Parameter(torch.randn(1,
                                         requires_grad=True,
                                         dtype=torch.float))
    self.c = nn.Parameter(torch.randn(1,
                                         requires_grad=True,
                                         dtype=torch.float))

  def forward(self, x:torch.Tensor) -> torch.Tensor:
    return self.a * x ** 2 + self.b * x + self.c

model = RegressionModel()

# 加载模型
# model.load_state_dict(torch.load("model.pth"))
# model.load_state_dict(safetensors.torch.load_file("model.safetensors"))

# 选择损失函数
loss_fn = nn.L1Loss()

# 定义优化器函数 - 有许多函数可用，但常见的有
# optim.SGD(), optim.Adam()
optimizer = torch.optim.SGD(params=model.parameters(), lr=0.01)

# 测试数据

# 真实参数, 模型要学习的
a, b, c = 0.2, 0.3, -0.1
X = torch.arange(-1, 1, 0.001, dtype=torch.float32).unsqueeze(1)  # 生成区间[-1,1)的自变量，并增加一维（形状[N]→[N,1]），避免后续形状不匹配
y = a * X**2 + b * X + c  # 按二次函数关系生成标签

from sklearn.model_selection import train_test_split
# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# epoch 表示完整遍历训练集的次数
# 这是一个超参数，会影响训练时长与收敛效果
epochs = 1000
for epoch in range(epochs):
  model.train()  # 切换到训练模式

  # 1. 前向传播（训练集）
  y_pred_train = model(X_train)

  # 2. 计算训练集损失
  loss = loss_fn(y_pred_train, y_train)

  # 3. 清空上一轮的梯度
  optimizer.zero_grad()

  # 4. 反向传播计算梯度
  loss.backward()

  # 5. 使用优化器更新模型参数
  optimizer.step()

  # 测试环节：监控是否过拟合
  model.eval()  # 切换到评估模式
  with torch.inference_mode():
    # 1. 前向传播（测试集）
    test_preds = model(X_test)
    # 2. 计算测试集损失
    test_loss = loss_fn(test_preds, y_test)

  if epoch % 100 == 0:
    print(f"Epoch: {epoch} | Train loss: {loss} | Test Loss: {test_loss}")

# 保存模型
torch.save(model.state_dict(), "model.pth")
# 保存 safetensor
from safetensors.torch import save_file
save_file(model.state_dict(), "model.safetensors")
```
