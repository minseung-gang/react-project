import React, { useState, useEffect, useRef } from "react"
import ProgressBar from "../../../commons/components/ProgressBar"
import { HiArrowCircleRight } from "react-icons/hi"
import { FaUpload } from "react-icons/fa"
import { useSelector } from "react-redux"
import { getDatabase, ref as ref_database, set, push } from "firebase/database"
import {
  ref as ref_storage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import { async } from "@firebase/util"
import { authService, storage, realtimeDbService } from "../../../firebase"

const MessageForm = (props) => {
  const [completed, setCompleted] = useState(0)
  const [keyPress, setKeyPress] = useState(false)
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const { render } = props
  const countInterval = useRef(null)
  const chatRoom = useSelector((state) => state.ChatRooms.currentChatRoom)
  const user = useSelector((state) => state.user.currentUser)
  const inputOpenImageRef = useRef()

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click()
  }

  const handleUploadImg = async (event) => {
    const file = event.target.files[0]
    if (file == null) return
    try {
      // 스토리지에 파일 저장하기
      const metadata = {
        contentType: "image/jpeg",
      }
      const storageRef = ref_storage(storage, `message/publick/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)
      setLoading(true)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setCompleted(Math.floor(progress))

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break
            case "storage/canceled":
              break

            // ...

            case "storage/unknown":
              break
          }
          setLoading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL)
            const db = getDatabase()
            const messageRef = ref_database(db, "messages/" + chatRoom.id)
            await set(push(messageRef), createMessage(downloadURL))
            setLoading(false)
            render()
          })
        }
      )
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
      setTimeout(() => {
        setCompleted(0)
      }, 2000)
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
            <div
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading ? true : false}
            >
              <HiArrowCircleRight />
            </div>
          )}
          {}
        </div>
        {!(completed === 0 || completed === 100) && (
          <ProgressBar bgcolor={"#7a84eb"} completed={completed} />
        )}

        <div>
          {errors.map((Message) => (
            <p key={Message}>{Message}</p>
          ))}
        </div>
      </form>
      <input
        type="file"
        onChange={handleUploadImg}
        accept="image/jpeg, image/png"
        ref={inputOpenImageRef}
        style={{ display: "none" }}
      />
    </div>
  )
}

export default MessageForm
