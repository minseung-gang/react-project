import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Message from "./Message"

import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  query,
  orderByChild,
  onValue,
} from "firebase/database"
import MessageForm from "./MessageForm"
import MessageHeader from "./MessageHeader"

const MainPanel = () => {
  const chatRoom = useSelector((state) => state.ChatRooms.currentChatRoom)
  const user = useSelector((state) => state.user.currentUser)
  const [messages, setMessages] = useState([])

  const [messageLoading, setMessageLoading] = useState(true)
  const db = getDatabase()

  const addMessageListener = (chatRoomId) => {
    let messageArray = []
    setMessages([])
    const messagesRef = ref(db, `messages/${chatRoomId}`)

    onChildAdded(messagesRef, (snapshot) => {
      const childData = snapshot.val()

      messageArray.push(childData)
      console.log("value Array", messageArray)
      setMessages(messageArray)

      setMessageLoading(false)
    })
    console.log(messages)
  }

  const renderMessages = (messages) =>
    messages.length >= 0 &&
    messages.map((messages) => (
      <Message
        key={messages.timestamp}
        message={messages}
        user={messages.user}
      />
    ))

  useEffect(() => {
    if (chatRoom) {
      addMessageListener(chatRoom.id)
    }
    return () => {}
  }, [])
  return (
    <div className="mainPanel-inner">
      <MessageHeader />
      <div className="message-box">{renderMessages(messages)}</div>
      <MessageForm />
    </div>
  )
}

export default MainPanel
