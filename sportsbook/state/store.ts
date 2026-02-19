import applicationShell from '@/components/application-shell/ApplicationShell.slice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => configureStore({
  reducer: {
    applicationShell,
  }
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

