import React from "react";
import style from "./AllStyle.css";

function LeftSide(props) {

    function FiltrBtn(p) {
        props.setFiltrName(p.target.textContent)
    }

    return(
        
        <div className={props.leftMenu_acvive ? "LeftSide" : "LeftSideClose"}>
            <div className="Header">
                <div className="HeaderLeftWrapper">
                    <img className="ProfilePic" src={props.img} />
                </div>
                <div className="HeaderRightWrapper">
                    <div className="Name">{props.name}</div>
                    <div className="Email">{props.email}</div>
                </div>
            </div>

            <div className="Line"></div>

            <div className="Filtr">
                <div className="FiltrText">Filtr</div>
                <div className="FiltrList">
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>All</div></button></div>
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>By marks</div></button></div>
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>By date</div></button></div>
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>Important</div></button></div>
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>Complete</div></button></div>
                    <div className="FiltrItem"><button onClick={FiltrBtn} className="FilBtn"><div className="Ti2"></div><div>Uncomplete</div></button></div>
                </div>
            </div>

            <div className="Line"></div>

            <div className="Footer">
                <div  onClick={props.ClickOptBtn} className="WBtnOpt"><button id="Profile" className="BtnOpt">P</button></div>
                <div  onClick={props.ClickOptBtn} className="WBtnOpt"><button id="Settings" className="BtnOpt">S</button></div>
                <div  onClick={props.ClickOptBtn} className="WBtnOpt"><button id="Theme" className="BtnOpt">T</button></div>
            </div>
        </div>
    )}

export default LeftSide;