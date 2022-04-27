import React from "react";

// import { AppContext } from "./context";
import { 
    // auth,
   db,
    getDoc,
    //  logout,
      doc,
    //    getDocs,
 } from "./firebase";

// send profile
async function userData(user) {

    try {
      // console.log(user);


      const docRef = doc(db, "profile", user.uid)
      const docSnap = await getDoc(docRef);

      // console.log("user Info ", docSnap.data());
      const docData = docSnap.data();
    //   setUserInfo(docData);
        // console.log("From function ", docData)
        return docData;
    } catch(e){
      console.log(e);
    }
  };


  // send tweetId array
  async function userTweets(id,searchCollection) {

    console.log("userTweets ", id);
    console.log("userTweets ", searchCollection);

    try {

      const docRef = doc(db, searchCollection, id)
      const docSnap = await getDoc(docRef);

      // console.log("user tweets ", docSnap.data());
      const docData = docSnap.data();

        return docData;
    } catch(e){
      console.log(e);
    }
  };

  // get tweet 
  async function tweetShow(id) {
    // console.log("tweet id from api"+id);
    try {
   
      const docRef = doc(db, "tweet", id)
      const docSnap = await getDoc(docRef);

      // console.log("user tweets ", docSnap.data());
      const docData = docSnap.data();
        // console.log("tweet show ", docData);
        return docData;
    } catch(e){
      console.log(e);
    }
  };

  // get commentId array
 async function commentListArray (tweetId){
  const commentRef = doc(db, "commentList", tweetId);
  const commentListSnap = await getDoc(commentRef);

  if (commentListSnap.exists()) {
    // console.log("commentListSnap exists");
    // console.log("commentListSnap ", commentListSnap.data());
    return commentListSnap.data();
  } else {
    console.log("commentListSnap does not exists",commentListSnap);
    console.log("No comments")
    return false;
  }
 }

  // get comment
  async function getComment (id){
    const commentRef = doc(db, "comment", id);
    const commentSnap = await getDoc(commentRef);

    // if (commentSnap.exists()) {
      // console.log("commentSnap exists");
      // console.log("commentSnap ", commentSnap.data());
      return commentSnap.data();
    // } else {
    //   console.log("commentSnap does not exists",commentSnap);
    //   console.log("No comments")
    //   return false;
    // }
  }

  export { userData, userTweets, tweetShow, commentListArray, getComment };