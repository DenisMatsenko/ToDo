import React, { useState, useEffect, useRef } from "react";
import LeftSide from "./components/leftSide";
import RightSide from "./components/RightSide";
import "./components/AllStyle.css";
import AddPostWind from "./components/Modules/AddPostWind";
import SignInModule from "./components/Modules/SignInModule";
import ThemeModule from "./components/Modules/ThemeModule";
import Box from "./components/Box";

import {db, SignInwithGoogle} from "./firebase"
import {set, ref, onValue, remove, update} from "firebase/database"
import LoginModule from "./components/Modules/LoginModule";

function App() {
  const [isRegistered, setIsRegistered] = useState(false)

  const [AddPostWind_active, setAddPostWind_active] = useState(false);
  const [signInModule_active, setSignInModule_active] = useState(false)
  const [themeModule_active, setThemeModule_active] = useState(false)
  const [moduleIsActive, setModuleIsActive] = useState(false)

  const[name, setName] = useState(localStorage.getItem("name"))
  const[email, setEmail] = useState(localStorage.getItem("email"))
  const[img, setImg] = useState(localStorage.getItem("img"))

  const UpdateBackground = () => {
    if(isRegistered) {
      let path = localStorage.getItem("email").split('@')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[1]
      onValue(ref(db, path + "/UserSettings/BackgroundImage"), (snapshot) => {
        setBackgroundimg("url(BackgroundImages/" + snapshot.val() +")")
      })
    }
  }


  useEffect(() => {

    if(email !== null || localStorage.getItem("email") != null) {
      setIsRegistered(true)
    }

    UpdateBackground()
    
  }, [moduleIsActive]);

  useEffect(() => {
    if(email !== null || localStorage.getItem("email") !== null) {
      setIsRegistered(true)
    }
  }, [email]);

  useEffect(() => {
    if(isRegistered) {
      CreateNewProfile()
      UpdateBackground()
      UpdateAllPosts()
    }
  }, [isRegistered]);

  const CreateNewProfile = () => {
      let path = localStorage.getItem("email").split('@')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[1]
    
      onValue(ref(db, path), (snapshot) => {
        if(snapshot.exists()) {
        }
        else {
          set(ref(db, path+"/UserSettings"), {
            BackgroundImage: "background7.jpg",
            UserMarks: ["Today", "Tomorrow", "Everyday", "Important", "Work", "Home", "Hobby"]
          })
          set(ref(db, path+"/UserTasks/FirstTask"), {
            id: "FirstTask",
            text: "Hello there, " + localStorage.getItem("name").toString() + "!",
            done: false,
            marks: ["Important"]
          })
        }
      })
    
      onValue(ref(db, path + "/UserSettings/BackgroundImage"), (snapshot) => {
        setBackgroundimg("url(BackgroundImages/" + snapshot.val() +")")
      })
  }



  const [leftMenu_acvive, setLeftMenu_acvive] = useState(true);
  const [marksArr, setMarksArr] = useState([]);
  const [myAddMark, setMyAddMark] = useState([]);
  const[filtrName, setFiltrName] = useState("All")
  const [backgroundimg, setBackgroundimg] = useState("hii")

  let marks = [
    {key: 1, mark: "Today"},
    {key: 2, mark: "Tomorrow"},
    {key: 3, mark: "Everyday"},
    {key: 4, mark: "Important"},
    {key: 5, mark: "Work"},
    {key: 6, mark: "Home"},
    {key: 7, mark: "Hobby"},
  ]

      // Реакция на Ентер
      useEffect(() => {
        const onKeypress = e => { 
          if(e.key === 'ArrowLeft' && leftMenu_acvive && !moduleIsActive) { 
            setLeftMenu_acvive(false)
          }
          else if(e.key === 'ArrowRight' && !leftMenu_acvive && !moduleIsActive) {
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

  const [findImg, setFindImg] = useState("hiiiiiiii")

  const ClickOptBtn = (info) => {
    if(info === "Profile") {
      setSignInModule_active(true)
      setModuleIsActive(true)
    }
    else if(info === "Theme") {
      let path = localStorage.getItem("email").split('@')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[0] + "-" + localStorage.getItem("email").split('@')[1].split('.')[1]
      onValue(ref(db, path + "/UserSettings/BackgroundImage"), (snapshot) => {
        setFindImg(snapshot.val())
      })

      setThemeModule_active(true)
      setModuleIsActive(true)
    }
    else if(info === "Settings") {
      console.log("isRegistered: ",  isRegistered)
      console.log("email: ",  email)
      console.log("backgroundimg: ",  backgroundimg)
    }
  }

  const DoneUdate = (info) => {
    UpdateDB(info)
    Filtr()
  }


  ///////////////filtrs for todo
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
          boxesArr = [...boxesArr, <Box name={marksForFiltrArr[d]} post={OrderOfItemsAndFiltr(myArr)} key={d} RemoveFromDB={RemoveFromDB} DoneUdate={DoneUdate}/>]}
        }
        setFiltrBoxes(boxesArr)
        break;
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

    if(isRegistered) {
      CreateNewProfile()
  }
}



///////////////////////////////////////////////////////////database functions/////////////////////////////////////////////////////////
//write to db
const AddToDB = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1]  + "/UserTasks/" + info.id

  set(ref(db, path), {
    id: info.id,
    text: info.text,
    done: info.done,
    marks: info.marks.length > 0 ? info.marks : [""]
  })
}

//read db
useEffect(() => {
  UpdateAllPosts()
 }, []);

useEffect(() => {
  UpdateAllPosts()
  setSignInModule_active(false)
  setModuleIsActive(false)
}, [email]);

const UpdateAllPosts = () => {
  if(isRegistered) {
    setAllPosts([])
      let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/UserTasks"

      onValue(ref(db, path), (snapshot) => {
        const data = snapshot.val();
        if(data !== null) {
          setAllPosts(Object.values(data))
        }
      })
  }
}

//update db obj
const UpdateDB = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/UserTasks/" +info.id
  update(ref(db, path), {
    done: !info.done
  })
}



//update UserSettings background db obj
const UpdateUserDBObj = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/" + "UserSettings"
  update(ref(db, path), {
    // BackgroundImage: info.split('/')[3].split('.')[0] + "." + info.split('/')[3].split('.')[2]
    BackgroundImage: info
  })
  setBackgroundimg("url(BackgroundImages/" + info + ")")
}

//delete
const RemoveFromDB = (info) => {
  let path = email.split('@')[0] + "-" + email.split('@')[1].split('.')[0] + "-" + email.split('@')[1].split('.')[1] + "/UserTasks/" + info.id
  remove(ref(db, path))
  UpdateAllPosts()
}


// create props object

  return (
    <div className="App" id="App">
      <LoginModule isRegistered={isRegistered} UpdateUserInfo={UpdateUserInfo}/>
      <ThemeModule findImg={findImg} backgroundimg={backgroundimg} UpdateUserDBObj={UpdateUserDBObj} setModuleIsActive={setModuleIsActive} themeModule_active={themeModule_active} setThemeModule_active={setThemeModule_active}/>
      <SignInModule setModuleIsActive={setModuleIsActive} UpdateUserInfo={UpdateUserInfo} userInfo={{name: name, email: email, img: img}} signInModule_active={signInModule_active} setSignInModule_active={setSignInModule_active}/>
      <AddPostWind moduleIsActive={moduleIsActive} setModuleIsActive={setModuleIsActive} myAddMark={myAddMark} AddMarksToPost={AddMarksToPost} marksArr={marksArr} setMarksArr={setMarksArr} marks={marks} AddPostWind_active={AddPostWind_active} setAddPostWind_active={setAddPostWind_active} AddPostToPosts={AddToDB}/>
      <LeftSide setSignInModule_active={setSignInModule_active} name={name} email={email} img={img} ClickOptBtn={ClickOptBtn} setFiltrName={setFiltrName} leftMenu_acvive={leftMenu_acvive}/>
      <RightSide backgroundimg={backgroundimg} filtrBoxes={filtrBoxes} AddMarksToPost={AddMarksToPost} marks={marks} setMarksArr={setMarksArr} leftMenu_acvive={leftMenu_acvive} setLeftMenu_acvive={setLeftMenu_acvive} setAddPostWind_active={setAddPostWind_active}/>
    </div>
  );
}

export default App;
