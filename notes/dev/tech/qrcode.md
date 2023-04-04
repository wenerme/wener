---
title: QrCode
---

# QrCode

## Scanner/Reader

- [zxing](https://github.com/zxing/zxing)
  - Apache 2.0, Java
- Command
  - [ZBar/ZBar](https://github.com/ZBar/ZBar)
    - 2012
    - zbarimg
  - [libdmtx](https://github.com/dmtx/libdmtx)
    - dmtxread
- JS
  - [@zxing/library](https://github.com/zxing-js/library)
    - 功能最多
    - NodeJS 需要 jimp 提取亮度通道
  - [nimiq/qr-scanner](https://github.com/nimiq/qr-scanner)
    - 不能 NodeJS
  - qrcode-reader
    - 很小
    - NodeJS 可直接用 jimp 数据
  - jsqr
    - 不支持多个二维码

```ts
const img = await jimp.read('./qrcode.jpg');
const formats = [BarcodeFormat.QR_CODE];
const hints = new Map();
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
hints.set(DecodeHintType.TRY_HARDER, true);
const reader = new MultiFormatReader();
reader.setHints(hints);

const imageData = img.bitmap;
const len = imageData.width * imageData.height;
const luminancesUint8Array = new Uint8ClampedArray(len);

for (let i = 0; i < len; i++) {
  // (0.2126R + 0.7152G + 0.0722*B))
  // luminancesUint8Array[i] = ((imageData.data[i*4]*2+imageData.data[i*4+1]*7+imageData.data[i*4+2]) / 10) & 0xFF;
  luminancesUint8Array[i] =
    ((imageData.data[i * 4] + imageData.data[i * 4 + 1] * 2 + imageData.data[i * 4 + 2]) / 4) & 0xff;
}

const luminanceSource = new RGBLuminanceSource(luminancesUint8Array, imageData.width, imageData.height);
const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
const decoded = reader.decode(binaryBitmap);
```

<!-- https://github.com/topics/qrcode -->
