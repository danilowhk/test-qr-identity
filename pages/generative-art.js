import { useState } from "react";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false
  });
import React from 'react'

  
export default function GenerativeArt() {
    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(500, 400).parent(canvasParentRef)
    }
    
    const draw = p5 => {
      p5.background(255, 130, 20)
      p5.ellipse(100, 100, 100)
      p5.ellipse(300, 100, 100)
    }
    
    return (
            <div>
                <h1>Generative Art</h1>
                <Sketch setup={setup} draw={draw} />
            </div>)
  }
  