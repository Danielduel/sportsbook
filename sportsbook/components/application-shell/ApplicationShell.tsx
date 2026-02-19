import { FC } from "react";
import { Game } from "../game/Game";
import { Coupon } from "../coupon/Coupon";

export const ApplicationShell: FC = () => {
  return (
    <main className="max-h-dvh h-dvh max-w-dvw w-dvw relative grid max-desktop:grid-rows-[calc(100dvh-5rem)_5rem] desktop:grid-cols-[1fr_25rem] desktop:gap-4 max-desktop:overflow-hidden">
      <Game />
      <Coupon />
    </main>
  );
}
