import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { Backend_GamesT } from '@/state/backend-games';

type GameItem = {
  gameType: number;
  gameName: string;
  category1Name: string;
}

export interface GameState {
  items: Record<number, GameItem>;
}

const initialState: GameState = {
  items: {}
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Backend_GamesT>) => produce(state, (draft) => {
      action.payload.forEach(x => {
        x.eventGames.forEach(game => {
          const gameType = game.gameType;
          if (gameType in state.items) {
            draft.items[gameType].gameType = game.gameType;
            draft.items[gameType].gameName = game.gameName;
            draft.items[gameType].category1Name = x.category1Name;
          } else {
            draft.items[gameType] = {
              gameType: game.gameType,
              gameName: game.gameName,
              category1Name: x.category1Name,
            };
          }
        });
      });

      return draft;
    })
  },
})

export const { update } = gameSlice.actions

export const root = (state: RootState) => state.game.items;
export const selectKeys = createSelector([ root ], (items) => Object.keys(items));
export const selectGame = (gameType: number) => createSelector([ root ], (items) => items[gameType]);

export default gameSlice.reducer

