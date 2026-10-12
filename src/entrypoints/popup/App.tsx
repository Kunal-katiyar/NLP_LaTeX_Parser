import './style.css';
import DrawingCanvas from '../../components/DrawingCanvas.tsx';

// track popup/extension state (if toggled or not) using browser.runtime.connect
/* 
useEffect(() => {
  const popupTogglePort = browser.runtime.connect({
    name: popupPortConnectionName
  })

  return () => popupTogglePort.disconnect();
}, [])


*/

function App() {
  // console.log("Popup opened")
  return (
    <div>
      <DrawingCanvas />
    </div>
  );
}

export default App;
