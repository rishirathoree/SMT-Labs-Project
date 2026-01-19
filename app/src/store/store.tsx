import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/index'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth:authSlice
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
