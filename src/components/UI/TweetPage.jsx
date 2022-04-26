import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {tweetShow} from '../../apiFunction'
import TweetOrPost from './TweetOrPost';
import {commentListArray, getComment} from "../../apiFunction"
import CommentShow from './CommentShow';



function TweetPage() {

    const {id} = useParams();
    
    const [tweet, setTweet] = useState({});
    const [comments, setComments] = useState([]);
    
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
    },[])
    
    return (
        <div>
        TweetPage

    <TweetOrPost
              key={tweet.id}
              id = {tweet.id}
              displayName={tweet.displayName}
              userName={tweet.userName}
              comments = {tweet.comments}
              likes = {tweet.likes}
              retweets = {tweet.retweets}
              tweet = {tweet.tweet}
              verified = {tweet.verified} 
              profileImage= {tweet.profileImage}
              navigateTo = {false}
            />

            {comments ? comments.map(comment => (
            // {comments.map(comment => (
                
                <CommentShow
                    key={comment.id}
                    profileImage={comment.profileImage}
                    displayName={comment.displayName}
                    userName={comment.userName}
                    verified={comment.verified}
                    comment={comment.comments}

                />
            )) : <p>No comments</p> }
            </div>
    )
  
}

export default TweetPage