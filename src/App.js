import './App.css';
import { useState } from 'react';
import QRCode from "react-qr-code";

function App() {
  const [inputValue, setInputValue] = useState("")

  // download qe code image
  const download = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      //name of file
      downloadLink.download = `${inputValue}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  return (
    <div className="App">
      npm add qr-scanner react-qr-code
      <h3>QR Generator and Downloader</h3>

      <input type="text" onChange={(e) => setInputValue(
        e.target.value
      )} ></input>

      <div style={{height: "auto", margin: "20 auto", padding: "50px 0px 0px 300px", maxWidth: 200, width: "100%" }}>
        <QRCode
          id = "QRCode" 
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <text>{inputValue}</text>


      <input type="button" onClick={download} value="Download"></input>


      <h3>QR Reader</h3>
    </div>
  );
}

export default App;
