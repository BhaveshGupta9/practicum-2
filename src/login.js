

import { auth, db,GoogleAuthProvider,

  signInWithPopup,
  signOut,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc, } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth"




const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // console.log(user)
    const q = query(collection(db, "profile"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {

      const profileRef = doc(db,"profileImage",user.uid)
      const docSnap = await setDoc(profileRef,{
        image: user.photoURL
      })

      await setDoc(doc(db, "profile", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        username: user.email.split("@")[0],
        verified: true,
        // profileImage: user.photoURL,
        userBio: "To be filled by user",
        numberOfTweets: 0,
        followers: 0,
        followings: 0,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  console.log("User signout")
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  collection,
  doc,
  getDocs,
};

