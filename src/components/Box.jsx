import React, { Component } from 'react';
import Item from './Item';

function Box(props) {
    return(
        <div className="Box">
            <div className="NameOfIventList">{props.name}</div>
            <div className="ItemsList">
            {props.post.map(msg => 
                <Item text={msg.text} autor={msg.autor} id={msg.id} key={msg.id}/>
                )}

            </div>
        </div>
    )}

export default Box;