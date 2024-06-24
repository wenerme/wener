---
title: img2img-turbo
refs:
  - arXiv:2403.12036
---

## img2img-turbo

- [GaParmar/img2img-turbo](https://github.com/GaParmar/img2img-turbo)
  - MIT
  - pix2pix-turbo
  - cyclegan-turbo
  - One-step image-to-image with Stable Diffusion turbo: sketch2image, day2night
- 模型和训练只能 A <-> B
- 参考
  - One-Step Image Translation with Text-to-Image Models https://arxiv.org/abs/2403.12036
    - 2024

```bash
git clone https://github.com/GaParmar/img2img-turbo
cd img2img-turbo

# horse2zebra
# ====================
# https://github.com/GaParmar/img2img-turbo/blob/main/docs/training_cyclegan_turbo.md
# train_A 1067 test_A 120 train_B 1334 test_B 140
# 256*256
# 模型约 1.2G, Nvidia L4 24G 3.5it/s, 默认 25000 steps 约 24h
bash scripts/download_horse2zebra.sh

pyenv install 3.9
pyenv local 3.9
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt
# wandb 配置 $HOME/.netrc
pip install wandb vision_aided_loss

# https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/15863#issuecomment-2125026282

# $HOME/.cache/huggingface/accelerate/default_config.yaml
accelerate config
export NCCL_P2P_DISABLE=1

accelerate launch --main_process_port 29501 src/train_cyclegan_turbo.py \
  --pretrained_model_name_or_path="stabilityai/sd-turbo" \
  --output_dir="output/cyclegan_turbo/my_horse2zebra" \
  --dataset_folder "data/my_horse2zebra" \
  --train_img_prep "resize_286_randomcrop_256x256_hflip" --val_img_prep "no_resize" \
  --learning_rate="1e-5" --max_train_steps=25000 \
  --train_batch_size=1 --gradient_accumulation_steps=1 \
  --report_to "wandb" --tracker_project_name "gparmar_unpaired_h2z_cycle_debug_v2" \
  --enable_xformers_memory_efficient_attention --validation_steps 250 \
  --lambda_gan 0.5 --lambda_idt 1 --lambda_cycle 1

# 输出内容
ls output/cyclegan_turbo/my_horse2zebra/

# 推导
python src/inference_unpaired.py --model_path "output/cyclegan_turbo/my_horse2zebra/checkpoints/model_1001.pkl" \
  --input_image "data/my_horse2zebra/test_A/n02381460_20.jpg" \
  --prompt "picture of a zebra" --direction "a2b" \
  --output_dir "outputs" --image_prep "no_resize"
```

## Notes

- pre-trained text-conditional one-step diffusion model
  - SD-Turbo
