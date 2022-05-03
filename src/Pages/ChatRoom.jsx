import React, { useContext, useState, useEffect } from 'react'

import { getChatroom } from ".././apiFunction";
import { AppContext } from ".././context";
import Chats from './Chats';



function ChatRoom() {

    const { profile } = useContext(AppContext);

    const [chatrooms, setchatrooms] = useState({});
    // const [arr, setArr] =useState([chatrooms.receiverUserName])



    useEffect(() => {
        async function callChatroom() {
           
         const chatroom = await getChatroom(profile.uid)
            .then (res => {

                console.log("chatroom from api",res)
                setchatrooms(res);
                
            })

           
        }
        callChatroom();

    }, [])



    const [heading,setheading] = useState("Loading...")
    if (chatrooms.receiverUserName === undefined) {
        setTimeout(()=>{
           setheading("No chat room available. Message someone first.")
        }, 3000)
        return (
            <div>
                <h1>{heading}</h1>
            </div>
        )
    }

    return (

        <div>ChatRoom
            <div >
                <img
                    alt="profile_pic"
                    src={chatrooms.myprofileimage}
                    height="50px"
                    width="50px"

                /> <span>    {chatrooms.myusername}</span>
            </div>

            {/* something */}
            {chatrooms.receiverUserName.map((rec) => {

               return   <Chats key={rec} receiver={rec} sender={profile.username}  />

                
            })}

        </div>
    )
}

export default ChatRoom