import React from "react";
import { useState } from "react";
import Button from "../UI/Button";
import "./CreateTweet.css";

import {
  //  auth, 
  dbCollection, 
  // getDoc, 
  // logout, 
  // doc, 
  // getDocs,
 } from "../.././firebase";

//  import { useAuthState } from "react-firebase-hooks/auth";

 

const CreateTweet = ({user}) => {

  

  const [tweetMessage, setTweetMessage] = useState('')
  // const [tweetImage, setTweetImage] = useState('')

  const sendTweet = e => {
    e.preventDefault();

    dbCollection.collection('tweet').add({
      displayName: user.displayName,
      userName: user.username,
      verified: user.verified,
      tweet: tweetMessage,
      likes: 0,
      comments: 0,
      retweets: 0,
      id: Math.random().toString(),
      profileImage: user.profileImage,
      // image: tweetImage,

    })
    .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });

    // setTweetImage('')
    setTweetMessage('')
  }

  return (
    <div>
      <div className="createtweet_main">
        <form>
          <div>
            <textarea
              className="createtweet_textarea"
              placeholder="what's on your mind?"
              rows="6"
              cols="90"
              value={tweetMessage}
              onChange={e => setTweetMessage(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              onClick={sendTweet}
              className="addtweet_button"
            >
              tweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTweet;
