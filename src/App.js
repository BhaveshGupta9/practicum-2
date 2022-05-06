import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TakeMeTo from "./Pages/TakeMeTo";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import MyTweets from "./Pages/MyTweets";
import MyPosts from "./Pages/MyPosts";
import Notifications from "./Pages/Notifications";
import TweetPage from "./components/UI/TweetPage";
import Chat from "./Pages/Chat";
import ChatRoom from "./Pages/ChatRoom";


import { AppContext } from "./context";
import { auth,
  //  db,
    // getDoc,
    //  logout,
      // doc,
      //  getDocs,
 } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const App = () => {

  const [user] = useAuthState(auth);


  const [profile, updateProfile] = useState({});
  const [profileImg,updateProfileImg] = useState(null)

  function updateProfileInfo(newProfile) {
    updateProfile(newProfile);
  }

  function updateProfileImgFunction(url){
    updateProfileImg(url);
  }

  return (
    <AppContext.Provider value={{ profile, updateProfileInfo,profileImg,updateProfileImgFunction }}>
      <Routes>
        <Route path="/" element={ user ? <TakeMeTo/> : <Auth />} />
        <Route path="/takemeto" element={ user ? <TakeMeTo /> : <Auth/> } />
        <Route path="/mytweets" element={ user ? <MyTweets /> : <Auth/>} />
        <Route path="/profile" element={ user ?  <Profile /> : <Auth/>} />
        <Route path="/profile/:id" element={ user ?  <Profile /> : <Auth/>} />


        <Route path="/myposts" element={ user?  <MyPosts />: <Auth/>} />
        <Route path="/notifications" element={ user ?  <Notifications />: <Auth/>} />
        <Route path="/tweetpage/:id" element={ user ?  <TweetPage />: <Auth/>} />
        <Route path="/chat/:collect" element={ user ?  <Chat />: <Auth/>} />
        <Route path="/chatroom" element={ user ?  <ChatRoom />: <Auth/>} />
     
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
