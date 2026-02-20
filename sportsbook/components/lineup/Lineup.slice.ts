import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { Backend_GamesT } from '@/state/backend-games';

export type LineupItem = {
  gameType: number;

  category1Name: string;
  category1Id: number;
  category2Name: string;
  category2Id: number;
  category3Name: string;
  category3Id: number;
}

export type WithLineupAddress = Pick<LineupItem, "gameType" | "category1Id" | "category2Id" | "category3Id">;
const categoriesToAddress = ({ gameType, category1Id, category2Id, category3Id }: WithLineupAddress) => `${gameType}/${category1Id}/${category2Id}/${category3Id}`;
export interface LineupState {
  items: Record<string, LineupItem>;
}

const initialState: LineupState = {
  items: {}
};

export const lineupSlice = createSlice({
  name: 'lineup',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Backend_GamesT>) => produce(state, (draft) => {
      action.payload.forEach(x => {
        x.eventGames.forEach(game => {
        const stateAddress = categoriesToAddress({ ...x, gameType: game.gameType });

        if (stateAddress in state.items) {
          draft.items[stateAddress].gameType = game.gameType;
          draft.items[stateAddress].category1Id = x.category1Id;
          draft.items[stateAddress].category2Id = x.category2Id;
          draft.items[stateAddress].category3Id = x.category3Id;
          draft.items[stateAddress].category1Name = x.category1Name;
          draft.items[stateAddress].category2Name = x.category2Name;
          draft.items[stateAddress].category3Name = x.category3Name;
        } else {
          draft.items[stateAddress] = {
            gameType: game.gameType,
            category1Id: x.category1Id,
            category2Id: x.category2Id,
            category3Id: x.category3Id,
            category1Name: x.category1Name,
            category2Name: x.category2Name,
            category3Name: x.category3Name,
          };
        }
        });
      });

      return draft;
    })
  },
})

export const { update } = lineupSlice.actions

const root = (state: RootState) => state.lineup.items;
export const selectKeys = createSelector([ root ], (items) => Object.keys(items));
export const selectLineup = (lineupAddress: string) => createSelector([ root ], (items) => items[lineupAddress]);
// export const selectLineup = (gameType: number, category1Id: number, category2Id: number, category3Id: number) => (state: RootState) => {
//   const address = categoriesToAddress({ gameType, category1Id, category2Id, category3Id });
//   return state.lineup.items[address];
// }
export const selectLineupAddressesForGame = (gameType: number) => createSelector([ root ], (items) => {
  return Object.values(items).filter(x => x.gameType === gameType).flatMap(categoriesToAddress);
});

export default lineupSlice.reducer

