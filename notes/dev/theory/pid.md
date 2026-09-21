---
title: PID 控制器
tags:
  - Control
  - Robot
---

# PID 控制器

- PID - Proportional–Integral–Derivative
  - 比例–积分–微分控制器。
- [PID controller](https://en.wikipedia.org/wiki/PID_controller)
  - 一种基于反馈的连续控制器。
- 常用于温度、压力、流量、速度、位置和姿态等闭环控制。
- 通过比较设定值 $SP$ 与过程变量 $PV$，根据误差计算控制量 $u$。

## 基本模型

负反馈回路中：

```text
SP ──> (+) ── error ──> PID ──> actuator ──> plant ──> PV
        ^                                           │
        └───────────────────────────────────────────┘
```

$$
e(t) = r(t) - y(t)
$$

- $r(t)$ / $SP$：设定值，期望达到的目标。
- $y(t)$ / $PV$：过程变量，传感器测得的实际值。
- $e(t)$：控制误差。
- $u(t)$ / $CO$：控制器输出，交给执行器的控制量。

理想的连续时间并联形式：

$$
u(t) = b + K_p e(t)
       + K_i \int_0^t e(\tau)\,d\tau
       + K_d \frac{de(t)}{dt}
$$

其中 $b$ 是 bias 或手动输出基线，$K_p$、$K_i$、$K_d$ 分别是比例、积分和微分增益。

传递函数形式：

$$
C(s) = K_p + \frac{K_i}{s} + K_d s
$$

实际控制器通常给微分项增加一阶低通滤波：

$$
C(s) = K_p + \frac{K_i}{s} + K_d\frac{s}{T_f s + 1}
$$

其中 $T_f$ 是微分滤波时间常数。工程实现中不应直接对带噪声的测量值求理想微分。

## 三个控制项

### P: Proportional

$$
u_P(t) = K_p e(t)
$$

- 只响应当前误差。
- $K_p$ 增大通常会加快响应，减小稳态误差，但可能增加超调、振荡和对噪声的敏感度。
- P 控制通常不能消除恒定负载或扰动造成的稳态误差，因为达到平衡时仍需要非零误差来产生控制输出。

### I: Integral

$$
u_I(t) = K_i \int_0^t e(\tau)\,d\tau
$$

- 累积过去的误差。
- 可以消除稳态误差，并补偿恒定负载或偏置。
- $K_i$ 过大容易造成超调、振荡和较长的恢复过程。
- 积分状态会持续累积，即使执行器已经达到输出上限；这会产生 integral windup。

### D: Derivative

$$
u_D(t) = K_d \frac{de(t)}{dt}
$$

- 响应误差变化速度，提供阻尼和提前制动效果。
- 可以减少超调并改善瞬态响应。
- 对测量噪声非常敏感，因为微分会放大高频变化。
- 设定值阶跃会使 $de(t)/dt$ 突然变大，产生 derivative kick；实际控制器通常对 $PV$ 而不是 $error$ 求微分，或对设定值使用权重。

## P、PI、PD 与 PID

不一定要使用三个控制项：

- P
  - 结构简单、响应快，但通常保留稳态误差。
- PI
  - 消除稳态误差，适用于大量温度、流量和速度控制。
  - 没有 D 项时对测量噪声更稳健，但阻尼能力较弱。
- PD
  - 提供比例响应和微分阻尼，不消除稳态误差。
  - 适合已有位置反馈且不希望积分累积的场景。
- PID
  - 同时处理当前误差、历史误差和误差变化趋势，但调试和抗噪声要求更高。

选择原则是从最简单的可用控制器开始；如果 P 已满足要求，不必为了形式完整而加入 I 或 D。

## 设定值与测量值

标准形式常对误差 $e = SP - PV$ 计算全部三项：

$$
u = K_p e + I(e) + D(e)
$$

工程上常见的改进是：

- Derivative on measurement
  - 对 $PV$ 求微分，避免 $SP$ 阶跃导致 derivative kick。
- Setpoint weighting
  - 比例项使用 $b \cdot SP - PV$，微分项使用 $c \cdot SP - PV$，将设定值变化对控制输出的直接冲击降到可接受范围。
- Two-degree-of-freedom PID
  - 分别调节设定值跟踪和扰动抑制，不要求二者使用相同的误差权重。

## 离散实现

对于采样周期 $T_s$，最直接的位置式实现为：

$$
\begin{aligned}
e[k] &= SP[k] - PV[k] \\
I[k] &= I[k-1] + e[k]T_s \\
D[k] &= \frac{e[k] - e[k-1]}{T_s} \\
u[k] &= \mathit{bias} + K_p e[k] + K_i I[k] + K_d D[k]
\end{aligned}
$$

更常见的工程版本使用测量值微分和一阶滤波：

$$
\begin{aligned}
dPV[k] &= \alpha\,dPV[k-1]
  + (1 - \alpha)\frac{PV[k] - PV[k-1]}{T_s} \\
u[k] &= \mathit{bias} + K_p e[k] + K_i I[k] - K_d dPV[k]
\end{aligned}
$$

其中 $0 \leq \alpha < 1$；$\alpha$ 越大，滤波越强，但微分响应越慢。实现时必须明确：

- $T_s$ 使用实际采样时间还是假定固定周期。
- 积分状态使用秒、毫秒还是归一化采样次数。
- 输出单位、输入单位和三个增益的单位。
- 启动、停止、传感器失效和手动/自动切换时如何处理内部状态。

### 位置式与增量式

- Position form
  - 直接计算当前绝对输出 $u[k]$。
  - 易于加入输出限幅、bias 和状态初始化。
- Velocity form / incremental form
  - 计算输出变化量 $\Delta u[k]$，再累加到上一次输出。
  - 适合某些执行器接口和无扰切换，但推导、限幅和微分项处理更容易出错。

离散积分可以使用 Forward Euler、Backward Euler 或 Tustin/trapezoidal 等方法。控制器与被控对象的采样周期、延迟和执行器更新时序必须一起验证，不能只根据连续时间公式选择增益。

## 输出限幅与积分饱和

实际执行器通常存在范围：

$$
\begin{aligned}
u_{\mathrm{raw}} &= \operatorname{PID}(e) \\
u &= \operatorname{clamp}(u_{\mathrm{raw}}, u_{\min}, u_{\max})
\end{aligned}
$$

如果 $u_{\mathrm{raw}}$ 超出范围而积分器仍继续累积，执行器解除饱和后，积累的积分状态会让系统长时间向错误方向输出，这就是 integral windup。

常见 anti-windup 方法：

- Conditional integration / clamping
  - 当输出已经饱和且误差会继续推动饱和方向时，暂停积分。
  - 当误差有助于离开饱和区时，恢复积分。
- Back-calculation
  - 用实际饱和输出与未限幅输出的差值反馈到积分器：

    $$
    I[k] = I[k-1] + T_s\left(e[k] + K_b\left(u[k] - u_{\mathrm{raw}}[k]\right)\right)
    $$

  - $K_b$ 决定解除饱和的速度；过大可能带来额外振荡。
- Integral limit
  - 直接限制积分状态或积分项的最大值。
  - 简单，但不一定能正确反映不同工况下的执行器限制。
- Tracking mode
  - 将外部实际执行器输出反馈给控制器，适用于级联、前馈或多个模块共同限制输出的场景。

输出限幅必须放在清晰定义的位置：通常既要限制真正送往执行器的值，也要把实际输出反馈给 anti-windup 逻辑。只在显示层 clamp 而不通知积分器，不能解决 windup。

## 调参

调参目标通常在响应速度、超调、稳态误差、抗扰动能力、噪声和执行器动作平滑度之间取平衡。

### 手动调参

一个保守流程：

1. 先关闭积分和微分，设置 $K_i = 0$、$K_d = 0$。
2. 从较小的 $K_p$ 开始，逐渐增加，观察上升时间、超调和振荡。
3. 加入较小的 $K_i$，消除稳态误差；观察是否出现低频振荡或 windup。
4. 必要时加入少量 $K_d$，改善阻尼；先滤波，再增加微分增益。
5. 在设定值阶跃、负载变化、传感器噪声和输出饱和下分别测试。
6. 记录一组可回退的参数，而不是只保留“当前感觉最好”的数值。

### 自动调参

常见方法包括基于临界振荡的经验整定、基于阶跃响应的模型整定、频域整定和模型驱动优化。自动调参结果不能替代约束验证，仍需检查：

- 闭环稳定性和相位裕度。
- 执行器饱和、速率限制和死区。
- 采样、计算和通信延迟。
- 传感器噪声与滤波延迟。
- 启动、故障、手动接管和恢复过程。

## C 示例

下面是带输出限幅、条件积分和测量值微分滤波的简化位置式 PID。示例假定 $dt$ 使用秒，输入与输出已经转换到一致的工程单位。

```c
#include <stdbool.h>

typedef struct {
  float kp;
  float ki;
  float kd;
  float derivative_alpha;
  float integral;
  float previous_pv;
  float derivative;
  float output_min;
  float output_max;
  bool initialized;
} pid_controller_t;

static float clampf(float value, float lower, float upper) {
  if (value < lower) return lower;
  if (value > upper) return upper;
  return value;
}

float pid_update(pid_controller_t *pid, float setpoint, float pv, float dt) {
  if (dt <= 0.0f) return 0.0f;

  if (!pid->initialized) {
    pid->previous_pv = pv;
    pid->initialized = true;
  }

  const float error = setpoint - pv;
  const float p = pid->kp * error;
  const float raw_dpv = (pv - pid->previous_pv) / dt;
  pid->derivative = pid->derivative_alpha * pid->derivative
                  + (1.0f - pid->derivative_alpha) * raw_dpv;

  const float candidate_integral = pid->integral + error * dt;
  const float raw_output = p
                         + pid->ki * candidate_integral
                         - pid->kd * pid->derivative;
  const float output = clampf(raw_output, pid->output_min, pid->output_max);

  // 饱和且误差继续推动输出向饱和方向时，暂停积分。
  const bool pushing_high = output >= pid->output_max && error > 0.0f;
  const bool pushing_low = output <= pid->output_min && error < 0.0f;
  if (!pushing_high && !pushing_low) {
    pid->integral = candidate_integral;
  }

  pid->previous_pv = pv;
  return output;
}
```

生产实现通常还需要：积分上下限、back-calculation、输出变化率限制、传感器异常检测、故障安全输出、无扰手动/自动切换和参数运行时校验。

## 常见问题

### 为什么 P 控制有稳态误差？

因为 P 项只有在存在误差时才产生输出。若被控对象需要持续的非零输入来抵抗负载，$e = 0$ 时 P 输出也为零，系统只能在非零误差处达到平衡。I 项可以积累出所需的持续输出。

### 为什么加入 I 后系统变慢或振荡？

积分增加了系统记忆。$K_i$ 过大时，积分状态在系统接近目标前已经累积过多，导致超调；输出饱和时还会产生 windup。应降低 $K_i$、增加 anti-windup，或重新检查采样周期和单位。

### 为什么 D 项让电机或阀门抖动？

微分会放大 $PV$ 噪声。应确认微分对象、增加低通滤波、降低 $K_d$、改善传感器质量，或改用 PI 控制。滤波过强则会增加延迟，不能无限提高滤波强度。

### 增益变大一定更好吗？

不是。较大的 $K_p$ 可能降低误差但增加超调和振荡；较大的 $K_i$ 可能缩短消除稳态误差的时间但增加 windup；较大的 $K_d$ 可能增加阻尼但也会放大噪声。最终参数取决于被控对象、延迟、采样周期和执行器约束。

## 参考

- [MathWorks: Proportional-Integral-Derivative (PID) Controllers](https://www.mathworks.com/help/control/ug/proportional-integral-derivative-pid-controllers.html)
- [MathWorks: Anti-Windup Control Using PID Controller Block](https://www.mathworks.com/help/simulink/slref/anti-windup-control-using-a-pid-controller.html)
- [University of Michigan CTMS: PID Controller Design](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID)
- [PID controller](https://en.wikipedia.org/wiki/PID_controller)
