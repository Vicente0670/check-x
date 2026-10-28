import { ISDEV, OpenGraphNamesBase, PropertyMap, PropertySet, TwitterNamesBase } from "./MessageTypes";
import type { MetadataContainer, OpenGraph, RequestMessage, ReturnMessage, Twitter, TwitterCardKeys } from "./MessageTypes";


function filterTags(metadata: HTMLMetaElement[]): MetadataContainer {
  const m = metadata;
  const c: MetadataContainer = {
    OpenGraph: {},
    Twitter: {}
  };
  for (let i = 0; i < m.length; i++) {
    const tag: HTMLMetaElement = m[i];

    if (!tag.getAttribute)
      continue;
    
    const property = tag.getAttribute("property") || tag.name;

    if (!property || !PropertySet.has(property) || !tag.content)
      continue;

    const value = tag.content;
    PropertyMap.set(property, value);

    console.warn(property);

    if (property.startsWith(OpenGraphNamesBase)) {
      const name = property.substring(OpenGraphNamesBase.length);
      c.OpenGraph[name as keyof OpenGraph] = value;
    }
    else if (property == "theme-color")
      c.OpenGraph[property as keyof OpenGraph] = value;
    else if (property.startsWith(TwitterNamesBase)) {
      const name = property.substring(TwitterNamesBase.length);
      if (name === "card")
        c.Twitter[name as keyof Twitter] = value as TwitterCardKeys;
      else
        (c.Twitter[name as keyof Twitter] as string) = value;
    }
    else {
      console.warn(`${requestMetadata.name}: Unrecognized property "${property}"`);
    }
  }

  // default
  if (!c.OpenGraph.url) c.OpenGraph.url = location.href;
  if (!c.OpenGraph.title) c.OpenGraph.title = document.title;

  return c;
}

async function requestMetadata(
  m: RequestMessage,
  s: chrome.runtime.MessageSender,
  sendResponse: (res: ReturnMessage) => void
) {
  const ev = m.event;
  if (!(ev == "reloadmetadata" || ev == "initmetadata")) return;
  const elements = document.head.children;
  const metadata: HTMLMetaElement[] = [];

  for (let i = 0; i < elements.length; i++) {
    const e = elements[i];
    if (!e.outerHTML.startsWith("<meta"))
      continue;
    metadata.push(elements[i] as HTMLMetaElement);
  }

  const newMetadata = filterTags(metadata);

  const res: ReturnMessage = {
    event: ev,
    url: location.href,
    title: document.title,
    meta: newMetadata
  };

  sendResponse(res);

  if (ISDEV) {
    console.groupCollapsed(requestMetadata.name);
    console.info(m);
    console.info(s);
    console.info(sendResponse);
    console.groupEnd();
  }
  return true;
}

chrome.runtime.onMessage.addListener(requestMetadata);