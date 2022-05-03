import React, { useRef, useState, useContext, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { useParams } from "react-router-dom";
import Navbar from "../components/GeneralComponents/Navbar";

import {
  //  auth,
  db,
  dbCollection,
  getDocs,
  // logout,
  doc,
  // getDocs,
  onSnapshot,
  query,
  addDoc,
  collection,
  orderBy,
  firebase,
  limit,
} from "../firebase";
import { AppContext } from ".././context";

function Chat() {
  const { collect } = useParams();

  useEffect(() => {
    console.log(collect);
  }, []);

  const { profile } = useContext(AppContext);
  // console.log(profile)

  const [messages, setMessages] = useState([]);

  const q = query(
    collection(db, "message" + collect),
    orderBy("createdAt"),
    limit(25)
  );

  const me = onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map((doc) => doc.data()));
  });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // console.log(e)
    // const { uid, profileImage } ={profile};
    // console.log(uid);
    // console.log(profile)

    console.log(formValue);
    console.log(profile.uid);
    console.log(profile.profileImage);
    console.log(profile.displayName);

    const dpcRef = await dbCollection.collection("message" + collect).add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: profile.uid,
      dp: profile.profileImage,
      name: profile.displayName,
    });

    // console.log(dpcRef.id);

    setFormValue("");
  };

  // if(messages.length === 0){
  //   return (
  //     <h1>no message</h1>
  //   )
  // }

  return (
    <React.Fragment>
      <Navbar />
      <div className="main-page">
        <div>
          <h1 className="wassup">wassup!</h1>
        </div>
        <div className="main">
          <div style={{ marginBottom: "50px" }}>
            {messages.length &&
              messages.map((msg) => (
                // console.log(msg) &&
                <ChatMessage
                  key={msg.createdAt}
                  message={msg}
                  last={msg === messages[messages.length - 1]}
                />
              ))}
          </div>

          <form className="formChat" onSubmit={sendMessage}>
            <input
              className="inputChat"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice"
            />

            <button className="s" type="submit" disabled={!formValue}>
              <p>Send</p>
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chat;
