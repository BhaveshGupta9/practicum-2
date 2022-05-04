import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tweetShow } from "../../apiFunction";
import TweetOrPost from "./TweetOrPost";
import {
  commentListArray,
  getComment,
  getBy,
  userDataa,
} from "../../apiFunction";
import CommentShow from "./CommentShow";
import Navbar from "../GeneralComponents/Navbar";
import "./TweetPage.css";
import LikeRetweetBy from "./LikeRetweetBy";

function TweetPage() {
  const { id } = useParams();

  const [tweet, setTweet] = useState({});
  const [comments, setComments] = useState([]);
  const [likeBy, setLikeBy] = useState([]);
  const [retweetBy, setretweetBy] = useState([]);

  useEffect(() => {
    // console.log("tweet id from page"+id);
    tweetShow(id).then((res) => {
      // console.log("data returned from api"+res)
      setTweet(res);
    });
    commentListArray(id).then((res) => {
      // console.log("comment list returned from api "+ res.commentId)

      if (res) {
        res.commentId.map((commentId) => {
          getComment(commentId).then((res) => {
            //  console.log( res)
            setComments((prevComments) => [...prevComments, res]);
          });
        });
      } else {
        setComments(false);
      }
    });

    async function getByData() {
      const arrL = await getBy(id, "likeBy");
      const arrR = await getBy(id, "retweetBy");

      arrL &&
        arrL.forEach((element) => {
          userDataa(element).then((data) =>
            setLikeBy((prev) => [...prev, data])
          );
        });

      arrR &&
        arrR.forEach((element) => {
          userDataa(element).then((data) =>
            setretweetBy((prev) => [...prev, data])
          );
        });

      console.log(likeBy);
    }

    getByData();
  }, []);

  if (likeBy) {
    console.log(likeBy);
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="parent-tp">
        <div className="tweetpage">
          <div className="main-tweetpage">
            <TweetOrPost
              key={tweet.id}
              id={tweet.id}
              displayName={tweet.displayName}
              userName={tweet.userName}
              comments={tweet.comments}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweet={tweet.tweet}
              verified={tweet.verified}
              profileImage={tweet.profileImage}
              navigateTo={false}
              image={tweet.image}
            />
          </div>
        </div>
        {comments ? (
          comments.map((comment) => (
            <div className="commentDiv">
              <h3>Comments</h3>
              <CommentShow
                key={comment.id}
                profileImage={comment.profileImage}
                displayName={comment.displayName}
                userName={comment.userName}
                verified={comment.verified}
                comment={comment.comments}
              />
            </div>
          ))
        ) : (
          <p>No comments</p>
        )}
        <div className="who-liked">
          {likeBy ? (
            <h3 className="liked-by">Liked By</h3>
          ) : (
            <h3 className="liked-by">No likes</h3>
          )}
          {likeBy ? (
            likeBy.map((profile) => (
              <div className="likeDiv">
                <LikeRetweetBy
                  key={Math.random()}
                  profileImage={profile.profileImage}
                  displayName={profile.displayName}
                  verified={profile.verified}
                  userName={profile.username}
                />
              </div>
            ))
          ) : (
            <p>No Likes</p>
          )}
        </div>
        {retweetBy ? (
          <h3 className="retweeted-by">Retweeted By</h3>
        ) : (
          <h3 className="retweeted-">No Retweets</h3>
        )}
        {retweetBy ? (
          retweetBy.map((profile) => (
            <div className="retweetDiv">
              <LikeRetweetBy
                key={Math.random()}
                profileImage={profile.profileImage}
                displayName={profile.displayName}
                verified={profile.verified}
                userName={profile.username}
              />
            </div>
          ))
        ) : (
          <p>No retweetss</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default TweetPage;
