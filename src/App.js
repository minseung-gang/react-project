import logo from "./logo.svg"
import "./App.css"
import { useEffect } from "react"
import ChatPage from "./components/ChatPage/ChatPage.js"
import LoginPage from "./components/LoginPage/LoginPage.js"
import RegisterPage from "./components/RegisterPage/RegisterPage.js"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { authService } from "./firebase.js"
import { useDispatch, useSelector } from "react-redux"
import { setUser, clearUser } from "./redux/action/user_action"
import ClipLoader from "react-spinners/ClipLoader"

function App() {
  const navigate = useNavigate()
  let dispatch = useDispatch()
  const isLoading = useSelector((state) => state.user.isLoading)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //로그인이 되었을 때
        navigate("/")

        dispatch(setUser(user))
      } else {
        //로그인이 되지 않았을 때
        navigate("/login")
        dispatch(clearUser())
      }
    })
  }, [])

  if (isLoading) {
    return (
      <div className="loading-box">
        <ClipLoader color="#000" loading={isLoading} size={150} />
      </div>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    )
  }
}

export default App
