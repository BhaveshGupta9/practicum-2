import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Notifications.css";
import Navbar from "../components/GeneralComponents/Navbar";
import Button from "../components/UI/Button";
import Notification from "../components/GeneralComponents/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faImages,
  faBell,
  faArrowRightFromBracket,
  faMessage,

} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { AppContext } from ".././context";
import { useAuthState } from "react-firebase-hooks/auth";

import { getNotification } from ".././apiFunction";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../login";




const Notifications = () => {

  const [user] = useAuthState(auth);

  const { profile,profileImg } = useContext(AppContext);
  const [noti, setNoti]= useState([]);
  const navigate = useNavigate();


  useEffect(() => {
      async function getNoti(){
        const doc = await getNotification(profile.uid).then(data=>{console.log(data)
          setNoti(data.noti);
          console.log(noti[0]);
        })

      }
      getNoti();
  }, [])
  function homeButtonClick() {
    return navigate("/takemeto");
  }

  function handleNoti() {
    return navigate("/notifications")
  }

  
  function messageChat (){
    return navigate("/chatroom")
  }

  function logoutHandler() {
    logout();
    if (!user) {
      console.log("logged out")
      return navigate("/");

    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="notifications_main">
        <div className="notifications_left_container">
          <div className="notifications_left_container_buttons">
          <Button onClick={homeButtonClick} className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button onClick={handleNoti} className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faBell} />
            </Button>
            <Button className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
            <Button className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faImages} />
            </Button>
            <Button onClick={messageChat} className="my_tweets_button animate__animated animate__fadeIn">
            <FontAwesomeIcon icon={faMessage} className='post--badge' color='primary' />{" "}
            </Button>
            <Button onClick={logoutHandler} className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
            </Button>
          </div>
          <Button className="markasseen_button">mark as read</Button>
        </div>
        <div className="notifications_middle_container">
          {
            noti && noti.map((n)=>{
              return <Notification key={Math.random()} props={n} />
            })
          }
        </div>
        <div className="notifications_right_container"></div>
      </div>
    </Fragment>
  );
};

export default Notifications;
