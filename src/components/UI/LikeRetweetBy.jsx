import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';

function LikeRetweetBy({userName,profileImage,verified,displayName}) {
  return (
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
          
          </div>
        </div>
  )
}

export default LikeRetweetBy