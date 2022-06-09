import React from "react";
import style from "./AllStyle.css";

function LeftSide() {



    function Oc(props) {
        console.log(props.target.textContent)   
    }

    return(
        
        <div className="LeftSide">
            <div className="Header">
                <div className="Name">Denis Matsenko</div>
                <div className="Email">denismatsenko@gmail.com</div>
            </div>

            <div className="Line"></div>

            <div className="Filtrate">
                <div className="FiltrateText">Filtr</div>
                <div className="FiltrateList">
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>All</div></button></div>
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>By marks</div></button></div>
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>By date</div></button></div>
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>Importent</div></button></div>
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>Complete</div></button></div>
                    <div className="Filtr"><button onClick={Oc} className="FilBtn"><div className="Ti2"></div><div>Uncomplete</div></button></div>
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