import React from "react";
import style from "./AllStyle.css";

function LeftSide(props) {

    function FiltrBtn(p) {
        props.setFiltrName(p.target.textContent)
    }

    return(
        
        <div className={props.leftMenu_acvive ? "LeftSide" : "LeftSideClose"}>
            <div className="Header">
                <div className="Name">Denis Matsenko</div>
                <div className="Email">denismatsenko@gmail.com</div>
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
                <div className="WBtn"><button className="Btn">P</button></div>
                <div className="WBtn"><button className="Btn">S</button></div>
                <div className="WBtn"><button className="Btn">T</button></div>
            </div>
        </div>
    )}

export default LeftSide;