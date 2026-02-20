"use client";

import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "@/state/hooks";
import { selectExpanded } from "./ApplicationShell.slice";
import classNames from "classnames";

export const ApplicationShell: FC<PropsWithChildren> = ({ children }) => {
  const expanded = useAppSelector(selectExpanded);

  const className = classNames("max-h-dvh h-dvh max-w-dvw w-dvw relative grid desktop:grid-cols-[1fr_25rem] desktop:gap-4 max-desktop:overflow-hidden", {
    "max-desktop:grid-rows-[calc(100dvh-5rem)_5rem]": !expanded,
    "max-desktop:grid-rows-[1fr_90dvh]": expanded,
  });

  return (
    <main className={className}>
      {children}
    </main>
  );
}
