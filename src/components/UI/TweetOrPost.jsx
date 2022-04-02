import React from "react";
import "./TweetOrPost.css";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import VerifiedIcon from '@mui/icons-material/Verified';


const TweetOrPost = ({displayName, userName, verified, tweet,comments,likes,retweets, profileImage}) => {
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
            <Button className="tworpo_heart">
            {likes}  <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetOrPost;
