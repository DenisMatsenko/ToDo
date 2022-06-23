import React, { useState, useEffect }from "react";
import "./AddPostWind_style.css"
import BtnBig from "./Buttons/BtnBig";
import MarkBtn from "./Buttons/MarkBtn";

function AddPostWind(props) {
    const [Post, setPost] = useState({id: '', text: '', marks: []})




    // Переключатель для модуля добавления
    function Switch(state) {
        setPost({id: '', text: '', marks: []})
        if(state === true) {
            console.log("go")
            props.setMarksArr(props.marks.map(p =>
            <MarkBtn marks={props.marks} AddMarksToPost={props.AddMarksToPost} bool={false} key={p.key} markName={p.mark}/>
            ))
        }
        else{
            props.setMarksArr([])
        }
        props.setAddPostWind_active(state)
    }


    // learn about useEffect

    // Реакция на Ентер
    useEffect(() => {
        const onKeypress = e => { 
            console.log(e.code)
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
        const newPost = { id: Date.now(), text: Post.text, done: false, marks: props.myAddMark}
        console.log(props.myAddMark + "перед отпр")
          
        if(newPost.text !== '') {props.AddPostToPosts(newPost)}
        Switch(false)
    }

    function CloseWind() { 
        Switch(false)
    }



    return(
        <div className={props.AddPostWind_active ? "AddPostWind" : "AddPostWindNone"} onClick={(obj) => {if(obj.target.className === 'AddPostWind')
        Switch(false)}}>
            <div className="APWContent" >

                <div className="TextInputWrapper">
                    <div className="Titule">Task</div> 
                    <input 
                    placeholder="Enter your task here:"
                    className="TaskInput"
                    id="input"
                    maxLength={35} 
                    value={Post.text} 
                    onChange={e => setPost({...Post, text: e.target.value})} 
                    type="text" />
                </div>

                <div className="MarksWrapper">
                    <div className="Titule">Marks</div>
                    <div className="BtnsList">
                        {props.marksArr}
                    </div>
                </div>

                <div className="FooterWrapper">
                    <BtnBig fun={CloseWind} text={"Cancel"}/>
                    <BtnBig fun={CreateNewPost} text={"Add"}/>
                </div>
                
            </div>
        </div>
    )}

export default AddPostWind;