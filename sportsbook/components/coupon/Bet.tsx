import { FC } from "react";
import { CrossIcon } from "../icons/Cross";
import { useAppSelector } from "@/state/hooks";
import { selectBetByGameId, selectKeys } from "./Bet.slice";

const BetDivider = () => <hr className="border-border-fade my-2" />

export const Bet: FC = () => {
  return (
    <div className="flex flex-col bg-background-main p-2 text-text-main border border-border-fade rounded text-xs px-2 py-3">
      <div className="">
        <span className="font-bold">Newcastle United</span>
        <span className="float-end">
          <span className="font-bold text-text-primary bg-background-primary py-1 px-3 rounded-2xl">1.60</span>
          <button className="font-bold ml-1">
            <CrossIcon className="h-3 inline-block fill-text-main" />
          </button>
        </span>
      </div> 
      <span className="font-light">1x2</span>
      <BetDivider />
      <span className="">Newcastle United - Leeds</span>
      <div className="">
        <span className="font-light">Piłka nożna • Anglia • Premier League</span>
        <span className="font-light float-end">21:15 | 07/01/26</span>
      </div>
    </div>
  )
}

const _Bet: FC<{ betKey: number }> = ({ betKey }) => {
  const betData = useAppSelector(selectBetByGameId(betKey));

  return <Bet />
}

export const BetList: FC = () => {
  const betKeys = useAppSelector(selectKeys);

  return betKeys.map(betKey => <_Bet betKey={+betKey} key={betKey} />)
}

