import { useEffect, useState } from "react"
import { popupStorageKey } from "@@/global.vars"
import { storage } from "wxt/utils/storage"

function App() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        void storage.getItem<boolean>(popupStorageKey).then((value) => {setIsOpen(value === true)})
    }, [])

    async function toggleCanvas() {
        const currentValue = await storage.getItem<boolean>(popupStorageKey)

        const nextValue = currentValue !== true

        await storage.setItem(popupStorageKey, nextValue)
        setIsOpen(nextValue)
    }

    return (
      <div>
        <h1>Settings</h1>
        <button type="button" className="bg-amber-950" onClick={toggleCanvas}>
            {isOpen === true ? "Hide canvas" : "Show canvas"}
        </button>
        <button type="button" onClick={() => { void storage.setItem("local:canvasBasePosition", {x: 0, y: 0})
}}>Respawn Canvas</button>
      </div>
    )
}

export default App