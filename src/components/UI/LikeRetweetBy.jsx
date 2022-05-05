import React, {useState, useEffect} from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { getProfileImage } from '../../apiFunction';
import alex from "./alex.jpg";


function LikeRetweetBy({userName,verified,displayName,uid}) {

  const [url, setUrl] = useState(null)

  useEffect(() => {
    async function image(){
    await getProfileImage(uid).then(data=>setUrl(data.image))
    } 
    image();
  
    
  }, [])

  return (
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
          
          </div>
        </div>
  )
}

export default LikeRetweetBy