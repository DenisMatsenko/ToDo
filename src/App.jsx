import React, { useState, useEffect, useRef } from "react";
import LeftSide from "./components/leftSide";
import RightSide from "./components/RightSide";
import "./components/AllStyle.css";
import AddPostWind from "./components/AddPostWind";
import Box from "./components/Box";
import { createFactory } from "react";

import {db, SignInwithGoogle} from "./firebase"
import {set, ref, onValue, remove, update} from "firebase/database"

function App() {
  const [AddPostWind_active, setAddPostWind_active] = useState(false);
  const [leftMenu_acvive, setLeftMenu_acvive] = useState(true);
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
    // {id: 11241312414, text: "hi im denys", done: false, marks: ["Everyday ", "Work "],},
    // {id: 11241312424, text: "hi im michal", done: false, marks: ["Tomorrow ", "Important ", "Work "],},
    // {id: 11241312444, text: "hi im tomas", done: false, marks: ["Today ", "Work "],},
  ])
  const[filtrBoxes, setFiltrBoxes] = useState([])

  const ClickOptBtn = (info) => {
    if(info.target.id === "Profile") {
      UpdateUserInfo()
    }
  }

  const DoneUdate = (info) => {
    // var tempArr = allPosts;
    // var i = IndexFind(info)

    //   if(tempArr[i].id.toString() == info && tempArr[i].done === false) {
    //     //console.log("before", tempArr[i])
    //     tempArr[i].done = !tempArr[i].done
    //     // console.log("after", tempArr[i])
    //   }

    //   else if(tempArr[i].id.toString() == info && tempArr[i].done === true) {
    //     //console.log("before", tempArr[i])
    //     tempArr[i].done = !tempArr[i].done
    //     //console.log("after", tempArr[i])
    //   }

    //   setAllPosts(tempArr)

    UpdateDB(info)



    Filtr()
  }
  

  const IndexFind = (info) => {
    for (let i = 0; i < allPosts.length; i++) {
      if(allPosts[i].id.toString() == info) {
        return i;
      }
    }
  }


  // const PushBoxes = () => {
  //   setFiltrBoxes([
  //     <Box name={filtrName} post={post} key={1} DoneUdate={DoneUdate}/>,
  //      ])
  // }



  const Filtr = () => {
    let myArr = []
    let boxesArr = []
    let marksForFiltrArr = []

    switch(filtrName) {
      case "All":
        myArr = allPosts

        setFiltrBoxes([<Box name={"All"} post={OrderOfItemsAndFiltr(myArr)} key={1} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>,])
        break;

      case "Important":
        myArr = []

        for (let i = 0; i < allPosts.length; i++) {
          for (let u = 0; u < allPosts[i].marks.length; u++) {
            if(allPosts[i].marks[u] === "Important ") 
              myArr = [...myArr, allPosts[i]] 
          }
        }
        
        setFiltrBoxes([<Box name={"Important"} post={OrderOfItemsAndFiltr(myArr)} key={1} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>,])
        break;

      case "Complete":
        myArr =[]
        for (let i = 0; i < allPosts.length; i++) {
            if(allPosts[i].done)
              myArr = [...myArr, allPosts[i]]
        }

        setFiltrBoxes([<Box name={"Complete"} post={OrderOfItemsAndFiltr(myArr)} key={1} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>,])
        break;

      case "Uncomplete":
        myArr = []
        for (let i = 0; i < allPosts.length; i++) {
            if(!allPosts[i].done)
              myArr = [...myArr, allPosts[i]]
        }

        setFiltrBoxes([<Box name={"Uncomplete"} post={OrderOfItemsAndFiltr(myArr)} key={1} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>,])
        break;
      
      case "By date":
        boxesArr = []
        marksForFiltrArr = ["Everyday ", "Today ", "Tomorrow "]

        for (let d = 0; d < marksForFiltrArr.length; d++) {
          myArr = []
          for (let i = 0; i < allPosts.length; i++) {
            for (let u = 0; u < allPosts[i].marks.length; u++) {
              if(allPosts[i].marks[u] === marksForFiltrArr[d]) 
              myArr = [...myArr, allPosts[i]] 
            }
          }
          boxesArr = [...boxesArr, <Box name={marksForFiltrArr[d]} post={OrderOfItemsAndFiltr(myArr)} key={d}  RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>]
        }
        setFiltrBoxes(boxesArr)
        break;

      case "By marks":
        boxesArr = []
        marksForFiltrArr = []

        for (let i = 0; i < marks.length; i++) {
          marksForFiltrArr = [...marksForFiltrArr, marks[i].mark + " "]
        }

        for (let d = 0; d < marksForFiltrArr.length; d++) {
          myArr = []
          for (let i = 0; i < allPosts.length; i++) {
            for (let u = 0; u < allPosts[i].marks.length; u++) {
              if(allPosts[i].marks[u] === marksForFiltrArr[d]) 
              myArr = [...myArr, allPosts[i]] 
            }
          }
          if (myArr.length !== 0) {
          console.log(marksForFiltrArr[d], myArr)
          boxesArr = [...boxesArr, <Box name={marksForFiltrArr[d]} post={OrderOfItemsAndFiltr(myArr)} key={d} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>]}
        }
        setFiltrBoxes(boxesArr)
        break;


      // case "Important":  
      //   myArr = []

      //   for (let i = 0; i < allPosts.length; i++) {
      //     for (let u = 0; u < allPosts[i].marks.length; u++) {
      //       if(allPosts[i].marks[u] === "Important ") 
      //         myArr = [...myArr, allPosts[i]] 
      //     }
      //   }
      //   return myArr

      //   case "By date":
      //     myArr = [
      //       {id: 11241312414, text: "hi im denys", done: false, marks: ["Today ", "Work "],},
      //       {id: 11241312424, text: "hi im michal", done: false, marks: ["Important ", "Work "],},
      //       {id: 11241312444, text: "hi im tomas", done: false, marks: ["Today ", "Work "],},
      //     ]
  
      //     // for (let i = 0; i < allPosts.length; i++) {
      //     //   for (let u = 0; u < allPosts[i].marks.length; u++) {
      //     //     if(allPosts[i].marks[u] === "Important ") 
      //     //       myArr = [...myArr, allPosts[i]] 
      //     //   }
      //     // }
      //     return myArr
      
      // case "Complete":
      //   myArr =[]
      //   for (let i = 0; i < allPosts.length; i++) {
      //       if(allPosts[i].done === true)
      //         myArr = [...myArr, allPosts[i]]
      //   }
      //   return myArr

      // case "Uncomplete":
      //   myArr =[]
      //   for (let i = 0; i < allPosts.length; i++) {
      //       if(allPosts[i].done === false)
      //         myArr = [...myArr, allPosts[i]]
      //   }
      //   return myArr
    }
  }

  const OrderOfItemsAndFiltr = (arr) => {

      let myArr = arr
      let myUnDoneArr = []
      let myDoneArr = []

      for (let i = 0; i < myArr.length; i++) {
        if(!myArr[i].done) 
          myUnDoneArr.push(myArr[i])
        else
          myDoneArr.push(myArr[i])
      }
      return ([...FiltrItemsById(myUnDoneArr), ...FiltrItemsById(myDoneArr)])
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

  let marks = [
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
    Filtr()
  }, [filtrName]);


  useEffect(() => {
    Filtr()
  }, [allPosts]);


//////////////////////////////////////////////////////////User info functions////////////////////////////////////////////////////////

const[name, setName] = useState(localStorage.getItem("name"))
const[email, setEmail] = useState(localStorage.getItem("email"))
const[img, setImg] = useState(localStorage.getItem("img"))

const UpdateUserInfo = () => {
  SignInwithGoogle()

  for (let i = 0; i <= 10000; i += 1000) {
    setTimeout(UpdateInfo, i);
  }
}

const UpdateInfo = () => {
  setName(localStorage.getItem("name"))
  setEmail(localStorage.getItem("email"))
  setImg(localStorage.getItem("img"))
  
}



///////////////////////////////////////////////////////////database functions/////////////////////////////////////////////////////////
//write to db
const AddToDB = (info) => {

  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1]  + "/" + info.id

  set(ref(db, path), {
    id: info.id,
    text: info.text,
    done: info.done,
    marks: info.marks.length > 0 ? info.marks : [""]
  })

  setMyAddMark([])
  setAddPostWind_active(false)
}

//read db
useEffect(() => {
  UpdateAllPosts()
 }, []);

useEffect(() => {
  UpdateAllPosts()
}, [email]);

 const UpdateAllPosts = () => { 
  setAllPosts([])
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1]

  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    if(data !== null) {
      setAllPosts(Object.values(data))
    }
  })
}

//update db obj
const UpdateDB = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/" +info.id
  update(ref(db, path), {
    done: !info.done
  })
}

//delete
const RemoveFromDB = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/" + info.id
  console.log("path: ",  path)
  remove(ref(db, path))
  UpdateAllPosts()
}


// create props object

  return (
    <div className="App" id="App">
      <AddPostWind myAddMark={myAddMark} AddMarksToPost={AddMarksToPost} marksArr={marksArr} setMarksArr={setMarksArr} marks={marks} AddPostWind_active={AddPostWind_active} setAddPostWind_active={setAddPostWind_active} AddPostToPosts={AddToDB}/>
      <LeftSide name={name} email={email} img={img} ClickOptBtn={ClickOptBtn} setFiltrName={setFiltrName} leftMenu_acvive={leftMenu_acvive}/>
      <RightSide filtrBoxes={filtrBoxes} AddMarksToPost={AddMarksToPost} marks={marks} setMarksArr={setMarksArr} leftMenu_acvive={leftMenu_acvive} setLeftMenu_acvive={setLeftMenu_acvive} setAddPostWind_active={setAddPostWind_active}/>
    </div>
  );
}

export default App;
