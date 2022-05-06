import { arrayUnion, arrayRemove, setDoc, updateDoc,increment } from "firebase/firestore";


// import { AppContext } from "./context";
import {
  // auth,
  db,
  getDoc,
  //  logout,
  doc,dbCollection
  //    getDocs,
} from "./firebase";

// send profile by user.uid
async function userData(user) {

  try {
    // console.log(user);


    const docRef = doc(db, "profile", user.uid || user)
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


    const docRef = doc(db, "profile", id)
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

  // console.log("userTweets ", id);
  // console.log("userTweets ", searchCollection);

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
    // console.log("commentListSnap does not exists", commentListSnap);
    // console.log("No comments")
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
    // console.log("ChatroomRef1 exists");
    // console.log("ChatroomRef1Snap ", ChatroomRef1Snap.data());
    await updateDoc(ChatroomRef1, {
      receiverUserName: arrayUnion(receiverName)
    })
  } else {
    // console.log("ChatroomRef1 does not exists");
    await userDataa(receiverId).then(data=>{
      setDoc(ChatroomRef1, {
        // myprofileimage: data.profileImage,
        myusername: userName,
        uid: userId,
        mydisplayname: data.displayName,
        receiverUserName: [receiverName],
    })

     
    })
  }


  const ChatroomRef2 = doc(db, "chatroom", receiverId);
  const ChatroomRef2Snap = await getDoc(ChatroomRef2);

  if (ChatroomRef2Snap.exists()) {
    // console.log("ChatroomRef2 exists");
    // console.log("ChatroomRef2Snap ", ChatroomRef2Snap.data());
    await updateDoc(ChatroomRef2, {
      receiverUserName: arrayUnion(userName)
    })
  } else {
    // console.log("ChatroomRef2 does not exists");
    await userDataa(receiverId)
      .then(data => {
        setDoc(ChatroomRef2, {
          // myprofileimage: data.profileImage,
          myusername: userName,
          uid: receiverId,
          mydisplayname: data.displayName,
          receiverUserName: [receiverName],
        })
      })
  }
}

async function getBy(tweetId, field) {
  const docRef = doc(db, field, tweetId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const arr = docSnap.data().uId;
    // console.log(arr);
    return arr;
  } else {
    return false;
  }
}

// follow code

async function followAddSub(follow, followBy) {
  const followRef = doc(db, "follow", follow);
  const followSnap = await getDoc(followRef);

  async function followAdd() {
    const userDoc = await doc(db, "profile", follow);
    const userDocSnap = await getDoc(userDoc);
    await updateDoc(userDoc, {
      followers: userDocSnap.data().followers + 1
    })

    const userDoc2 = await doc(db, "profile", followBy);
    const userDocSnap2 = await getDoc(userDoc2);
    await updateDoc(userDoc2, {
      followings: userDocSnap2.data().followings + 1
    })
  }

  async function followSub() {
    const userDoc = await doc(db, "profile", follow);
    const userDocSnap = await getDoc(userDoc);
    await updateDoc(userDoc, {
      followers: userDocSnap.data().followers - 1
    })

    const userDoc2 = await doc(db, "profile", followBy);
    const userDocSnap2 = await getDoc(userDoc2);
    await updateDoc(userDoc2, {
      followings: userDocSnap2.data().followings - 1
    })
  }

  if (followSnap.exists()) {
    // console.log("follow exists");
    // console.log("followSnap ", followSnap.data());

    if (followSnap.data().followBy.includes(followBy)) {
      await updateDoc(followRef, {
        followBy: arrayRemove(followBy)
      })
      await followSub();
    } else {
      await updateDoc(followRef, {
        followBy: arrayUnion(followBy)
      })
      await followAdd();
    }


  } else {
    // console.log("follow does not exists");
    await setDoc(followRef, {
      followBy: [followBy],
      follow: [],
    })
    await followAdd();
  }

  const followRef2 = doc(db, "follow", followBy);
  const followSnap2 = await getDoc(followRef2);

  if (followSnap2.exists()) {
    // console.log("follow exists");
    // console.log("followSnap2 ", followSnap2.data());

    if (followSnap2.data().follow.includes(follow)) {
      await updateDoc(followRef2, {
        follow: arrayRemove(follow)
      })
      // await followSub();
    } else {
      await updateDoc(followRef2, {
        follow: arrayUnion(follow)
      })
      // await followAdd();
    }
  } else {
    // console.log("follow does not exists");
    await setDoc(followRef2, {
      follow: [follow],
      followBy: [],
    })
    // await followAdd();


  }
}


// get profileImage
async function getProfileImage(id) {
  const docSnap = await getDoc(doc(db, "profileImage", id));
  return docSnap.data();
}


// add tweet 

function addTweet (docTweet){
  var docRef = dbCollection.collection('tweet').add(docTweet)
    .then((docRef) => {
      // console.log("Document successfully written!");

      // saving tweet document id inside tweet object 

      docRef.update({
        id: docRef.id
      })

      // adding number of tweets in profile

      updateDoc(doc(db, "profile", docTweet.uid), {
        numberOfTweets: increment(1)
      })

      // saving tweetId to Mytweet array collection with Id same as user id
      const mytweetsRef = doc(db, "mytweets", docTweet.uid);
      async function mytweets() {

        const mytweetsSnap = await getDoc(mytweetsRef);
        if (mytweetsSnap.exists()) {
          // console.log("mytweetsSnap exists");
          await updateDoc(mytweetsRef, {
            tweetId: arrayUnion(docRef.id)
          })
        } else {
          // console.log("mytweetsSnap does not exists", mytweetsSnap);
          await setDoc(mytweetsRef, {
            tweetId: [docRef.id]
          })
        }
      }
      mytweets();


    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// Notification 
async function setNotification (uid,type,from,message,tweet){
  // console.log("inside function")
  const docRef = doc(db, "notification", uid);
  const docSnap = await getDoc(docRef);
  const docUpdate = {
    type : type,
    from : from,
    message : message,
    tweet : tweet,
  }
  // console.log(docUpdate)
  if (docSnap.exists()) {
    // console.log("notification exists");
    // console.log("notificationSnap ", docSnap.data());
    await updateDoc(docRef, {
      noti: arrayUnion(docUpdate)
    }).then(() => {
      // console.log("Updated")
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  } else {
    // console.log("notification does not exists");
    await setDoc(docRef, {
      noti: [docUpdate]
    })
    .then(() => {
      // console.log("Updated")
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    }
    );
  }

}

async function getNotification (id){
  const docSnap = await getDoc(doc(db, "notification", id));
  return docSnap.data();
}


export {setNotification,getNotification, getBy,addTweet, getProfileImage, followAddSub, userData, userTweets, tweetShow, commentListArray, getComment, getChatroom, addUserChatRoom, userDataa };
