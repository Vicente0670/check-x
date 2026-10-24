import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { ISDEV, type OpenGraph, type RequestMessage, type ReturnMessage, type Twitter } from "./MessageTypes";
import type { MouseEvent } from "react";
import Default from "./components/Default/Default";

export default function App() {
  const [title, setTitle] = useState<string>("Not a valid page");
  const [link, setLink] = useState<string>("Try localhost or another domain.");
  const [openGraph, setOpenGraph] = useState<OpenGraph>({
    title: "No title provided",
    description: "No description provided",
    type: "website",
    image: "/unknown.svg",
    url: undefined,
    "theme-color": "#eeeeee"
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
      return res.meta.Twitter;
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
          <div className="sitedata">
            <h1 className="title">{title}</h1>
            <p className="link">
              <a href={link} target="_blank">{link}</a>
            </p>
          </div>
        </div>
        <div className="functions">
          <button type="button" onClick={reloadPage}>Reload Page</button>
          <button type="button" onClick={reloadMetadata}>Reload Metadata</button>
        </div>
      </header>
      <main className="main">
        <Default {...openGraph}></Default>
      </main>
    </>
  )
}