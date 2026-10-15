import DrawingCanvas from "./DrawingCanvas"
// import LaTeXDisplay from "./LaTeXDisplay.tsx"
import { motion, useDragControls } from "framer-motion"
import dragIcon from "@/assets/drag-icon.png"
import minimizeIcon from "@/assets/minimize-icon.png"
import { useState, useEffect } from "react"
import { storage } from "wxt/utils/storage"
import { canvasBasePositionKey } from "@@/global.vars"
import type { Coords } from "@@/formatting/types"

const defaultCoords: Coords = {
    x: 0,
    y: 0
}

export default function DrawingBase({ popupStatus }: Readonly<{ popupStatus: boolean }>) {
    const dragControls = useDragControls()
    const [toggledCanvas, setToggledCanvas] = useState<boolean>(true);
    const [coords, setCoords] = useState<Coords>(defaultCoords);

    useEffect(() => {
        void storage.getItem<Coords>(canvasBasePositionKey).then((savedCoords) => {
            if (savedCoords && Number.isFinite(savedCoords.x) && Number.isFinite(savedCoords.y)) setCoords(savedCoords)
        })
    }, [])

    useEffect(() => {
        if (popupStatus) setToggledCanvas(true);
    }, [popupStatus])

    return (
        <>
            {toggledCanvas && (
                <motion.div drag dragListener={false} style={{x: coords.x, y: coords.y}} 
                onDragEnd={(e, info) => {
                    const updatedCoords = {
                        x: coords.x + info.offset.x,
                        y: coords.y + info.offset.y
                    }

                    setCoords(updatedCoords);
                    void storage.setItem(canvasBasePositionKey, updatedCoords)
                }}
                dragControls={dragControls} className="w-[min(100vw,20rem)] max-w-[calc(100vw-1rem)] h-fit flex-row flex-wrap bg-amber-200 p-3 border-2 border-amber-400 rounded-2xl resize overflow-auto absolute z-[2147483647] hide-scrollbar min-w-fit min-h-fit box-border left-0 top-0" dragMomentum={false}>
                    <div id="options-container" className="w-full h-fit flex flex-row bg-amber-700 mb-1 m-auto content-center">
                        <img src={dragIcon} id="drag-icon" alt="Drag Canvas" draggable={false} 
                        onPointerDown={(event) => { dragControls.start(event); } } className="icon grabbable"/>
                        <img src={minimizeIcon} id="minimize-icon" alt="Minimize Canvas" draggable={false} className="icon clickable" onPointerDown={() => setToggledCanvas(false)}></img>
                    </div>
                    <div className="canvas-scroll-area">
                        <DrawingCanvas />
                    </div>
                </motion.div>
                
            )
            }
        </>
    )
}