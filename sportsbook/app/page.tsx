"use client";

import { ApplicationShell } from "@/components/application-shell/ApplicationShell";
import Coupon from "@/components/coupon/Coupon";
import { GameList } from "@/components/game/Game";

export default function Home() {

  return (
    <ApplicationShell>
      <section className="bg-background-main flex flex-col w-full desktop:m-2.5 overflow-auto">
        <GameList />
      </section>
      <Coupon />
    </ApplicationShell>
  );
}
