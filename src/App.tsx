import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { ISDEV, type OpenGraph, type RequestMessage, type ReturnMessage, type Twitter } from "./MessageTypes";
import type { MouseEvent } from "react";
import Default from "./components/Default/Default";
import TwitterCard from "./components/Twitter/Twitter";

export default function App() {
  const [title, setTitle] = useState<string>("Not a valid page");
  const [link, setLink] = useState<string>("Try visiting another domain, localhost, or refreshing the metadata.");
  const [openGraph, setOpenGraph] = useState<OpenGraph>({
    title: "No title provided",
    description: "No description provided",
    type: "website",
    image: "/unknown.svg",
    url: undefined,
    "theme-color": undefined
  });
  const [twitter, setTwitter] = useState<Twitter>({});
  
  async function reloadPage(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    await chrome.tabs.reload();
  }

  const auditMetadata = useCallback(async (msg?: RequestMessage): Promise<ReturnMessage> => {

    async function requestTabId(): Promise<number | undefined> {
      const [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab.id;
    }

    if (!msg)
      msg = { event: "reloadmetadata" };

    const id: number | undefined = await requestTabId();

    if (!id)
      return msg as ReturnMessage;

    const res: ReturnMessage = await chrome.tabs.sendMessage(id, msg);
    const l = res.url;
    const t = res.title || l;
    setTitle(t);
    setLink(l);

    setOpenGraph(() => {
      return res.meta.OpenGraph;
    });
    setTwitter(() => {
      // Pull default values from OpenGraph
      const t = res.meta.Twitter;
      const o = res.meta.OpenGraph;
      const names = Object.keys(o);
      for (let i = 0; i < names.length; i++) {
        const name = names[i] as keyof OpenGraph;
        if (!t[name])
          t[name] = o[name];
      }
      return t;
    });

    return res;
  }, []);

  async function reloadMetadata(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    await auditMetadata();
  }
  
  useEffect(() => {
    async function init() {
      const msg: RequestMessage = { event: "initmetadata" }
      const res: ReturnMessage = await auditMetadata(msg);
      if (ISDEV) {
        console.groupCollapsed("dude....");
        console.warn(res.meta);
        console.groupEnd();
      }
    }
    init();
  }, [ auditMetadata ]);

  return (
    <>
      <header className="header">
        <div className="branding">
          <img  
            className="logo"
            src="/favicon.svg"
            alt="Logo"
          />
        </div>
        <div className="functions">
          <button type="button" onClick={reloadPage}>Reload Page</button>
          <button type="button" onClick={reloadMetadata}>Reload Metadata</button>
        </div>
      </header>
      <main className="main">
        <Default {...openGraph}></Default>
        <TwitterCard {...twitter}></TwitterCard>
      </main>
    </>
  )
}