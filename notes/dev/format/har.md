---
title: HTTP Archive format
---

# har


:::tip

- Chrome 导出包含了 Websocket 等信息，需要自行处理

:::

- har - HTTP Archive format
  - by W3C
  - **abandoned**
- adopted by:
  - Google Chrome
  - Safari
  - Firefox
  - Charles Proxy
  - Fiddler
  - Firebug
  - Internet Explorer 9
  - Microsoft Edge
  - Postman
  - OWASP ZAP
  - k6 - 记录 HTTP 请求
  - http://www.softwareishard.com/blog/har-adopters/
- Chrome
  - 支持导入 - Chrome62+
  - 支持导出
  - https://developer.chrome.com/docs/devtools/network/reference
  - [chrome.devtools.network](https://developer.chrome.com/docs/extensions/reference/api/devtools/network)
- 参考
  - https://gitgrimbo.github.io/harviewer/master/
    - [janodvarko/harviewer](https://github.com/janodvarko/harviewer)
  - https://toolbox.googleapps.com/apps/har_analyzer/
    - 不会显示 _initiator, _webSocketMessages
    - _resourceType=websocket
  - http://www.softwareishard.com/blog/har-12-spec/
  - [Everettss/puppeteer-har](https://github.com/Everettss/puppeteer-har)
- 可用于
  - 记录 HTTP 请求
  - 测试、Mock
- JSON-formatted archive file

```ts
/**
 * HTTP Archive 1.2
 *
 * http://www.softwareishard.com/blog/har-12-spec
 */
export interface Har {
  /** This object represents the root of exported data. */
  log: Log;
}
/**
 * This object (`log`) represents the root of exported data.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#log
 */
export interface Log {
  version: string | "1.1";
  creator: Creator;
  browser?: Browser | undefined;
  /**
   * List of all exported (tracked) pages.
   *
   * _Leave out this field if the application
   * does not support grouping by pages._
   *
   * There is one `<page>` object for every exported web page and one
   * `<entry>` object for every HTTP request.
   * In case when an HTTP trace tool isn't able to group requests by a page,
   * the `<pages>` object is empty and individual requests doesn't have a
   * parent page.
   */
  pages?: Page[] | undefined;
  /** List of all exported (tracked) requests. */
  entries: Entry[];
  /** A comment provided by the user or the application. */
  comment?: string | undefined;
}
export interface Creator {
  name: string;
  version: string;
  comment?: string | undefined;
}

export interface Browser {
  name: string;
  version: string;
  comment?: string | undefined;
}
/**
 * This object represents list of exported pages.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#pages
 */
export interface Page {
  /**
   * Date and time stamp for the beginning of the page load
   *
   * (ISO 8601 - `YYYY-MM-DDThh:mm:ss.sTZD`,
   * e.g. `2009-07-24T19:20:30.45+01:00`).
   */
  startedDateTime: string;
  /**
   * Unique identifier of a page within the `<log>` (HAR doc).
   * Entries use it to refer the parent page.
   */
  id: string;
  /** Page title. */
  title: string;
  /** Detailed timing info about page load */
  pageTimings: PageTiming;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;

  _adult_site?: number | null | undefined;

  _aft?: number | null | undefined;

  _base_page_cdn?: string | null | undefined;

  _base_page_redirects?: number | null | undefined;

  _base_page_ttfb?: number | null | undefined;

  _browser_main_memory_kb?: number | null | undefined;

  _browser_name?: string | null | undefined;

  _browser_other_private_memory_kb?: number | null | undefined;

  _browser_process_count?: number | null | undefined;

  _browser_version?: string | null | undefined;

  _browser_working_set_kb?: number | null | undefined;

  _bytesIn?: number | null | undefined;

  _bytesInDoc?: number | null | undefined;

  _bytesOut?: number | null | undefined;

  _bytesOutDoc?: number | null | undefined;

  _cached?: number | null | undefined;

  _certificate_bytes?: number | null | undefined;

  _connections?: number | null | undefined;

  _date?: number | null | undefined;

  _docCPUms?: number | null | undefined;

  _docCPUpct?: number | null | undefined;

  _docTime?: number | null | undefined;

  _domContentLoadedEventEnd?: number | null | undefined;

  _domContentLoadedEventStart?: number | null | undefined;

  _domElements?: number | null | undefined;

  _domInteractive?: number | null | undefined;

  _domLoading?: number | null | undefined;

  _domTime?: number | null | undefined;

  _effectiveBps?: number | null | undefined;

  _effectiveBpsDoc?: number | null | undefined;

  _eventName?: string | null | undefined;

  _firstPaint?: number | null | undefined;

  _fixed_viewport?: number | null | undefined;

  _fullyLoaded?: number | null | undefined;

  _fullyLoadedCPUms?: number | null | undefined;

  _fullyLoadedCPUpct?: number | null | undefined;

  _gzip_savings?: number | null | undefined;

  _gzip_total?: number | null | undefined;

  _image_savings?: number | null | undefined;

  _image_total?: number | null | undefined;

  _isResponsive?: number | null | undefined;

  _lastVisualChange?: number | null | undefined;

  _loadEventEnd?: number | null | undefined;

  _loadEventStart?: number | null | undefined;

  _loadTime?: number | null | undefined;

  _minify_savings?: number | null | undefined;

  _minify_total?: number | null | undefined;

  _optimization_checked?: number | null | undefined;

  _pageSpeedVersion?: string | null | undefined;

  _render?: number | null | undefined;

  _requests?: number | null | undefined;

  _requestsDoc?: number | null | undefined;

  _requestsFull?: number | null | undefined;

  _responses_200?: number | null | undefined;

  _responses_404?: number | null | undefined;

  _responses_other?: number | null | undefined;

  _result?: number | null | undefined;

  _run?: number | null | undefined;

  _score_cache?: number | null | undefined;

  _score_cdn?: number | null | undefined;

  _score_combine?: number | null | undefined;

  _score_compress?: number | null | undefined;

  _score_cookies?: number | null | undefined;

  _score_etags?: number | null | undefined;

  _score_gzip?: number | null | undefined;

  '_score_keep-alive'?: number | null | undefined;

  _score_minify?: number | null | undefined;

  _score_progressive_jpeg?: number | null | undefined;

  _server_count?: number | null | undefined;

  _server_rtt?: number | null | undefined;

  _SpeedIndex?: number | null | undefined;

  _step?: number | null | undefined;

  _title?: string | null | undefined;

  _titleTime?: number | null | undefined;

  _TTFB?: number | null | undefined;

  _URL?: string | null | undefined;

  _visualComplete?: number | null | undefined;
  /**
   * _non-standard_
   *
   * See "Custom Fields" under http://www.softwareishard.com/blog/har-12-spec
   */
  [customField: `_${string}`]: unknown | null | undefined;
}
/**
 * This object describes timings for various events (states) fired during the
 * page load.
 *
 * All times are specified in milliseconds.
 *
 * If a time info is not available appropriate field is set to `-1`.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#pageTimings
 */
export interface PageTiming {
  /**
   * Content of the page loaded. Number of milliseconds since page load
   * started (`page.startedDateTime`).
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  onContentLoad?: number | undefined;
  /**
   * Page is loaded (`onLoad` event fired). Number of milliseconds since
   * page load started (`page.startedDateTime`).
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  onLoad?: number | undefined;
  /** A comment provided by the user or the application */
  comment?: string | undefined;
  _startRender?: number | null | undefined;
}
/**
 * _non-standard_
 *
 * Data for Chunk as provided by e.g. WebPageTest
 */
export interface Chunk {
  bytes: number;
  ts: number;
}
/**
 * This object represents an array with all exported HTTP requests. Sorting
 * entries by `startedDateTime` (starting from the oldest) is preferred way how
 * to export data since it can make importing faster.
 * However the reader application should always make sure the array is sorted
 * (if required for the import).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#entries
 */
export interface Entry {
  /**
   * Reference to the parent page. Leave out this field if the application
   * does not support grouping by pages.
   */
  pageref?: string | undefined;
  /**
   * Date and time stamp of the request start
   *
   * (ISO 8601 - `YYYY-MM-DDThh:mm:ss.sTZD`).
   */
  startedDateTime: string;
  /**
   * Total elapsed time of the request in milliseconds.
   *
   * This is the sum of all timings available in the timings object
   * (i.e. not including `-1` values).
   */
  time: number;
  /** Detailed info about the request. */
  request: Request;
  /** Detailed info about the response. */
  response: Response;
  /** Info about cache usage. */
  cache: Cache;
  /** Detailed timing info about request/response round trip. */
  timings: Timings;
  /**
   * IP address of the server that was connected
   * (result of DNS resolution).
   */
  serverIPAddress?: string | undefined;
  /**
   * Unique ID of the parent TCP/IP connection, can be the client or server
   * port number.
   *
   * Note that a port number doesn't have to be unique identifier
   * in cases where the port is shared for more connections.
   *
   * If the port isn't available for the application, any other unique
   * connection ID can be used instead (e.g. connection index). Leave out
   * this field if the application doesn't support this info.
   */
  connection?: string | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;

  _all_end?: number | string | null | undefined;

  _all_ms?: number | string | null | undefined;

  _all_start?: number | string | null | undefined;

  _bytesIn?: number | string | null | undefined;

  _bytesOut?: number | string | null | undefined;

  _cacheControl?: string | null | undefined;

  _cache_time?: number | string | null | undefined;

  _cdn_provider?: string | null | undefined;

  _certificate_bytes?: number | string | null | undefined;

  _chunks?: Chunk[] | null | undefined;

  _client_port?: number | string | null | undefined;

  _connect_end?: number | string | null | undefined;

  _connect_ms?: number | string | null | undefined;

  _connect_start?: number | string | null | undefined;

  _contentEncoding?: string | null | undefined;

  _contentType?: string | null | undefined;

  _dns_end?: number | string | null | undefined;

  _dns_ms?: number | string | null | undefined;

  _dns_start?: number | string | null | undefined;

  _download_end?: number | string | null | undefined;

  _download_ms?: number | string | null | undefined;

  _download_start?: number | string | null | undefined;

  _expires?: string | null | undefined;

  _fromCache?: 'memory' | 'disk' | null | undefined;

  _full_url?: string | null | undefined;

  _gzip_save?: number | string | null | undefined;

  _gzip_total?: number | string | null | undefined;

  _host?: string | null | undefined;

  _http2_stream_dependency?: number | string | null | undefined;

  _http2_stream_exclusive?: number | string | null | undefined;

  _http2_stream_id?: number | string | null | undefined;

  _http2_stream_weight?: number | string | null | undefined;

  _image_save?: number | string | null | undefined;

  _image_total?: number | string | null | undefined;

  _index?: number | null | undefined;

  _initiator?: string | null | undefined;

  _initiator_column?: string | null | undefined;

  _initiator_detail?: string | null | undefined;

  _initiator_function?: string | null | undefined;

  _initiator_line?: string | null | undefined;

  _initiator_type?: string | null | undefined;

  _ip_addr?: string | null | undefined;

  _is_secure?: number | string | null | undefined;

  _jpeg_scan_count?: number | string | null | undefined;

  _load_end?: number | string | null | undefined;

  _load_ms?: number | string | null | undefined;

  _load_start?: number | string | null | undefined;

  _method?: string | null | undefined;

  _minify_save?: number | string | null | undefined;

  _minify_total?: number | string | null | undefined;

  _number?: number | null | undefined;

  _objectSize?: number | string | null | undefined;

  _objectSizeUncompressed?: number | string | null | undefined;

  _priority?: string | null | undefined;

  _protocol?: number | string | null | undefined;

  _request_id?: number | string | null | undefined;

  _resourceType?:
    | 'document'
    | 'stylesheet'
    | 'image'
    | 'media'
    | 'font'
    | 'script'
    | 'texttrack'
    | 'xhr'
    | 'fetch'
    | 'prefetch'
    | 'eventsource'
    | 'websocket'
    | 'webtransport'
    | 'wasm'
    | 'manifest'
    | 'signed-exchange'
    | 'ping'
    | 'csp-violation-report'
    | 'other'
    | 'preflight'
    | 'sm-script'
    | 'sm-stylesheet'
    | 'webbundle'
    | null
    | undefined;

  _responseCode?: number | string | null | undefined;

  _score_cache?: number | string | null | undefined;

  _score_cdn?: number | string | null | undefined;

  _score_combine?: number | string | null | undefined;

  _score_compress?: number | string | null | undefined;

  _score_cookies?: number | string | null | undefined;

  _score_etags?: number | string | null | undefined;

  _score_gzip?: number | string | null | undefined;

  '_score_keep-alive'?: number | string | null | undefined;

  _score_minify?: number | string | null | undefined;

  _score_progressive_jpeg?: number | null | undefined;

  _server_count?: number | string | null | undefined;

  _server_rtt?: number | string | null | undefined;

  _socket?: number | string | null | undefined;

  _ssl_end?: number | string | null | undefined;

  _ssl_ms?: number | string | null | undefined;

  _ssl_start?: number | string | null | undefined;

  _ttfb_end?: number | string | null | undefined;

  _ttfb_ms?: number | string | null | undefined;

  _ttfb_start?: number | string | null | undefined;

  _type?: number | string | null | undefined;

  _url?: string | null | undefined;

  _was_pushed?: number | string | null | undefined;

  _initialPriority?: string | null | undefined;

  _renderBlocking?: string | null | undefined;

  _isLCP?: boolean | null | undefined;

  _webSocketMessages?:
    | Array<{
        type: 'send' | 'receive';
        time: number;
        opcode: number;
        data: string;
      }>
    | null
    | undefined;
  /**
   * _non-standard_
   *
   * See "Custom Fields" under http://www.softwareishard.com/blog/har-12-spec
   */
  [customField: `_${string}`]: unknown | null | undefined;
}
/**
 * This object contains detailed info about performed request.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#request
 */
export interface Request {
  /** Request method (`GET`, `POST`, ...). */
  method: string;
  /** Absolute URL of the request (fragments are not included). */
  url: string;
  /** Request HTTP Version. */
  httpVersion: string;
  /** List of cookie objects. */
  cookies: Cookie[];
  /** List of header objects. */
  headers: Header[];
  /** List of query parameter objects. */
  queryString: QueryString[];
  /** Posted data info. */
  postData?: PostData | undefined;
  /**
   * Total number of bytes from the start of the HTTP request message until
   * (and including) the double CRLF before the body.
   *
   * Set to `-1` if the info is not available.
   */
  headersSize: number;
  /**
   * Size of the request body (POST data payload) in bytes.
   *
   * Set to `-1` if the info is not available.
   */
  bodySize: number;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
/**
 * This object contains detailed info about the response.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#response
 */
export interface Response {
  /** Response status. */
  status: number;
  /** Response status description. */
  statusText: string;
  /** Response HTTP Version. */
  httpVersion: string;
  /** List of cookie objects. */
  cookies: Cookie[];
  /** List of header objects. */
  headers: Header[];
  /** Details about the response body. */
  content: Content;
  /** Redirection target URL from the Location response header. */
  redirectURL: string;
  /**
   * Total number of bytes from the start of the HTTP response message until
   * (and including) the double CRLF before the body.
   *
   * Set to `-1` if the info is not available.
   *
   * _The size of received response-headers is computed only from headers
   * that are really received from the server. Additional headers appended by
   * the browser are not included in this number, but they appear in the list
   * of header objects._
   */
  headersSize: number;
  /**
   * Size of the received response body in bytes.
   *
   * - Set to zero in case of responses coming from the cache (`304`).
   * - Set to `-1` if the info is not available.
   */
  bodySize: number;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;

  _transferSize?: number | null | undefined;
}
/**
 * This object contains list of all cookies (used in `request` and `response`
 * objects).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#cookies
 */
export interface Cookie {
  /** The name of the cookie. */
  name: string;
  /** The cookie value. */
  value: string;
  /** The path pertaining to the cookie. */
  path?: string | undefined;
  /** The host of the cookie. */
  domain?: string | undefined;
  /**
   * Cookie expiration time.
   * (ISO 8601 - `YYYY-MM-DDThh:mm:ss.sTZD`,
   * e.g. `2009-07-24T19:20:30.123+02:00`).
   */
  expires?: string | undefined;
  /** Set to true if the cookie is HTTP only, false otherwise. */
  httpOnly?: boolean | undefined;
  /** True if the cookie was transmitted over ssl, false otherwise. */
  secure?: boolean | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}

/**
 * This object represents a headers (used in `request` and `response` objects).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#headers
 */
export interface Header {
  name: string;
  value: string;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
/**
 * This object represents a parameter & value parsed from a query string,
 * if any (embedded in `request` object).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#queryString
 */
export interface QueryString {
  name: string;
  value: string;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
/**
 * This object describes posted data, if any (embedded in `request` object).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#postData
 */
export type PostData = PostDataCommon & (PostDataParams | PostDataText);

/**
 * The common properties of PostData
 */
export interface PostDataCommon {
  /** Mime type of posted data. */
  mimeType: string;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}

/**
 * Post data with `params` specified.
 */
export interface PostDataParams {
  /**
   * List of posted parameters (in case of URL encoded parameters).
   */
  params: Param[];

  /**
   * _`params` and `text` fields are mutually exclusive._
   */
  text?: never | undefined;
}

/**
 * Post data with `text` specified.
 */
export interface PostDataText {
  /**
   * Plain text posted data
   */
  text: string;

  /**
   * _`params` and `text` fields are mutually exclusive._
   */
  params?: never | undefined;
}

/**
 * List of posted parameters, if any (embedded in `postData` object).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#params
 */
export interface Param {
  /** name of a posted parameter. */
  name: string;
  /** value of a posted parameter or content of a posted file */
  value?: string | undefined;
  /** name of a posted file. */
  fileName?: string | undefined;
  /** content type of a posted file. */
  contentType?: string | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}

/**
 * This object describes details about response content
 * (embedded in `response` object).
 *
 * http://www.softwareishard.com/blog/har-12-spec/#content
 */
export interface Content {
  /**
   * Length of the returned content in bytes.
   *
   * Should be equal to `response.bodySize` if there is no compression and
   * bigger when the content has been compressed.
   */
  size: number;
  /**
   * Number of bytes saved. Leave out this field if the information is not
   * available.
   */
  compression?: number | undefined;
  /**
   * MIME type of the response text (value of the Content-Type response
   * header).
   *
   * The charset attribute of the MIME type is included (if available).
   */
  mimeType: string;
  /**
   * Response body sent from the server or loaded from the browser cache.
   *
   * This field is populated with textual content only.
   *
   * The text field is either HTTP decoded text or a encoded (e.g. `base64`)
   * representation of the response body.
   *
   * Leave out this field if the information is not available.
   */
  text?: string | undefined;
  /**
   * Encoding used for response text field e.g `base64`.
   *
   * Leave out this field if the text field is HTTP decoded
   * (decompressed & unchunked), than trans-coded from its original character
   * set into UTF-8.
   */
  encoding?: string | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
/**
 * This objects contains info about a request coming from browser cache.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#cache
 */
export interface Cache {
  /**
   * State of a cache entry before the request.
   *
   * Leave out this field if the information is not available.
   */
  beforeRequest?: CacheDetails | null | undefined;
  /**
   * State of a cache entry after the request.
   *
   * Leave out this field if the information is not available.
   */
  afterRequest?: CacheDetails | null | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
export interface CacheDetails {
  /**
   * Expiration time of the cache entry.
   *
   * _(Format not documente but assumingly ISO 8601 -
   * `YYYY-MM-DDThh:mm:ss.sTZD`)_
   */
  expires?: string | undefined;
  /**
   * The last time the cache entry was opened.
   *
   * _(Format not documente but assumingly ISO 8601 -
   * `YYYY-MM-DDThh:mm:ss.sTZD`)_
   */
  lastAccess: string;
  /** Etag */
  eTag: string;
  /** The number of times the cache entry has been opened. */
  hitCount: number;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
/**
 * This object describes various phases within request-response round trip.
 *
 * All times are specified in milliseconds.
 *
 * http://www.softwareishard.com/blog/har-12-spec/#timings
 */
export interface Timings {
  /**
   * Time spent in a queue waiting for a network connection.
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  blocked?: number | undefined;
  /**
   * DNS resolution time. The time required to resolve a host name.
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  dns?: number | undefined;
  /**
   * Time required to create TCP connection.
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  connect?: number | undefined;
  /**
   * Time required to send HTTP request to the server.
   *
   * _Not optional and must have non-negative values._
   */
  send?: number | undefined;
  /**
   * Waiting for a response from the server.
   *
   * _Not optional and must have non-negative values._
   */
  wait: number;
  /**
   * Time required to read entire response from the server (or cache).
   *
   * _Not optional and must have non-negative values._
   */
  receive: number;
  /**
   * Time required for SSL/TLS negotiation.
   *
   * If this field is defined then the time is also included in the connect
   * field (to ensure backward compatibility with HAR 1.1).
   *
   * Use `-1` if the timing does not apply to the current request.
   */
  ssl?: number | undefined;
  /**  A comment provided by the user or the application */
  comment?: string | undefined;
}
```

- https://www.npmjs.com/package/@types/har-format
