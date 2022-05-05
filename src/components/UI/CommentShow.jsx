import React,{useState,useEffect} from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';

import "./TweetOrPost.css";
import "./CommentShow.css";

import {getProfileImage} from "../../apiFunction";
import alex from "./alex.jpg";


function CommentShow({uid, displayName, userName, verified, comment}) {
  const [url, setUrl] = useState(null);

useEffect(() => {
  async function image(){

    await getProfileImage(uid).then( data =>{
      setUrl(data.image)
     
      // console.log(data)}
    })
    }
    image();
}, [])


  return (
    <div className='main-comment'>
                <div className="tweetorpost_main animate__animated animate__fadeInUp">
                <div className="tweetorpost_upper">
                  <div className="tweetorpost_profileImage">
                    <img
                      alt="profile_pic"
                      src={url ? url :alex}
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
                       <p>{comment}</p>
                   </div>
                  </div>
                </div>
                </div>

            </div>
  )
}

export default CommentShow