import React, { useState }from "react";
import "./BtnBig.css"
 
export default function BtnBig(props) {
   return (
     <div className="BtnBig">
        <button onClick={props.fun} className="Btn">{props.text}</button>
     </div>  
   );
}