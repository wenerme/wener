# OpenCV

## Install

### Flags

```
--32-bit
       	Build 32-bit only
--c++11
       	Build using C++11 mode
--with-contrib
       	Build "extra" contributed modules
        OpenCV 3 的第三方模块
--with-cuda
       	Build with CUDA v7.0+ support
--with-examples
       	Install C and python examples (sources)
--with-ffmpeg
       	Build with ffmpeg support
--with-gphoto2
       	Build with gphoto2 support
--with-gstreamer
       	Build with gstreamer support
--with-jasper
       	Build with jasper support
--with-java
       	Build with Java support
        构建 Java 绑定
--with-libdc1394
       	Build with libdc1394 support
--with-opengl
       	Build with OpenGL support (must use --with-qt5)
--with-openni
       	Build with openni support
        构建 Kinect 景深支持,目前 OpenNI 已经不太活跃,相对来说用处不大
--with-openni2
       	Build with openni2 support
--with-python3
       	Build with python3 support
--with-qt
       	Build the Qt4 backend to HighGUI
--with-qt5
       	Build the Qt5 backend to HighGUI
--with-quicktime
       	Use QuickTime for Video I/O instead of QTKit
--with-static
       	Build static libraries
--with-tbb
       	Enable parallel code in OpenCV using Intel TBB
        支持 Intel 的 Threading Building Blocks
        https://en.wikipedia.org/wiki/Threading_Building_Blocks
        https://www.threadingbuildingblocks.org/
--with-vtk
       	Build with vtk support
        构建 VTK(Visualization Toolkit/视觉化工具函式库) 支持
        https://en.wikipedia.org/wiki/VTK
        http://www.vtk.org/
--without-eigen
       	Build without eigen support
        https://en.wikipedia.org/wiki/Eigen_(C%2B%2B_library)
        C++ 科学计算库
--without-numpy
       	Use a numpy you've installed yourself instead of a Homebrew-packaged numpy
--without-opencl
       	Disable GPU code in OpenCV using OpenCL
--without-openexr
       	Build without openexr support
        OpenEXR is a high dynamic-range (HDR) image file format
--without-python
       	Build without Python support
--without-test
       	Build without accuracy & performance tests
--HEAD
       	Install HEAD version
```

* 由于 QTKit 的原因,暂时无法通过 brew 编译安装
  * https://github.com/Homebrew/homebrew-science/issues/4303

```bash
https_proxy=socks5://127.0.0.1:8888 brew install opencv3 --with-examples --with-ffmpeg --with-java --with-static --c++11 --with-opengl --with-tbb --with-libdc1394 --HEAD --with-contrib
```

## Tips

* sobel 生成一阶水平方向导数

```
```

## Guide
* core - 核心功能
  * 基本结构
  * 整列操作
  * XML/YAML 持久化
  * 簇群操作
  * OpenGL 互操作
  * Intel IPP 异步转换
  * 优化算法
  * DirectX 互操作
  * Eigen 支持
  * OpenCL 支持
  * Intel VA-API/OpenCL (CL-VA) 互操作
  * 硬件加速层
* imgproc - 图像处理
  * 图像过滤
  * 几何图像转换
  * 其他图像转换
  * 绘图函数
  * 颜色映射
  * 立方图
  * 结构化分析和形状描述
  * 移动分析和对象跟踪
  * 特征检测
  * 对象检测
* imgcodecs - 图像文件读写
* videoio - 媒体文件读写
* highgui - 高层次 GUI 封装
* video - 视频分析
* calib3d - 相机校准和 3D 重构 Camera Calibration and 3D Reconstruction
* features2d 2D - 特征框架
* objdetect - 对象检测
* ml - 机器学习
* flann - 多空间维度簇群和搜索 Clustering and Search in Multi-Dimensional Spaces
* photo. Computational Photography
* stitching. Images stitching
* cuda
  * cudaarithm. Operations on Matrices
  * cudabgsegm. Background Segmentation
  * cudacodec. Video Encoding/Decoding
  * cudafeatures2d. Feature Detection and Description
  * cudafilters. Image Filtering
  * cudaimgproc. Image Processing
  * cudalegacy. Legacy support
  * cudaobjdetect. Object Detection
  * cudaoptflow. Optical Flow
  * cudastereo. Stereo Correspondence
  * cudawarping. Image Warping
* cudev. Device layer
* shape. Shape Distance and Matching
* superres. Super Resolution
* videostab. Video Stabilization
* viz. 3D Visualizer

### imgproc - 图像过滤
形态变换的类型

枚举类型|说明|描述
----|----|----
MORPH_ERODE | 腐蚀 | 缩小边界
MORPH_DILATE | 膨胀 | 扩张边界
MORPH_OPEN | 开操作 | 等同于 `𝚍𝚜𝚝=open(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)=dilate(erode(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝))`
MORPH_CLOSE | 闭操作 | 等同于 `𝚍𝚜𝚝=close(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)=erode(dilate(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)`
MORPH_GRADIENT | 梯度操作 | `𝚍𝚜𝚝=morph_grad(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)=dilate(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)−erode(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)`
MORPH_TOPHAT | top hat | `𝚍𝚜𝚝=tophat(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)=𝚜𝚛𝚌−open(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)`
MORPH_BLACKHAT | black hat | `𝚍𝚜𝚝=blackhat(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)=close(𝚜𝚛𝚌,𝚎𝚕𝚎𝚖𝚎𝚗𝚝)−𝚜𝚛𝚌`
MORPH_HITMISS | hit and miss | 只支持 CV_8UC1 2阶 图.

### imgproc - 变换

几何变换的外插值类型

常量|说明|
----|----
BORDER_CONSTANT  | `iiiiii|abcdefgh|iiiiiii` with some specified i
BORDER_REPLICATE  | `aaaaaa|abcdefgh|hhhhhhh`
BORDER_REFLECT  | `fedcba|abcdefgh|hgfedcb`
BORDER_WRAP  | `cdefgh|abcdefgh|abcdefg`
BORDER_REFLECT_101  | `gfedcb|abcdefgh|gfedcba`
BORDER_TRANSPARENT  | `uvwxyz|absdefgh|ijklmno`
BORDER_REFLECT101  | same as BORDER_REFLECT_101
BORDER_DEFAULT  | same as BORDER_REFLECT_101
BORDER_ISOLATED  | do not look outside of ROI


几何变换的内插值类型

常量|说明|
----|----
INTER_NEAREST | nearest neighbor interpolation
INTER_LINEAR  | bilinear interpolation
INTER_CUBIC  | bicubic interpolation
INTER_AREA  | resampling using pixel area relation. It may be a preferred method for image decimation, as it gives moire'-free results. But when the image is zoomed, it is similar to the INTER_NEAREST method.
INTER_LANCZOS4  | Lanczos interpolation over 8x8 neighborhood
INTER_MAX  | mask for interpolation codes
WARP_FILL_OUTLIERS  | flag, fills all of the destination image pixels. If some of them correspond to outliers in the source image, they are set to zero
WARP_INVERSE_MAP  | flag, inverse transformation

## Reference

* [OpenCV](https://github.com/opencv/opencv)
* [OpenCV Contrib](https://github.com/opencv/opencv_contrib) 第三方模块
* [go-opencv](https://github.com/lazywei/go-opencv) OpenCV 1.x,2.x go binding
* [EasyPR](https://github.com/liuruoze/EasyPR) 中国牌照识别
* [OpenALPR](https://github.com/openalpr/openalpr) 自动牌照识别,不支持中国
* [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
* [Go SVM](https://github.com/datastream/libsvm)

https://github.com/bytedeco/javacv
https://github.com/bytedeco/javacv/wiki/Other-Resources
ImageJ
HaarDetect
