
## Chrome extension code vs Content scripts vs Injected scripts


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
