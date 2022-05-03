import React from "react";
import { useNavigate } from "react-router-dom";
import "./Chats.css";

function Chats({ receiver, sender }) {
  const navigate = useNavigate();

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
        {receiver}{" "}
      </div>
    </button>
  );
}

export default Chats;
