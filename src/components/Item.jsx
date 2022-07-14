import React, { useState, useEffect, useRef } from "react";
import DoneSwither from "./../images/DoneSwitcher.png"
import DoneSwitherOn from "./../images/DoneSwitcherOn.png"
import Bin from "./../images/NewBin.png"
import BinOn from "./../images/BinOn.png"

function Item(props) {

    // const[doneSwitcher_active, setDoneSwitcher_active] = useState(props.done)

    return(
        <div className={props.done ? "ItemOff" : "Item"}>
            <div onClick={() => {props.DoneUdate(props)}} className="DoneBreaker">
                <div className="Ti"><img className="DoneSwitherImg" src={props.done ? DoneSwitherOn : DoneSwither}/></div>
            </div>
            <div className="ItemContent">
                <div className={props.done ? "ItemTextOff" : "ItemText"}><div>{props.text}</div></div>
                <div className={props.done ? "ItemDateOff" : "ItemDate"}><div>{props.marks}</div></div>
            </div>
            <div onClick={() => {props.RemoveFromDB(props)}} className="BinWrapper">
                <div className="Ti"><img className="DoneSwitherImg" src={Bin}/></div>
            </div>
        </div>
    )}
export default Item; 