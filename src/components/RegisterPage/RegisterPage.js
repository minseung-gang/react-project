import React, { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import "../.././asset/register.css"
import { Link } from "react-router-dom"
import md5 from "md5"
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

const RegisterPage = () => {
  // 로그인 버튼의 disabled 속성에 이 isSubmitting 값을 설정해주면 로그인 버튼이 양식의 제출 처리가 끝날 때까지 비활성화가 될 것입니다.
  //react-hook-form , md5
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    watch,
  } = useForm()
  const password = useRef()
  password.current = watch("password")
  const [errorSubmit, setErrorSubmit] = useState("")

  const resultMessages = {
    "auth/email-already-in-use": "이미 가입된 이메일입니다.",
    "auth/wrong-password": "잘못된 비밀번호입니다.",
    "auth/user-not-found": "존재하지 않는 계정입니다.",
    "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
  }

  const onSubmit = async (data) => {
    try {
      let createdUser = await createUserWithEmailAndPassword(
        authService,
        data.email,
        data.password
      )
      await updateProfile(authService.currentUser, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      })
      console.log(createdUser)

      // Firebase 데이터베이스에 저장해주기

      const db = getDatabase()
      await set(ref(db, "users/" + createdUser.user.uid), {
        username: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      })

      alert("회원가입이 되었습니다.")
    } catch (error) {
      setErrorSubmit(
        resultMessages[error.code]
          ? resultMessages[error.code]
          : "알 수 없는 이유로 회원가입에 실패하였습니다."
      )
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
        <h2>Register</h2>
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
          <span className="section-title">이름</span>
          <input
            type="text"
            {...register("name", {
              required: "이름은 필수 입력입니다.",
            })}
          />
          {errors.name && <small role="alert">{errors.name.message}</small>}
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
        <div className="input-field">
          <span className="section-title">비밀번호 확인</span>
          <input
            type="password"
            {...register("password2", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: {
                value: 10,
                message: "비밀번호는 10자리 이상을 입력해주세요. ",
              },
              validate: {
                value: (value) =>
                  value === password.current || "비밀번호가 같지 않습니다.",
              },
            })}
          />
          {errors.password2 && (
            <small role="alert">{errors.password2.message}</small>
          )}
        </div>
        {errorSubmit && (
          <span
            className=""
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
          to="/login"
        >
          아이디가 있으신가요?
        </Link>
      </form>
    </div>
  )
}

export default RegisterPage
