import React, { useState } from "react";
import style from "./AllStyle.css";
import Item from "./Item";
import Box from "./Box";
import Addimg from "../images/Add.png"
import Arrowimg from "../images/Arrow.png"
import MarkBtn from "./Buttons/MarkBtn";


function RightSide(props) { 


    // const f = () => {
    //     props.setAddPostWind_active(true)
    //     console.log(props.marksArr + "awdqwdqwd")
    //     props.setMarksArr(props.marksArr.map(p => <MarkBtn AddMarksToPost={props.AddMarksToPost} key={p.marksArr} markName={p.marksArr}/>))
    // }

    return(
        <div className="RightSide" style={{backgroundImage: props.backgroundimg}}>
        {/* <div className="RightSide" style={{backgroundImage: "url(BackgroundImages/background7.jpg)"}}> */}


            <div className="DivForBtn">
                <div className="WLMBtn" onClick={() => {props.setLeftMenu_acvive(!props.leftMenu_acvive)}}><div  className="CloseBtn"><img className={props.leftMenu_acvive ? "AimgL" : "AimgR"} src={Arrowimg}/></div></div>
            </div>


            <div className="RightWrapper">
                <div className="RightContent">
                    <div className="EmptyBox"></div>

                    <div className={props.leftMenu_acvive ? "BoxList" : "BoxListBig"}>
                        {props.filtrBoxes}

                        {/* <Box name={"My text"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text2"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text3"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text4"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text5"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text6"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>,
                        <Box name={"My text6"} post={props.post} leftMenu_acvive={props.leftMenu_acvive}/>, */}
                        
                    </div>

                    <div className="EmptyBoxEnd"></div>
                </div>
            </div>

            {/* <div className="WAddBtn"><div  className="AddBtn"><img src={Addimg} alt=""></img></div></div> */}

        </div>
    )}

export default RightSide;