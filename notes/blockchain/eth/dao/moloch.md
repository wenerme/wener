---
title: Moloch
---

# Moloch

- [MolochVentures/moloch](https://github.com/MolochVentures/moloch)
  - DAO 管理合约
- [Moloch.sol](https://github.com/MolochVentures/moloch/blob/master/contracts/Moloch.sol)
- 参考
  - https://daohaus.club/docs/devs/
  - [HausDAO/Molochv2.1](https://github.com/HausDAO/Molochv2.1)
    - Moloch DAO v2 + multi-summoner + register
  - [HausDAO/MinionSummoner](https://github.com/HausDAO/MinionSummoner)
  - [raid-guild/moloch-minion](https://github.com/raid-guild/moloch-minion)

**HausDAO/Molochv2.1**

| Moloch                     |                     default |
| -------------------------- | --------------------------: | ---------- |
| address[] summoner         |                             | 初始成员   |
| address[] approvedTokens   |                             | 允许的币种 |
| uint256 periodDuration     | 17280s = 4.8 hours = 5/days |
| uint256 votingPeriodLength |                 35 = 7 days | 投票周期   |
| uint256 gracePeriodLength  |                 35 = 7 days | 宽限期     |
| uint256 proposalDeposit    |                             | 提案押金   |
| uint256 dilutionBound      |                           3 | 稀释结合   |
| uint256 processingReward   |                         0.1 |
| uint256[] summonerShares   |                             | 成员配股   |

- dilution bound
- https://consensys.net/diligence/audits/2020/01/the-lao

| Member                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| address delegateKey         | the key responsible for submitting proposals and voting - defaults to member address unless updated                |
| uint256 shares              | the # of voting shares assigned to this member                                                                     |
| uint256 loot                | the loot amount available to this member (combined with shares on ragequit)                                        |
| bool exists                 | always true once a member has been created                                                                         |
| uint256 highestIndexYesVote | highest proposal index # on which the member voted YES                                                             |
| uint256 jailed              | set to proposalIndex of a passing guild kick proposal for this member, prevents voting on and sponsoring proposals |

{ label: 'Primary token', value: 'WMATIC' },
{ label: 'Proposal velocity', value: '12 per day' },
{ label: 'Voting period', value: '5 days' },
{ label: 'Grace period', value: '2 days' },
{ label: 'Proposal deposit', value: '10 WMATIC' },
{ label: 'Proposal reward', value: '1 WMATIC' },
