import DrawingCanvas from "./DrawingCanvas"
import { motion, useDragControls } from "framer-motion"
import dragIcon from "@/assets/drag-icon.png"

export default function DrawingBase() {
    const dragControls = useDragControls()

    return (
        <motion.div drag dragListener={false} dragControls={dragControls} className="w-[15rem] h-[10rem] flex-row flex-wrap" dragMomentum={false}>
            <img src={dragIcon} id="drag-icon" alt="Drag Canvas" draggable={false} 
            onPointerDown={(event) => dragControls.start(event)} className="w-[3rem] h-[3rem]"/>
            <DrawingCanvas />
        </motion.div>
    )
}