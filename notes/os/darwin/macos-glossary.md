---
title: macOS 术语表
---

# macOS 术语表

- XPCServices

| abbr. | stand for                        |
| ----- | -------------------------------- |
| nib   | Interface Builder                |
| UTI   | Uniform Type Identifier          |
| `CF*` | Core Foundation                  |
| `NS*` | NextStep                         |
| adi   | Apple Distribution International |

| file           | stand for                     |
| -------------- | ----------------------------- |
| .localized     | indicate "localizable" folder |
| Xxx.localized/ |                               |

- Xxx.localized/ - [Localizing the Name of a Directory]
  - .localized/
    - en.strings
    - zh.strings
      - `"Xxx"="自定义名字"`

[localizing the name of a directory]: https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemAdvancedPT/LocalizingtheNameofaDirectory/LocalizingtheNameofaDirectory.html

## UTI

- [System-Declared Uniform Type Identifiers](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html)

| uti                          | ext                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| com.apple.application-bundle | .app                                                                                           |
| com.apple.framework          | .framework                                                                                     |
| com.apple.bundle             | .app, .framework, .kext, .plugin, .docset, .xpc, .qlgenerator, .component, .saver, .mdimporter |
