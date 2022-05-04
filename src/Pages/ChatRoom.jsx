import React, { useContext, useState, useEffect } from "react";

import { getChatroom } from ".././apiFunction";
import { AppContext } from ".././context";
import Chats from "./Chats";
import Navbar from "../components/GeneralComponents/Navbar";
import "./ChatRoom.css";

function ChatRoom() {
  const { profile } = useContext(AppContext);

  const [chatrooms, setchatrooms] = useState({});
  // const [arr, setArr] =useState([chatrooms.receiverUserName])

  useEffect(() => {
    async function callChatroom() {
      const chatroom = await getChatroom(profile.uid).then((res) => {
        console.log("chatroom from api", res);
        setchatrooms(res);
      });
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
              src={chatrooms.myprofileimage}
              height="50px"
              width="50px"
              className="profile-pic-chatroom"
            />{" "}
            <span> {chatrooms.myusername}</span>
          </div>
          <div>
            <h1 className="my-chats">My Chats</h1>
          </div>
          {chatrooms.receiverUserName.map((rec) => {
            return <Chats key={rec} receiver={rec} sender={profile.username} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatRoom;
