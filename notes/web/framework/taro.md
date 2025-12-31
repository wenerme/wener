---
title: Taro
---

## Tips

0. CSS
1. 不要使用 ID 选择器 (#od)、属性选择器、标签选择器

组件和引用组件的页面不能使用 id 选择器（#a）、属性选择器（[a]）和标签名选择器，请改用 class 选择器。
组件和引用组件的页面中使用后代选择器（.a .b）在一些极端情况下会有非预期的表现，如遇，请避免使用。
子元素选择器（.a > .b）只能用于 View 组件与其子节点之间，用于其他组件可能导致非预期的情况。
继承样式，如 font 、 color ，会从组件外（父组件）继承到组件内。但是引用组件时在组件节点上书写的 className 无效。 （具体解决方案请参见下面的外部和全局样式介绍。）
除继承样式外， app.scss 中的样式、组件所在页面的样式，均对自定义组件无效。

注意：externalClasses 需要使用 短横线命名法 (kebab-case)，而不是 React 惯用的 驼峰命名法 (camelCase)。否则无效。

需要通过 View 来布局

// 假设我们之前设置了 this.state.counter = 0
updateCounter () {
this.setState({
counter: 1
}, () => {
// 在这个函数内你可以拿到 setState 之后的值
})
}

这是 Taro 和 React 另一个不同的地方：React 的 setState 不一定总是异步的，他内部有一套事务机制控制，且 React 15/16 的实现也各不相同。而对于 Taro 而言，setState 之后，你提供的对象会被加入一个数组，然后在执行下一个 eventloop 的时候合并它们。

注意：在各小程序端，使用匿名函数，尤其是在 循环中 使用匿名函数，比使用 bind 进行事件传参占用更大的内存，速度也会更慢。

注意： 使用通过 usingComponents 的第三方组件不支持匿名函数

普通函数式组件命名规则请遵守帕斯卡命名法（Pascal Case), 如果是在函数内声明闭包组件，则需要使用函数表达式的写法。
形如:
const renderBody = state => {

HOC 支持不好

- [Issue #5069: Context support](https://github.com/NervJS/taro/issues/5069)
  闭包函数式组件接收函数参数时，函数参数会被编译成一个成员变量，导致多次调用该组件时函数参数被覆盖。

由于现在 Taro 还没有 render props 的完整支持，所以无法使用 Context.Comsumer API，如果要消费 Context，可以使用 ContextType 或 useContext API。

不加 undefined 可能会出现 true - 在小程序中
{this.state.collapse ? undefined : <View>{this.props.children}</View>}

由于现在 Taro 还没有 render props 的完整支持，所以无法使用 Context.Comsumer API，如果要消费 Context，可以使用 ContextType 或 useContext API。

```css
/* 不要这样用 */
#title {
}
[data-title] {
}
View {
}

/* 避免使用 - 可能会有问题 */
.content .title {
}
/* 只能用于 View 组件与其子节点之间 - 用于其它节点可能会有问题 */
.content > .title {
}

/* 微信 1.7.2 */
:host {
  color: yellow;
}
```

```tsx
class MyComponent extends Component {
  static options = {
    // 全局样式 - 建议所有组件都开启 - 因为 Web 默认行为是这样的
    // 微信 2.2.3
    addGlobalClass: true,
  };

  // 依赖外部样式 - 名字需要中划线分割
  // 微信 1.9.90
  static externalClasses = ['my-class'];
}
```

```jsx
<Button open-type='getUserInfo' onGetUserInfo={this.getUserInfo} > 微信授权 </Button>

<AtAvatar openData={{type:'userAvatarUrl'}} circle></AtAvatar>
```

## FAQ

### 引用静态字体文件

- 需要做 base64 编码
- [Transfonter](https://transfonter.org/)
- [NervJS/taro-ui-demo](https://github.com/NervJS/taro-ui-demo/blob/master/src/assets/font-awesome/font-awesome.scss)
- 或者外部引用
  - [font-awesome/5.12.0-1](https://cdnjs.com/libraries/font-awesome/5.12.0-1)

```css
@font-face {
  font-family: 'FontAwesome';
  src: url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0');
  src: url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  // src: url('./assets/font-awesome/fontawesome-webfont.eot?v=4.7.0');
  // src: url('./assets/font-awesome/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('./fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('./fontawesome-webfont.woff?v=4.7.0') format('woff'), url('./fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('./fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

### 使用 async/await

```bash
yarn add babel-plugin-transform-runtime --dev
yarn add babel-runtime
```

**config/index.js**

```js
{
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      // 新增该配置
      ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  }
}
```

## 使用别名

**config/index.js**

```js
{
  // 新增配置项
  alias: {
    // 如果比较多
    ...(Object.fromEntries(['components', 'libs', 'hooks', 'types'].map(v => [v, path.resolve(__dirname, '..', `src/${v}`)]))),
    // 或者单个配置
    'utils': path.resolve(__dirname, '..', 'src/utils')
  },
}
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    // 新增配置
    "paths": {
      "components/*": ["src/components/*"],
      "types/*": ["src/types/*"],
      "libs/*": ["src/libs/*"],
      "hooks/*": ["src/hooks/*"]
    }
  }
}
```
