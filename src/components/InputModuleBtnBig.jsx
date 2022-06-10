import React, { useState }from "react";
import "./Btn.css"
 
export default function InputModuleBtnBig(props) {
   return (
     <div className="InputModuleBtnBig">
        <button onClick={props.fun} className={props.text === "Add" ? "Add" : "Cancel"}>{props.text}</button>
     </div>  
   );
}