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
  async function userTweets(id) {

    try {

      const docRef = doc(db, "mytweets", id)
      const docSnap = await getDoc(docRef);

      // console.log("user tweets ", docSnap.data());
      const docData = docSnap.data();

        return docData;
    } catch(e){
      console.log(e);
    }
  };

  // send tweet 
  async function tweetShow(id) {

    try {
   


      const docRef = doc(db, "tweet", id)
      const docSnap = await getDoc(docRef);

      // console.log("user tweets ", docSnap.data());
      const docData = docSnap.data();

        return docData;
    } catch(e){
      console.log(e);
    }
  };


  export { userData, userTweets, tweetShow };