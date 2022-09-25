import { SET_USER, CLEAR_USER, SET_PHOTO_URL } from "./type.js"

export function setUser(user) {
  console.log("user_action :", user)
  return {
    type: SET_USER,
    payload: user,
  }
}
export function setPhotoURL(photoURL) {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  }
}
export function clearUser() {
  return {
    type: CLEAR_USER,
  }
}
