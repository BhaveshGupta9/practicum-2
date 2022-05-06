import React, { useContext, useState, useEffect } from "react";

import { getChatroom, getProfileImage } from ".././apiFunction";
import { AppContext } from ".././context";
import Chats from "./Chats";
import Navbar from "../components/GeneralComponents/Navbar";
import "./ChatRoom.css";
import alex from "./alex.jpg";

function ChatRoom() {
  const { profile } = useContext(AppContext);

  const [chatrooms, setchatrooms] = useState({});
  const [url, setUrl] = useState(null);
  // const [arr, setArr] =useState([chatrooms.receiverUserName])

  useEffect(() => {
    async function callChatroom() {
      await getChatroom(profile.uid).then((res) => {
        // console.log("chatroom from api", res);
        setchatrooms(res);
      });

      await getProfileImage(profile.uid).then((data) => setUrl(data.image));
    }
    callChatroom();
  }, []);

  const [heading, setheading] = useState("Loading...");
  if (chatrooms.receiverUserName === undefined) {
    setTimeout(() => {
      setheading("No chat room available. Message someone first.");
    }, 3000);
    return (
      <div>
        <h1>{heading}</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className="main-page">
        <div>
          <h1 className="h1">Say "Hi"</h1>
        </div>
        <div className="chatroom">
          <div className="my-chat-profile">
            <img
              alt="profile_pic"
              src={url ? url : alex}
              height="50px"
              width="50px"
              className="profile-pic-chatroom"
            />{" "}
            <span> {profile.displayName}</span>
          </div>
          <div>
            <h1 className="my-chats">My Chats</h1>
          </div>
          <div className="all-my-chats">
            {chatrooms.receiverUserName.map((rec) => {
              return (
                <Chats key={rec} receiver={rec} sender={profile.username} />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatRoom;
