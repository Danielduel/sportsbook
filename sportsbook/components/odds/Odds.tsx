import { FC, useCallback, useMemo } from "react"
import { OddsItem, selectOdds } from "./Odds.slice"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import classNames from "classnames";
import { handleOddsClick, selectBetOutcomeIdByGameId } from "../coupon/Bet.slice";

type OddsProps = Pick<OddsItem, "odds" | "lastOdds"> & { handleClick: () => void; isBetted: boolean; };

export const Odds: FC<OddsProps> = ({ odds, lastOdds, handleClick, isBetted }) => {
  const className = useMemo(() => {
    const base = "not-first:ml-2 text-sm py-3 px-4 w-16 inline-block rounded transition-colors";
    const currentBg = classNames({
      "bg-background-accent": !isBetted,
      "bg-background-primary text-text-primary": isBetted,
    });
    const blink = typeof lastOdds === "number";
    if (blink) {
      const green = lastOdds < odds;
      const red = lastOdds > odds;
      const fade = lastOdds === odds;

      return classNames(base, {
        "bg-green-100": green && !isBetted,
        "bg-green-500": green && isBetted,
        "bg-red-100": red && !isBetted,
        "bg-red-500": red && isBetted,
        [currentBg]: fade
      })
    }
    return classNames(base, currentBg);
  }, [odds, lastOdds, isBetted]);

  return (
    <button className={className} onClick={handleClick}>
      {odds.toFixed(2)}
    </button>
  )
}

const _OddsItem: FC<{ oddsAddress: string; }> = ({ oddsAddress }) => {
  const oddsData = useAppSelector(selectOdds(oddsAddress));
  const currentBetOutcomeId = useAppSelector(selectBetOutcomeIdByGameId(oddsData.gameId));
  const isBetted = currentBetOutcomeId === oddsData.outcomeId;
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => dispatch(handleOddsClick({
    gameId: oddsData.gameId,
    outcomeId: oddsData.outcomeId
  })), [ oddsData.gameId, oddsData.outcomeId, dispatch ]);

  return (
    <Odds odds={oddsData.odds} lastOdds={oddsData.lastOdds} handleClick={handleClick} isBetted={isBetted} />
  )
}

export const OddsList: FC<{ oddsAddress: string[] }> = ({ oddsAddress }) => {
  return oddsAddress.map(x => <_OddsItem oddsAddress={x} key={x} />)
}

export default _OddsItem;

