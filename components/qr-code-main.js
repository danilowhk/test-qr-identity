import { useState,useRef } from "react";
import QrReader from 'react-qr-reader';
import QRCode from 'qrcode';
import { Identity } from "@semaphore-protocol/identity"




export default function QrCodeReaderMain() {

  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [imageUrl,setImageUrl] = useState();
  const [identityKey, setIdentityKey] = useState("");
  const [qrIdentity,setQrIdentity] = useState();

  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(identityKey);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }


  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleGenerateId = () => {

        const newIdentity = new Identity();
    
        const newIdentityCommitment = newIdentity.generateCommitment();

        const key = newIdentity.toString();
        console.log(key);

        setIdentityKey(key);
  }

  const handleUploadQrCode = () => {

    qrRef.current.openImageDialog();

  }

  const handleScanQrCode = (result) => {
    if (result) {
      setQrIdentity(result);
    }
}

  



  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
    <h1 className="text-2xl font-bold">QRCode Page Functionalities</h1>
    <h2 className="text-xl font-bold">
        Go from step 1 to 4
    </h2>
    <h2 className="text-xl font-bold">
        (You can jump step 1. Invitation Code Scan)
    </h2> 
      <button className="bg-blue-700 p-3 rounded-lg text-gray-200"
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "1. Scan Invitation Code"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p className="text-xl font-bold ">Please fit the Qr Code</p>}
      {data ? (<div>
        <p className="font-bold">QrCode Key is:</p>
        <p >{data}</p>
        </div>) : null}
      <div className="flex items-center justify-center flex-col gap-y-2">
        <button className="bg-green-700 p-3 rounded-lg text-gray-200" onClick={handleGenerateId}>2. Generate Id</button>
        <p className="text-xl font-bold">Identity</p>
        <p className="text-xl break-all px-20">{identityKey}</p>
      </div>
      <button className="bg-green-700 p-3 rounded-lg text-gray-200" onClick={generateQrCode}>3. Generate QRCode</button>
      {imageUrl ? (<a href={imageUrl} download="semaphore-identity-qrcde.png" className="flex items-center justify-center flex-col">
                      <img src={imageUrl} alt="img"/>
                      <p className="text-xl font-bold"> Click Here to Download PNG</p>
                    </a>) : null}
      {imageUrl ? (<a href={imageUrl} download="semaphore-identity-qrcde.jpg" className="flex items-center justify-center flex-col">
                      <img src={imageUrl} alt="img"/>
                      <p className="text-xl font-bold"> Click Here to Download JPG</p>
                    </a>) : null}

      <button className="bg-green-700 p-3 rounded-lg text-gray-200" onClick={handleUploadQrCode}>4. Upload Qr Code</button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          onError={handleError}
                          onScan={handleScanQrCode}
                          legacyMode
                        />

      <p className="text-xl break-all px-20">{qrIdentity}</p>

    </div>
  )
}
