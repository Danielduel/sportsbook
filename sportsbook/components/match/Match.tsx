import { useAppSelector } from "@/state/hooks";
import classNames from "classnames";
import { useMemo, type FC, type PropsWithChildren } from "react";
import { MatchItem, selectMatch } from "./Match.slice";
import OddsItem, { OddsList } from "../odds/Odds";
import { selectOddsAddressesForMatch } from "../odds/Odds.slice";

type CellProps = PropsWithChildren<{
  fullWidth?: boolean;
}>
const Cell: FC<CellProps> = ({ children, fullWidth }) => {
  const cn = classNames("first:border-r first:pr-2 border-background-accent", {
    "flex-1": fullWidth
  })
  return (
    <div className={cn}>
      {children}
    </div>
  );
}

export const ExtraGames: FC = () => {
  return (
    <button className="not-first:ml-2 text-sm py-2 px-2 inline-block bg-background-main border border-background-accent rounded box-border w-12 h-12">
      59+
    </button>
  )
}
type MatchProps = MatchItem;
export const MatchTimeFormat = new Intl.DateTimeFormat("pl-PL", {
  hour: "2-digit",
  minute: "2-digit",

  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});
export const Match: FC<PropsWithChildren<MatchProps>> = ({
  children,
  eventStart,
  eventParticipant1,
  eventParticipant2
}) => {
  const [day, , month, , year, , hour, , minute] = useMemo(() => {
    return MatchTimeFormat.formatToParts(eventStart);
  }, [eventStart]).map(x => x.value)

  return (
    <li className="bg-background-main flex flex-row gap-4 w-full justify-center leading-none py-1 not-first:border-t border-background-accent">
      <Cell>
        <span className="text-xs">
          {hour}:{minute} <br />
          {day}/{month}/{year}
        </span>
      </Cell>
      <Cell fullWidth>
        <span className="text-sm">
          {eventParticipant1}<br />
          {eventParticipant2}
        </span>
      </Cell>
      <Cell>
        {children}
        <ExtraGames />
      </Cell>
    </li>
  );
}

const _Match: FC<{ matchAddress: string; }> = ({ matchAddress }) => {
  const matchData = useAppSelector(selectMatch(matchAddress));
  const oddsForMatch = useAppSelector(selectOddsAddressesForMatch(matchData));

  return (
    <Match {...matchData}> 
      <OddsList oddsAddress={oddsForMatch} />
    </Match>
  );
}

export const MatchList: FC<{matchAddress: string[]}> = ({ matchAddress }) => {
  return matchAddress.map((x) => <_Match matchAddress={x} key={x} />);
}

export default _Match;
