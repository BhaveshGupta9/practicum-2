import React, { Fragment, useEffect, useState, useContext } from "react";
import "./Profile.css";
import Navbar from "../components/GeneralComponents/Navbar";

import VerifiedIcon from '@mui/icons-material/Verified';

// import db from '../firebase'

// import { useNavigate } from "react-router-dom";
import { auth, db, getDoc, doc, dbCollection } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { AppContext } from ".././context";
import TweetOrPost from "../components/UI/TweetOrPost";

import { userTweets, tweetShow } from ".././apiFunction";




const Profile = () => {


  const { profile } = useContext(AppContext);
  const [tweets, setTweets] = useState([]);



  useEffect(() => {

    async function getUserTweets() {

      const myTweet = await userTweets(profile.uid);
      // console.log(myTweet);


      myTweet.tweetId.map((tweetid) => {

        dbCollection.collection('tweet').doc(tweetid).get().then((doc) => {
          setTweets(prevTweets => [...prevTweets, doc.data()]);
        })
      })

    }

    getUserTweets();


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
                  <button>Edit</button>
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

      {tweets.map((tweet) => (
        <TweetOrPost
          key={tweet.id}
          displayName={tweet.displayName}
          userName={tweet.userName}
          comments={tweet.comments}
          likes={tweet.likes}
          retweets={tweet.retweets}
          tweet={tweet.tweet}
          verified={tweet.verified}
          profileImage={tweet.profileImage}
        />
      ))}
    </Fragment>
  );
};

export default Profile;
