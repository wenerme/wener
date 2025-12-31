---
title: Go Mobile
---

# Go Mobile

- [golang/mobile](https://github.com/golang/mobile)
- [Project Wiki](https://github.com/golang/go/wiki/Mobile)

## Usage

```bash
# Install gomobile
go install golang.org/x/mobile/cmd/gomobile@latest
gomobile init

# Install example
go get -d golang.org/x/mobile/example/basic

# Build for Android
gomobile build -target=android golang.org/x/mobile/example/basic
# Install to device
gomobile install golang.org/x/mobile/example/basic

# Build for iOS
gomobile build -target=ios golang.org/x/mobile/example/basic
ios-deploy -b basic.app
```

## References

- [Go! Golang and Gomobile vs Android+Kotlin and IOS+Swift](https://medium.com/@igor.stebliy/go-golang-and-gomobile-vs-android-kotlin-and-ios-swift-599469d7e74a)
- [React Native: Why and How to Build Your Native Code in Go](https://medium.com/@jondot/react-native-why-and-how-to-build-your-native-code-in-go-9fee492f0daa)
