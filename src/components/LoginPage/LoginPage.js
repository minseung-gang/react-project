import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import "../.././asset/register.css"
import { Link } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"
import { authService } from "../../firebase.js"

const LoginPage = () => {
  // 로그인 버튼의 disabled 속성에 이 isSubmitting 값을 설정해주면 로그인 버튼이 양식의 제출 처리가 끝날 때까지 비활성화가 될 것입니다.
  //react-hook-form , md5
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm()

  const [errorSubmit, setErrorSubmit] = useState("")

  const onSubmit = async (data) => {
    try {
      let login = await signInWithEmailAndPassword(
        authService,
        data.email,
        data.password
      )
      alert("로그인이 되었습니다.")
      console.log(login)
    } catch (error) {
      setErrorSubmit("아이디나 비밀번호를 다시 한번 더 확인해주시기 바랍니다.")
      setTimeout(() => {
        setErrorSubmit("")
      }, 4000)
    }

    await new Promise((r) => setTimeout(r, 2000))
  }
  //validate:  { domainCheck: email =>email.split("@")[1] === "gmail.com" || "gmail만 가능합니다."  }

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="input-field">
          <span className="section-title">이메일</span>
          <input
            type="email"
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </div>

        <div className="input-field">
          <span className="section-title">비밀번호</span>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 10,
                message: "비밀번호는 10자리 이상을 입력해주세요. ",
              },
            })}
          />
          {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )}
        </div>
        {errorSubmit && (
          <span
            className="error-message"
            style={{
              fontSize: "13px",
              margin: "0",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {errorSubmit}
          </span>
        )}
        <input type="submit" disabled={isSubmitting} />
        <Link
          style={{
            color: "grey",
            textDecoration: "none",
            fontSize: "13px",
            width: "fit-content",
          }}
          to="/register"
        >
          아이디가 없으신가요?
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
