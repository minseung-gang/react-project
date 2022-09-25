import React from "react"
import SidePanel from "./SidePanel/SidePanel"
import MainPanel from "./MainPanel/MainPanel"
import "../../asset/chat.css"
import { useSelector } from "react-redux"

const ChatPage = () => {
  const currentChatRoom = useSelector(
    (state) => state.ChatRooms.currentChatRoom
  )

  return (
    <div className="chat-wrapper">
      <div className="sidePanel-wrapper">
        <SidePanel />
      </div>
      <div className="mainPanel-wrapper">
        <MainPanel key={currentChatRoom && currentChatRoom.id} />
      </div>
    </div>
  )
}

export default ChatPage
