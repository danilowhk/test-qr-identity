import { useState } from "react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
  });
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
const { generateProof } =require("@semaphore-protocol/proof")
const { verifyProof } = require("@semaphore-protocol/proof")
const { packToSolidityProof } = require("@semaphore-protocol/proof");

import { ethers } from "ethers";
// import * as fs from 'fs';



export default function Home() {

  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");
  const [identity,setIdentity] = useState();


  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleGenerateId = () => {
    if(data){
      const newIdentity = new Identity(data);
      const newIdentityCommitment = newIdentity.generateCommitment();
      console.log(newIdentityCommitment);
      setIdentity(newIdentityCommitment);

    } else {
      console.log("please generate data");
    }
   
  }

  return (
    <div className="App">
    <h1>Hello World</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
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
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
      <button onClick={handleGenerateId}>Generate Id</button>
      <h1>{identity}</h1>
    </div>
  )
}
