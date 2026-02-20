import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { Backend_GamesT } from '@/state/backend-games';
import { WithMatchAddress } from "../match/Match.slice";

export type OddsItem = {
  gameType: number;
  category1Id: number;
  category2Id: number;
  category3Id: number;
  eventId: number;
  gameId: number;
  outcomeId: number;

  outcomeName: string;
  position: number;

  lastOdds?: number;
  odds: number;
}

type WithOddsAddress = Pick<OddsItem, "gameType" | "category1Id" | "category2Id" | "category3Id" | "eventId" | "gameId" | "outcomeId">;
const categoriesToAddress = ({ gameType, category1Id, category2Id, category3Id, eventId, gameId, outcomeId }: WithOddsAddress) => `${gameType}/${category1Id}/${category2Id}/${category3Id}/${eventId}/${gameId}/${outcomeId}`;
export interface OddsState {
  items: Record<string, OddsItem>;
}

const initialState: OddsState = {
  items: {}
};

export const oddsSlice = createSlice({
  name: 'odds',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Backend_GamesT>) => produce(state, (draft) => {
      action.payload.forEach(x => {
        x.eventGames.forEach(game => {
          game.outcomes.forEach(outcome => {
            const stateAddress = categoriesToAddress({ ...x, gameType: game.gameType, gameId: game.gameId, outcomeId: outcome.outcomeId });

            if (stateAddress in state.items) {
              draft.items[stateAddress].gameType = game.gameType;
              draft.items[stateAddress].category1Id = x.category1Id;
              draft.items[stateAddress].category2Id = x.category2Id;
              draft.items[stateAddress].category3Id = x.category3Id;
              draft.items[stateAddress].eventId = x.eventId;
              draft.items[stateAddress].gameId = game.gameId;
              draft.items[stateAddress].outcomeId = outcome.outcomeId;
              draft.items[stateAddress].outcomeName = outcome.outcomeName;
              draft.items[stateAddress].lastOdds = draft.items[stateAddress].odds;
              draft.items[stateAddress].odds = outcome.outcomeOdds;
              draft.items[stateAddress].position = outcome.outcomePosition;
            } else {
              draft.items[stateAddress] = {
                gameType: game.gameType,
                category1Id: x.category1Id,
                category2Id: x.category2Id,
                category3Id: x.category3Id,
                eventId: x.eventId,
                gameId: game.gameId,
                outcomeId: outcome.outcomeId,
                outcomeName: outcome.outcomeName,
                lastOdds: undefined,
                odds: outcome.outcomeOdds,
                position: outcome.outcomePosition,
              };
            }
          })
        });
      });

      return draft;
    })
  },
})

export const { update } = oddsSlice.actions

export const root = (state: RootState) => state.odds.items;
export const selectKeys = createSelector([ root ], (items) => Object.keys(items));
export const selectOdds = (oddsAddress: string) => createSelector([ root ], (items) => items[oddsAddress]);
export const selectOddsAddressesForMatch = (match: WithMatchAddress) => createSelector([root], (items) => {
  return Object
    .values(items)
    .filter(x => (
      x.gameType === match.gameType &&
      x.category1Id === match.category1Id &&
      x.category2Id === match.category2Id &&
      x.category3Id === match.category3Id &&
      x.eventId === match.eventId
    )).flatMap(categoriesToAddress);
});

export default oddsSlice.reducer

