import React, { useState, useEffect, useRef } from "react";
import LeftSide from "./components/leftSide";
import RightSide from "./components/RightSide";
import "./components/AllStyle.css";
import AddPostWind from "./components/AddPostWind";
import Box from "./components/Box";
import { createFactory } from "react";

function App() {
  const [AddPostWind_active, setAddPostWind_active] = useState(false);
  const [leftMenu_acvive, setLeftMenu_acvive] = useState(false);
  const [marksArr, setMarksArr] = useState([]);
  const [addMarkToPost, setAddMarkToPost] = useState();
  const [myAddMark, setMyAddMark] = useState([]);
  const[filtrName, setFiltrName] = useState("All")

      // Реакция на Ентер
      useEffect(() => {
        const onKeypress = e => { 
          if(e.key === 'ArrowLeft' && leftMenu_acvive) { 
            setLeftMenu_acvive(false)
          }
          else if(e.key === 'ArrowRight' && !leftMenu_acvive) {
            setLeftMenu_acvive(true)
          }
        }

        // avoid document.querySelectors -> useRef() instead
        document.addEventListener('keydown', onKeypress);
        return () => {
        document.removeEventListener('keydown', onKeypress);
    };});

  const[allPosts, setAllPosts] = useState([
    {id: 11241312414, text: "hi im denys", done: false, marks: ["Today ", "Work "],},
    {id: 11241312424, text: "hi im michal", done: false, marks: ["Important ", "Work "],},
    {id: 11241312444, text: "hi im tomas", done: false, marks: ["Today ", "Work "],},
  ])

  const [post, setPost] = useState(allPosts)
  const[filtrBoxes, setFiltrBoxes] = useState([])

  const DoneUdate = (info) => {
    var tempArr = post;
    var i = IndexFind(info)

      if(tempArr[i].id.toString() == info && tempArr[i].done === false) {
        tempArr[i].done = !tempArr[i].done
      }

      else if(tempArr[i].id.toString() == info && tempArr[i].done === true) {
        tempArr[i].done = !tempArr[i].done
      }

      OrderOfItemsAndFiltr(tempArr)
    }
  

  const IndexFind = (info) => {
    for (let i = 0; i < post.length; i++) {
      if(post[i].id.toString() == info) {
        return i;
      }
    }
  }


  const PushBoxes = () => {
    setFiltrBoxes([
      <Box name={filtrName} post={post} key={1} DoneUdate={DoneUdate}/>,
       ])

    // switch(filtrName) {
    //   case "All":

    //     setFiltrBoxes([
    //       <Box name={"All"} post={post} key={1} DoneUdate={DoneUdate}/>,
    //     ])
    //     console.log("!!! All pushed !!!")
    //     console.log(post)
    //     break;

    //   case "By date":
    //     break;

    //   case "Important":
       
    //     setFiltrBoxes([
    //       <Box name={"Important"} post={post} key={2} DoneUdate={DoneUdate}/>,
    //     ])
    //     console.log("!!! Important pushed !!!")
    //     console.log(post)
    //     break;
    // }
  }

  const Filtr = () => {
    let myArr = []
    switch(filtrName) {
      case "All":
        return allPosts;

      case "Important":
        myArr = []

        for (let i = 0; i < allPosts.length; i++) {
          for (let u = 0; u < allPosts[i].marks.length; u++) {
            if(allPosts[i].marks[u] === "Important ") 
              myArr = [...myArr, allPosts[i]] 
          }
        }
        return myArr
      
      case "Complete":
        myArr =[]
        for (let i = 0; i < allPosts.length; i++) {
            if(allPosts[i].done === true)
              myArr = [...myArr, allPosts[i]]
        }
        return myArr

      case "Uncomplete":
        myArr =[]
        for (let i = 0; i < allPosts.length; i++) {
            if(allPosts[i].done === false)
              myArr = [...myArr, allPosts[i]]
        }
        return myArr
    }
  }

  const OrderOfItemsAndFiltr = () => {

      let myArr = Filtr()
      let myUnDoneArr = []
      let myDoneArr = []

      for (let i = 0; i < myArr.length; i++) {
        if(!myArr[i].done) 
          myUnDoneArr.push(myArr[i])
        else
          myDoneArr.push(myArr[i])
      }

      setPost([...FiltrItemsById(myUnDoneArr), ...FiltrItemsById(myDoneArr)])
  }



  const FiltrItemsById = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let u = 0; u < arr.length; u++) {
        if(arr[i].id < arr[u].id)
        {
            let temp = arr[u];
            arr[u] = arr[i];
            arr[i] = temp;
        }    
      }
    }
    return arr;
  }

  var marks = [
    {key: 1, mark: "Today"},
    {key: 2, mark: "Tomorrow"},
    {key: 3, mark: "Everyday"},
    {key: 4, mark: "Important"},
    {key: 5, mark: "Work"},
    {key: 6, mark: "Home"},
    {key: 7, mark: "Hobby"},
  ]

  function AddMarksToPost(MyMarkArr) {
    setMyAddMark(MyMarkArr)
  }

  useEffect(() => {
    PushBoxes()
  }, [post]);

  useEffect(() => {
    OrderOfItemsAndFiltr()
  }, [filtrName]);


  useEffect(() => {
    setPost(allPosts)
    OrderOfItemsAndFiltr()
  }, [allPosts]);



  function AddPostToPosts(newPost) { 
   setAllPosts([...allPosts, newPost])
   setMyAddMark([])
   setAddPostWind_active(false)
}

// create props object

  return (
    <div className="App" id="App">
      <AddPostWind myAddMark={myAddMark} AddMarksToPost={AddMarksToPost} marksArr={marksArr} setMarksArr={setMarksArr} marks={marks} AddPostWind_active={AddPostWind_active} setAddPostWind_active={setAddPostWind_active} AddPostToPosts={AddPostToPosts}/>
      <LeftSide setFiltrName={setFiltrName} PushBoxes={PushBoxes} leftMenu_acvive={leftMenu_acvive}/>
      <RightSide filtrBoxes={filtrBoxes} AddMarksToPost={AddMarksToPost} marks={marks} setMarksArr={setMarksArr} leftMenu_acvive={leftMenu_acvive} setLeftMenu_acvive={setLeftMenu_acvive} setAddPostWind_active={setAddPostWind_active} post={post}/>
      
    </div>
  );
}

export default App;
