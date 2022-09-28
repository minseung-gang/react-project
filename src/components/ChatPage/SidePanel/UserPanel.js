import React, { useEffect, useState, useRef } from "react"
import { BsCheck2Circle } from "react-icons/bs"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { getDatabase, update, ref as ref_database } from "firebase/database"
import { BiCommentDots } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import "../../../asset/chat.css"
import { authService, storage, realtimeDbService } from "../../../firebase"
import { setPhotoURL } from "../../../redux/action/user_action"
import { updateProfile } from "firebase/auth"
import mime from "mime"

// react-icons

const UserPanel = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const dispatch = useDispatch()
  const db = getDatabase()
  const user = useSelector((state) => state.user.currentUser)
  const handleLogout = () => {
    authService.signOut()
  }

  const inputOpenImageRef = useRef()

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click()
  }

  const handleUploadImg = async (event) => {
    const file = event.target.files[0]
    /* const mime = require("mime")
    const metadata = { contentType: mime.getType(file.name) } */
    /*  const storage = getStorage() */

    try {
      // 스토리지에 파일 저장하기
      const storageRef = ref(storage, `user_image/${user.uid}/${file.name}`)
      const uploadTask = await uploadBytes(storageRef, file)

      // 스토리지에 파일 url 가져오기
      const downloadURL = await getDownloadURL(storageRef)
      console.log(downloadURL)

      // Auth 서비스 프로필 수정
      await updateProfile(authService.currentUser, {
        photoURL: downloadURL,
      })

      // 리덕스에서 이미지url 수정
      dispatch(setPhotoURL(downloadURL))

      //데이터베이스 유저이미지 수정
      console.log(user.uid)
      await update(ref_database(db, `/users/${user.uid}`), {
        image: downloadURL,
      })
      setDropdownVisibility(!dropdownVisibility)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="userPanel-inner">
      {/** 로고 */}
      <div
        style={{ borderBottom: "1px solid #222121" }}
        className="panel-container flex"
      >
        <BiCommentDots style={{ fontSize: "20px" }} />
        <h3
          style={{
            display: "flex chatRoom",
            alignItems: "flex-end",
            gap: "0 5px",
          }}
        >
          CHAT APP
        </h3>
      </div>
      <div style={{ position: "relative", paddingTop: "1rem" }}>
        <div style={{ padding: "0 1rem" }} className="flex">
          <img
            src={user.photoURL}
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <p
            className="main-select-btn"
            onClick={() => setDropdownVisibility(!dropdownVisibility)}
          >
            <BsCheck2Circle style={{ color: "#5b5e5b" }} />
            {user && user.displayName}
          </p>
        </div>
        {dropdownVisibility && (
          <article
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              zIndex: "2",
            }}
          >
            <ul
              className={`${
                dropdownVisibility
                  ? "slide-fade-in-dropdown"
                  : "slide-fade-out-dropdown"
              }`}
            >
              <li onClick={handleOpenImageRef}>
                {dropdownVisibility && "프로필사진 변경"}
              </li>
              <li onClick={handleLogout}>{dropdownVisibility && "로그아웃"}</li>
            </ul>
            <input
              type="file"
              onChange={handleUploadImg}
              accept="image/jpeg, image/png"
              ref={inputOpenImageRef}
              style={{ display: "none" }}
            />
          </article>
        )}
      </div>
    </div>
  )
}

export default UserPanel
