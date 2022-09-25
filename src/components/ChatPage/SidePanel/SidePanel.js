import React from "react"
import UserPanel from "./UserPanel"
import Favorited from "./Favorited"
import ChatRooms from "./ChatRooms"
import DirectMessages from "./DirectMessages"


const SidePanel = () => {
  return (
    <div className="sidePanel-inner">
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  )
}

export default SidePanel
