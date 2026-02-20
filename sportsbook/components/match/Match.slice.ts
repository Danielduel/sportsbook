import { produce } from "immer";
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/state/store'
import { Backend_GamesT } from '@/state/backend-games';
import { WithLineupAddress } from "../lineup/Lineup.slice";

export type MatchItem = {
  gameType: number;
  category1Id: number;
  category2Id: number;
  category3Id: number;

  eventId: number;
  eventStart: number;
  eventParticipant1: string;
  eventParticipant2: string;

  gameId: number;
}

export type WithMatchAddress = Pick<MatchItem, "gameType" | "category1Id" | "category2Id" | "category3Id" | "eventId">;
const categoriesToAddress = ({ gameType, category1Id, category2Id, category3Id, eventId }: WithMatchAddress) => `${gameType}/${category1Id}/${category2Id}/${category3Id}/${eventId}`;
export interface MatchState {
  items: Record<string, MatchItem>;
}

const initialState: MatchState = {
  items: {}
};

type InnerOdds = Backend_GamesT[number]["eventGames"][number]["outcomes"];
const getParticipants = (innerOdds: InnerOdds) => {
  if (innerOdds.length === 3) {
    return [innerOdds[0].outcomeName, innerOdds[2].outcomeName];
  }
  return null;
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Backend_GamesT>) => produce(state, (draft) => {
      action.payload.forEach(x => {
        x.eventGames.forEach(game => {
          const stateAddress = categoriesToAddress({ ...x, gameType: game.gameType });
          const [participant1, participant2] = getParticipants(game.outcomes) ?? [ x.eventName, "" ];

          if (stateAddress in state.items) {
            draft.items[stateAddress].gameType = game.gameType;
            draft.items[stateAddress].category1Id = x.category1Id;
            draft.items[stateAddress].category2Id = x.category2Id;
            draft.items[stateAddress].category3Id = x.category3Id;
            draft.items[stateAddress].eventId = x.eventId;
            draft.items[stateAddress].eventParticipant1 = participant1;
            draft.items[stateAddress].eventParticipant2 = participant2;
            draft.items[stateAddress].eventStart = x.eventStart;
            draft.items[stateAddress].gameId = game.gameId;
          } else {
            draft.items[stateAddress] = {
              gameType: game.gameType,
              category1Id: x.category1Id,
              category2Id: x.category2Id,
              category3Id: x.category3Id,
              eventId: x.eventId,
              eventParticipant1: participant1,
              eventParticipant2: participant2,
              eventStart: x.eventStart,
              gameId: game.gameId,
            };
          }
        });
      });

      return draft;
    })
  },
})

export const { update } = matchSlice.actions

export const root = (state: RootState) => state.match.items;
export const selectKeys = createSelector([ root ], (items) => Object.keys(items));
export const selectMatch = (matchAddress: string) => createSelector([ root ], (items) => items[matchAddress]);
export const selectMatchAddressesForLineup = (lineup: WithLineupAddress) => createSelector([ root ], (items) => {
  return Object
    .values(items)
    .filter(x => (
      x.gameType === lineup.gameType &&
      x.category1Id === lineup.category1Id &&
      x.category2Id === lineup.category2Id &&
      x.category3Id === lineup.category3Id
    )).flatMap(categoriesToAddress);
});

export default matchSlice.reducer

