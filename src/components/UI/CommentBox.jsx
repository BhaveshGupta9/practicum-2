import React, { useState, useContext } from 'react'

import "./CommentBox.css";
import Button from "../UI/Button";
import {
  //  auth, 
  dbCollection,
  setDoc,

  getDoc,
  // logout, 
  doc,
  db,
  updateDoc, arrayUnion,firebase
  // getDocs,
} from "../.././firebase";
import{ setNotification }from '../../apiFunction';

import { sendEmailComment } from '../../email';
import { AppContext } from "../../context"

function CommentBox({receiverId, tweetId,user_email,user_name,tweet, functionCommentButton }) {

  const [comment, setComment] = useState('');

  const { profile } = useContext(AppContext);
  //   console.log(profile);


  const sendComment = e => {
    e.preventDefault();

    var docRef = dbCollection.collection('comment').add({
      displayName: profile.displayName,
      userName: profile.username,
      verified: profile.verified,
      tweetId: tweetId,
      comments: comment,
      id: Math.random().toString(),
      // profileImage: profile.profileImage,
      // image: tweetImage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: profile.uid,


    })
      .then((docRef) => {
        // console.log("Document successfully written!");

        // saving comment document id inside comment object 

        docRef.update({
          id: docRef.id
        })


        // saving commentId to commentList of tweet array collection with Id same as tweet id
        const commentRef = doc(db, "commentList", tweetId);

        async function commentListArrayAdd() {

          const commentListSnap = await getDoc(commentRef);
          if (commentListSnap.exists()) {
            // console.log("commentListSnap exists");
            await updateDoc(commentRef, {
              commentId: arrayUnion(docRef.id)
            })
          } else {
            // console.log("commentListSnap does not exists", commentListSnap);
            await setDoc(commentRef, {
              commentId: [docRef.id]
            })
          }
        }
        commentListArrayAdd();


      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    const tweetRef = doc(db, "tweet", tweetId);


    async function commentAdd() {

      const tweetSnap = await getDoc(tweetRef);

      await updateDoc(tweetRef, {
        comments: tweetSnap.data().comments + 1
      })
    }

    commentAdd();

    // saving noti to db


 async function notification() {
    
      await setNotification(receiverId,"comment",profile.displayName,"Your tweet has a new comment, by ",tweet)
    }
    notification();
    
    const emailObj = {
      user_name: user_name,
      user_email: user_email + "@gmail.com",
      commentBy: profile.displayName,
      message: "liked your tweet",
      comment: comment,
      tweet: tweet,
    }

    sendEmailComment(emailObj);

    // setTweetImage('')
    setComment('')
    functionCommentButton();
  }

  return (
    <div>
      <div className="createtweet_main">
        <form>
          <div>
            <textarea
              className="createtweet_textarea"
              placeholder="Your views"
              rows="6"
              cols="90"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              onClick={sendComment}
              className="addtweet_button"
            >Add
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default CommentBox