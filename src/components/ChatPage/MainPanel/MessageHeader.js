import React, { useState, useRef } from "react"
import { Modal } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"
import { FaUserFriends } from "react-icons/fa"
import { MdDescription } from "react-icons/md"
const MessageHeader = ({ handleSearch }) => {
  const [discriptionDropdown, setDiscriptionDropdown] = useState(false)
  const [postDropdown, setPostDropdown] = useState(false)
  const handleDiscription = () => {
    setDiscriptionDropdown(!discriptionDropdown)
    setPostDropdown(false)
  }
  const handlePost = () => {
    setPostDropdown(!postDropdown)
    setDiscriptionDropdown(false)
  }
  return (
    <div
      style={{
        borderBottom: "1px solid #222121",
        justifyContent: "space-between",
      }}
      className="panel-container flex"
    >
      <div className="main-header--title">
        <p className="titleSign">#</p>
        <h3>111</h3>
      </div>
      <div style={{ gap: "0 20px" }} className="main-header-container flex">
        <div className="main-container__dropdown">
          <MdDescription
            onClick={() => handleDiscription()}
            name="discriptionDropdown"
            style={{
              color: "rgba(163 166 163)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
          {discriptionDropdown && (
            <article>
              <ul
                className={`${
                  discriptionDropdown
                    ? "slide-fade-in-dropdown"
                    : "slide-fade-out-dropdown"
                }`}
              >
                <li>ddd</li>
              </ul>
            </article>
          )}
        </div>
        <div className="main-container__dropdown">
          <FaUserFriends
            onClick={() => {
              handlePost()
            }}
            style={{
              color: "rgba(163 166 163)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />

          {postDropdown && (
            <article>
              <ul
                className={`${
                  postDropdown
                    ? "slide-fade-in-dropdown"
                    : "slide-fade-out-dropdown"
                }`}
              >
                <li>ddd</li>
              </ul>
            </article>
          )}
        </div>
        <div className="search-cotainer flex">
          <input type="text" placeholder="검색하기" onChange={handleSearch} />
          <AiOutlineSearch style={{ color: "#5b5e5b", cursor: "pointer" }} />
        </div>
      </div>
    </div>
  )
}

export default MessageHeader
