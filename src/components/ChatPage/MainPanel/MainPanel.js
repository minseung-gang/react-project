import React, { useEffect, useState, useRef } from "react"
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
  const [render, setRender] = useState(false)
  const [messageLoading, setMessageLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const db = getDatabase()

  const handleSearchMessages = () => {
    const chatRoomsArray = [...messages]
    const regex = new RegExp(searchTerm, "gi") // 정규표현식 https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions 참고
    const resultMessages = chatRoomsArray.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message)
      }
      return acc
    }, [])``
    setSearchResult(resultMessages)
    setTimeout(() => {
      setMessageLoading(false)
    }, 1000)
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
    setSearchLoading(true)
    handleSearchMessages()
  }
  const addMessageListener = (chatRoomId) => {
    let messageArray = []
    setMessages([])
    const messagesRef = ref(db, `messages/${chatRoomId}`)

    onChildAdded(messagesRef, (snapshot) => {
      const childData = snapshot.val()
      messageArray.push(childData)
      setMessages(messageArray)
      setMessageLoading(false)
    })
  }
  const renderPage = () => {
    setRender(!render)
  }
  const renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((messages) => (
      <Message key={messages.timestamp} message={messages} user={user} />
    ))

  useEffect(() => {
    if (chatRoom) {
      addMessageListener(chatRoom.id)
    }
    return () => {}
  }, [])
  return (
    <div className="mainPanel-inner">
      <MessageHeader handleSearch={handleSearch} />
      <div className="message-box">
        {searchTerm ? renderMessages(searchResult) : renderMessages(messages)}
      </div>
      <MessageForm render={renderPage} />
    </div>
  )
}

export default MainPanel
