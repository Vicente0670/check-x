import type { Events, RequestMessage } from "./MessageTypes";

const IsDev = true;

async function verifyEvent(m: RequestMessage) {
  const ev: Events = m.event;

  switch (ev) {

    case "reloadpage": {
      await chrome.tabs.reload();
      break;
    }

    case "reloadmetadata": {
      console.info(`Event ${ev} is known.`); // temp
      break;
    }

    default: {
      console.error(`${onExtensionOpen.name} did not recognize event named "${ev}".`);
    }
  }
}

async function onExtensionOpen(
  m: RequestMessage,
  s: chrome.runtime.MessageSender,
  sendResponse: (res: unknown) => void
) {
  
  await verifyEvent(m);

  if (IsDev) {
    console.groupCollapsed(onExtensionOpen.name);
    console.log(m);
    console.log(s);
    console.log(sendResponse);
    console.groupEnd();
  }

  return true;
}

chrome.runtime.onMessage.addListener(onExtensionOpen);