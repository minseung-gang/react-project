import { SET_CURRENT_CHAT_ROOM } from "../action/type"

const initialChatRoomsState = {
  currentChatRoom: null,
}

export default function (state = initialChatRoomsState, action) {
  let { type, payload } = action
  switch (type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: payload,
      }
    default:
      return state
  }
}
