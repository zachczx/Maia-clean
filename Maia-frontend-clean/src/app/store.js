import { configureStore } from '@reduxjs/toolkit'
import chatHistoryReducer from '../features/chatHistorySlice'

export default configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
  },
})