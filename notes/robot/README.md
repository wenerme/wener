---
title: Robot
---

# Robot

- 相关领域
  - control - PID、运动学、轨迹、步态
  - locomotion - 足式机器人、行走、跌倒恢复
  - actuator - 舵机、电机、齿隙、摩擦
  - perception - IMU、姿态、本体感觉
  - simulation - MuJoCo、Sim2Real
  - reinforcement-learning
  - hardware - SBC、PCB、BOM、3D 打印件

| abbr. | stand for                        | cn             |
| ----- | -------------------------------- | -------------- |
| PPO   | Proximal Policy Optimization     | 近端策略优化   |
| IMU   | Inertial Measurement Unit        | 惯性测量单元   |
| ToF   | Time of Flight                   | 飞行时间       |
| LiDAR | Light Detection and Ranging      | 激光雷达       |
| PID   | Proportional–Integral–Derivative | 比例–积分–微分 |
| DOF   | Degrees of Freedom               | 自由度         |
| NPU   | Neural Processing Unit           | 神经网络处理器 |
| BAM   | —                                | —              |
| EMF   | Electromotive Force              | 反电动势       |
| SBC   | Single-Board Computer            | 单板计算机     |

| en                      | cn             |
| ----------------------- | -------------- |
| Dynamixel               | Dynamixel 舵机 |
| Servo                   | 舵机           |
| proprioception          | 本体感觉       |
| motor voltage           | 电机电压       |
| Back EMF                | 反电动势       |
| Coulomb friction        | 库仑摩擦       |
| Stribeck friction       | 斯特里贝克摩擦 |
| Load-dependent friction | 负载相关摩擦   |
| Battery voltage         | 电池电压       |
| Voltage sag             | 电压下垂       |
| Command delay           | 指令延迟       |
| gear                    | 齿轮           |
| backslash variant       | 齿隙变化       |
| dead zone               | 死区           |
| position error          | 位置误差       |
| servo-to-servo variance | 舵机间差异     |
| mass                    | 质量           |
| center of mass          | 质心           |
| domain randomization    | 域随机化       |
| curricula               | 课程学习       |
| Policy ABI              | 策略 ABI       |
| actual orientation      | 实际姿态       |
| robotics                |

**关节**

| en         | cn         |
| ---------- | ---------- |
| joint      | 关节       |
| leg        | 腿         |
| hip yaw    | 髋关节偏航 |
| hip roll   | 髋关节横滚 |
| hip pitch  | 髋关节俯仰 |
| knee       | 膝关节     |
| ankle      | 踝关节     |
| head       | 头部       |
| neck pinch | 颈部夹持   |
| head pinch | 头部夹持   |
| head yaw   | 头部偏航   |
| head roll  | 头部横滚   |

**动作**

| en                    | cn               |
| --------------------- | ---------------- |
| behavior              | 行为             |
| twist                 | 扭转             |
| nod                   | 点头             |
| shake                 | 摇头             |
| gaze                  | 注视             |
| pose                  | 姿态             |
| gesture               | 手势             |
| motion                | 动作             |
| action                | 动作（控制指令） |
| joint command         | 关节指令         |
| joint target position | 关节目标位置     |
| joint target velocity | 关节目标速度     |
| torque command        | 力矩指令         |
| trajectory            | 轨迹             |
| keyframe              | 关键帧           |
| interpolation         | 插值             |
| inverse kinematics    | 逆运动学         |
| forward kinematics    | 正运动学         |
| walking gait          | 步态             |
| kick                  | 踢腿             |
| stand up              | 起立             |
| sit down              | 坐下             |
| fall recovery         | 跌倒恢复         |

- 状态
  - joint angle
  - joint velocity
  - IMU orientation
  - angular velocity
  - gravity direction
  - previous action
- IMU
  - accelerometer
  - gyroscope
  - 加速度、角速度、姿态
- MujoCo
- Linux SBC
- BOM, PCB, STL
- Robotis Dynamixel XL330
- Radxa Zero 3 / ROK3566
- Sim2Real

# Servo

- Dynamixel XL330
- Feetech STS3215
- Feetech SCS/STS
- Waveshare Serial Bus Servo
- LewanSoul LX-16A

# IMU

- MPU6050
- ICM42688
- BMI270

# 参考

- https://github.com/pollen-robotics/microduck
