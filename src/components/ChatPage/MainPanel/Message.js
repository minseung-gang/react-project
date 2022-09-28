import moment from "moment"
import React, { useState } from "react"

const Message = ({ message, user }) => {
  console.log(user, message)

  const isImage = () => {
    if (message) return message.image && !message.content
  }
  const isMessageMine = (message, user) => {
    return message.user.id === user.uid
  }

  const timeFromNow = (timestamp) => moment(timestamp).fromNow()
  return (
    <div>
      {isMessageMine(message, user) ? (
        <div className="currentUser_container user_container__mine">
          <div className="currentUser_name_wrapper">
            <div className="user_field">
              <span className="currentUser_time">
                {timeFromNow(message.timestamp)}
              </span>
              {isImage(message) ? (
                <img
                  style={{ maxWidth: "300px" }}
                  alt="이미지"
                  src={message.user.image}
                />
              ) : (
                <p className="user-chatbox">{message.content}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="currentUser_container user_container__not">
          <div className="currentUser_name_wrapper">
            <img className="user__img" alt="이미지" src={message.user.image} />
            <div className="user_field">
              <p className="currentUser_name">{message.user.name}</p>
              <div className="user_chat_container">
                <span className="currentUser_time">
                  {timeFromNow(message.timestamp)}
                </span>
                {isImage(message) ? (
                  <img
                    style={{ maxWidth: "300px" }}
                    alt="이미지"
                    src={message.user.image}
                  />
                ) : (
                  <p className="user-chatbox">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
