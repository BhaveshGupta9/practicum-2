import React, { useRef, useState, useContext, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/GeneralComponents/Navbar";
import {  getProfileImage, setNotification } from "../apiFunction"


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
  const location = useLocation();
  const receiverId = location.state.receiverId;
  // console.log(receiverId);
 
  useEffect(() => {
    // console.log(collect);
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
  // const [url,setUrl] = useState(null)


  const sendMessage = async (e) => {
    e.preventDefault();
  
    // await getProfileImage(profile.uid).then(data=>setUrl(data.image))


    const dpcRef = await dbCollection.collection("message" + collect).add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: profile.uid,
      // dp: profile.profileImage,
      name: profile.displayName,
    });

    async function notification() {

      await setNotification(receiverId, "chat", profile.displayName, "You have a new message from ", null)
    }
    notification();
    
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
