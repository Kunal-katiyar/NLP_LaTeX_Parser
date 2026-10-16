// generic universal file to add types for typescript stuff/types

import type { ReactSketchCanvasRef } from "react-sketch-canvas";

export type port = globalThis.Browser.runtime.Port;
export type ScriptPubPath = Parameters<typeof injectScript>[0];

export type Coords = {
    x: number,
    y: number
}

export type DrawingCanvasProps = {
    setCanvasRef: (canvasRef: React.RefObject<ReactSketchCanvasRef | null>) => void
}