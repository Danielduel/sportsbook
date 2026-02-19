import { ApplicationShell } from "@/components/application-shell/ApplicationShell";
import { Coupon } from "@/components/coupon/Coupon";
import { Game } from "@/components/game/Game";

export default function Home() {
  return (
    <ApplicationShell>
      <Game />
      <Coupon />
    </ApplicationShell>
  );
}
