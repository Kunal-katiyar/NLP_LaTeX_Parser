import { injectScript } from "#imports"
import React from "react"
import ReactDOM from "react-dom/client"
import { motion } from "framer-motion"
import DrawingCanvas from "@/components/DrawingCanvas"
import type { ScriptPubPath } from "@@/formatting/types"

export default defineContentScript({
    matches: ["*://*/*"],

    async main() {
        // await injectScript("/pad.injection.js" as ScriptPubPath, {
        //     keepInDom: true,
        // })

        if (document.getElementById("latex-parser-root")) return

        const rootElement = document.createElement("div")
        rootElement.id = "latex-parser-root"
        document.body.appendChild(rootElement)

        ReactDOM.createRoot(rootElement).render(
            React.createElement(React.StrictMode, null,
                React.createElement( motion.div, {
                        drag: true,
                        dragMomentum: false,
                        style: {
                            position: "absolute",
                            top: 16,
                            left: 16,
                            pointerEvents: "auto",
                            cursor: "grab",
                        },
                    },
                    React.createElement(DrawingCanvas),
                ),
            ),
        )
    },
})