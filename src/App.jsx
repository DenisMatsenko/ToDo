import React, { useState, useEffect } from "react";
import LeftSide from "./components/leftSide";
import RightSide from "./components/RightSide";
import "./components/AllStyle.css";
import AddPostWind from "./components/AddPostWind";




function App() {
  const [AddPostWind_active, setAddPostWind_active] = useState(false)  

  const [post, setPost] = useState([
    {id: 1, text: "dw k qwdq wd klqwkdmlqw qwkd", autor: "denis",},
    {id: 2, text: "dw k qwdq wd klqwkdmlqw qwkd", autor: "denis",},
    {id: 3, text: "dw k qwdq wd klqwkdmlqw qwkd", autor: "denis",},
  ])

function AddPostToPosts(newPost) {  
  setPost([...post, newPost])
  setAddPostWind_active(false)
}

  return (
    <div className="App" id="App">
      <AddPostWind AddPostWind_active={AddPostWind_active} setAddPostWind_active={setAddPostWind_active} AddPostToPosts={AddPostToPosts}/>
      <LeftSide/>
      <RightSide setAddPostWind_active={setAddPostWind_active} post={post}/>
      
    </div>
  );
}

export default App;
