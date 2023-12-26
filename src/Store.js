import {configureStore} from '@reduxjs/toolkit'
import rocketsSlice from './features/rocketSlice'

export const store = configureStore({
  reducer: {
    rockets: rocketsSlice
  }
})