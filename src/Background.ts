import { ISDEV } from "./MessageTypes";
import type { RequestMessage, ReturnMessage } from "./MessageTypes";

async function onExtensionOpen(
  m: RequestMessage,
  s: chrome.runtime.MessageSender,
  sendResponse: (res: ReturnMessage) => void
) {

  if (ISDEV) {
    console.groupCollapsed(onExtensionOpen.name);
    console.log(m);
    console.log(s);
    console.log(sendResponse);
    console.groupEnd();
  }

  return true;
}

chrome.runtime.onMessage.addListener(onExtensionOpen);