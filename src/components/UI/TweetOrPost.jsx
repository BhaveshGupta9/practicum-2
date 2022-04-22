import React from "react";
import "./TweetOrPost.css";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import {
  //  auth, 
  dbCollection,
  setDoc,

  getDoc,
  // logout, 
  doc,
  db,
  updateDoc, arrayUnion, arrayRemove
  // getDocs,
} from "../.././firebase";


import VerifiedIcon from '@mui/icons-material/Verified';


const TweetOrPost = ({id, displayName, userName, verified, tweet,comments,likes,retweets, profileImage,loginUserId}) => {
  
  const likeButton = () =>{
    console.log("liked", id);

    async  function tweetAdd() {
        
      const tweetSnap = await getDoc(tweetRef);
      
        await updateDoc(tweetRef, {
          likes: tweetSnap.data().likes + 1
        })
  }

  async  function tweetSub() {
        
    const tweetSnap = await getDoc(tweetRef);
    
      await updateDoc(tweetRef, {
        likes: tweetSnap.data().likes - 1
      })
}
    // saving id to like collection under user id

    const mylikesRef = doc(db,"like",loginUserId);

    async  function mylikes() {

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

    const tweetRef = doc(db,"tweet",id);

    

 

  }
  
  return (
    <div>
      <div className="tweetorpost_main animate__animated animate__fadeInUp">
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
                        {verified && <VerifiedIcon className='post--badge' color='primary'/> }@{userName}
                        </span> </p>
            </div>
            <div>
              <p>{tweet}</p>
            </div>
          </div>
        </div>
        <div className="tweetorpost_lower">
          <div>
            <Button className="tworpo_comment">
            {comments}  <FontAwesomeIcon icon={faComment} />
            </Button>
          </div>
          <div>
            <Button className="tworpo_retweet">
            {retweets}  <FontAwesomeIcon icon={faRetweet} />
            </Button>
          </div>
          <div>
            <Button className="tworpo_heart" onClick={likeButton} >
            {likes}  <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetOrPost;
