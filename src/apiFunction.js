import { arrayUnion, setDoc, updateDoc } from "firebase/firestore";
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

// send profile by user.uid
async function userData(user) {

  try {
    // console.log(user);


    const docRef = doc(db, "profile", user.uid || user )
    const docSnap = await getDoc(docRef);

    // console.log("user Info ", docSnap.data());
    const docData = docSnap.data();
    //   setUserInfo(docData);
    // console.log("From function ", docData)
    return docData;
  } catch (e) {
    console.log(e);
  }
};

// get user data by id

async function userDataa(id) {

  try {
    // console.log(user);


    const docRef = doc(db, "profile", id )
    const docSnap = await getDoc(docRef);

    // console.log("user Info ", docSnap.data());
    const docData = docSnap.data();
    //   setUserInfo(docData);
    // console.log("From function ", docData)
    return docData;
  } catch (e) {
    console.log(e);
  }
};




// send tweetId array
async function userTweets(id, searchCollection) {

  console.log("userTweets ", id);
  console.log("userTweets ", searchCollection);

  try {

    const docRef = doc(db, searchCollection, id)
    const docSnap = await getDoc(docRef);

    // console.log("user tweets ", docSnap.data());
    const docData = docSnap.data();

    return docData;
  } catch (e) {
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
  } catch (e) {
    console.log(e);
  }
};

// get commentId array
async function commentListArray(tweetId) {
  const commentRef = doc(db, "commentList", tweetId);
  const commentListSnap = await getDoc(commentRef);

  if (commentListSnap.exists()) {
    // console.log("commentListSnap exists");
    // console.log("commentListSnap ", commentListSnap.data());
    return commentListSnap.data();
  } else {
    console.log("commentListSnap does not exists", commentListSnap);
    console.log("No comments")
    return false;
  }
}

// get comment
async function getComment(id) {
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


// get chatroom
async function getChatroom(id) {
  const chatroomRef = doc(db, "chatroom", id);
  const chatroomSnap = await getDoc(chatroomRef);

  if (chatroomSnap.exists()) {
    // console.log("chatroom exists");
    // console.log("chatsnap ", chatroomSnap.data());
    return chatroomSnap.data();
  } else {
    // console.log("chatroom does not exists",chatroomSnap);
    // console.log("No comments")
    return false;
  }
}

// add user names to chatroom db
async function addUserChatRoom(userId, receiverId, userName, receiverName) {
  const ChatroomRef1 = doc(db, "chatroom", userId);
  const ChatroomRef1Snap = await getDoc(ChatroomRef1);

  if (ChatroomRef1Snap.exists()) {
    console.log("ChatroomRef1 exists");
    console.log("ChatroomRef1Snap ", ChatroomRef1Snap.data());
    await updateDoc(ChatroomRef1, {
      receiverUserName: arrayUnion(receiverName)
    })
  } else {
    console.log("ChatroomRef1 does not exists");
    await userDataa(userId)
      .then(data => {
        setDoc(ChatroomRef1, {
          myprofileimage: data.profileImage,
          myusername: userName,
          receiverUserName: [receiverName],
        })
      })
  }


  const ChatroomRef2 = doc(db, "chatroom", receiverId);
  const ChatroomRef2Snap = await getDoc(ChatroomRef2);

  if (ChatroomRef2Snap.exists()) {
    console.log("ChatroomRef2 exists");
    console.log("ChatroomRef2Snap ", ChatroomRef2Snap.data());
    await updateDoc(ChatroomRef2, {
      receiverUserName: arrayUnion(userName)
    })
  } else {
    console.log("ChatroomRef2 does not exists");
    await userDataa(receiverId)
      .then(data => {
        console.log(data)
        setDoc(ChatroomRef2, {
          myprofileimage: data.profileImage,
          myusername: receiverName,
          receiverUserName: [userName],
        })
      })
  }


}

export { userData, userTweets, tweetShow, commentListArray, getComment, getChatroom, addUserChatRoom };