import React, { Fragment, useEffect, useState , useContext} from "react";
import "./Profile.css";
import Navbar from "../components/GeneralComponents/Navbar";

import VerifiedIcon from '@mui/icons-material/Verified';

// import db from '../firebase'

// import { useNavigate } from "react-router-dom";
import { auth, db, getDoc,  doc,  } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { AppContext } from ".././context";


const Profile = () => {


  const { profile } = useContext(AppContext);


  // const navigate = useNavigate();
  // const [user] = useAuthState(auth);

  // const [user, setUser] = useState({})

  // console.log(user);

  // const [userInfo, setUserInfo] = useState({
    // displayName: "Bhavesh",
    // userName: "gbhavesh",
    // verified: true,
    // profileImage: "https://pbs.twimg.com/profile_images/1401061073357348866/UnoWGpUS_400x400.jpg",
    // userBio: "I solomnly swear that I'm up to no good.",
    // numberOfTweets: 4,
    // followers: 100,
    // followings: 200
  // });


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

    // async function userData() {
    //   try {
    //     console.log(user);


    //     const docRef = doc(db, "profile", user.uid)
    //     const docSnap = await getDoc(docRef);

    //     console.log("user Info ", docSnap.data());
    //     const docData = docSnap.data();
    //     setUserInfo(docData);
    //   } catch(e){
    //     console.log(e);
    //   }
    // };

    // if (!user) {
    //   console.log("login first")
    //   alert("Login first");
    //   return navigate("/");
    // }
    // else {
      // }
      
      // userData();
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
                src={profile.profileImage}
                alt="profile-pic"
              />
            </div>
            <div className="profile-name-bio">
              <div>
                <h2>{profile.displayName}</h2>
              </div>
              <div>
                <span>@{profile.username} {profile.verified && <VerifiedIcon className='post--badge' color='primary' />}</span>
              </div>
              <div>
                <p>
                  <i>{profile.userBio}</i>
                </p>
              </div>
            </div>
          </div>
          <div className="profile-lower animate__animated animate__fadeIn">
            <div className="profile-no-of-tweets">
              <h3>{profile.numberOfTweets}</h3>
              <p>tweets</p>
            </div>
            {/* <div className="profile-no-of-posts">
              <h3>156</h3>
              <p>posts</p>
            </div> */}
            <div className="profile-no-of-followers">
              <h3>{profile.followers}</h3>
              <p>followers</p>
            </div>
            <div className="profile-no-of-following">
              <h3>{profile.followings}</h3>
              <p>following</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
