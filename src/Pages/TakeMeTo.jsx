import React, { useEffect, useContext } from 'react';
import "./TakeMeTo.css";
import Section from "../components/GeneralComponents/Section";
import Welcome from "../components/GeneralComponents/Welcome";
import Navbar from "../components/GeneralComponents/Navbar";

import { auth, logout } from "../login";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { userData } from ".././apiFunction";
import { AppContext } from ".././context";
import emailjs from "@emailjs/browser"




const TakeMeTo = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { updateProfileInfo } = useContext(AppContext);


  useEffect(() => {

    console.log(process.env.REACT_APP_TEST)

    async function getUserData() {

      const profile = await userData(user);
      updateProfileInfo(profile);
    }

    // function emailSend(e) {
    //   // e.preventDefault();
    //   console.log(e);
    //   emailjs.sendForm('service_sp9wk2o', 'template_v9oa2k7', e, 'gcU4qWrNJsucpW8wU')
    //     .then((result) => {
    //       alert("Message Sent, We will get back to you shortly", result.text);
    //     },
    //       (error) => {
    //         alert("An error occurred, Please try again", error.text);
    //       });
    // }

    getUserData();
    // emailSend("test 1");

  }, [])


  function logoutHandler() {
    logout();
    if (!user) {
      console.log("logged out")
      return navigate("/");

    }
  }

  function profileHandler() {
    return navigate("/profile");

  }

  function tweetsHnadler() {
    return navigate("/mytweets")
  }




  return (
    <div className="parent animate__animated">
      <Navbar />
      <div className="welcome-page-flex">
        <Welcome />
        <div className="take-me-to">
          <div className="sections_upper">
            <Section
              click={profileHandler}
              title="profile"
              description="your profile!"
              className="section_profile animate__animated animate__fadeIn"
            />
            <Section
              click={tweetsHnadler}
              title="tweets"
              description="have a look at your tweets"
              className="section_tweets animate__animated animate__fadeIn "
            />
          </div>
          <div className="sections_lower">
            <Section
              title="posts"
              description="lets go through your posts!"
              className="section_posts animate__animated animate__fadeIn"
            />

            <Section
              click={logoutHandler}
              title="logout"
              description="see ya!"
              className="section_logout animate__animated animate__fadeIn"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TakeMeTo;