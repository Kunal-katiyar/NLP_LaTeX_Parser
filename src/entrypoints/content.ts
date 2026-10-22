import React from "react"
import ReactDOM from "react-dom/client"
import DrawingBase from "@/components/DrawingBase"
import { usePopupStatus } from "@/hooks/useUpdatePopup"

function ContentRoot() {
    const isPopupOpen = usePopupStatus()

    return React.createElement(DrawingBase, { popupStatus: isPopupOpen })
}

export default defineContentScript({
    matches: ["*://*/*"],

    main() {
        // void storage.setItem("local:canvasBasePosition", {x: 0, y: 0})
        const canvasExists = document.getElementById("latex-parser-root")
        if (canvasExists) return

        const rootElement = document.createElement("div")
        rootElement.id = "latex-parser-root"
        document.body.appendChild(rootElement)

        ReactDOM.createRoot(rootElement).render(
            React.createElement(React.StrictMode, null,
                React.createElement("div", null,
                    React.createElement(ContentRoot),
                ),
            ),
        )
    },
})