// import './style.css';

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
  console.log("Popup opened")
  return (
    <></>
    // <div>
    //   <DrawingCanvas />
    // </div>
  );
}

export default App;
