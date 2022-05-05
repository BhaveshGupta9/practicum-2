import React,{useContext, useEffect, useState} from 'react'
import { AppContext } from ".././context";
import "./Chat.css"
import { getProfileImage } from "../apiFunction"
import alex from "./alex.jpg";




function ChatMessage(props) {
 
  const { profile } = useContext(AppContext);
  const [url,setUrl] = useState(null)
  const [messageClass, setClass] = useState(props.message.uid === profile.uid ? 'sent' : 'received')

  useEffect(() => {
    async function image(){
    await getProfileImage(props.message.uid).then(data=>setUrl(data.image))
    } 
    image();
  
    
  }, [])
  
    
  
    return (<>
      <div className={`message ${messageClass}`}  
        style={{marginBottom: props.last ? '10px' : '0'}}
       >
        <img className='imgChat' src={url ? url : alex } alt="dp" />
        {/* <embed>{props.messaga.name}</embed> */}
        <p className='pChat' >{props.message.text}</p>
      </div>
    </>)
  }

export default ChatMessage