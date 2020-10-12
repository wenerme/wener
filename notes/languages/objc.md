---
id: objc
title: Object C
---

# Object C

## Tips

## 请求方法错误
URL Connection 处理重定向时, 请求方法可能会不正确 

## OpenCV
* http://docs.opencv.org/2.4/doc/tutorials/ios/video_processing/video_processing.html

* 依赖的框架
  * Accelerate
  * AssetsLibrary
  * AVFoundation
  * CoreGraphics
  * CoreImage
  * CoreMedia
  * CoreVideo
  * QuartzCore
  * UIKit
  * Foundation
* 需要添加的 PCH
```c
#import <Availability.h>

#ifndef __IPHONE_4_0
#warning "This project uses features only available in iOS SDK 4.0 and later."
#endif

#ifdef __cplusplus
#import <opencv2/opencv.hpp>
#endif

#ifdef __OBJC__
        #import <UIKit/UIKit.h>
        #import <Foundation/Foundation.h>
#endif
```
* 常见问题
  * 找不到 'opencv2/opencv.hpp'
    * 可能是框架搜索位置不对,可以尝试手动添加框架搜索路径
  * Swift 如何调用
    * 添加一个 Bridging-Header, 然后写好响应的 '.mm' 包装方法 提供给 Swift 调用
