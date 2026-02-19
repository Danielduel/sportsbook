import { memo, type FC } from "react";
import { Lineup } from '../lineup/Lineup';
import { Chevron } from "../icons/Chevron";

export const Game: FC = () => {
  return (
    <section className="bg-background-main flex flex-col w-full desktop:m-2.5 overflow-auto">
      <div className="bg-background-primary text-text-primary desktop:rounded-2xl p-4 flex items-center sticky top-0">
        <div className="flex-1">
          <i className="icon-soccer text-green-500" />&nbsp;Piłka nożna
        </div>
          <div className="py-2 px-8 bg-background-highlight text-text-hightlight overflow-hidden h-8 leading-[2rem] box-content rounded-xl w-full max-w-40 text-justify inline-block after:w-full after:inline-block after:content[''] ">
            1 x 2
          </div>
          <button className="w-5 ml-5">
            <Chevron className="stroke-text-primary fill-text-primary rotate-270" />
          </button>
      </div>
      <div className="flex flex-col py-1">
        {([0, 1, 2, 3, 4, 5, 6]).map(() => <Lineup /> )}
      </div>
    </section>
  );
}

