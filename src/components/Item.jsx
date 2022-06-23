import React, { useState, useEffect, useRef } from "react";
import DoneSwither from "./../images/DoneSwitcher.png"
import DoneSwitherOn from "./../images/DoneSwitcherOn.png"

function Item(props) {

    const[doneSwitcher_active, setDoneSwitcher_active] = useState(props.done)

    const Switch = () => {
        setDoneSwitcher_active(!doneSwitcher_active)
        props.DoneUdate(props.id)
    } 

    return(
        <div className={doneSwitcher_active ? "ItemOff" : "Item"}>
            <div onClick={Switch} className="DoneBreaker">
                <div className="Ti"><img className="DoneSwitherImg" src={doneSwitcher_active ? DoneSwitherOn : DoneSwither}/></div>
            </div>
            <div className="ItemContent">
                <div className={doneSwitcher_active ? "ItemTextOff" : "ItemText"}><div>{props.text}</div></div>
                <div className={doneSwitcher_active ? "ItemDateOff" : "ItemDate"}><div>{props.marks}</div></div>
            </div>
            <div className="EditBtnWrapper">
                <div className="Ti"></div>
            </div>
        </div>
    )}

export default Item; 