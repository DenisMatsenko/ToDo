import React, { useState }from "react";
import "./ThemeModule_style.css"
 
export default function ThemeImgItem(props) {

  const Change = (info) => {
    if(info.target.className === "ThemeImgItemNoSel") {
      props.setCurrentImg(props.name)
      // props.BackgroundChange(props.name)
      // props.UpdateUserDBObj(props.name)
      // props.ChangeImagesSelected(props.num)
    }
  }

  return (
    <img className={props.selected ? "ThemeImgItemSel" : "ThemeImgItemNoSel"} onClick={(info) => {Change(info)}} src={props.src}/>  
  );
}