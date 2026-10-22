import DrawingCanvas from "./DrawingCanvas"
// import LaTeXDisplay from "./LaTeXDisplay.tsx"
import { motion, useDragControls } from "framer-motion"
import { Trash, Undo, Redo, Eraser, Pen, Shrink } from 'lucide-react';
import dragIcon from "@/assets/drag-icon.png"
import minimizeIcon from "@/assets/minimize-icon.png"
import { useState, useEffect } from "react"
import { storage } from "wxt/utils/storage"
import { canvasBasePositionKey } from "@@/global.vars"
import type { Coords } from "@@/formatting/types"
import { arrangeInCircle, resetInnerPositions } from "@/helpers/helper.functions";
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import LaTeXDisplay from "./LaTeXDisplay";

const defaultCoords: Coords = {
    x: 0,
    y: 0
}

const defaultSize = {
    width: 320,
    height: 320,
}

export default function DrawingBase({ popupStatus }: Readonly<{ popupStatus: boolean }>) {
    const dragControls = useDragControls()
    const [toggledCanvas, setToggledCanvas] = useState<boolean>(true);
    const [coords, setCoords] = useState<Coords>(defaultCoords);
    const [size, setSize] = useState(defaultSize);
    const [canvasRef, setCanvasRef] = useState<React.RefObject<ReactSketchCanvasRef | null> | null>(null);
    // const [eraseMode, setEraseMode] = useState(false);

    useEffect(() => {
        void storage.getItem<Coords>(canvasBasePositionKey).then((savedCoords) => {
            if (savedCoords && Number.isFinite(savedCoords.x) && Number.isFinite(savedCoords.y)) setCoords(savedCoords)
        })
    }, [])

    useEffect(() => {
        if (popupStatus) setToggledCanvas(true);
    }, [popupStatus])

    const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);

        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handlePointerMove = (moveEvent: PointerEvent) => {
            setSize({
                width: Math.max(240, startWidth + moveEvent.clientX - startX),
                height: Math.max(240, startHeight + moveEvent.clientY - startY),
            });
        };

        const handlePointerUp = () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };

    return (
        <>
            {toggledCanvas && (
                <motion.div drag dragListener={false} style={{x: coords.x, y: coords.y, width: size.width, height: size.height}} 
                onDragEnd={(e, info) => {
                    const updatedCoords = {
                        x: coords.x + info.offset.x,
                        y: coords.y + info.offset.y
                    }

                    setCoords(updatedCoords);
                    void storage.setItem(canvasBasePositionKey, updatedCoords)
                }}
                dragControls={dragControls} className="drawing-panel bg-amber-200 p-3 border-2 border-amber-400 rounded-2xl overflow-visible absolute z-[2147483647] hide-scrollbar min-w-0 min-h-0 box-border left-0 top-0" dragMomentum={false}>
                    
                    <div id="options-container" className="w-full h-fit flex flex-row bg-amber-700 mb-1 m-auto content-center">
                        <div className="main-button" id="main-btn" onMouseEnter={() => arrangeInCircle()} onMouseLeave={() => resetInnerPositions()}>
                            <img src={dragIcon} id="drag-icon" alt="Drag Canvas" draggable={false} 
                            onPointerDown={(event) => { dragControls.start(event); } } className="icon grabbable hover:bg-amber-300 rounded-3xl p-1 bg-amber-100"/>
                            <div className="inner-buttons">
                                <button className="inner-btn" id="redo-action-btn" onClick={() => canvasRef?.current?.redo()}><Redo/></button>
                                <button className="inner-btn" id="clear-canvas-btn" onClick={() => canvasRef?.current?.resetCanvas()}><Trash/></button>
                                <button className="inner-btn" id="shrink-canvas-btn" onClick={() => setToggledCanvas(false)}><Shrink/></button>
                                <button className="inner-btn" id="undo-action-btn" onClick={() => canvasRef?.current?.undo()}><Undo/></button>
                                <button className="inner-btn" id="pen-mode-btn" onClick={() => canvasRef?.current?.eraseMode(false)}><Pen/></button>
                                <button className="inner-btn" id="eraser-mode-btn" onClick={() => canvasRef?.current?.eraseMode(true)}><Eraser/></button>
                            </div>
                        </div>
                    </div>
                    <div className="canvas-scroll-area">
                        <DrawingCanvas setCanvasRef={setCanvasRef}/>
                    </div>
                    <div className="resize-handle" onPointerDown={startResize} />
                    <div className="m-5 flex flex-row justify-between">
                        <LaTeXDisplay content="\int_0^\infty x^2" />
                    </div>
                </motion.div>
                
            )
            }
        </>
    )
}