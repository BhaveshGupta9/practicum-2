  
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tweetShow } from "../../apiFunction";
import TweetOrPost from "./TweetOrPost";
import { commentListArray, getComment } from "../../apiFunction";
import CommentShow from "./CommentShow";
import Navbar from "../GeneralComponents/Navbar";
import "./TweetPage.css";
import LikeRetweetBy from './LikeRetweetBy';



function TweetPage() {
  const { id } = useParams();

    const [tweet, setTweet] = useState({});
    const [comments, setComments] = useState([]);
    const [likeBy, setLikeBy] = useState([]);
    const [retweetBy, setretweetBy] = useState([]);

    
    useEffect(() => {
        // console.log("tweet id from page"+id);
        tweetShow(id).then(res => {
            // console.log("data returned from api"+res)
            setTweet(res);
        })
        commentListArray(id).then(res => {
            // console.log("comment list returned from api "+ res.commentId)

            if(res){
           res.commentId.map(commentId => {
                getComment(commentId).then(res => {
                    //  console.log( res)
                     setComments(prevComments => [...prevComments, res])
                })
              })
            } else {
                setComments(false);
            }
        })

        
        async function getByData (){
         const arrL = await getBy(id, "likeBy")
         const arrR = await getBy(id, "retweetBy")

        
        arrL && arrL.forEach(element => {
            userDataa(element).then( data=>
                setLikeBy(prev=>[...prev,data])
                )
        });

        arrR && arrR.forEach(element => {
            userDataa(element).then( data=>
                setretweetBy(prev=>[...prev,data])
                )
        });
       

        console.log(likeBy);

     }

     getByData();

        
    },[])

    if(likeBy){
        console.log(likeBy)
    }
    
    return (
        <div>
        TweetPage


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
  }, []);

  return (
    <div className="tweetpage">
    <Navbar />
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
        />
        {comments ? (
          comments.map((comment) => (

                <div>
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
            )) : <p>No comments</p> }

            {likeBy ? likeBy.map(profile=>(
                <div>
                    <h3>Liked By</h3>
                <LikeRetweetBy 
                    key={Math.random()}
                    profileImage={profile.profileImage}
                    displayName={profile.displayName}
                    verified={profile.verified}
                    userName={profile.username}
                />
                </div>
            )):
            <p>No Likes</p> }

{retweetBy ? retweetBy.map(profile=>(
    <div>
        <h3>Retweeted By</h3>
                <LikeRetweetBy 
                    key={Math.random()}
                    profileImage={profile.profileImage}
                    displayName={profile.displayName}
                    verified={profile.verified}
                    userName={profile.username}
                />
                </div>
            )):
            <p>No retweetss</p> }


            </div>
    )

}

export default TweetPage;
