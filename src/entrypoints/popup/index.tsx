import React from 'react';
import ReactDOM from 'react-dom/client';

export default function Popup() {
    return <p>Default text!</p>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);