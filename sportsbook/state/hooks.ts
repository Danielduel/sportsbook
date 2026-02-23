import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { select } from 'redux-saga/effects';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export function* appSelect<TSelected>(selector: (state: RootState) => TSelected,): Generator<any, TSelected, TSelected> { return yield select(selector); }

