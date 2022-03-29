import React, { Fragment, useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../components/GeneralComponents/Navbar";

import VerifiedIcon from '@mui/icons-material/Verified';

// import db from '../firebase'

import { useNavigate } from "react-router-dom";
import { auth, db, getDoc, logout, doc, getDocs } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // const [user, setUser] = useState({})

  console.log(user);

  const [userInfo, setUserInfo] = useState({
    // displayName: "Bhavesh",
    // userName: "gbhavesh",
    // verified: true,
    // profileImage: "https://pbs.twimg.com/profile_images/1401061073357348866/UnoWGpUS_400x400.jpg",
    // userBio: "I solomnly swear that I'm up to no good.",
    // numberOfTweets: 4,
    // followers: 100,
    // followings: 200
  });


  // const userInfo = {
  //   displayName: "Bhavesh",
  //   userName: "gbhavesh",
  //   verified: true,
  //   profileImage: "https://pbs.twimg.com/profile_images/1401061073357348866/UnoWGpUS_400x400.jpg",
  //   userBio: "I solomnly swear that I'm up to no good.",
  //   numberOfTweets: 4,
  //   followers: 100,
  //   followings: 200

  // }

  // useEffect(() => {
  //   db.collection('profile').onSnapshot(snapshot => (
  //     console.log(snapshot.docs)
  //     // setUser(snapshot.docs.map(doc => doc.data()))

  //   ))

  // }, [])

  useEffect(() => {

    async function userData() {
      try {
        console.log(user);


        const docRef = doc(db, "profile", user.uid)
        const docSnap = await getDoc(docRef);

        console.log("user Info ", docSnap.data());
        const docData = docSnap.data();
        setUserInfo(docData);
      } catch(e){
        console.log(e);
      }
    };

    if (!user) {
      console.log("login first")
      return navigate("/");
    }
    else {
      userData();
    }

  }, [])

  return (
    <Fragment>
      <Navbar />
      <div className="profile-container">
        <div className="profile-main animate__animated animate__fadeIn">
          <div className="profile-upper">
            <div className="profile-image-div">
              <img
                className="profile-image"
                src={userInfo.profileImage}
                alt="profile-pic"
              />
            </div>
            <div className="profile-name-bio">
              <div>
                <h2>{userInfo.displayName}</h2>
              </div>
              <div>
                <span>@{userInfo.username} {userInfo.verified && <VerifiedIcon className='post--badge' color='primary' />}</span>
              </div>
              <div>
                <p>
                  <i>{userInfo.userBio}</i>
                </p>
              </div>
            </div>
          </div>
          <div className="profile-lower animate__animated animate__fadeIn">
            <div className="profile-no-of-tweets">
              <h3>{userInfo.numberOfTweets}</h3>
              <p>tweets</p>
            </div>
            {/* <div className="profile-no-of-posts">
              <h3>156</h3>
              <p>posts</p>
            </div> */}
            <div className="profile-no-of-followers">
              <h3>{userInfo.followers}</h3>
              <p>followers</p>
            </div>
            <div className="profile-no-of-following">
              <h3>{userInfo.followings}</h3>
              <p>following</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
