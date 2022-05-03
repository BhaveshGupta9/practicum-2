import React from "react";
import { useState } from "react";
import Button from "../UI/Button";
import "./CreateTweet.css";

import {
  //  auth, 
  dbCollection,
  setDoc,

  getDoc,
  // logout, 
  doc,
  db,
  updateDoc, arrayUnion
  // getDocs,
  , storage, ref, uploadBytes, getDownloadURL, firebase, increment
} from "../.././firebase";

// import firebase from "firebase-admin"
//  import { useAuthState } from "react-firebase-hooks/auth";



const CreateTweet = ({ user }) => {



  const [tweetMessage, setTweetMessage] = useState('')
  // const [tweetImage, setTweetImage] = useState('')

  const sendTweet = e => {
    e.preventDefault();

    // saving tweet to db
    if (tweetMessage !== '') {
      var docRef = dbCollection.collection('tweet').add({
        displayName: user.displayName,
        uid: user.uid,
        userName: user.username,
        verified: user.verified,
        tweet: tweetMessage,
        likes: 0,
        comments: 0,
        retweets: 0,
        id: Math.random().toString(),
        profileImage: user.profileImage,
        // image: tweetImage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),

      })
        .then((docRef) => {
          console.log("Document successfully written!");

          // saving tweet document id inside tweet object 

          docRef.update({
            id: docRef.id
          })

          // adding number of tweets in profile

          updateDoc(doc(db, "profile", user.uid), {
            numberOfTweets: increment(1)
          })

          // saving tweetId to Mytweet array collection with Id same as user id
          const mytweetsRef = doc(db, "mytweets", user.uid);
          async function mytweets() {

            const mytweetsSnap = await getDoc(mytweetsRef);
            if (mytweetsSnap.exists()) {
              console.log("mytweetsSnap exists");
              await updateDoc(mytweetsRef, {
                tweetId: arrayUnion(docRef.id)
              })
            } else {
              console.log("mytweetsSnap does not exists", mytweetsSnap);
              await setDoc(mytweetsRef, {
                tweetId: [docRef.id]
              })
            }
          }
          mytweets();


        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });


    }



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
