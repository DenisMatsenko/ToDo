import React, { useState, useEffect }from "react";
import "./ThemeModule_style.css"
import ThemeImgItem from "./ThemeImgItem";

import {db, SignInwithGoogle} from "../../firebase"
import {set, ref, onValue, remove, update} from "firebase/database"

import BackgroundImg1 from "../../images/background1.jpg"
import BackgroundImg2 from "../../images/background2.jpg"
import BackgroundImg3 from "../../images/background3.jpg"
import BackgroundImg4 from "../../images/background4.jpg"
import BackgroundImg5 from "../../images/background5.jpg"
import BackgroundImg6 from "../../images/background6.jpg"
import BackgroundImg7 from "../../images/background7.jpg"

 
export default function ThemeModule(props) {

    const Switch = (state) => {
        props.setThemeModule_active(state)
        state ? props.setModuleIsActive(true) : props.setModuleIsActive(false)
    }

    const [images, setImages] = useState([
        {src: BackgroundImg1, name: "background1.jpg", num: 1, key: 1, selected: false},
        {src: BackgroundImg2, name: "background2.jpg", num: 2, key: 2, selected: false},
        {src: BackgroundImg3, name: "background3.jpg", num: 3, key: 3, selected: false},
        {src: BackgroundImg4, name: "background4.jpg", num: 4, key: 4, selected: false},
        {src: BackgroundImg5, name: "background5.jpg", num: 5, key: 5, selected: false},
        {src: BackgroundImg6, name: "background6.jpg", num: 6, key: 6, selected: false},
        {src: BackgroundImg7, name: "background7.jpg", num: 7, key: 7, selected: false},]
    )

    // const ChangeImagesSelected = (info) => {
    //   let arr = images
    //     for (let i = 0; i < arr.length; i++) {
    //         arr[i].selected = false
    //     }
      
    //   for (let i = 0; i < arr.length; i++) {
    //     if(arr[i].num == info) {
    //         arr[i].selected = true
    //         console.log("find")
    //     }
    //   }

    //   setImages(arr)
    // }

    // useEffect(() => {
        
    //   }, [props.themeModule_active]);

    useEffect(() => {
        setCurrentImg(props.findImg)
      }, [props.findImg]);

    const [currentImg, setCurrentImg] = useState()

    const BackgroundChange = () => {
        props.UpdateUserDBObj(currentImg)
    }

   return (
     <div className={props.themeModule_active ? "ThemeModule" : "ThemeModuleNone"} onClick={(obj) => {if(obj.target.className === 'ThemeModule')
     Switch(false)}}>
        <div className="ThemeModuleContent">
            <div className="ThemeText">Chose your theme</div>

            <div className="ImagesWrapper">
                {images.map(e => 
                    <ThemeImgItem 
                        src={e.src} 
                        num={e.num} 
                        key={e.key} 
                        name={e.name}
                        selected={currentImg === e.name ? true : false} 
                        setCurrentImg={setCurrentImg}/>    
                )}
            </div>

            <div className="ConfirmBtnWrapper">
                <button onClick={() => {Switch(false); BackgroundChange()}} className="ConfirmBtn">Confirm</button>
            </div>

{/* 
            <div className="ImgsRowWrapper">
                
            </div>
            <div className="ImgsRowWrapper">

            </div>
            <div className="ImgsRowWrapper">

            </div> */}
        </div>
     </div>  
   );
}