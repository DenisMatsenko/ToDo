import React, { useRef, useState }from "react";
import "./MarkBtn.css"


 
export default function MarkBtn(props) {

   let marks = [ "Today","Tomorrow", "Everyday", "Important", "Work", "Home", "Hobby",]
    
   const SwitchDaysBtns = () => {
      if(props.markName === "Everyday") {
         SwichForBtnClasses(props.markName)

         var obj = document.getElementById("Today")
         if (obj.classList.contains("MarkBtnActive")) {obj.classList.remove("MarkBtnActive"); obj.classList.add("MarkBtn")}

         var obj = document.getElementById("Tomorrow")
         if (obj.classList.contains("MarkBtnActive")) {obj.classList.remove("MarkBtnActive"); obj.classList.add("MarkBtn")}
      }

      else if(props.markName === "Today" || props.markName === "Tomorrow" ) {
         SwichForBtnClasses(props.markName)

         var obj = document.getElementById("Everyday")
         if (obj.classList.contains("MarkBtnActive")) {obj.classList.remove("MarkBtnActive"); obj.classList.add("MarkBtn")}
      }

      else {
         SwichForBtnClasses(props.markName)
      }

      props.AddMarksToPost(ActiveBtnToArr)
   }

   const ActiveBtnToArr = () => {
      var MyMarkArr = []

      for (let i = 0; i < marks.length; i++) {
         if(document.getElementById(marks[i]).classList.contains("MarkBtnActive")) {
            MyMarkArr = [...MyMarkArr, marks[i] + " "]
         }
      }

      return MyMarkArr
   }

   const SwichForBtnClasses = (idName) => {
      var obj = document.getElementById(idName)

      if(obj.classList.contains("MarkBtnActive")) {
         obj.classList.remove("MarkBtnActive"); obj.classList.add("MarkBtn")}
      else {
         obj.classList.remove("MarkBtn"); obj.classList.add("MarkBtnActive")}
   }





   return (
     <div className="MarkBtnWrapper">
        <button onClick={SwitchDaysBtns} id={props.markName} className="MarkBtn">{props.markName}</button>
     </div>
   );
}