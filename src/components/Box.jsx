import React, { Component } from 'react';
import Item from './Item';

function Box(props) {
    return(
        <div className="Box">
            <div className="NameOfIventList">{props.name}</div>
            <div className="ItemsList">

            {props.post.map(msg => 
                <Item text={msg.text} marks={msg.marks} id={msg.id} key={msg.id} done={msg.done} RemoveFromDB={props.RemoveFromDB} DoneUdate={props.DoneUdate}/>
                )}

            </div>
        </div>
    )}

export default Box;