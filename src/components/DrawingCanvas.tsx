import { useState, useEffect, useRef } from 'react';
import type { ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";
import { ReactSketchCanvas } from "react-sketch-canvas";
import '../entrypoints/popup/style.css';
import type { DrawingCanvasProps } from '@@/formatting/types';
import { strokeColorKey } from "@@/global.vars"

export default function DrawingCanvas({setCanvasRef}: DrawingCanvasProps) {
    
    const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
    const [strokeColor, setStrokeColor] = useState("#FFFFFF");
    useEffect(() => {
        setCanvasRef(canvasRef);
    }, [setCanvasRef])

    useEffect(() => {
        storage.getItem<string>(strokeColorKey).then((val) => {
            if (val !== null) setStrokeColor(val);
        });

        const unwatch = storage.watch<string>(strokeColorKey, (newValue, oldValue) => {
            setStrokeColor(newValue ?? "#FFFFFF");
        });
    }, []);
    
    // 2. Set up local state for configurations
    

    const handleExportInkML = async () => {
        if (!canvasRef.current) return;

        try {
            // 1. Get raw paths from react-sketch-canvas
            const paths: CanvasPath[] = await canvasRef.current.exportPaths();
            
            if (paths.length === 0) {
                alert("The canvas is empty!");
                return;
            }

            // 2. Generate InkML string XML
            const inkMLContent = convertPathsToInkML(paths);

            // 3. Trigger a browser file download
            const blob = new Blob([inkMLContent], { type: "application/inkml+xml" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "sketch-drawing.inkml";
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export to InkML:", error);
        }
    };

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
        <>
            <div className="canvas-outer hide-scrollbar" id='canvas-outer'>
                <ReactSketchCanvas
                    ref={canvasRef}
                    width="100%"
                    height="100%"
                    strokeWidth={4}
                    strokeColor={strokeColor}
                    eraserWidth={20}
                    canvasColor="transparent"
                    style={{ border: "none" }}
                />
                
            </div>
            
        </>
    )
}

function convertPathsToInkML(paths: CanvasPath[]) {
    let traceElements = "";

    paths.forEach((path, index) => {
        // Collect X and Y coordinates separated by spaces, points separated by commas
        const pointsString = path.paths
        .map((point) => `${roundTo(point.x, 6)} ${roundTo(point.x, 6)}`)
        .join(", ");

        // Wrap paths in an InkML <trace> element
        traceElements += `<trace id="t${index}">\n    ${pointsString}\n  </trace>\n`;
    });

    // Construct the complete InkML boilerplate template
    const inkML = `
    <?xml version="1.0" encoding="UTF-8"?>
    <ink xmlns="http://www.w3.org/2003/InkML">
    <inkSource id="reactSketchCanvas"></inkSource>
    <traceFormat>
        <channel name="X" type="f"/>
        <channel name="Y" type="f"/>
    </traceFormat>
    <brush id="brush1">
        <param name="color" value="#000000"/>
        <param name="width" value="0.02"/>
    </brush>
    ${traceElements}
    </ink>`;

    return inkML;
};

const roundTo = (num: number, places: number): number => {
  const factor = Math.pow(10, places);
  return Math.round(num * factor) / factor;
};