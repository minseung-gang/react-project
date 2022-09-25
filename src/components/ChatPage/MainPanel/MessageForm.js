import React, { useState, useEffect, useRef } from "react"
import ProgressBar from "../../../commons/components/ProgressBar"
/* import firebase from "firebase" */
import { HiArrowCircleRight } from "react-icons/hi"
import { FaUpload } from "react-icons/fa"
import * as firebase from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { useSelector } from "react-redux"
import { realtimeDbService, dbService } from "../../../firebase"
import { getDatabase, ref, set, push } from "firebase/database"
const MessageForm = () => {
  const [completed, setCompleted] = useState(0)
  const [keyPress, setKeyPress] = useState(false)
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const countInterval = useRef(null)
  const chatRoom = useSelector((state) => state.ChatRooms.currentChatRoom)
  const user = useSelector((state) => state.user.currentUser)

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
    if (!content) {
      setErrors((prev) => prev.concat("내용을 입력해주세요."))
      return
    }
    setLoading(true)

    try {
      const db = getDatabase()
      const messageRef = ref(db, "messages/" + chatRoom.id)
      /*      await set(ref(messageRef), createMessage()) */
      await set(push(messageRef), createMessage())
      setLoading(false)
      setContent("")

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
            <FaUpload />
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
    </div>
  )
}

export default MessageForm
