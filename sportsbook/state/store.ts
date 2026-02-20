import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga, { randomFluctuationLoop } from './rootSaga';
import data from "./betting_dashboard_data.json"

import applicationShell from '@/components/application-shell/ApplicationShell.slice'
import game from "@/components/game/Game.slice"
import lineup from "@/components/lineup/Lineup.slice"
import match from "@/components/match/Match.slice"
import odds from "@/components/odds/Odds.slice"
import bet from "@/components/coupon/Bet.slice"
import backend_games, { set as initialize } from './backend-games'

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({ collapsed: true });

  const store = configureStore({
    reducer: {
      applicationShell,
      backend_games,
      game,
      lineup,
      match,
      odds,
      bet,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
    devTools: process.env.NODE_ENV !== 'production',
  })

  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(randomFluctuationLoop, data);
  store.dispatch(initialize(data));

  return store;
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

