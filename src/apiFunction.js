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


async function userData(user) {

    try {
      console.log(user);


      const docRef = doc(db, "profile", user.uid)
      const docSnap = await getDoc(docRef);

      console.log("user Info ", docSnap.data());
      const docData = docSnap.data();
    //   setUserInfo(docData);
        console.log("From function ", docData)
        return docData;
    } catch(e){
      console.log(e);
    }
  };

  export { userData };