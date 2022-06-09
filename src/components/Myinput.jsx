import React, { useState }from "react";
 
export default function Myinput({Post, setPost}) {
   return (
    <input autoFocus onFocus={() => {console.log("focused")}} onBlur={() => {console.log("blured")}} id="input" maxLength={25} value={Post.text} onChange={e => setPost({...Post, text: e.target.value})} type="text" /> 
   );
}