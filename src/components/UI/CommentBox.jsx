import React, {useState, useContext} from 'react'

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
    updateDoc, arrayUnion
    // getDocs,
  } from "../.././firebase";

  import {AppContext} from "../../context"

function CommentBox({tweetId, functionCommentButton}) {

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
            profileImage: profile.profileImage,
            // image: tweetImage,
      
          })
            .then((docRef) => {
              console.log("Document successfully written!");
      
              // saving comment document id inside comment object 
              
              docRef.update({
                id: docRef.id
              })
      
      
              // saving commentId to commentList of tweet array collection with Id same as tweet id
              const commentRef = doc(db, "commentList", tweetId);

              async  function commentListArrayAdd() {
      
                const commentListSnap = await getDoc(commentRef);
                if (commentListSnap.exists()) {
                  console.log("commentListSnap exists");
                  await updateDoc(commentRef, {
                    commentId: arrayUnion(docRef.id)
                  })
                } else {
                  console.log("commentListSnap does not exists",commentListSnap);
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
            >
              Add Comment
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default CommentBox