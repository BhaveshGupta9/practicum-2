import React,{useContext, useEffect} from 'react'
import { AppContext } from ".././context";
import "./Chat.css"


function ChatMessage(props) {
 
  const { profile } = useContext(AppContext);
  // useEffect(()=>{

  //   console.log(props.message);
  // },[]);

    // const { text, uid, profileImage } = messaga.message;
    // console.log(profile.uid);
    // console.log(messaga.uid);
  
    const messageClass = props.message.uid === profile.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}  
        style={{marginBottom: props.last ? '10px' : '0'}}
       >
        <img className='imgChat' src={props.message.dp } alt="dp" />
        {/* <embed>{props.messaga.name}</embed> */}
        <p className='pChat' >{props.message.text}</p>
      </div>
    </>)
  }

export default ChatMessage