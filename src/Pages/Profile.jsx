import React, { Fragment, useEffect, useState, useContext } from "react";
import "./Profile.css";
import Navbar from "../components/GeneralComponents/Navbar";

import VerifiedIcon from "@mui/icons-material/Verified";
import EditIcon from '@mui/icons-material/Edit';

// import db from '../firebase'

// import { useNavigate } from "react-router-dom";
import { auth, db, getDoc, doc, dbCollection, updateDoc, storage, uploadBytesResumable, ref, getDownloadURL } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { AppContext } from ".././context";
import TweetOrPost from "../components/UI/TweetOrPost";

import { userTweets, tweetShow } from ".././apiFunction";

const Profile = () => {


  const barOuter = document.querySelector(".bar-outer");
  const options = document.querySelectorAll(".bar-grey .option");
  let current = 1;
  options.forEach((option, i) => (option.index = i + 1));
  options.forEach((option) =>
    option.addEventListener("click", function () {
      barOuter.className = "bar-outer";
      barOuter.classList.add(`pos${option.index}`);
      if (option.index > current) {
        barOuter.classList.add("right");
      } else if (option.index < current) {
        barOuter.classList.add("left");
      }
      current = option.index;
    })
  );

  const { profile,profileImg } = useContext(AppContext);
  const [tweets, setTweets] = useState([]);

  const [bio, setBio] = useState(profile.userBio);
  const [editBioField, setEditBioField] = useState(false);

  const editButton = () => {
    setEditBioField(true);
  };

  const addBio = () => {
    const profileRef = doc(db, "profile", profile.uid);

    async function updateBio() {
      await updateDoc(profileRef, {
        userBio: bio,
      });
    }

    updateBio();
    setEditBioField(false);
  };

  async function getUserTweets(searchCollection) {
    if (profile.uid && searchCollection) {
      const myTweet = await userTweets(profile.uid, searchCollection);
      // console.log(myTweet);

      setTweets([]);

      myTweet.tweetId.map((tweetid) => {
        dbCollection
          .collection("tweet")
          .doc(tweetid)
          .get()
          .then((doc) => {
            setTweets((prevTweets) => [doc.data(), ...prevTweets]);
          })
          .then(() => {
            // console.log(tweets);

          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      });
    } else {
      console.log("Try going back to takemeto page");
    }
  }


  const [profileImageUrl, setUrl] = useState(profileImg);
  const [showEditImage, setShowEditImage] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);


  function handleProfileImage() {
    // console.log("profile image");

    setShowEditImage(!showEditImage);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    if (!file) return;

    const storageRef = ref(storage, `profileImage/${profile.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
          const docRef = doc(db, "profileImage", profile.uid);
          updateDoc(docRef, {
            image: downloadURL,
          })
        });
      }
    );
    setShowEditImage(!showEditImage);

  }

  const showMyTweets = () => {
    getUserTweets("mytweets");
  };

  const showLikedTweets = () => {
    getUserTweets("like");
  };

  const showMyreTweets = () => {
    getUserTweets("retweet");
  };

  useEffect(() => {
    getUserTweets("mytweets");
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="profile-container">
        <div className="profile-main animate__animated animate__fadeIn">
          <div className="profile-upper">
            <div className="profile-image-div">
              <img
                className="profile-image"
                src={profileImageUrl}
                alt="profile-pic"
              />
              <EditIcon onClick={handleProfileImage} />
            </div>
            {showEditImage && (
              <div> <form onSubmit={handleSubmit} className='form'>
                <input type='file' />
                <button type='submit'>Upload</button>
              </form>
                <div className='outerbar'>
                  <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div></div>
            )}
            <div className="profile-name-bio">
              <div>
                <h2>{profile.displayName}</h2>
              </div>
              <div>
                <span>
                  @{profile.username}{" "}
                  {profile.verified && (
                    <VerifiedIcon className="post--badge" color="primary" />
                  )}
                </span>
              </div>
              <div>
                <p>
                  <i>{bio}</i>
                  <button onClick={editButton}>Edit</button>
                </p>
                {editBioField && (
                  <div>
                    <textarea
                      placeholder="New bio"
                      rows="1"
                      cols="40"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />{" "}
                    <button onClick={addBio}>Done</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-lower animate__animated animate__fadeIn">
            <div className="profile-no-of-tweets">
              <h3>{profile.numberOfTweets}</h3>
              <p>tweets</p>
            </div>
            {/* <div className="profile-no-of-posts">
              <h3>156</h3>
              <p>posts</p>
            </div> */}
            <div className="profile-no-of-followers">
              <h3>{profile.followers}</h3>
              <p>followers</p>
            </div>
            <div className="profile-no-of-following">
              <h3>{profile.followings}</h3>
              <p>following</p>
            </div>
          </div>
        </div>
        <div className="container selection">
          <div className="bar bar-grey">
            <div className="option" onClick={showMyTweets}>
              My tweets
            </div>
            <div className="option" onClick={showLikedTweets}>
              Liked Tweets
            </div>
            <div className="option" onClick={showMyreTweets}>
              Retweets{" "}
            </div>
          </div>
          <div className="bar-outer">
            <div className="bar bar-purple">
              <div className="option" onClick={showMyTweets}>
                My tweets
              </div>
              <div className="option" onClick={showLikedTweets}>
                Liked Tweets
              </div>
              <div className="option" onClick={showMyreTweets}>
                Retweets{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="tweets-liked-done">
          {tweets.map((tweet) => (
            <TweetOrPost
              key={tweet.id}
              receiverId={tweet.uid}
              id={tweet.id}
              displayName={tweet.displayName}
              userName={tweet.userName}
              comments={tweet.comments}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweet={tweet.tweet}
              verified={tweet.verified}
              // profileImage={tweet.profileImage}
              navigateTo={true}
              image={tweet.image}
            />
          ))}
        </div>
        {/* 
      <div id="btn_cont">
        <div class="btn">
          <span>My Tweets</span>
        </div>
        <div class="btn">
          <span>Liked Tweets</span>
        </div>
      </div> */}
      </div>
    </Fragment>
  );
};

export default Profile;
