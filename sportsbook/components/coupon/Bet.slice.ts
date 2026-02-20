import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { Backend_GamesT } from '@/state/backend-games';
import { put, takeLatest } from "redux-saga/effects";
import { appSelect } from "@/state/hooks";

export type BetItem = {
  gameId: number;
  outcomeId: number;

  odds: number;
  outcomeName: string;
  gameName: string;
  category1Name: string;
  category2Name: string;
  category3Name: string;
  eventName: string;
  eventStart: number;
}

export interface BetState {
  items: Record<number, BetItem>;
}

const initialState: BetState = {
  items: {}
};

export const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    handleOddsClick: (action: PayloadAction<{ gameId: number; outcomeId: number; }>) => { },
    addById: (state, action: PayloadAction<{ gameId: number; outcomeId: number; }>) => { },
    add: (state, action: PayloadAction<BetItem>) => produce(state, (draft) => {
      draft.items[action.payload.gameId] = { ...action.payload };
    }),
    removeByGameId: (state, action: PayloadAction<number>) => produce(state, (draft) => {
      delete draft.items[action.payload];
    }),
  },
})

function* handleOddsClickSaga(action: PayloadAction<{ gameId: number; outcomeId: number; }>) {
  const items = yield* appSelect(state => state.bet.items);
  const { payload: { gameId, outcomeId } } = action;
  if (!(gameId in items)) {
    // create
    yield put(betSlice.actions.addById(action.payload));
    return;
  };
  const item = items[gameId]!;
  if (!(item.outcomeId === outcomeId)) {
    // as update
    yield put(betSlice.actions.addById(action.payload));
    return;
  }
  // remove 
  yield put(betSlice.actions.removeByGameId(gameId));
}

function* addByIdBetSaga(action: PayloadAction<{ gameId: number; outcomeId: number; }>) {
  const { gameId, outcomeId } = action.payload;
  const { data } = yield* appSelect(state => state.backend_games);

  const event = data.find(x => x.eventGames.some(y => y.gameId === gameId));
  if (!event) return null;

  const game = event.eventGames.find(x => x.gameId === gameId);
  if (!game) return null;

  const outcome = game.outcomes.find(x => x.outcomeId === outcomeId);
  if (!outcome) return null;

  const item: BetItem = {
    gameId: action.payload.gameId,
    outcomeId: action.payload.outcomeId,
    odds: outcome.outcomeOdds,
    outcomeName: outcome.outcomeName,
    gameName: game.gameName,
    category1Name: event.category1Name,
    category2Name: event.category2Name,
    category3Name: event.category3Name,
    eventName: event.eventName,
    eventStart: event.eventStart,
  };

  yield put(betSlice.actions.add(item));
}

export function* betSaga() {
  yield takeLatest(betSlice.actions.addById.type, addByIdBetSaga);
  yield takeLatest(betSlice.actions.handleOddsClick.type, handleOddsClickSaga);
}

export const { handleOddsClick } = betSlice.actions

export const root = (state: RootState) => state.bet.items;
export const selectKeys = createSelector([root], (items) => Object.keys(items));
export const selectBetByGameId = (gameId: number) => createSelector([root], (items) => items[gameId]);
export const selectBetOutcomeIdByGameId = (gameId: number) => createSelector([selectBetByGameId(gameId)], (item) => item?.outcomeId);

export default betSlice.reducer

