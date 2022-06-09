import React, { useState, useEffect }from "react";
import "./AddPostWind_style.css"
import Myinput from "./Myinput";

function AddPostWind(props) {
    const [Post, setPost] = useState({id: '', text: '', autor: ''})


    // const i =<input
    //     id="111"
    //     maxLength={25} 
    //     value={Post.text} 
    //     onChange={e => setPost({...Post, text: e.target.value})} 
    //     type="text" />


    // Переключатель для модуля добавления
    function Switch(state) {
        props.setAddPostWind_active(state) 
    }


    // Реакция на Ентер
    useEffect(() => {
        const onKeypress = e => { 
            if(e.key === 'Enter' && props.AddPostWind_active) {
                CreateNewPost()         
            }
            else if(e.key === 'Enter' && !props.AddPostWind_active) {
                Switch(true)
                
            }
        }
        document.getElementById("input").focus();
        document.addEventListener('keypress', onKeypress);
        return () => {
        document.removeEventListener('keypress', onKeypress);
    };});

    // Создание нового поста и отправление в Арр
    function CreateNewPost() {
        const newPost = { id: Date.now(), text: Post.text, autor: Post.autor,}
          
        if(newPost.text !== '') {props.AddPostToPosts(newPost)}
        setPost({title: '', text: '', autor: ''})
        Switch(false)
    }

   

    return(
        <div className={props.AddPostWind_active ? "AddPostWind" : "AddPostWindNone"} onClick={(obj) => {if(obj.target.className === 'AddPostWind')
        Switch(false)}}>
            <div className="APWContent" >
                <div>title</div> 
                <input 
                    autoFocus
                    onFocus={() => {console.log("focused")}} 
                    onBlur={() => {console.log("blured")}} 
                    id="input" 
                    maxLength={25} 
                    value={Post.text} 
                    onChange={e => setPost({...Post, text: e.target.value})} 
                    type="text" />


                <button onClick={CreateNewPost}>ja</button>
                <button onClick={() => {document.getElementById("input").focus()}}>1</button>
            </div>
        </div>
    )}

export default AddPostWind;