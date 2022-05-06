import React, { Fragment } from "react";
import "./Notification.css";

const Notification = ({props}) => {
  console.log("props",props)
  return (
    <Fragment>
      <div class="notif-main">
        <div className="notif-left">
          <img src={props.imageAdd} alt={props.altText} />
        </div>
        <div className="notif-middle">
          <h3>{props.type}</h3>
          <p><b>{props.message}</b> {props.from} </p>
          {props.tweet && <p>{props.tweet}</p> }
        </div>
        <div className="notif-right">
          {/* <p>{props.time}</p> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Notification;
