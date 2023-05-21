---
title: LLaMa
---

# llama

- LLaMA-7B, 3.5GB, 6GB
- LLaMA-13B, 6.5GB, 10GB
- LLaMA-30B, 15.8GB, 20GB
- LLaMA-65B, 31.2GB, 40GB
- https://news.ycombinator.com/item?id=35107058
- https://github.com/ZrrSkywalker/LLaMA-Adapter
- https://huggingface.co/blog/stackllama

```bash
# py for
apk add \
  gcc g++ python3 py3-pip musl-dev cmake make pkgconf build-base \
  git openssh-client binutils coreutils util-linux findutils sed grep tar wget curl neofetch \
  rust cargo python3-dev openssl-dev linux-headers

# llama.cpp
# =========
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
make -j

./main -m ./models/7B/ggml-model-q4_0.bin -p "Building a website can be done in 10 simple steps:" -n 512
./main -m ./models/7B/ggml-model-q4_0.bin --file prompts/alpaca.txt --instruct --ctx_size 2048 --keep -1

./main -m ./models/ggml-alpaca-7b-q4.bin --color -f ./prompts/alpaca.txt -ins -b 256 --top_k 10000 --temp 0.2 --repeat_penalty 1 -t 7

# https://github.com/ymcui/Chinese-LLaMA-Alpaca
# =========
apk add rust cargo python3-dev openssl-dev cmake linux-headers
pip install git+https://github.com/huggingface/transformers
pip install sentencepiece
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install peft

git clone https://github.com/huggingface/transformers

# musl pthread_attr_setaffinity_np
python ./transformers/src/transformers/models/llama/convert_llama_weights_to_hf.py \
  --input_dir /ml/models/LLaMA \
  --model_size 7B \
  --output_dir /ml/models/LLaMA-hf
```


<!--
magnet:?xt=urn:btih:ZXXDAUWYLRUXXBHUYEMS6Q5CE5WA3LVA&dn=LLaMA

.pth
magnet:?xt=urn:btih:b8287ebfa04f879b048d4d4404108cf3e8014352&dn=LLaMA&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce

ggml
magnet:?xt=urn:btih:481dee5424b7024433504803a90efd32dae40fdf&dn=LLaMA-ggml-4bit_2023-03-31&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce
-->

---

- https://rentry.org/lmg_models

#->/lmg/ Model Links and Torrents <-

[TOC2]

## Changelog (MDY)

[05-10-2023] - Added WizardLM 13B Uncensored
[05-07-2023] - Added Vicuna 13B Cocktail, bluemoonrp-13b & AlpacaDente2
[05-05-2023] - Added CPU quantization variation links
[05-02-2023] - Initial Rentry

## 4-bit GPU Model Requirements

!!! note VRAM Required takes full context (2048) into account. You may be able to load the model on GPU's with slightly lower VRAM, but you will not be able to run at full context. If you do not have enough RAM to load model, it will load into swap. Groupsize models will increase VRAM usage, as will running a LoRA alongside the model.

| Model Parameters | VRAM Required | GPU Examples                                             | RAM to Load |
| ---------------- | ------------- | -------------------------------------------------------- | ----------- |
| 7B               | 8GB           | RTX 1660, 2060, AMD 5700xt, RTX 3050, RTX 3060, RTX 3070 | 6 GB        |
| 13B              | 12GB          | AMD 6900xt, RTX 2060 12GB, 3060 12GB, 3080 12GB, A2000   | 12GB        |
| 30B              | 24GB          | RTX 3090, RTX 4090, A4500, A5000, 6000, Tesla V100       | 32GB        |
| 65B              | 42GB          | A100 80GB, NVIDIA Quadro RTX 8000, Quadro RTX A6000      | 64GB        |

## 4-bit CPU/llama.cpp RAM Requirements

!!! note 5bit to 8bit Quantized models are becoming more common, and will obviously require more RAM. Will update these with the numbers when I have them.

| Model | 4-bit   | 5-bit | 8-bit |
| ----- | ------- | ----- | ----- |
| 7B    | 3.9 GB  |
| 13B   | 7.8 GB  |
| 30B   | 19.5 GB |
| 65B   | 38.5 GB |

# Original Weights

## LLaMA 16-bit Weights

!!! info

    The original LLaMA weights converted to Transformers @ 16bit. A torrent is available as well, but it uses outdated configuration files that will need to be updated. Note that these aren't for general use, as the VRAM requirements are beyond consumer scope.

    >Filtering : None

| Model         | Type      | Download                                                                                                                                                                                                             |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7B 16bit      | HF Format | [HuggingFace](https://huggingface.co/Neko-Institute-of-Science/LLaMA-7B-HF)                                                                                                                                          |
| 13B 16bit     | HF Format | [HuggingFace](https://huggingface.co/Neko-Institute-of-Science/LLaMA-13B-HF)                                                                                                                                         |
| 30B 16bit     | HF Format | [HuggingFace](https://huggingface.co/Neko-Institute-of-Science/LLaMA-30B-HF)                                                                                                                                         |
| 65B 16bit     | HF Format | [HuggingFace](https://huggingface.co/Neko-Institute-of-Science/LLaMA-13B-HF)                                                                                                                                         |
| All the above | HF Format | [Torrent Magnet](<magnet:?xt=urn:btih:8d634925911a03f787d9f68ac075a9b24281573a&dn=Safe-LLaMA-HF-v2%20(4-04-23)&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce>) |

## LLaMA 4-bit Weights

!!! info

    The original LLaMA weights quantized to 4-bit. The GPU CUDA versions have outdated tokenizer and configuration files. It is recommended to either update them with [this](https://rentry.org/544p2) or use the [universal LLaMA tokenizer.](https://github.com/oobabooga/text-generation-webui/blob/main/docs/LLaMA-model.md#option-1-pre-converted-weights)

    >Filtering : None

| Model             | Type                    | Download                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7B, 13B, 30B, 65B | CPU                     | [Torrent Magnet](magnet:?xt=urn:btih:481dee5424b7024433504803a90efd32dae40fdf&dn=LLaMA-ggml-4bit_2023-03-31&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce) |
| 7B, 13B, 30B, 65B | GPU CUDA (no groupsize) | [Torrent Magnet](magnet:?xt=urn:btih:e88abf1b84290b162f00d3a9d79fb4f8719c2053&dn=LLaMA-HF-4bit&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 7B, 13B, 30B, 65B | GPU CUDA (128gs)        | [Torrent Magnet](magnet:?xt=urn:btih:88f7d9d2460ffcaf78b21e83012de00939eacb65&dn=LLaMA-HF-4bit-128g&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 7B, 13B, 30B, 65B | GPU Triton              | [Neko Institute of Science HF page](https://huggingface.co/Neko-Institute-of-Science)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

# Models/Finetunes/LoRA's

## WizardLM 13B Uncensored (05/10/2023)

!!! info

    This is WizardLM trained with a subset of the dataset - responses that contained alignment / moralizing were removed. The intent is to train a WizardLM that doesn't have alignment built-in, so that alignment (of any sort) can be added separately with for example with a RLHF LoRA.

    Note that despite being an "uncensored" model, several tests have demonstrated that the model will still refuse to comply with certain requests.

    >Filtering : Light

| Model    | Type | Download                                                                          |
| -------- | ---- | --------------------------------------------------------------------------------- |
| 13B GGML | CPU  | [Q5](https://huggingface.co/TehVenom/WizardLM-13B-Uncensored-Q5_1-GGML)           |
| 13B      | GPU  | [Q4 CUDA 128gs](https://huggingface.co/ausboss/WizardLM-13B-Uncensored-4bit-128g) |

## BluemoonRP 13B (05/07/2023)

!!! info

    An RP/ERP focused finetune of LLaMA 13B finetuned on BluemoonRP logs. It is designed to simulate a 2-person RP session. Two versions are provided; a standard 13B with 2K context and an experimental 13B with 4K context. It has a non-standard format (LEAD/ASSOCIATE), so ensure that you read the model card and use the correct syntax.

    >Filtering : None

| Model | Type      | Download                                         |
| ----- | --------- | ------------------------------------------------ |
| 13B   | GPU & CPU | https://huggingface.co/reeducator/bluemoonrp-13b |

## Vicuna 13B Cocktail (05/07/2023)

!!! info

    Vicuna 1.1 13B finetune incorporating various datasets in addition to the unfiltered ShareGPT. This is an experiment attempting to enhance the creativity of the Vicuna 1.1, while also reducing censorship as much as possible. All datasets have been cleaned. Additionally, only the "instruct" portion of GPTeacher has been used. It has a non-standard format (USER/ASSOCIATE), so ensure that you read the model card and use the correct syntax.

    >Filtering : Light

| Model | Type      | Download                                              |
| ----- | --------- | ----------------------------------------------------- |
| 13B   | GPU & CPU | https://huggingface.co/reeducator/vicuna-13b-cocktail |

## GPT4-x-AlpacaDente2-30B (05/05/2023)

!!! info

    ChanSung's Alpaca-LoRA-30B-elina merged with Open Assistant's second Finetune. Testing in progress.

    >Filtering : Medium

| Model    | Type | Download                                                                   |
| -------- | ---- | -------------------------------------------------------------------------- |
| 30B GGML | CPU  | [Q5](https://huggingface.co/Lumpen1/GPT4-x-AlpacaDente2-30b-ggml-q5_0)     |
| 30B      | GPU  | [Q4 CUDA](https://huggingface.co/askmyteapot/GPT4-x-AlpacaDente2-30b-4bit) |

https://huggingface.co/askmyteapot/GPT4-x-AlpacaDente2-30b-4bit

## Vicuna 13B Free v1.1 (05/01/2023)

!!! info

    A work-in-progress, community driven attempt to make an unfiltered version of Vicuna. It currently has an early stopping bug, and a partial workaround has been posted on the repo's model card.

    >Filtering : Light

| Model | Type      | Download                                          |
| ----- | --------- | ------------------------------------------------- |
| 13B   | GPU & CPU | https://huggingface.co/reeducator/vicuna-13b-free |

## Pygmalion/Metharme 7B (04/30/2023)

!!! info

    Pygmalion 7B is a dialogue model that uses LLaMA-7B as a base. The dataset includes RP/ERP content. Metharme 7B is an experimental instruct-tuned variation, which can be guided using natural language like other instruct models.

    PygmalionAI intend to use the same dataset on the higher parameter LLaMA models. No ETA as of yet.

    >Filtering : None

| Model                 | Type | Download                                                                                                                                                                                                  |
| --------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7B Pygmalion/Metharme | XOR  | https://huggingface.co/PygmalionAI/                                                                                                                                                                       |
| 7B Pygmalion GGML     | CPU  | [Q4](https://huggingface.co/TehVenom/Pygmalion-7b-4bit-Q4_1-GGML), [Q5](https://huggingface.co/waifu-workshop/pygmalion-7b-ggml-q5_0), [Q8](https://huggingface.co/waifu-workshop/pygmalion-7b-ggml-q8_0) |
| 7B Metharme GGML      | CPU  | [Q4](https://huggingface.co/TehVenom/Metharme-7b-4bit-Q4_1-GGML), [Q5](https://huggingface.co/waifu-workshop/metharme-7b-ggml-q5_1)                                                                       |
| 7B Pygmalion          | GPU  | [Q4 Triton](https://huggingface.co/TehVenom/Pygmalion-7b-4bit-GPTQ-Safetensors), [Q4 CUDA 128gs](https://huggingface.co/gozfarb/pygmalion-7b-4bit-128g-cuda)                                              |
| 7B Metharme           | GPU  | [Q4 Triton](https://huggingface.co/TehVenom/Metharme-7b-4bit-GPTQ-Safetensors), [Q4 CUDA](https://huggingface.co/askmyteapot/metharme)                                                                    |

## GPT4-X-Alpasta 30B (04/29/2023)

!!! info

    An attempt at improving Open Assistant's performance as an instruct while retaining its excellent prose. The merge consists of Chansung's GPT4-Alpaca Lora and Open Assistant's native fine-tune.

    It is an extremely coherent model for logic based instruct outputs. And while the prose is generally very good, it does suffer from the "Assistant" personality bleedthrough that plagues the OpenAssistant dataset, which can give you dry dialogue for creative writing/chatbot purposes. However, several accounts claim it's nowhere near as bad as OA's finetunes, and that the prose and coherence gains makes up for it.

    >Filtering : Medium

| Model    | Type           | Download                                              |
| -------- | -------------- | ----------------------------------------------------- |
| 30B 4bit | CPU & GPU CUDA | https://huggingface.co/MetaIX/GPT4-X-Alpasta-30b-4bit |

## OpenAssistant LLaMa 30B SFT 6 (04/23/2023)

!!! info

    An open-source alternative to OpenAI’s ChatGPT/GPT 3.5 Turbo. However, it seems to suffer from [overfitting](https://www.datarobot.com/wiki/overfitting/) and is heavily filtered. Not recommended for creative writing or chat bots, given the "assistant" personality constantly bleeds through, giving you dry dialogue.

    >Filtering : Heavy

| Model    | Type | Download                                                                                                                                |
| -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 30B      | XOR  | https://huggingface.co/OpenAssistant/oasst-sft-6-llama-30b-xor                                                                          |
| 30B GGML | CPU  | [Q4](https://huggingface.co/MildlyAggressiveGoose1/ggml-oasst-sft-6-llama-30B-q4_2)                                                     |
| 30B      | GPU  | [Q4 CUDA](https://huggingface.co/Peeepy/llama-33b-oasst-4bit), [Q4 CUDA 128gs](https://huggingface.co/Peeepy/llama-30b-oasst-4bit-128g) |

## SuperCOT (04/22/2023)

!!! info

    SuperCOT is a LoRA trained with the aim of making LLaMa follow prompts for Langchain better, by infusing chain-of-thought datasets, code explanations and instructions, snippets, logical deductions and Alpaca GPT-4 prompts.

    Though designed to improve Langchain, it's quite versatile and works very well for other tasks like creative writing and chatbots. The author also pruned a number of filters from the datasets. As of early May 2023, it's the most recommended model on /lmg/

    >Filtering : Light

| Model         | Type | Download                                                                                                                                                                                                   |
| ------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original LoRA | LoRA | https://huggingface.co/kaiokendev/SuperCOT-LoRA                                                                                                                                                            |
| 13B GGML      | CPU  | [Q4](https://huggingface.co/camelids/llama-13b-supercot-ggml-q4_2), [Q8](https://huggingface.co/camelids/llama-13b-supercot-ggml-q8_0)                                                                     |
| 30B GGML      | CPU  | [Q4](https://huggingface.co/camelids/llama-33b-supercot-ggml-q4_2), [Q5](https://huggingface.co/camelids/llama-33b-supercot-ggml-q5_1), [Q8](https://huggingface.co/camelids/llama-33b-supercot-ggml-q8_0) |
| 13B           | GPU  | [Q4 CUDA 128gs](https://huggingface.co/ausboss/llama-13b-supercot-4bit-128g)                                                                                                                               |
| 30B           | GPU  | [Q4 CUDA](https://huggingface.co/tsumeone/llama-30b-supercot-4bit-cuda), [Q4 CUDA 128gs](https://huggingface.co/tsumeone/llama-30b-supercot-4bit-128g-cuda)                                                |

## Previous Model List

!!! info

    The old rentry, retained for archiving purposes. Contains older and outdated models.

https://rentry.org/backupmdlist

---

# Models for [llama.cpp](https://github.com/ggerganov/llama.cpp) ([ggml](https://github.com/ggerganov/ggml) format)

## LLaMA quantized 4-bit weights (ggml q4_0)

#### [2023-03-31 torrent magnet](magnet:?xt=urn:btih:481dee5424b7024433504803a90efd32dae40fdf&dn=LLaMA-ggml-4bit_2023-03-31&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksums:

```text
2dad53e70ca521fedcf9f9be5c26c15df602487a9c008bdafbb2bf8f946b6bf0  llama-7b-ggml-q4_0/ggml-model-q4_0.bin
9cd4d6c1f5f42d5abf529c51bde3303991fba912ab8ed452adfd7c97a4be77d7  llama-13b-ggml-q4_0/ggml-model-q4_0.bin
daefbc6b1b644a75be0286ef865253ab3786e96a2c1bca8b71216b1751eee63e  llama-33b-ggml-q4_0/ggml-model-q4_0.bin
d58a29c8403ecbd14258bbce07d90894fc5a8be25b9d359463c18f9f2ef96eb6  llama-65b-ggml-q4_0/ggml-model-q4_0.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

## Alpaca quantized 4-bit weights (ggml q4_0)

| Model                                                                                                                                                | Download                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLaMA 7B fine-tune from [chavinlo/alpaca-native](https://huggingface.co/chavinlo/alpaca-native/tree/062111ff2af99db24f466562b8eb7e7e4ad7566d)        | [2023-03-31 torrent magnet](magnet:?xt=urn:btih:d931a826b59443f4e543c18a25009b0ce8eabf39&dn=Alpaca-7B-ggml-4bit-native-finetune_2023-03-31&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce) |
| LLaMA 7B merged with [tloen/alpaca-lora-7b](https://huggingface.co/tloen/alpaca-lora-7b/tree/28801eabf63a125cee9e46d8073fb13c7c8bd8b9) LoRA          | [2023-03-31 torrent magnet](magnet:?xt=urn:btih:694e206c1ce2780db673bdc2ecee78abcf228324&dn=Alpaca-7B-ggml-4bit-LoRA-merged_2023-03-31&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce)     |
| LLaMA 13B merged with [chansung/alpaca-lora-13b](https://huggingface.co/chansung/alpaca-lora-13b/tree/abcdddb2778cace16f184dc1dda0ecf21ade23bc) LoRA | [2023-03-31 torrent magnet](magnet:?xt=urn:btih:31ad0f8e8da5d43bad83eeed94f24cca504330d1&dn=Alpaca-13B-ggml-4bit-LoRA-merged_2023-03-31&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce)    |
| LLaMA 33B merged with [chansung/alpaca-lora-30b](https://huggingface.co/chansung/alpaca-lora-30b/tree/bbbc77a38ad00a64780a76d119c783b6dc8200bd) LoRA | [2023-03-31 torrent magnet](magnet:?xt=urn:btih:1e8681e255ec3078ef84fe4cdecdc7abd8b2b6e5&dn=Alpaca-33B-ggml-4bit-LoRA-merged_2023-03-31&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce)    |

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#instruction-mode-with-alpaca)
Example:
`./main --model ggml-model-q4_0.bin --file prompts/alpaca.txt --instruct --ctx_size 2048 --keep -1`
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksums:

```text
f5e264b10944c55a84810e8073dfdcd653fa8e47ff50ea043ec071051ac7821d  alpaca-7b-ggml-q4_0-native-finetune/ggml-model-q4_0.bin
d9777baad5cf6a5d196e70867338d8cc3c7af68c7744e68de839a522983860d7  alpaca-7b-ggml-q4_0-lora-merged/ggml-model-q4_0.bin
3838aa32651c65948e289374abd71f6feab1a62a4921a648e30d979df86a4af3  alpaca-13b-ggml-q4_0-lora-merged/ggml-model-q4_0.bin
2267ed1dc0bf0d6d300ba292c25083c7fa5395f3726c7c68a49b2be19a64b349  alpaca-33b-ggml-q4_0-lora-merged/ggml-model-q4_0.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

## GPT4All 7B quantized 4-bit weights (ggml q4_0)

#### [2023-03-31 torrent magnet](magnet:?xt=urn:btih:04584d8e5799c7838ccb987fae4f183936b9d744&dn=GPT4All-7B-ggml-4bit-lora-merged_2023-03-31&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
GPT4All can be used with llama.cpp in the same way as the other `ggml` models.
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksums:

```text
9f6cd4830a3c45a86147c80a32888e7be8f8a489284c87cdb882a7cfe40940c1  gpt4all-unfiltered-7b-ggml-q4_0-lora-merged/ggml-model-q4_0.bin
de314c5ee155ac40a03ca3b3be85ba2b02aef9e9f083c411c0b4490689dd047e  gpt4all-7b-ggml-q4_0-lora-merged/ggml-model-q4_0.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

## GPT4 x Alpaca 13B quantized 4-bit weights (ggml q4_0)

#### [2023-04-01 torrent magnet](magnet:?xt=urn:btih:f77827abd0cfb77399a0b281a1dbaeac5c386413&dn=GPT4-x-Alpaca-13B-ggml-4bit_2023-04-01&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
GPT4 x Alpaca can be used with llama.cpp in the same way as the other `ggml` models.
Text generation with this version is faster compared to the [GPTQ-quantized one](https://rentry.org/nur779#gpt4-x-alpaca-13b-quantized-4-bit-weights-ggml-q4_1-from-gptq-with-groupsize-128).
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksum:

```text
e6b77ebf297946949b25b3c4b870f10cdc98fb9fcaa6d19cef4dda9021031580  gpt4-x-alpaca-13b-ggml-q4_0/ggml-model-q4_0.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

[Model source](https://desuarchive.org/g/thread/92479457/#q92481589)

## GPT4 x Alpaca 13B quantized 4-bit weights (ggml q4_1 from GPTQ with groupsize 128)

#### [2023-04-01 torrent magnet](magnet:?xt=urn:btih:6cdb6ab819b13b00928182eea72106824e335734&dn=GPT4-x-Alpaca-13B-ggml-4bit-from-GPTQ-128g_2023-04-01&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
GPT4 x Alpaca can be used with llama.cpp in the same way as the other `ggml` models.
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksum:

```text
d4a640a1ce33009c244a361c6f87733aacbc2bea90e84d3c304a4c8be2bdf22d  gpt4-x-alpaca-13b-ggml-q4_1-from-gptq-4bit-128g/ggml-model-q4_1.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

[Model source](https://desuarchive.org/g/thread/92479457/#q92481589)

## Vicuna 13B quantized 4-bit weights (ggml q4_0)

#### [2023-04-03 torrent magnet](magnet:?xt=urn:btih:1e0c3dbeefe82483f81bd4e7ea959e4953c8081f&dn=Vicuna-13B-ggml-4bit-delta-merged_2023-04-03&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
Vicuna can be used with llama.cpp in the same way as the other `ggml` models.
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksum:

```text
f96689a13c581f53b616887b2efe82bbfbc5321258dbcfdbe69a22076a7da461  vicuna-13b-ggml-q4_0-delta-merged/ggml-model-q4_0.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

[Model source](https://huggingface.co/lmsys/vicuna-13b-delta/tree/da39ef5c586459f4d509bf7382475af584277e71)

## OpenAssistant LLaMA 13B quantized 4-bit weights (ggml q4_0 & q4_1)

!!! warning Note that this model is [work-in-progress](https://huggingface.co/dvruette/oasst-llama-13b-2-epochs/discussions/1#642ec79032e711e21aa11b60).

#### [2023-04-07 torrent magnet](magnet:?xt=urn:btih:cad2f029978033f9c1487df3965546cc4d44489a&xt=urn:btmh:1220140702f43fbf90157db9531ad0454020bc212fddc48c7c30f593ec40d26eb19b&dn=oasst-llama-13b-ggml&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce) | [HuggingFace Hub direct download](https://huggingface.co/Black-Engineer/oasst-llama13b-ggml-q4/tree/main)

!!! info [Tutorial link for llama.cpp](https://github.com/ggerganov/llama.cpp#interactive-mode)
!!! info [Tutorial link for koboldcpp](https://github.com/LostRuins/koboldcpp#usage)

SHA256 checksums:

```text
fe77206c7890ecd0824c7b6b6a6deab92e471366b2e4271c05ece9a686474ef6  ggml-model-q4_0.bin
412da683b6ab0f710ce0adc8bc36db52bb92df96698558c5f2a1399af9bd0a78  ggml-model-q4_1.bin
```

ggml model file magic: `0x67676a74` (`ggjt` in hex)
ggml model file version: `1`

[Original model source](https://huggingface.co/dvruette/oasst-llama-13b-2-epochs)
[GPTQ-quantized model source](https://huggingface.co/gozfarb/oasst-llama13b-4bit-128g)
[Torrent source](https://desuarchive.org/g/thread/92596368/#q92601864)

---

# Models for HuggingFace 🤗

!!! danger Updated tokenizer and model configuration files can be found [here](https://rentry.org/544p2).
Ensure that your models have the appropriate JSON files within the same directory as the weights, otherwise text generation might be impacted by tokenization problems. The issues were addressed [here](https://github.com/huggingface/transformers/pull/22402) and [here](https://github.com/lm-sys/FastChat/pull/167), but a manual update of both the `transformers` library and your model configuration files is required.

## LLaMA float16 weights

#### [2023-03-26 torrent magnet](<magnet:?xt=urn:btih:496ee41a35f8d845f6d6cba11baa8b332f3c3318&dn=Safe-LLaMA-HF%20(3-26-23)&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce>) | [HuggingFace Hub direct downloads](https://huggingface.co/Neko-Institute-of-Science)

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#hugging-face-format-weights)

[Torrent source and SHA256 checksums](https://github.com/oobabooga/text-generation-webui/pull/530#issuecomment-1484235789)

## Vicuna 13B float16 weights

#### [2023-04-03 torrent magnet](magnet:?xt=urn:btih:a7fac57094561a63d53eed943f904abf24c6969d&dn=Vicuna-13B-HF-fp16-delta-merged_2023-04-03&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce)

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#hugging-face-format-weights)

[Model source](https://huggingface.co/lmsys/vicuna-13b-delta/tree/da39ef5c586459f4d509bf7382475af584277e71)

## LLaMA quantized 4-bit weights ([GPTQ](https://github.com/qwopqwop200/GPTQ-for-LLaMa) format without groupsize)

#### [2023-03-26 torrent magnet](magnet:?xt=urn:btih:e88abf1b84290b162f00d3a9d79fb4f8719c2053&dn=LLaMA-HF-4bit&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce)

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#4-bit-mode)

SHA256 checksums:

```text
09841a1c4895e1da3b05c1bdbfb8271c6d43812661e4348c862ff2ab1e6ff5b3  llama-7b-4bit/llama-7b-4bit.safetensors
edfa0b4060aae392b1e9df21fb60a97d78c9268ac6972e3888f6dc955ba0377b  llama-13b-4bit/llama-13b-4bit.safetensors
4cb560746fe58796233159612d8d3c9dbdebdf6f0443b47be71643f2f91b8541  llama-30b-4bit/llama-30b-4bit.safetensors
886ce814ed54c4bd6850e2216d5f198c49475210f8690f45dc63365d9aff3177  llama-65b-4bit/llama-65b-4bit.safetensors
```

[Torrent source and more information](https://github.com/oobabooga/text-generation-webui/pull/530#issuecomment-1483891617)

## LLaMA quantized 4-bit weights ([GPTQ](https://github.com/qwopqwop200/GPTQ-for-LLaMa) format with groupsize 128)

#### [2023-03-26 torrent magnet](magnet:?xt=urn:btih:88f7d9d2460ffcaf78b21e83012de00939eacb65&dn=LLaMA-HF-4bit-128g&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce)

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#4-bit-mode)
`Groupsize 128` is a better choice for the 13B, 33B and 65B models, according to [this](https://github.com/oobabooga/text-generation-webui/pull/530#issuecomment-1483941105).

SHA256 checksums:

```text
ed8ec9c9f0ebb83210157ad0e3c5148760a4e9fd2acfb02cf00f8f2054d2743b  llama-7b-4bit-128g/llama-7b-4bit-128g.safetensors
d3073ef1a2c0b441f95a5d4f8a5aa3b82884eef45d8997270619cb29bcc994b8  llama-13b-4bit-128g/llama-13b-4bit-128g.safetensors
8b7d75d562938823c4503b956cb4b8af6ac0a5afbce2278566cc787da0f8f682  llama-30b-4bit-128g/llama-30b-4bit-128g.safetensors
f1418091e3307611fb0a213e50a0f52c80841b9c4bcba67abc1f6c64c357c850  llama-65b-4bit-128g/llama-65b-4bit-128g.safetensors
```

[Torrent source and more information](https://github.com/oobabooga/text-generation-webui/pull/530#issuecomment-1483941105)

## Alpaca quantized 4-bit weights ([GPTQ](https://github.com/qwopqwop200/GPTQ-for-LLaMa) format with groupsize 128)

| Model                                                                                                                                                         | Download                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLaMA 7B fine-tune from [ozcur/alpaca-native-4bit](https://huggingface.co/ozcur/alpaca-native-4bit) as safetensors                                            | [2023-03-29 torrent magnet](magnet:?xt=urn:btih:90674fd4a3672c6eae5bf994634109bb75429e6b&dn=Alpaca-7B-GPTQ-4bit-128g-native-finetune_2023-03-29&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.altrosky.nl%3a6969%2fannounce&tr=udp%3a%2f%2ftracker-udp.gbitt.info%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.skynetcloud.site%3a6969%2fannounce&tr=udp%3a%2f%2ftracker2.dler.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.monitorit4.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.lelux.fi%3a6969%2fannounce&tr=udp%3a%2f%2ftracker1.bt.moack.co.kr%3a80%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2810%2fannounce&tr=udp%3a%2f%2ftracker.theoks.net%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.moeking.me%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.tiny-vps.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a6969%2fannounce&tr=http%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.dler.org%3a6969%2fannounce&tr=https%3a%2f%2fopentracker.i2p.rocks%3a443%2fannounce) |
| LLaMA 33B merged with [baseten/alpaca-30b](https://huggingface.co/baseten/alpaca-30b) LoRA by [an anon](https://desuarchive.org/g/thread/92351574/#q92356537) | [2023-03-26 torrent magnet](magnet:?xt=urn:btih:81cf9b528cc80e390323f9ec50d4dfb4debcb490&dn=Alpaca%2030B%204bit%20groupsize%20128&tr=http%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce) \| [extra config files](https://rentry.org/544p2#llama-33b)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#4-bit-mode)

SHA256 checksums:

```text
17d6ba8f83be89f8dfa05cd4720cdd06b4d32c3baed79986e3ba1501b2305530  Alpaca-7B-GPTQ-4bit-128g-native-finetune_2023-03-29/alpaca-7b-4bit-128g-native-finetune.safetensors
a2f8d202ce61b1b612afe08c11f97133c1d56076d65391e738b1ab57c854ee05  Alpaca-30B-4bit-128g/alpaca-30b-hf-4bit.safetensors
```

## Vicuna 13B quantized 4-bit & 8-bit weights ([GPTQ](https://github.com/qwopqwop200/GPTQ-for-LLaMa) format with groupsize 128)

##### [2023-04-03 torrent magnet](magnet:?xt=urn:btih:f67d372a01c0b8e0162931623d6c55a5e6f34921&dn=Vicuna-13B-quantized-128g&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce)

!!! info [Tutorial link for Text generation web UI](https://github.com/oobabooga/text-generation-webui/wiki/LLaMA-model#4-bit-mode)

[Torrent source](https://desuarchive.org/g/thread/92531914#92536953)
[Extra config files](https://rentry.org/544p2#llama-13b)
