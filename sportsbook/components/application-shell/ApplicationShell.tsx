import { FC } from "react";
import { Game } from "../game/Game";
import { Coupon } from "../coupon/Coupon";

export const ApplicationShell: FC = () => {
  return (
    <main className="max-h-dvh h-dvh relative grid grid-cols-[1fr_25rem] gap-4">
      <Game />
      <Coupon />
    </main>
  );
}
