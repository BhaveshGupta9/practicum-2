import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chats.css";
import { getProfileImage } from "../apiFunction";
import alex from "./alex.jpg";

import {
  //  auth,

  // logout,
  where,
  db,

  // getDocs,
} from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

function Chats({ receiver, sender }) {
  const navigate = useNavigate();
  const [displayname, setdisplay] = useState("");
  const [url, setUrl] = useState(null);
  const [uid, setuid] = useState(null);

  useEffect(() => {
    async function receiverdata() {
      const q = query(
        collection(db, "profile"),
        where("username", "==", receiver)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setdisplay(doc.data().displayName);
        setuid(doc.id);
      });
      await getProfileImage(uid).then((data) => setUrl(data.image));
    }
    receiverdata();
  }, []);

  function divClick() {
    const arr = [receiver, sender];

    arr.sort(function (a, b) {
      return a.localeCompare(b);
    });

    navigate("/chat/" + arr[0] + arr[1], { state: { receiverId: uid } });
  }

  return (
    <button className="btn-profile" onClick={divClick} value={receiver}>
      <div
        className="chat-user"
        style={{
          height: "50px",
          width: "100px",
        }}
      >
        <div className="chat-user-name">
          <img
            alt="profile_pic"
            src={url ? url : alex}
            height="50px"
            width="50px"
            className="profile-pic-chatroom"
          />
          <div>{displayname}</div>{" "}
        </div>
      </div>
    </button>
  );
}

export default Chats;
