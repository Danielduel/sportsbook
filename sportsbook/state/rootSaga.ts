import { all, call, takeLatest, put, delay } from 'redux-saga/effects';
import { produce } from "immer";
import { set, Backend_GamesT } from './backend-games';
import * as Game from "../components/game/Game.slice";
import * as Lineup from "../components/lineup/Lineup.slice";
import * as Match from "../components/match/Match.slice";
import * as Odds from "../components/odds/Odds.slice";
import { PayloadAction } from '@reduxjs/toolkit';
import { betSaga } from '@/components/coupon/Bet.slice';

export function* randomFluctuation(oldData: Backend_GamesT) {
  const data = produce(oldData, draft => {
    const allOutcomes = draft
      .flatMap(x => x.eventGames)
      .flatMap(x => x.outcomes)
      .filter(() => Math.random() > 0.9)
      .flatMap(x => x);

    // mutating by ref
    allOutcomes.forEach((x) => {
      x.outcomeOdds += ((Math.random() - 0.5) / 2);
    })

    return draft;
  });

  yield call(_updateBackendData, data)
}

export function* randomFluctuationLoop(data: Backend_GamesT) {
  while (typeof window !== "undefined") {
    yield delay(Math.random() * 10000);
    yield call(randomFluctuation, data);
  }
}

export function* _updateBackendData(data: Backend_GamesT) {
  yield put(Game.update(data));
  yield put(Lineup.update(data));
  yield put(Match.update(data));
  yield put(Odds.update(data));
}

export function* updateBackendData(data: PayloadAction<Backend_GamesT>) {
  yield call(_updateBackendData, data.payload);
}


export default function* rootSaga() {
  yield takeLatest(set.type, updateBackendData);
  yield betSaga();

  yield all([]);
}

