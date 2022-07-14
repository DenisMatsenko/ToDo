import React, { useState }from "react";
import "./LoginModule_style.css"
import googleIcon from "../../images/google.png"
// import girl from "../../images/girl.png"
 
export default function LoginModule(props) {
   return (
     <div className={props.isRegistered ? "LoginModuleNone" : "LoginModule"}>
        <div className="LoginModuleContent">
            {/* <img className="GirlImg" src={girl} /> */}
            <div className="Logintext">Register to get started</div>
            <div className="SignInLoginWrapper"><button onClick={props.UpdateUserInfo} className="SignBtn"><img className="GoogleImg" src={googleIcon}/> <div className="GoogleBtnText">Sign is with google</div> </button></div>
        </div>
     </div>  
   );
}