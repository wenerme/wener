---
title: Computer Vision (CV)
tags:
  - Computer Vision
---

# Computer Vision (CV)

## Libraries

- [OpenCV](../../ai/ml/opencv/README.md)
- [ImageMagick](../../service/media/imagemagick.md)
- [vips](https://github.com/libvips/libvips) - A fast image processing library with low memory needs.
- [tesseract](https://github.com/tesseract-ocr/tesseract) - OCR engine.

## Concepts

- [Haar-like feature](https://en.wikipedia.org/wiki/Haar-like_feature) - For object detection.
- [Canny edge detector](https://en.wikipedia.org/wiki/Canny_edge_detector)
- [Hough transform](https://en.wikipedia.org/wiki/Hough_transform)
- [Image Kernels](http://setosa.io/ev/image-kernels/)

## OpenCV Tips

- [Docs](http://docs.opencv.org/)
- [iOS Install Tutorial](http://docs.opencv.org/2.4/doc/tutorials/introduction/ios_install/ios_install.html)
- **Square Detection**:
  - [mukyasa/MMCamScanner](https://github.com/mukyasa/MMCamScanner) (iOS)
  - [card-io](https://github.com/card-io) (Credit card scanning)

### Bindings

- **Node.js**:
  - [peterbraden/node-opencv](https://github.com/peterbraden/node-opencv)

### Common Functions

- **Filtering**:
  - `Blur`, `GaussianBlur`
  - `MedianBlur` ([Median filter](https://en.wikipedia.org/wiki/Median_filter))
  - `BilateralFilter` ([Bilateral filter](https://en.wikipedia.org/wiki/Bilateral_filter)) - Preserves edges.
- **Morphology**:
  - `Erode` (腐蚀), `Dilate` (膨胀)
  - `Open` (Erode -> Dilate): Remove noise.
  - `Close` (Dilate -> Erode): Close holes.

### Modules Guide

- **core**: Basic structures, arrays, XML/YAML, OpenCL.
- **imgproc**: Image processing (filtering, geometric transformations, histograms, feature detection).
- **highgui**: High-level GUI (Swing-like).
- **video**: Video analysis (motion estimation, background subtraction).
- **calib3d**: Camera calibration, 3D reconstruction.
- **features2d**: Feature detection/description (SURF, ORB).
- **objdetect**: Object detection (Haar cascades, HOG).
- **ml**: Machine learning.
