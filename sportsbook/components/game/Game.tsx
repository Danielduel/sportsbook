import { PropsWithChildren, useMemo, type FC } from "react";
import { LineupList } from '../lineup/Lineup';
import { Chevron } from "../icons/Chevron";
import { useAppSelector } from "@/state/hooks";
import { selectGame, selectKeys } from "./Game.slice";
import { selectLineupAddressesForGame } from "../lineup/Lineup.slice";

type GameProps = {
  adaptedGameName: string;
  category1Name: string;
};

const adaptGameName = (gameName: string) => {
  switch (gameName) {
    case "1x2": return "1 x 2";
    default: return gameName;
  }
}

export const Game: FC<PropsWithChildren<GameProps>> = ({
  adaptedGameName,
  category1Name,
  children
}) => {
    return (
    <>
      <div className="bg-background-primary text-text-primary desktop:rounded-2xl p-4 flex items-center">
        <div className="flex-1">
          <i className="icon-soccer text-green-500" />&nbsp;{category1Name}
        </div>
        <div className="py-2 px-8 bg-background-highlight text-text-hightlight overflow-hidden h-8 leading-[2rem] box-content rounded-xl w-full max-w-40 text-justify inline-block after:w-full after:inline-block after:content[''] ">
          {adaptedGameName}
        </div>
        <button className="w-5 ml-5">
          <Chevron className="stroke-text-primary fill-text-primary rotate-270" />
        </button>
      </div>
      <div className="flex flex-col py-1">
        {children}
      </div>
    </>
  );
}

const GameWithStore: FC<{ gameType: number }> = ({ gameType }) => {
  const gameData = useAppSelector(selectGame(gameType));
  const lineupsForGame = useAppSelector(selectLineupAddressesForGame(gameType));
  const adaptedGameName = useMemo(() => {
    return adaptGameName(gameData.gameName);
  }, [ gameData?.gameName ])

  if (!gameData) {
    return null;
  }

  return (
    <Game
      adaptedGameName={adaptedGameName}
      category1Name={gameData.category1Name}
    >
      <LineupList lineupAddress={lineupsForGame} />
    </Game>
  );
}

export const GameList = () => {
  const gameTypes = useAppSelector(selectKeys);

  return gameTypes.map(gameType => <GameWithStore gameType={+gameType} key={gameType} />);
}

export default GameWithStore;

