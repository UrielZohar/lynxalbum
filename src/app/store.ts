import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import AlbumManagerReducer from "../components/AlbumManager/AlbumManagerSlice"

export const store = configureStore({
  reducer: {
    album: AlbumManagerReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
