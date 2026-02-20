import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import data from "./betting_dashboard_data.json"

export type Backend_GamesT = typeof data;

export interface Backend_GamesState {
  data: Backend_GamesT 
}

const initialState: Backend_GamesState = {
  data
}

export const backend_gamesslice = createSlice({
  name: 'backend_games',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Backend_GamesT>) => {
      state.data = action.payload;
      return;
    }
  },
})

export const { set } = backend_gamesslice.actions

export const selectData = (state: RootState) => state

export default backend_gamesslice.reducer

