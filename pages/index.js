import { useState,useRef } from "react";
import dynamic from "next/dynamic";

const QrCodeReaderMain = dynamic(() => import('../components/qr-code-main'), { ssr: false })




export default function Home() {


  return (
      <QrCodeReaderMain />
  )
}
