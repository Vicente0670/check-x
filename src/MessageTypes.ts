export const ISDEV = false;
// export const ISDEV = true;

export type MetadataContainer = {
  OpenGraph: OpenGraph,
  Twitter: Twitter
}

export type RequestMessage = {
  event: Events
}

export type ReturnMessage = RequestMessage & {
  url: string,
  meta: MetadataContainer
  title?: string,
}

export type Events = "reloadpage" | "reloadmetadata" | "initmetadata";

type OpenGraphKeys = "title" | "description" | "type" | "image" | "url";

export type OpenGraph = {
  [K in OpenGraphKeys]?: string
};

export type TwitterCardKeys = "app" | "player" | "summary" | "summary_large_image";

export type Twitter = OpenGraph & {
  card?: TwitterCardKeys,
  // Twitter handles
  site?: string, 
  creator?: string,
  // Image alt text for X
  alt?: string,
}


const OpenGraphNames = {
  Title: "title",
  Description: "description",
  Type: "type",
  Image: "image",
  Url: "url"
}

const TwitterNames = {
  Card: "card",
  Title: "title",
  Description: "description",
  Type: "type"
}

export const OpenGraphNamesBase = "og:";
export const TwitterNamesBase = "twitter:";

const OpenGraphPropList: string[] = Object.values(OpenGraphNames)
  .map((e): string => { return OpenGraphNamesBase + e });
const TwitterPropList: string[] = Object.values(TwitterNames)
  .map((e): string => { return TwitterNamesBase + e });

export const PropertySet: Set<string> = new Set(
  OpenGraphPropList.concat(TwitterPropList)
);

export const PropertyMap: Map<string, string> = new Map();

PropertySet.forEach(e => PropertyMap.set(e, ""));