import { combineReducers } from "redux"
import user from "./user_reducer"
import ChatRooms from "./chatRooms_reducer"
/*import chatRoom from './_chatReducer'
 */
const rootReducer = combineReducers({
  user,
  ChatRooms,
})

export default rootReducer
