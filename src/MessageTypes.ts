export type RequestMessage = {
  event: Events
}

export type ReturnMessage = RequestMessage & {
  title?: string,
  description?: string
}

export type Events = "reloadpage" | "reloadmetadata";