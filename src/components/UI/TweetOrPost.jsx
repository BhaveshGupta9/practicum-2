import React, { useState, useContext } from "react";
import "./TweetOrPost.css";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import MessageIcon from '@mui/icons-material/Message';

import { AppContext } from "../../context";

import {
  //  auth, 
  setDoc,
  getDoc,
  // logout, 
  doc,
  db,
  updateDoc, arrayUnion, arrayRemove
  // getDocs,
} from "../.././firebase";

import {addUserChatRoom} from "../../apiFunction"

import CommentBox from "./CommentBox";
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from "react-router-dom";
import { sendEmailLike } from "../.././email"




const TweetOrPost = ({ navigateTo,receiverId, id, displayName, userName, verified, tweet, comments, likes, retweets, profileImage }) => {


  const navigate = useNavigate();
  const { profile } = useContext(AppContext);


  const [commentBox, setCommentBox] = useState(false);

  const likeButton = (e) => {
    console.log("liked", id);

    async function tweetAdd() {

      const tweetSnap = await getDoc(tweetRef);

      await updateDoc(tweetRef, {
        likes: tweetSnap.data().likes + 1
      })
    }

    async function tweetSub() {

      const tweetSnap = await getDoc(tweetRef);

      await updateDoc(tweetRef, {
        likes: tweetSnap.data().likes - 1
      })
    }
    // saving id to like collection under user id

    const mylikesRef = doc(db, "like", profile.uid);

    async function mylikes() {

      const mylikesSnap = await getDoc(mylikesRef);
      if (mylikesSnap.exists()) {
        console.log("mylikesSnap exists");

        // if tweet id is already in like collection then remove it from like collection
        if (mylikesSnap.data().tweetId.includes(id)) {
          console.log("already liked");
          await updateDoc(mylikesRef, {
            tweetId: arrayRemove(id)
          })
          tweetSub();

        } else {
          console.log("not liked");
          await updateDoc(mylikesRef, {
            tweetId: arrayUnion(id)
          })
          tweetAdd();
        }

      } else {
        console.log("mylikesSnap does not exists");
        await setDoc(mylikesRef, {
          tweetId: [id]
        })
        tweetAdd();
      }
    }

    mylikes();

    // adding like count in tweet object

    const tweetRef = doc(db, "tweet", id);

    // stop event bubbling
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();


    const emailObj = {
      user_name: displayName,
      user_email: userName + "@gmail.com",
      likeBy: profile.displayName,
      message: "liked your tweet",
      tweet: tweet,
    }

    sendEmailLike(emailObj);

  }

  // ******** Comment button
  function commentButton(e) {
    // console.log("Clicked Comment")
    setCommentBox(!commentBox);
    // stop event bubbling
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  function retweetClicked(e) {
    console.log("retweet clicked", id)

    async function retweetAdd() {

      const tweetSnap = await getDoc(tweetRef);

      await updateDoc(tweetRef, {
        retweets: tweetSnap.data().retweets + 1
      })
    }

    async function retweetSub() {

      const tweetSnap = await getDoc(tweetRef);

      await updateDoc(tweetRef, {
        retweets: tweetSnap.data().retweets - 1
      })
    }

    // saving id to retweet collection under user id
    const myretweetRef = doc(db, "retweet", profile.uid);

    async function myretweets() {

      const myretweetsSnap = await getDoc(myretweetRef);
      if (myretweetsSnap.exists()) {
        console.log("mylikesSnap exists");

        // if tweet id is already in like collection then remove it from like collection
        if (myretweetsSnap.data().tweetId.includes(id)) {
          console.log("already retweet");
          await updateDoc(myretweetRef, {
            tweetId: arrayRemove(id)
          })
          retweetSub();

        } else {
          console.log("not retweet");
          await updateDoc(myretweetRef, {
            tweetId: arrayUnion(id)
          })
          retweetAdd();
        }

      } else {
        console.log("mylikesSnap does not exists");
        await setDoc(myretweetRef, {
          tweetId: [id]
        })
        retweetAdd();
      }
    }

    myretweets();


    const tweetRef = doc(db, "tweet", id);

    // stop event bubbling
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    const emailObj = {
      user_name: displayName,
      user_email: userName + "@gmail.com",
      likeBy: profile.displayName,
      message: "retweet your tweet",
      tweet: tweet,
    }

    sendEmailLike(emailObj);

  }

  function directMessage(e) {

    console.log("direct message clicked")

    addUserChatRoom(profile.uid,receiverId, profile.username, userName)

    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }


  function divClicked() {
    if (navigateTo) return navigate("/tweetpage/" + id);

  }


  return (
    <div >
      <div onClick={divClicked} className="tweetorpost_main animate__animated animate__fadeInUp">
        <div className="tweetorpost_upper">
          <div className="tweetorpost_profileImage">
            <img
              alt="profile_pic"
              src={profileImage}
              height="50px"
              width="50px"
              className="tworpo_profilePic"
            />
          </div>
          <div className="tweetorpost_content">
            <div>
              <p className="tworpo_name">{displayName} <span className='post--headerSpecial'>
                {verified && <VerifiedIcon className='post--badge' color='primary' />}@{userName}
              </span> </p>
            </div>
            <div>
              <p>{tweet}</p>
            </div>
          </div>
        </div>
        <div className="tweetorpost_lower">
          <div onClick={commentButton}>
            <Button className="tworpo_comment"  >
              {comments}  <FontAwesomeIcon icon={faComment} />
            </Button>
          </div>
          <div >
            <Button className="tworpo_retweet" onClick={retweetClicked} >
              {retweets}  <FontAwesomeIcon icon={faRetweet} />
            </Button>
          </div>
          <div>
            <Button className="tworpo_heart" onClick={likeButton} >
              {likes}  <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
          <div>
            <Button className="" onClick={directMessage} >
              <MessageIcon className='post--badge' color='primary' />
            </Button>
          </div>
        </div>

      </div>
      {commentBox && <CommentBox id={Math.random()}
        functionCommentButton={commentButton}
        tweetId={id}
        user_name={displayName}
        user_email={userName}
        tweet={tweet}
      />}
    </div>
  );
};

export default TweetOrPost;
