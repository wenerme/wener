# Typescript

## Tips
* [declaration-files introduction](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
  * http://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
* [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
* [中文手册](https://zhongsp.gitbooks.io/typescript-handbook)
* [typings](https://github.com/typings/typings)
* [Playground](https://www.typescriptlang.org/play)
* NOTES
  * 接口不能做反射
* [json2ts](http://json2ts.com/)
  * JSON 转接口定义
  * 也可以自己写代码转, 参考[这里](https://stackoverflow.com/a/41071619/1870054)
* [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  * 辅助定义类型的类型定义
  * Partial
    * 所有字段可为 null
  * Readonly
    * 所有字段只读
  * Pick
    * 从一个类型中选择部分字段
  * Record
    * `Record<'prop1' | 'prop2' | 'prop3', string>`
      * 定义有三个 string 类型字段的类型

```bash
npm install -g typescript@next

# 使用 typing 类型
typings install dt~node dt~express dt~body-parser dt~serve-static dt~express-serve-static-core dt~mime --global
# 使用模块定义类型
yarn add @types/{node,express,body-parser,serve-static,express-serve-static-core,mime}

```

## tsconfig
* [tsconfig.json.schema](http://json.schemastore.org/tsconfig)
* 可以使用 `outFile` 来将多个 ts 输出为一个 js
  * 如果使用了模块, 则只能使用 amd 或 system
  * 如果没有使用到模块是可以编译成单个 js 直接运行的
  * 可以使用 [amdclean](https://github.com/gfranko/amdclean) 将使用 amd 的 js 转换为无 amd 的
    * 不支持 es6 的一些语法
  * 可以考虑将 ts 输出为 es5, 如果使用了 es6 的库, 则直接指定 lib 即可
* [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  * [中文](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

```bash
# 使用自定义的配置文件
tsc --p tsconfig.page.json
```

## NPM 模块开发
* 生成配置文件
```bash
yarn init -y
yarn add typescript -D
yarn run tsc -- --init
```
* 修改 `tsconfig.json` 的输出目录为 `dist`
* 在 `package.json` 中添加相关信息即可
```
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "prepublish": "npm run build",
    "build": "tsc"
  },
```

## FAQ

### 引用全局对象

```typescript
const AMap = window['AMap']
```

### --help
```
Version 2.2.2
Syntax:   tsc [options] [file ...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt

Options:
 --allowJs                                          Allow javascript files to be compiled.
 --allowSyntheticDefaultImports                     Allow default imports from modules with no default export. This does not affect code emit, just typechecking.
 --allowUnreachableCode                             Do not report errors on unreachable code.
 --allowUnusedLabels                                Do not report errors on unused labels.
 --alwaysStrict                                     Parse in strict mode and emit "use strict" for each source file
 --baseUrl                                          Base directory to resolve non-absolute module names.
 -d, --declaration                                  Generates corresponding '.d.ts' file.
 --experimentalDecorators                           Enables experimental support for ES7 decorators.
 --forceConsistentCasingInFileNames                 Disallow inconsistently-cased references to the same file.
 -h, --help                                         Print this message.
 --importHelpers                                    Import emit helpers from 'tslib'.
 --init                                             Initializes a TypeScript project and creates a tsconfig.json file.
 --jsx KIND                                         Specify JSX code generation: 'preserve', 'react-native', or 'react'
 --jsxFactory                                       Specify the JSX factory function to use when targeting 'react' JSX emit, e.g. 'React.createElement' or 'h'.
 --lib                                              Specify library files to be included in the compilation:
                                                      'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017' 'dom' 'dom.iterable' 'webworker' 'scripthost' 'es2015.core' 'es2015.collection' 'es2015.generator' 'es2015.iterable' 'es2015.promise' 'es2015.proxy' 'es2015.reflect' 'es2015.symbol' 'es2015.symbol.wellknown' 'es2016.array.include' 'es2017.object' 'es2017.sharedmemory' 'es2017.string'
 --mapRoot LOCATION                                 Specify the location where debugger should locate map files instead of generated locations.
 --maxNodeModuleJsDepth                             The maximum dependency depth to search under node_modules and load JavaScript files
 -m KIND, --module KIND                             Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
 --moduleResolution STRATEGY                        Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6).
 --newLine NEWLINE                                  Specify the end of line sequence to be used when emitting files: 'CRLF' (dos) or 'LF' (unix).
 --noEmit                                           Do not emit outputs.
 --noEmitOnError                                    Do not emit outputs if any errors were reported.
 --noFallthroughCasesInSwitch                       Report errors for fallthrough cases in switch statement.
 --noImplicitAny                                    Raise error on expressions and declarations with an implied 'any' type.
 --noImplicitReturns                                Report error when not all code paths in function return a value.
 --noImplicitThis                                   Raise error on 'this' expressions with an implied 'any' type.
 --noImplicitUseStrict                              Do not emit 'use strict' directives in module output.
 --noUnusedLocals                                   Report errors on unused locals.
 --noUnusedParameters                               Report errors on unused parameters.
 --outDir DIRECTORY                                 Redirect output structure to the directory.
 --outFile FILE                                     Concatenate and emit output to single file.
 --preserveConstEnums                               Do not erase const enum declarations in generated code.
 --pretty                                           Stylize errors and messages using color and context. (experimental)
 -p FILE OR DIRECTORY, --project FILE OR DIRECTORY  Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'
 --reactNamespace                                   Specify the object invoked for createElement and __spread when targeting 'react' JSX emit
 --removeComments                                   Do not emit comments to output.
 --rootDir LOCATION                                 Specify the root directory of input files. Use to control the output directory structure with --outDir.
 --skipLibCheck                                     Skip type checking of declaration files.
 --sourceMap                                        Generates corresponding '.map' file.
 --sourceRoot LOCATION                              Specify the location where debugger should locate TypeScript files instead of source locations.
 --strictNullChecks                                 Enable strict null checks.
 --suppressImplicitAnyIndexErrors                   Suppress noImplicitAny errors for indexing objects lacking index signatures.
 -t VERSION, --target VERSION                       Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
 --traceResolution                                  Enable tracing of the name resolution process.
 --types                                            Type declaration files to be included in compilation.
 -v, --version                                      Print the compiler's version.
 -w, --watch                                        Watch input files.
 @<file>                                            Insert command line options and files from a file.
```
