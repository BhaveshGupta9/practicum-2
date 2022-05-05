import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chats.css";
import { getProfileImage } from "../apiFunction"
import {
  //  auth, 
  setDoc,
  getDoc,
  // logout, 
  where,
  doc,
  db,
  updateDoc, arrayUnion, arrayRemove
  // getDocs,
} from "../firebase";
import { collection, query,getDocs } from "firebase/firestore";

function Chats({ receiver, sender }) {
  const navigate = useNavigate();
  const [displayname, setdisplay] = useState("")
  const [url,setUrl] = useState(null)
  const [uid,setuid] = useState(null)


  useEffect(() => {
    async function receiverdata() {
      const q = query(collection(db, "profile"), where("username", "==", receiver));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setdisplay(doc.data().displayName)
        setuid(doc.id);
      });
      const a= await getProfileImage(uid).then(data=>setUrl(data.image))

    }
    receiverdata();

  },[])

  function divClick() {
    const arr = [receiver, sender];
    arr.sort(function (a, b) {
      return a.localeCompare(b);
    });

    navigate("/chat/" + arr[0] + arr[1]);
  }

  return (
    <button
      className="btn-profile"
      onClick={divClick}
      value={receiver}
    >
      <div
        className="chat-user"
        style={{
          height: "50px",
          width: "100px",
        }}
      >
        <img
              alt="profile_pic"
              src={url ? url : "https://cdn.motor1.com/images/mgl/mrz1e/s3/coolest-cars-feature.webp"}
              height="50px"
              width="50px"
              className="profile-pic-chatroom"
            />
        {displayname}{" "}
      </div>
    </button>
  );
}

export default Chats;
