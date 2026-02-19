import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'

export interface ApplicationShellState {
  expanded: boolean;
}

const initialState: ApplicationShellState = {
  expanded: false
}

export const applicationShellSlice = createSlice({
  name: 'applicationShell',
  initialState,
  reducers: {
    open: state => {
      state.expanded = true;
    },
    close: state => {
      state.expanded = false;
    },
    toggle: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "undefined") {
        state.expanded = !state.expanded;
      } else {
        state.expanded = action.payload;
      }
      return;
    }
  }
})

export const { open, close, toggle } = applicationShellSlice.actions

export const selectExpanded = (state: RootState) => state.applicationShell.expanded

export default applicationShellSlice.reducer

