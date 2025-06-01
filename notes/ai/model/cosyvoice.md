---
title: CosyVoice
---

# CosyVoice

- [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice)
  - 中文、英文、日文、韩文、中文方言（粤语、四川话、上海话、天津话、武汉话等）
  - hf [FunAudioLLM/CosyVoice2-0.5B](https://huggingface.co/FunAudioLLM/CosyVoice2-0.5B)
- ⚠️ 注意 复刻有电音问题
- 推理模式 - 不同的模型支持不同的模式
  - 预训练音色
  - 跨语种复刻
  - 自然语言控制 CosyVoice-300M-Instruct
    - 支持使用 instruct 控制语音
  - 复刻
    - 文本+音频 生成一个 speaker
    - 使用这个 speaker 生成音频
    - 样本不超过 30s
- `<|zh|><|en|><|jp|><|yue|><|ko|>`
- instruct `<laughter></laughter><strong></strong>[laughter][breath]`
- 参考
  - https://www.modelscope.cn/models/iic/CosyVoice2-0.5B/summary
  - https://funaudiollm.github.io/cosyvoice2

<!--
爸爸妈妈说我今天吃饭吃的一点也不好，她们都很难过，可是我觉得没什么，但我还是最好先别去惹他们好了，我先去玩我自己的吧。

今晚我的宝贝吃饭吃的一点也不好！为什么每天都这样呢？我真的很难过，我的宝贝为什么就不能好好吃饭呢？
-->

```bash
git clone https://github.com/FunAudioLLM/CosyVoice
cd CosyVoice
git submodule update --init --recursive

uv venv --python 3.10
uv pip install pynini==2.1.5
uv pip install protobuf==4.2
# uv pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host=mirrors.aliyun.com
#  --extra-index-url https://pypi.nvidia.com
uv pip install -r requirements.txt

sudo apt install sox libsox-dev

# https://www.modelscope.cn/iic/CosyVoice2-0.5B
# iic/CosyVoice2-0.5B
uvx --from huggingface_hub huggingface-cli download FunAudioLLM/CosyVoice2-0.5B
ls ~/.cache/huggingface/hub/models--FunAudioLLM--CosyVoice2-0.5B/snapshots/*/

ffmpeg input.mp3 -ar 16000 output.wav

uv run ./dl.py
uv run ./gen.py
```

```py title="dl.py"
# uv run ./dl.py
from modelscope import snapshot_download
snapshot_download('iic/CosyVoice2-0.5B', local_dir='pretrained_models/CosyVoice2-0.5B')
snapshot_download('iic/CosyVoice-300M', local_dir='iic/CosyVoice-300M')
snapshot_download('iic/CosyVoice-300M-25Hz', local_dir='pretrained_models/CosyVoice-300M-25Hz')
snapshot_download('iic/CosyVoice-300M-SFT', local_dir='pretrained_models/CosyVoice-300M-SFT')
snapshot_download('iic/CosyVoice-300M-Instruct', local_dir='pretrained_models/CosyVoice-300M-Instruct')
snapshot_download('iic/CosyVoice-ttsfrd', local_dir='pretrained_models/CosyVoice-ttsfrd')
```

```bash
# 或者 git 下载 模型
apt install git-lfs
mkdir -p pretrained_models
git clone https://www.modelscope.cn/iic/CosyVoice2-0.5B.git pretrained_models/CosyVoice2-0.5B
git clone https://www.modelscope.cn/iic/CosyVoice-300M.git pretrained_models/CosyVoice-300M
git clone https://www.modelscope.cn/iic/CosyVoice-300M-25Hz.git pretrained_models/CosyVoice-300M-25Hz
git clone https://www.modelscope.cn/iic/CosyVoice-300M-SFT.git pretrained_models/CosyVoice-300M-SFT
git clone https://www.modelscope.cn/iic/CosyVoice-300M-Instruct.git pretrained_models/CosyVoice-300M-Instruct
git clone https://www.modelscope.cn/iic/CosyVoice-ttsfrd.git pretrained_models/CosyVoice-ttsfrd
```

```py title="gen.py"
import sys
sys.path.append('third_party/Matcha-TTS')
from cosyvoice.cli.cosyvoice import CosyVoice, CosyVoice2
from cosyvoice.utils.file_utils import load_wav
import torchaudio
from os.path import expanduser

cosyvoice = CosyVoice2(expanduser('./pretrained_models/CosyVoice2-0.5B/'), load_jit=False, load_trt=False, fp16=False)

# NOTE if you want to reproduce the results on https://funaudiollm.github.io/cosyvoice2, please add text_frontend=False during inference
# zero_shot usage
prompt_speech_16k = load_wav('./data/input.wav', 16000)
for i, j in enumerate(cosyvoice.inference_zero_shot('收到好友从远方寄来的生日礼物，那份意外的惊喜与深深的祝福让我心中充满了甜蜜的快乐，笑容如花儿般绽放。', '希望你以后能够做的比我还好呦。', prompt_speech_16k, stream=False)):
    torchaudio.save('zero_shot_{}.wav'.format(i), j['tts_speech'], cosyvoice.sample_rate)

# save zero_shot spk for future usage
assert cosyvoice.add_zero_shot_spk('希望你以后能够做的比我还好呦。', prompt_speech_16k, 'my_zero_shot_spk') is True
for i, j in enumerate(cosyvoice.inference_zero_shot('收到好友从远方寄来的生日礼物，那份意外的惊喜与深深的祝福让我心中充满了甜蜜的快乐，笑容如花儿般绽放。', '', '', zero_shot_spk_id='my_zero_shot_spk', stream=False)):
    torchaudio.save('zero_shot_{}.wav'.format(i), j['tts_speech'], cosyvoice.sample_rate)
cosyvoice.save_spkinfo()

# fine grained control, for supported control, check cosyvoice/tokenizer/tokenizer.py#L248
for i, j in enumerate(cosyvoice.inference_cross_lingual('在他讲述那个荒诞故事的过程中，他突然[laughter]停下来，因为他自己也被逗笑了[laughter]。', prompt_speech_16k, stream=False)):
    torchaudio.save('fine_grained_control_{}.wav'.format(i), j['tts_speech'], cosyvoice.sample_rate)

# instruct usage
for i, j in enumerate(cosyvoice.inference_instruct2('收到好友从远方寄来的生日礼物，那份意外的惊喜与深深的祝福让我心中充满了甜蜜的快乐，笑容如花儿般绽放。', '用四川话说这句话', prompt_speech_16k, stream=False)):
    torchaudio.save('instruct_{}.wav'.format(i), j['tts_speech'], cosyvoice.sample_rate)

# bistream usage, you can use generator as input, this is useful when using text llm model as input
# NOTE you should still have some basic sentence split logic because llm can not handle arbitrary sentence length
def text_generator():
    yield '收到好友从远方寄来的生日礼物，'
    yield '那份意外的惊喜与深深的祝福'
    yield '让我心中充满了甜蜜的快乐，'
    yield '笑容如花儿般绽放。'
for i, j in enumerate(cosyvoice.inference_zero_shot(text_generator(), '希望你以后能够做的比我还好呦。', prompt_speech_16k, stream=False)):
    torchaudio.save('zero_shot_{}.wav'.format(i), j['tts_speech'], cosyvoice.sample_rate)
```
