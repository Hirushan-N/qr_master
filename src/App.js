import './App.css';
import { useState } from 'react';
import QRCode from "react-qr-code";

function App() {
  const [inputValue,setInputValue] = useState("")

  return (
    <div className="App">
      npm add qr-scanner react-qr-code
      <h3>QR Generator and Downloader</h3>

      <input type="text" onChange={(e)=>setInputValue(
        e.target.value
      )} ></input>

      <div style={{ height: "auto", margin: "20 auto",padding:"50px", maxWidth: 200, width: "100%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
        />
      </div>



      <h3>QR Reader</h3>
    </div>
  );
}

export default App;
