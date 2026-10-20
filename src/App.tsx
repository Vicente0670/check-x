import "./App.css";
import type { MouseEvent } from "react";
import type { RequestMessage } from "./MessageTypes";

export default function App() {

  async function reloadPage(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();

    const message: RequestMessage = { event: "reloadpage" };
    await chrome.runtime.sendMessage(message);
  }

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
            <h1 className="title">Long Page Name</h1>
            <p className="link">
              <a href="/">https://www.google.com/documents/important/stuff/</a>
            </p>
          </div>
        </div>
        <div className="functions">
          <button onClick={reloadPage}>Reload Page</button>
          <button>Reload Metadata</button>
        </div>
      </header>
      <main>
        <section className="">
          
        </section>
      </main>
    </>
  )
}