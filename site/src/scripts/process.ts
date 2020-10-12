import globby from "globby";
import fs from "fs-extra";
import nodeFetch from "node-fetch";
import type { RequestInfo, RequestInit, Response } from "node-fetch";
import { HttpProxyAgent, HttpsProxyAgent } from "hpagent";
import { SocksProxyAgent } from "socks-proxy-agent";

function getAgent(proxy: string): any {
  if (/^socks.?:/.test(proxy)) {
    return new SocksProxyAgent(proxy);
  }
  if (proxy.startsWith("https:")) {
    return new HttpsProxyAgent({ proxy });
  }
  return new HttpProxyAgent({ proxy });
}

function fetch(url: RequestInfo, init: RequestInit = {}): Promise<Response> {
  const proxy = process.env.https_proxy;
  if (proxy) {
    init = { ...init, agent: getAgent(proxy) };
  }

  return nodeFetch(url, init);
}

async function main() {
  const paths = await globby("./contents/**/*.md");
  let files: FileData[] = await Promise.all(
    paths.map(async (v) => {
      const content = (await fs.readFile(v)).toString();
      return { content, raw: content, filename: v };
    })
  );
  files = files.filter((v) => v.content.startsWith("---"));

  for (const file of files) {
    await processing(file);
  }

  files = files.filter((v) => v.content !== v.raw);
  console.log("Processed", files.length);
  files.map((v) => v.filename).forEach((v) => console.log(v));

  for (const v of files) {
    await fs.writeFile(v.filename, v.content);
  }
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

interface FileData {
  filename: string;
  raw: string;
  changed?: boolean;
  content: string;
}

async function processing(data: FileData): Promise<FileData> {
  data.content = await processInstruction(data.content);
  return data;
}

function markdownResolveLink(s: string, base: string): string {
  return s.replace(/\[([^\]]*)]\(([^)]+)\)/g, (p, label, href) => {
    if (/^https?:/.test(href)) {
      return p;
    }
    if (/^#/.test(href)) {
      return p;
    }
    console.log("Resolve", href, base);
    return `[${label}](${new URL(href, base).toString()})`;
  });
}

const imports = {};
async function processInstruction(s: string): Promise<string> {
  const a = parseInstruction(s);
  if (!a) {
    return s;
  }
  for (const v of a) {
    if (typeof v !== "string") {
      switch (v.cmd) {
        case "import":
          v.replace = imports[v.args] || (await fetch(v.args).then((v) => v.text()));
          v.replace = markdownResolveLink(v.replace, v.args);
          console.log("import", v.args);
          break;

        default:
          console.log(`ignore cmd`, v.cmd);
          break;
      }
    }
  }

  return a.join("");
}

type Instruction = { cmd: string; args: string; raw: string; replace?: string; [k: string]: any };

function parseInstruction(s: string): null | Array<string | Instruction> {
  const sp = s.split(/(<!--\s*(import)\((.*?)\)\s*-->)/);
  if (sp.length == 1) {
    return null;
  }
  const itor = sp[Symbol.iterator]();
  const o = [];
  for (let v = itor.next(); !v.done; v = itor.next()) {
    if (v.value.startsWith("<!--") && v.value.endsWith("-->")) {
      o.push({
        cmd: itor.next().value,
        args: itor.next().value,
        raw: v.value,
        toString() {
          return String(this.replace || this.raw);
        },
      });
    } else {
      o.push(v.value);
    }
  }
  return o;
}
