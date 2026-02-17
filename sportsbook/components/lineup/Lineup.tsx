import classNames from "classnames";
import type { FC } from "react";
import { Match } from '../match/Match';
import { GB_ENG } from 'country-flag-icons/react/3x2'

export const Lineup: FC = () => {
  return (
    <section className="bg-background-main flex flex-col gap-2 w-full">
      <div className="bg-background-accent rounded-2xl p-4">
        <GB_ENG className="h-5 w-5 inline-block mr-2" /> Anglia - Premier League
      </div>
      <div className="flex flex-col mx-4 py-1">
        {([0, 1, 2, 3, 4, 5, 6]).map(() => <Match /> )}
      </div>
    </section>
  );
}

