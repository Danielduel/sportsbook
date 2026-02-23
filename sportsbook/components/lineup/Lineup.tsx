import type { FC, PropsWithChildren } from "react";
import { MatchList } from '../match/Match';
import { ES, GB_ENG } from 'country-flag-icons/react/3x2'
import { LineupItem, selectLineup } from "./Lineup.slice";
import { useAppSelector } from "@/state/hooks";
import { selectMatchAddressesForLineup } from "../match/Match.slice";

const FlagIcon: FC<{ category2Name: string; }> = ({ category2Name }) => {
  switch (category2Name) {
    case "Anglia": return <GB_ENG className="h-5 w-5 inline-block mr-2" />;
    case "Hiszpania": return <ES className="h-5 w-5 inline-block mr-2" />;
    default: return null;
  }
}

type LineupProps = Pick<LineupItem, "category2Name" | "category3Name">;
export const Lineup: FC<PropsWithChildren<LineupProps>> = ({
  children,
  category2Name,
  category3Name,
}) => {
  return (
    <section className="bg-background-main flex flex-col gap-2 w-full">
      <div className="bg-background-accent rounded-2xl p-4">
        <FlagIcon category2Name={category2Name} /> {category2Name} - {category3Name}
      </div>
      <div className="flex flex-col mx-4 py-1">
        {children}
      </div>
    </section>
  );
}

const LineupWithStore: FC<{ lineupAddress: string }> = ({ lineupAddress }) => {
  const lineupData = useAppSelector(selectLineup(lineupAddress));
  const matchesForLineup = useAppSelector(selectMatchAddressesForLineup(lineupData));
  return (
    <Lineup category2Name={lineupData.category2Name} category3Name={lineupData.category3Name}>
      <MatchList matchAddress={matchesForLineup} />
    </Lineup>
  );
}

export const LineupList: FC<{ lineupAddress: string[] }> = ({ lineupAddress }) => {
  return lineupAddress.map(x => <LineupWithStore lineupAddress={x} key={x} />)
}

export default LineupWithStore;

