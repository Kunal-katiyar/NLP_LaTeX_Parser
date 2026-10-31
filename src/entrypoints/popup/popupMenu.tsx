import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { useEffect, useState } from "react"
import { popupStorageKey, strokeColorKey } from "@@/global.vars"
import { storage } from "wxt/utils/storage"
import { Eye, EyeOff, RotateCcw, PaintbrushVertical } from 'lucide-react';

function AppMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [strokeColor, setStrokeColor] = useState("#FFFFFF");
    const colorInputRef = useRef<HTMLInputElement>(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);


    useEffect(() => {
        void storage.getItem<boolean>(popupStorageKey).then((value) => {setIsOpen(value === true)})
        storage.getItem<string>(strokeColorKey).then((val) => {
            if (val !== null) {
              if (colorInputRef.current) colorInputRef.current.value = val;
              updateStrokeColor(val);
            }
        });
    }, [])

    async function toggleCanvas() {
        const currentValue = await storage.getItem<boolean>(popupStorageKey)

        const nextValue = currentValue !== true

        await storage.setItem(popupStorageKey, nextValue)
        setIsOpen(nextValue)
    }

    const toggleStrokeColorPicker = (e: React.MouseEvent) => {
      e.preventDefault(); 
      e.stopPropagation();

      if (!colorInputRef.current) return;
        
      if (isColorPickerOpen) {
        // unfocuses the color picker, makes the menu disappear
        colorInputRef.current.blur();
      } else {
        colorInputRef.current.showPicker();
      }
      setIsColorPickerOpen(isColorPickerOpen !== true);

    };

    async function updateStrokeColor(color: string) {
      setStrokeColor(color);
      await storage.setItem(strokeColorKey, color);
    }

    return (
      <div className="grid grid-cols-[max-content_max-content_max-content] gap-4 p-2">
        <button type="button" className="settings-button" onClick={toggleCanvas}>
            {isOpen === true ? <Eye /> : <EyeOff />}
        </button>
        <button type="button" className="settings-button" 
        onClick={() => { void storage.setItem("local:canvasBasePosition", {x: 70, y: 70})}}><RotateCcw /></button>
        <div>
          <input type="color" ref={colorInputRef} id="colorPicker" className="absolute top-[50px] left-[20px] w-0 h-0 opacity-0 pointer-events-none" onChange={(e) => updateStrokeColor(e.target.value)} />
          <button type="button" className="settings-button" onClick={toggleStrokeColorPicker}>
            <PaintbrushVertical color={strokeColor}/>
          </button>
        </div>
      </div>
    )
}

browser.runtime.connect({ name: 'popup-tracker' });
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppMenu />
  </React.StrictMode>,
);