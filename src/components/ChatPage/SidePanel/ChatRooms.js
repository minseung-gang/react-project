import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { doc, deleteDoc } from "firebase/firestore"
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database"
import "../../../asset/chat.css"
import Modal from "../../../commons/components/Modals/Modal"
import { FiSmile } from "react-icons/fi"
import { FaPlus } from "react-icons/fa"
import { authService } from "../../../firebase"
import { map } from "@firebase/util"
import { setCurrentChatRooms } from "../../../redux/action/chatRooms_action"
const ChatRooms = () => {
  let chatRoomsArray = []

  const dispatch = useDispatch()
  const [activeChatRoomId, setActiveChatRoomId] = useState("")
  const [firstLoad, setFirstLoad] = useState(true)
  const [chatRooms, setChatRooms] = useState([])
  const db = getDatabase()
  const commentsRef = ref(db, `chatRooms`)

  const AddChatRoomsListener = () => {
    onChildAdded(commentsRef, (snapshot) => {
      chatRoomsArray.push(snapshot.val())

      setChatRooms(chatRoomsArray)

      setFirstChatRoom()
    })
    console.log("chatroom", chatRooms)
    // ChatRoom 리스트 나열하기
  }
  const setFirstChatRoom = () => {
    const firstChatRoom = chatRoomsArray[0]

    if (chatRoomsArray.length > 0 && firstLoad) {
      dispatch(setCurrentChatRooms(firstChatRoom))
      console.log(firstChatRoom.id)
      setActiveChatRoomId(firstChatRoom.id)
    }

    setFirstLoad(false)
  }
  const changeChatRooms = (chatRoom) => {
    dispatch(setCurrentChatRooms(chatRoom))
    setActiveChatRoomId(chatRoom.id)
  }
  // ChatRoom 리스트 클릭시 안에 채팅창 데이터 바꿔주기
  useEffect(() => {
    AddChatRoomsListener()
  }, [])

  const [modalOpen, setModalOpen] = useState("false")

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="panel-container">
      <div className="flex" style={{ gap: "0 5px", position: "relative" }}>
        <FiSmile /> ChatRooms
        <FaPlus
          style={{
            position: "absolute",
            right: "0px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={openModal}
        />
        <Modal open={modalOpen} close={closeModal} />
      </div>
      <ul style={{ padding: "0 10px" }}>
        {chatRooms.length > 0 &&
          chatRooms.map((room) => (
            <li
              onClick={() => changeChatRooms(room)}
              style={{
                cursor: "pointer",
                padding: "5px",
                margin: "5px 0",
                backgroundColor:
                  room.id === activeChatRoomId && "rgba(74,75,81)",
              }}
              key={room.id}
            >
              #{room.name}
            </li>
          ))}
      </ul>
    </div>
  )
}
export default ChatRooms
