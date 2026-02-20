"use client";

import { ApplicationShell } from "@/components/application-shell/ApplicationShell";
import Coupon from "@/components/coupon/Coupon";
import { GameList } from "@/components/game/Game";

export default function Home() {

  return (
    <ApplicationShell>
      <div>
        <GameList />
      </div>
      <Coupon />
    </ApplicationShell>
  );
}
