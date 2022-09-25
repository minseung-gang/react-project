import moment from "moment"
import React, { useState } from "react"

const Message = ({ message, user }) => {
  console.log(message)

  const isImage = () => {
    if (message) return message.image && !message.content
  }

  const timeFromNow = (timestamp) => moment(timestamp).fromNow()
  return (
    <div className="currentUser_container">
      {
        <img
          className="currentUser__img"
          style={{ maxWidth: "60px", maxHeight: "60px" }}
          src={message.user.image}
          alt={message.user.name}
        />
      }
      <div className="currentUser_name_wrapper">
        <div className="currentUser_name_field">
          {<p className="currentUser_name"> {message.user.name}</p>}
          <span className="currentUser_time">
            {timeFromNow(message.timestamp)}
          </span>
        </div>

        {isImage(message) ? (
          <img
            style={{ maxWidth: "300px" }}
            alt="이미지"
            src={message.user.image}
          />
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  )
}

export default Message
