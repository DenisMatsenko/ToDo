import React, { useState } from "react";
import style from "./AllStyle.css";
import Item from "./Item";
import Box from "./Box";
import Addimg from "../images/Add.png"

function RightSide(props) { 

    return(
        <div className="RightSide">
            <div className="RightWrapper">
                <div className="EmptyBox"></div>
                <Box name={"My text"} post={props.post}/>
                <div className="EmptyBoxEnd"></div>
            </div>

            <div className="WAddBtn"><div onClick={() => {props.setAddPostWind_active(true)}} className="AddBtn"><img src={Addimg} alt=""></img></div></div>
        </div>
    )}

export default RightSide;