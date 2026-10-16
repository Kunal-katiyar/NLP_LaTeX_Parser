import { useState, useEffect, useRef } from 'react';
import type { ReactSketchCanvasRef } from "react-sketch-canvas";
import { ReactSketchCanvas } from "react-sketch-canvas";
import '../entrypoints/popup/style.css';
import type { DrawingCanvasProps } from '@@/formatting/types';

export default function DrawingCanvas({setCanvasRef}: DrawingCanvasProps) {
    
    // 1. Create a reference to access the canvas API methods
    const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
    
    useEffect(() => {
        setCanvasRef(canvasRef);
    }, [setCanvasRef])
    
    // 2. Set up local state for configurations
    const [strokeColor, setStrokeColor] = useState("#FFFFFF");

    // Toggle between Pen and Eraser

    const handleExport = () => {
        // TypeScript now recognizes the exportImage promise correctly
        canvasRef.current
        ?.exportImage("png")
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "my-sketch.png";
            link.click();
        })
        .catch((error) => {
            console.error("Export failed:", error);
        });
    };

    return (
        <div className="canvas-outer hide-scrollbar">
            <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
                {/* <button onClick={handleExport}>Export Image</button> */}
            </div>
            <ReactSketchCanvas
                ref={canvasRef}
                width="100%"
                height="100%"
                strokeWidth={4}
                eraserWidth={20}
                canvasColor="transparent"
                style={{ border: "none" }}
            />
        </div>
    )
}