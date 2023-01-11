import './App.css';
import { useState } from 'react';
//https://github.com/rosskhanas/react-qr-code
import QRCode from "react-qr-code";
//https://github.com/nimiq/qr-scanner
import QrScanner from 'qr-scanner'; 

function App() {
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")

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

    // read qe code image
    const readCode = (e)=>{
      const file = e.target.files[0];
      if (!file) {
          return;
      }
      QrScanner.scanImage(file, { returnDetailedScanResult: true })
          .then(result => setResult(result.data))
          .catch(e => console.log(e));
    }

  return (
    <div className="App">
      npm add qr-scanner react-qr-code
      <h3>QR Generator and Downloader</h3>

      <input type="text" onChange={(e) => setInputValue(
        e.target.value
      )} ></input>

      <input type="button" onClick={download} value="Download"></input>

      <div style={{height: "auto", margin: "20 auto", padding: "50px 0px 0px 300px", maxWidth: 200, width: "100%" }}>
        <QRCode
          id = "QRCode" 
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={inputValue}
          viewBox={`0 0 256 256`}
        />
      </div>
      <p>{inputValue}</p>

      <h3>QR Reader</h3>
      <input type="file" onChange={(e)=> readCode(e) } ></input>

      <p>Result is : {result}</p>
    </div>
  );
}

export default App;
