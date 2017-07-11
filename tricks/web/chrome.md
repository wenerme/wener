# Chrome

## Tips
* DevTools: impossible to disable a breakpoint caused by "debugger" statement
  * https://bugs.chromium.org/p/chromium/issues/detail?id=429167
* Headless 可接受的参数参考 [headless_shell_switches.cc](https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc)
* [chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
* 下载扩展
  * http://chrome-extension-downloader.com/

```bash
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"

# https://www.chromium.org/developers/how-tos/run-chromium-with-flags
chromium --js-flags="--help"
```

## Headless
* https://developers.google.com/web/updates/2017/04/headless-chrome
* https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc
* https://chromedevtools.github.io/devtools-protocol/tot/Debugger/
* https://www.npmjs.com/package/chrome-remote-interface


```bash
chrome-remote-interface inspect
```

```js
Runtime.evaluate({expression: 'window.location.toString()'})

Log.enable()
Console.enable()
Log.entryAdded(({entry: e}) => console.log(`${new Date(e.timestamp).toISOString()} ${e.source}:${e.level} ${e.text}`));
Console.messageAdded(({message: e}) => console.log(`${new Date().toISOString()} ${e.source}:${e.level} ${e.text}`))


Runtime.executionContextCreated(async ({context}) => {
    await Runtime.evaluate({
        expression: `
        // setInterval:function _$aW(){_$uz=_$ez[_$dh](_$rz);},2000
        window._ev=window.eval
        window.eval=(...args)=>{
            if(args[0] == 'var a = new Date(); debugger; new Date() - a > 100;'){
                console.log('Found the evil')
                return false
            }
            return window._ev.apply(window,args)
        }
        console.log('ContextCreated: '+location.href)
        `,
        contextId: context.id,
    });
})

Runtime.evaluate({expression: `$('[name="request:sn"]').val('309491')`})

Runtime.evaluate({expression: `v=$('table input');o={};'tid,fd,sn,mon,hnc,nc,img'.split(',').forEach(n=>o[n]=v.attr(n));JSON.stringify(o)`})


Runtime.evaluate({expression: `$('table input').html()`})


Page.loadEventFired(async () => {
  Runtime.evaluate({expression: `v=$('table input');o={};'tid,fd,sn,mon,hnc,nc,img'.split(',').forEach(n=>o[n]=v.attr(n));JSON.stringify(o)`})
});


 Runtime.evaluate({expression: `$('[name="request:sn"]').val('309495')`})
 Runtime.evaluate({expression: `$('input[type=button]').eq(1).click()`})

 Runtime.evaluate({expression: `$('[name="request:sn"]').val('309496');$('input[type=button]').eq(1).click()`})
```

## Version

### 60
* [New in DevTools 60](https://developers.google.com/web/updates/2017/05/devtools-release-notes)
  * 新特性
    * 新的 Audit 面板
      * 包含 Lighthouse 工具
    * 可以为第三方标识标记
    * 可以使用 `Command+Click` 的方式使用 Continue to Here
    * 调试时可 Step into async
  * 修改
    * 以前在控制台输入一个对象, 如果其中属性是对象时只会显示 `Object`, 现在会显示更多信息
    * 控制台上下文选项菜单会显示更多信息
      * 标题
      * 子标题会显示域名和来源等
      * 鼠标放上去时会高亮页面中属于该上下文的部分
    * 实时覆盖测试结果显示
      * 以前只能点暂停后才能看到结果
    * Async 栈跟踪默认开启



### 59
* Headless
* [New in Chrome 59](https://developers.google.com/web/updates/2017/05/nic59)
* Native notifications on macOS
* Image capture API
* [New in DevTools 59](https://developers.google.com/web/updates/2017/04/devtools-release-notes)
  * CSS, JS 覆盖测试
  * 全页面截屏
  * 阻塞请求
  * Debug 时 Step Over async await
  * 统一的命令菜单
    * `Command+O`

## Extension
### FAQ
#### 弹出窗有时显示不出来

```js
// 解决有时弹出窗口显示有问题的情况
window.setTimeout(() => {
    let $content = $('body>content');
    $content.hide();
    window.setTimeout(() => $content.show(), 0);
}, 0);
```

#### 请求失败被限流
* http://dev.chromium.org/throttling
* 目前只要在启动时添加 `--disable-extensions-http-throttling` 来避免

#### Chrome extension code vs Content scripts vs Injected scripts


- **Extension code - Full access to all permitted [`chrome.*`][1] APIs.**<br>
 This includes the [background page][2], and all pages which have direct access to it via [`chrome.extension.getBackgroundPage()`][3], such as the [browser pop-ups][4].

- **[Content scripts][5] (via the manifest file or [`chrome.tabs.executeScript`][6]) - [Partial][7] access to some of the `chrome` APIs**, full access to the page's DOM (**not** to any of the `window` objects, including frames).  
Content scripts run in a scope between the extension and the page. The global `window` object of a Content script is distinct from the page/extension's global namespace.

- Injected scripts (via [this method][8] in a Content script) - Full access to all properties in the page. **No access to any of the `chrome.*` APIs.**  
 Injected scripts behave as if they were included by the page itself, and are not connected to the extension in any way. See [this post][9] to learn more information on the various injection methods.

To send a message from the injected script to the content script, events have to be used. See [this answer][10] for an example. Note: Message transported within an extension from one context to another are **automatically (JSON)-serialised and parsed**.

---

In your case, the code in the background page ([`chrome.tabs.onUpdated`][11]) is likely called before the content script `script.js` is evaluated. So, you'll get a `ReferenceError`, because `init` is not .

Also, when you use `chrome.tabs.onUpdated`, make sure that you test whether the page is fully loaded, because the event fires twice: Before load, and on finish:

    //background.html
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            // Execute some script when the page is fully (DOM) ready
            chrome.tabs.executeScript(null, {code:"init();"});
        }
    });


  [1]: http://developer.chrome.com/extensions/api_index.html
  [2]: http://developer.chrome.com/extensions/background_pages.html
  [3]: http://developer.chrome.com/extensions/extension.html#method-getBackgroundPage
  [4]: http://developer.chrome.com/extensions/browserAction.html
  [5]: http://developer.chrome.com/extensions/content_scripts.html
  [6]: http://developer.chrome.com/extensions/tabs.html#method-executeScript
  [7]:http://developer.chrome.com/extensions/extension.html#content%20scripts
  [8]: http://stackoverflow.com/a/9517879/938089?building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
  [9]: http://stackoverflow.com/a/9517879/938089?building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
  [10]: http://stackoverflow.com/q/9602022/938089?chrome-extension-retrieving-gmails-original-message
  [11]: http://developer.chrome.com/extensions/tabs.html#event-onUpdated

* http://stackoverflow.com/a/9916089/1870054
* [How to inject code from content script](http://stackoverflow.com/a/9517879/1870054)
