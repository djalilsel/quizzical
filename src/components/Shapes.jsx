import React, { useEffect, useState } from "react";
import './Shapes.css'

export default function Shapes(){

    const [pageWidth, setPageWidth] = useState(window.innerWidth)
    const [pageHeight, setPageHeight] = useState(window.innerHeight)


    useEffect(() => {
        window.addEventListener("resize", () => {
          setPageWidth(window.innerWidth)
        })
      }, [])
    
      useEffect(() => {
        
        
          window.addEventListener("resize", () => {
            setPageHeight(window.innerHeight)
            
          })
        
      }, [])

      console.log("Shapes rendered")

    return(
        <React.Fragment>
            <div className="shape1"></div>
            <div className="shape2" style={{top:`${innerHeight - 100}px`, right:`${innerWidth - 150}px`}}></div>
        </React.Fragment>
    )
}