import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';

import "./TweetOrPost.css";

function CommentShow({profileImage, displayName, userName, verified, comment}) {
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