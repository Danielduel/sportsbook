"use client";

import { ApplicationShell } from "@/components/application-shell/ApplicationShell";
import { Coupon } from "@/components/coupon/Coupon";
import Game from "@/components/game/Game";
import { selectKeys } from "@/components/game/Game.slice";
import { useAppSelector } from "@/state/hooks";

export default function Home() {
  const gameTypes = useAppSelector(selectKeys);

  gameTypes.map(gameType => <Game gameType={gameType} />)


  return (
    <ApplicationShell>
      <div>
        <Game gameType={1} />
      </div>
      <Coupon />
    </ApplicationShell>
  );
}
