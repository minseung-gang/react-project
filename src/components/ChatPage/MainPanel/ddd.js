import React, { useState, useEffect, useRef } from "react"
import ProgressBar from "../../../commons/components/ProgressBar"
import { HiArrowCircleRight } from "react-icons/hi"
import { FaUpload } from "react-icons/fa"
import { useSelector } from "react-redux"
import { getDatabase, ref as ref_database, set, push } from "firebase/database"
import { ref as ref_storage, getDownloadURL } from "firebase/storage"
import { async } from "@firebase/util"
import { authService, storage, realtimeDbService } from "../../../firebase"

import "../../../asset/chat.css"

import { setPhotoURL } from "../../../redux/action/user_action"
import { updateProfile } from "firebase/auth"
const MessageForm = (props) => {
  const [completed, setCompleted] = useState(0)
  const [keyPress, setKeyPress] = useState(false)
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const countInterval = useRef(null)
  const chatRoom = useSelector((state) => state.ChatRooms.currentChatRoom)
  const user = useSelector((state) => state.user.currentUser)
  const inputOpenImageRef = useRef()

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click()
  }

  const handleUploadImg = async (event) => {
    const file = event.target.files[0]

    try {
      // 스토리지에 파일 저장하기
      const storageRef = ref_storage(storage, `message/ddd.jpg`)
      alert()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setKeyPress(true)
    } else {
      setKeyPress(false)
    }
    setContent(e.target.value)
  }

  useEffect(() => {
    if (completed >= 100) {
      setCompleted(0)
      clearInterval(countInterval)
    }
  }, [completed])

  const createMessage = (fileURL = null) => {
    const message = {
      timestamp: Date(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    }

    if (fileURL !== null) {
      message["image"] = fileURL
    } else {
      message["content"] = content
    }
    return message
  }

  const handleSubmit = async (e) => {
    const { render } = props
    if (!content) {
      setErrors((prev) => prev.concat("내용을 입력해주세요."))
      return
    }
    setLoading(true)

    try {
      const db = getDatabase()
      const messageRef = ref_database(db, "messages/" + chatRoom.id)
      await set(push(messageRef), createMessage())
      setLoading(false)
      setContent("")
      render()
      setErrors([])
    } catch (error) {
      setErrors((prev) => prev.concat(error.message))
      setTimeout(() => {
        setErrors([])
      }, 5000)
      setLoading(false)
    }
  }
  return (
    <div className="panel-container">
      <form onSubmit={handleSubmit} className="message-form-field">
        <div className="message-form-inner">
          <div className="upload-container">
            <FaUpload onClick={handleOpenImageRef} />
          </div>
          <textarea value={content} onChange={handleChange}></textarea>

          {keyPress && (
            <div className="submit-btn" onClick={handleSubmit}>
              <HiArrowCircleRight />
            </div>
          )}
          {}
        </div>
        <ProgressBar bgcolor={"#e66363"} completed={completed} />
        <div>
          {errors.map((Message) => (
            <p key={Message}>{Message}</p>
          ))}
        </div>
      </form>
      <input
        type="file"
        onChange={handleUploadImg}
        ref={inputOpenImageRef}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default MessageForm
