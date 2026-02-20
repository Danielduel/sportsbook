import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { put, takeLatest } from "redux-saga/effects";
import { appSelect } from "@/state/hooks";
import { betSlice } from "./Bet.slice";

export interface CouponControlState {
  simple: null;
  accumulate: {
    stake: number;
    odds: number;
    maxWin: number;
  };
  system: null;
}

const initialState: CouponControlState = {
  simple: null,
  accumulate: {
    stake: 2500,
    odds: 0,
    maxWin: 0,
  },
  system: null,
};

export const couponControlSlice = createSlice({
  name: 'couponControl',
  initialState,
  reducers: {
    setStake: (state, action: PayloadAction<number>) => produce(state, (draft) => {
      let value = action.payload;
      // todo normalize
      if (!value) value = 0; 
      value *= 100;
      draft.accumulate.stake = value;
    }),
    setState: (state, action: PayloadAction<Partial<CouponControlState>>) => produce(state, (draft) => {
      return Object.assign(draft, action.payload);
    })
  },
})

function* postUpdate() {
  const items = yield* appSelect(state => state.bet.items);
  const control = yield* appSelect(state => state.couponControl);
  const totalOdds = Object.values(items).reduce((prev, curr) => prev += curr.odds, 0);
  
  yield put(couponControlSlice.actions.setState({
    accumulate: {
      ...control.accumulate,
      odds: totalOdds,
      maxWin: totalOdds * control.accumulate.stake
    }
  }))
}

export function* couponControlSaga() {
  yield takeLatest(betSlice.actions.clear, postUpdate);
  yield takeLatest(betSlice.actions.removeByGameId, postUpdate);
  yield takeLatest(betSlice.actions.add.type, postUpdate);
  yield takeLatest(couponControlSlice.actions.setStake.type, postUpdate);
}

export const { setStake, setState } = couponControlSlice.actions

export const root = (state: RootState) => state.couponControl;
export const accumulateRoot = createSelector([ root ], state => state.accumulate);
export const accululateStake = createSelector([ accumulateRoot ], state => state.stake);
export const accululateMaxWin = createSelector([ accumulateRoot ], state => state.maxWin);
export const accululateOdds = createSelector([ accumulateRoot ], state => state.odds);

export default couponControlSlice.reducer

