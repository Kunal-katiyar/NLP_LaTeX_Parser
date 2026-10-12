// generic universal file to add types for typescript stuff/types

export type port = globalThis.Browser.runtime.Port;
export type ScriptPubPath = Parameters<typeof injectScript>[0];