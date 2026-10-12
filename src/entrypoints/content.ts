import { injectScript } from "#imports"
import React from "react"
import ReactDOM from "react-dom/client"
import { motion } from "framer-motion"
import DrawingBase from "@/components/DrawingBase"
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
                React.createElement("div", null,
                    React.createElement(DrawingBase),
                ),
            ),
        )
    },
})