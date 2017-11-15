# mitmproxy

## Tips
* http://mrpeak.cn/blog/mitmproxy/
* 证书安装访问 http://mitm.it/
* [Doc](http://docs.mitmproxy.org/en/stable/)

```bash
```


```
List view:

      A      accept all intercepted flows
      a      accept this intercepted flow
      b      save request/response body
      C      export flow to clipboard
      d      delete flow
      D      duplicate flow
      e      toggle eventlog
      E      export flow to file
      f      filter view
      F      toggle follow flow list
      L      load saved flows
      m      toggle flow mark
      M      toggle marked flow view
      n      create a new request
      o      set flow order
      r      replay request
      S      server replay request/s
      U      unmark all marked flows
      v      reverse flow order
      V      revert changes to request
      w      save flows
      W      stream flows to file
      X      kill and delete flow, even if it's mid-intercept
      z      clear flow list or eventlog
      Z      clear unmarked flows
      tab    tab between eventlog and flow list
      enter  view flow
      |      run script on this flow

Detail view:

      A      accept all intercepted flows
      a      accept this intercepted flow
      b      save request/response body
      C      export flow to clipboard
      D      duplicate flow
      d      delete flow
      e      edit request/response
      f      load full body data
      m      change body display mode for this entity
             (default mode can be changed in the options)
             automatic: automatic detection
             hex: Hex
             html: HTML
             image: Image
             javascript: JavaScript
             json: JSON
             urlencoded: URL-encoded data
             raw: raw data
             xml: XML
      E      export flow to file
      r      replay request
      V      revert changes to request
      v      view body in external viewer
      w      save all flows matching current view filter
      W      save this flow
      x      delete body
      z      encode/decode a request/response
      tab    next tab
      h, l   previous tab, next tab
      space  next flow
      |      run script on this flow
      /      search (case sensitive)
      n      repeat search forward
      N      repeat search backwards

Movement:

      j, k           down, up
      h, l           left, right (in some contexts)
      g, G           go to beginning, end
      space          page down
      pg up/down     page up/down
      ctrl+b/ctrl+f  page up/down
      arrows         up, down, left, right


Global keys:

      i  set interception pattern
      O  options
      q  quit / return to previous page
      Q  quit without confirm prompt
      R  replay of requests/responses from file


Filter expressions:

      ~a          Match asset in response: CSS, Javascript, Flash, images.
      ~b regex    Body
      ~bq regex   Request body
      ~bs regex   Response body
      ~c int      HTTP response code
      ~d regex    Domain
      ~dst regex  Match destination address
      ~e          Match error
      ~h regex    Header
      ~hq regex   Request header
      ~hs regex   Response header
      ~http       Match HTTP flows
      ~m regex    Method
      ~marked     Match marked flows
      ~q          Match request with no response
      ~s          Match response
      ~src regex  Match source address
      ~t regex    Content-type header
      ~tcp        Match TCP flows
      ~tq regex   Request Content-Type header
      ~ts regex   Response Content-Type header
      ~u regex    URL
      !           unary not
      &           and
      |           or
      (...)       grouping

    Regexes are Python-style.
    Regexes can be specified as quoted strings.
    Header matching (~h, ~hq, ~hs) is against a string of the form "name: value".
    Expressions with no operators are regex matches against URL.
    Default binary operator is &.

    Examples:

      google\.com             Url containing "google.com
      ~q ~b test              Requests where body contains "test"
      !(~q & ~t "text/html")  Anything but requests with a text/html content type.

```
