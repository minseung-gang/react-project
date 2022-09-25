import React, { useState } from "react"

import { MdClose } from "react-icons/md"
import "../../../asset/modal.css"
import { useSelector } from "react-redux"
import { getDatabase, ref, push, set, update } from "firebase/database"
import { async } from "@firebase/util"

const Modal = (props) => {
  const { open, close } = props
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const user = useSelector((state) => state.user.currentUser)
  const handleSubmit = (e) => {
    e.preventDefault()

    const isFormValid = (name, description) => name && description // name과 description 이 true이면 된다는 유효성체크 */

    if (isFormValid(name, description)) {
      addChatRoom()
    }
  }

  const addChatRoom = async () => {
    const db = getDatabase()
    const chatRoomRef = ref(db, "chatRooms")
    const key = push(chatRoomRef).key

    try {
      await update(ref(db, `chatRooms/${key}`), {
        id: key,
        name: name,
        description: description,
        createdBy: {
          name: user.displayName,
          image: user.photoURL,
        },
      })
      setName("")
      setDescription("")
      close()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {open == true && (
        <div className={open ? "openModal addRoomsModal" : "addRoomsModal"}>
          <section>
            <div className="curtain"></div>
            <div className="addRoomsModal-inner">
              <div className="Modal-header">
                <p>create chat room</p>
                <MdClose
                  onClick={close}
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div className="Modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="modal-body-conatiner">
                    <div className="section-tit">
                      <p>방 이름</p>
                      <input
                        name="name"
                        type="text"
                        placeholder="방 이름을 적어주세요."
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="section-tit">
                      <p>방 설명</p>
                      <input
                        name="description"
                        type="text"
                        placeholder="방에 대한 설명을 적어주세요."
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="Modal-footer">
                <input
                  className="button__cancle"
                  type="button"
                  onClick={close}
                  value="취소"
                />

                <input
                  className="button__create"
                  type="submit"
                  value="생성"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Modal
