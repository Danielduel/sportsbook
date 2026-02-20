import { FC, useMemo } from "react";
import { CrossIcon } from "../icons/Cross";
import { useAppSelector } from "@/state/hooks";
import { BetItem, selectBetByGameId, selectKeys } from "./Bet.slice";
import { MatchTimeFormat } from "../match/Match";

const BetDivider = () => <hr className="border-border-fade my-2" />

type BetProps = Pick<BetItem, "outcomeName" | "odds" | "eventName" | "category1Name" | "category2Name" | "category3Name" | "gameName" | "eventStart">

export const Bet: FC<BetProps> = ({ outcomeName, eventStart, gameName, category1Name, category2Name, category3Name, eventName, odds }) => {
  const [day, , month, , year, , hour, , minute] = useMemo(() => {
    return MatchTimeFormat.formatToParts(eventStart);
  }, [eventStart]).map(x => x.value)
  return (
    <div className="flex flex-col bg-background-main p-2 text-text-main border border-border-fade rounded text-xs px-2 py-3">
      <div className="">
        <span className="font-bold">{outcomeName}</span>
        <span className="float-end">
          <span className="font-bold text-text-primary bg-background-primary py-1 px-3 rounded-2xl">{odds.toFixed(2)}</span>
          <button className="font-bold ml-1">
            <CrossIcon className="h-3 inline-block fill-text-main" />
          </button>
        </span>
      </div>
      <span className="font-light">{gameName}</span>
      <BetDivider />
      <span className="">{eventName}</span>
      <div className="">
        <span className="font-light">{category1Name} • {category2Name} • {category3Name}</span>
        <span className="font-light float-end">{hour}:{minute} | {day}/{month}/{year}</span>
      </div>
    </div>
  )
}

const _Bet: FC<{ betKey: number }> = ({ betKey }) => {
  const betData = useAppSelector(selectBetByGameId(betKey));

  return (
    <Bet
      outcomeName={betData.outcomeName}
      odds={betData.odds}
      category1Name={betData.category1Name}
      category2Name={betData.category2Name}
      category3Name={betData.category3Name}
      eventName={betData.eventName}
      gameName={betData.gameName}
      eventStart={betData.eventStart}
    />
  );
};

export const BetList: FC = () => {
  const betKeys = useAppSelector(selectKeys);

  return betKeys.map(betKey => <_Bet betKey={+betKey} key={betKey} />)
}

