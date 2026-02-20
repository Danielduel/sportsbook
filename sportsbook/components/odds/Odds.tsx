import { FC, useMemo } from "react"
import { OddsItem, selectOdds } from "./Odds.slice"
import { useAppSelector } from "@/state/hooks"
import classNames from "classnames";

type OddsProps = OddsItem;

export const Odds: FC<OddsProps> = ({ odds, lastOdds }) => {
  const className = useMemo(() => {
    const base = "not-first:ml-2 text-sm py-3 px-4 w-16 inline-block rounded transition-colors";
    const blink = typeof lastOdds === "number";
    if (blink) {
      const green = lastOdds < odds;
      const red = lastOdds > odds;
      const fade = lastOdds === odds;

      return classNames(base, {
        "bg-green-100": green,
        "bg-red-100": red,
        "bg-background-accent": fade 
      })
    }
    return classNames(base, "bg-background-accent");
  }, [odds, lastOdds])


  return (
    <button className={className}>
      {odds.toFixed(2)}
    </button>
  )
}

const _OddsItem: FC<{ oddsAddress: string; }> = ({ oddsAddress }) => {
  const oddsData = useAppSelector(selectOdds(oddsAddress));

  return (
    <Odds {...oddsData} />
  )
}

export const OddsList: FC<{oddsAddress: string[]}> = ({ oddsAddress }) => {
  return oddsAddress.map(x => <_OddsItem oddsAddress={x} key={x} />)
}

export default _OddsItem;

