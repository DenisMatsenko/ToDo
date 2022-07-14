import React, { useState }from "react";
import googleIcon from "../../images/google.png"
import closeImg from "../../images/CloseBtn.png"
import "./SignInModule_style.css"
 
export default function SignInModule(props) {

    const Switch = (state) => {
        props.setSignInModule_active(state)
        state ? props.setModuleIsActive(true) : props.setModuleIsActive(false)
    }

   return (
     <div className={ props.signInModule_active ? "SignInModule" : "SignInModuleNone"} onClick={(obj) => {if(obj.target.className === 'SignInModule')
     Switch(false)}}>
        <div className="SignInModuleContent">
            <div className="CloseBtnWrapper"> <img onClick={() => {Switch(false)}} className="CloseSignBtn" src={closeImg}/> </div>
            <div className="UserImgWrapper"><img className="UserImg" src={props.userInfo.img}/></div>
            <div className="UserNameWrapper">{props.userInfo.name}</div>
            <div className="UserEmailWrapper">{props.userInfo.email}</div>
            <div className="SignInWrapper"><button onClick={props.UpdateUserInfo} className="SignBtn"><img className="GoogleImg" src={googleIcon}/> <div className="GoogleBtnText">Sign is with google</div> </button></div>
        </div>
     </div>  
   );
}