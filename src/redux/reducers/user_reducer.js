import { SET_USER, CLEAR_USER, SET_PHOTO_URL } from "../action/type"

const initialUserState = {
  currentUser: null,
  isLoading: true,
}

export default function (state = initialUserState, action) {
  let { type, payload } = action
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      }
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      }
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: {
          ...JSON.parse(JSON.stringify(state.currentUser)),
          photoURL: payload,
        },
        isLoading: false,
      }
    default:
      return state
  }
}
