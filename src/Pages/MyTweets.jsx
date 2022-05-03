import React, { useState, useEffect, useContext } from "react";
import "./MyTweets.css";
import Navbar from "../components/GeneralComponents/Navbar";
import Button from "../components/UI/Button";
import TweetOrPost from "../components/UI/TweetOrPost";
import CreateTweet from "../components/UI/CreateTweet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faImages,
  faBell,
  faMessage,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import MessageIcon from '@mui/icons-material/Message';


import { useNavigate } from "react-router-dom";
import {
  //  auth, 
  db,
  // dbCollection,
  getDocs,
  // logout, 
  doc,
  // getDocs,
  onSnapshot,

} from "../firebase";


import { AppContext } from ".././context";
import { auth, logout } from "../login";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, orderBy, query } from "firebase/firestore";




const MyTweets = () => {

  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  // const [user] = useAuthState(auth);

  const [tweets, setTweets] = useState([]);
  const { profile } = useContext(AppContext);


  useEffect(() => {

    async function getAllTweet() {

      const q = query(collection(db, "tweet"),orderBy("createdAt","desc"));
      const unsub = onSnapshot(q, (snapshot) => {
   
        setTweets(snapshot.docs.map(doc => doc.data()))
      });
    }


    getAllTweet();
  

  }, [])

  function homeButtonClick() {
    return navigate("/takemeto");
  }

  function logoutHandler() {
    logout();
    if (!user) {
      console.log("logged out")
      return navigate("/");

    }
  }

  function messageChat (){
    return navigate("/chatroom")
  }

  return (
    <div>
      <Navbar />
      <div className="mytweets_main">
        <div className="mytweets_left_container">
          <div className="mytweets_left_container_buttons">
            <Button onClick={homeButtonClick} className="my_tweets_button animate__animated animate__fadeIn">
              <FontAwesomeIcon icon={faHouse} />
            </Button>
            <Button className="my_tweets_button animate__animated animate__fadeIn">
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
          <Button className="create_tweet_button">tweet</Button>
        </div>
        <div className="mytweets_middle_container">
          <CreateTweet user={profile} />

          {tweets.map((tweet) => (
            <TweetOrPost
              key={tweet.id}
              receiverId={tweet.uid}
              id={tweet.id}
              displayName={tweet.displayName}
              userName={tweet.userName}
              comments={tweet.comments}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweet={tweet.tweet}
              verified={tweet.verified}
              profileImage={tweet.profileImage}
              navigateTo={true}
            />
          ))}

        
        </div>
        <div className="mytweets_right_container"></div>
      </div>
    </div>
  );
};

export default MyTweets;
