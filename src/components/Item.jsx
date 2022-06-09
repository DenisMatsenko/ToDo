import React from "react";


function Item(props) {
    return(
        <div className="Item">
            <div className="DoneBreaker">
                <div className="Ti"></div>
            </div>
            <div className="ItemContent">
                <div className="ItemText"><div>{props.text}</div></div>
                <div className="ItemDate"><div>{props.autor}, {props.id}</div></div>
            </div>
            <div className="EditBtnWrapper">
                <div className="Ti"></div>
            </div>
        </div>
    )}

export default Item;