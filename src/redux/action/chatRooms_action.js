import { SET_CURRENT_CHAT_ROOM } from "./type"

export function setCurrentChatRooms(currentChatRooms) {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: currentChatRooms,
  }
}
