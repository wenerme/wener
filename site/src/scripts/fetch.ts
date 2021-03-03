import nodeFetch from 'node-fetch';
import type { RequestInfo, RequestInit, Response } from 'node-fetch';
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent';
import { SocksProxyAgent } from 'socks-proxy-agent';

function getAgent(proxy: string): any {
  if (/^socks.?:/.test(proxy)) {
    return new SocksProxyAgent(proxy);
  }
  if (proxy.startsWith('https:')) {
    return new HttpsProxyAgent({ proxy });
  }
  return new HttpProxyAgent({ proxy });
}

export function fetch(url: RequestInfo, init: RequestInit = {}): Promise<Response> {
  const proxy = process.env.https_proxy;
  if (proxy) {
    init = { ...init, agent: getAgent(proxy) };
  }

  return nodeFetch(url, init);
}
