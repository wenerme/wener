---
title: Polygon
---

# Polygon

- [maticnetwork](https://github.com/maticnetwork)
- [polygon.technology](https://polygon.technology)
- ChianId 137
- 解决 Ethereum 性能和效率问题
- Proof of Stake
- 原币 MATIC
- Layer-2 - 基于 Ethereum 合约
- 测试网络 Mumbai
  - https://faucet.polygon.technology/
- Adopted by: Aave, OpenSea, Curve, Decentraland, UniSwap, SushiSwap, CoinSwitch
- 参考
  - https://polygonscan.com/
  - https://polygontech.medium.com/

## Validator

- Matic is a hybrid Plasma + Proof-of-Stake (PoS)
- Heimdall
  - Matic PoS validator node
  - checkpointing a representation of the Plasma blocks to the main chain
  - 基于 Tendermint consensus engine
- Bor - Block Producer layer
  - Matic main node
  - sidechain operator
  - Geth+consensus algorithm
- Docker
  - [maticnetwork/bor](https://hub.docker.com/r/maticnetwork/bor) - Alpine 30MB
    - Ports: 30303 30303/udp 8545 8546 8547
    - /usr/local/bin/{bor,bootnode}
  - [maticnetwork/heimdall](https://hub.docker.com/r/maticnetwork/heimdall) - Ubuntu 800MB
    - Ports: 1317, 26656, 26657
    - /go/bin
- Snapshot - https://snapshots.matic.today/
  - https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-03-16.tar.gz
    - 900G
  - https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-04-30.tar.gz
    - 140G

```bash
# install go,git,jq,rabbitmq-server

mkdir bin

git clone https://github.com/maticnetwork/bor.git
git clone https://github.com/maticnetwork/heimdall.git
(cd bor && make bor-all)
(cd heimdall && make install network=mainnet)

ln -s bor/build/bin/bor bin
ln -s bor/build/bin/bootnode bin
ln -s ~/go/bin/heimdalld bin
ln -s ~/go/bin/heimdallcli bin
ln -s ~/go/bin/bridge bin

mkdir ~/.heimdalld

git clone https://github.com/maticnetwork/launch.git
# node_type: sentry/sentry, sentry/validator, without-sentry
cp -rf launch/mainnet-v1/sentry/sentry ~/node

(cd ~/node/heimdall && bash setup.sh)
(cd ~/node/bor && bash setup.sh)
# 生产 systemd service 文件
# heimdalld.service, heimdalld-rest-server.service, heimdalld-bridge.service, bor.service
# (cd ~/node/mainnet-v1 && bash service.sh)

# /etc/matic, /etc/matic/metadata
mkdir /etc/matic
cp -rf launch/mainnet-v1/metadata /etc/matic/metadata
```

---

- https://github.com/maticnetwork/node-ansible
- [heimdall-and-bor](https://medium.com/the-polygon-blog/heimdall-and-bor-1f8f881cd6a4)
- https://blog.matic.network/plasma-predicates-one-step-towards-generalized-plasma/
- https://polygon.technology/staking/
- https://wallet.polygon.technology/staking/rewards-calculator/
- https://snapshots.matic.today/
  - 中国快照
- [Full Node Deployment](https://docs.polygon.technology/docs/integrate/full-node-deployment/)
