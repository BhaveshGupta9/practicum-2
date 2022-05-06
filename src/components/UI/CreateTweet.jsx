import React from "react";
import { useState } from "react";
import Button from "../UI/Button";
import "./CreateTweet.css";
import {
  //  auth, 

  // getDocs,
  storage, ref, uploadBytesResumable, getDownloadURL, firebase, 
} from "../.././firebase";

import { addTweet } from "../../apiFunction";

// import firebase from "firebase-admin"
//  import { useAuthState } from "react-firebase-hooks/auth";



const CreateTweet = ({ user }) => {



  const [tweetMessage, setTweetMessage] = useState('')
  const [tweetImageUrl, setTweetImage] = useState(null)
  const [progresspercent, setProgresspercent] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    if (!file) return;

    const storageRef = ref(storage, `tweetImage/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setTweetImage(downloadURL)
        });
      }
    );
  }


  const sendTweet = e => {
    e.preventDefault();

    // saving tweet to db
    if (tweetMessage !== '') {
      // console.log(tweetImageUrl)
      const docTweet = {
        displayName: user.displayName,
        uid: user.uid,
        userName: user.username,
        verified: user.verified,
        tweet: tweetMessage,
        likes: 0,
        comments: 0,
        retweets: 0,
        id: Math.random().toString(),
        // profileImage: url,
        image: tweetImageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),

      }


      addTweet(docTweet);
    }



    // setTweetImage('')
    setTweetMessage('')
    setProgresspercent(0)
    setTweetImage(null)
  }

  return (
    <div className="create-tweet-parent">
      <div className="createtweet_main">
        <div name="form">
          <div>
            <textarea
              className="createtweet_textarea"
              placeholder="what's on your mind?"
              rows="6"
              cols="80"
              value={tweetMessage}
              onChange={e => setTweetMessage(e.target.value)}
            />
          </div>

          <form onSubmit={handleSubmit} className='form'>
            <input type='file' />
            <button type='submit'>Upload</button>
          </form>

          {
            !tweetImageUrl &&
            <div className='outerbar'>
              <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
            </div>
          }
          {
            tweetImageUrl &&
            <img src={tweetImageUrl} alt='uploaded file' height={200} />
          }
          <div>
            <Button
              type="submit"
              onClick={sendTweet}
              className="addtweet_button"
            >
              tweet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
