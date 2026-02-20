"use client";

import { Children, FC, PropsWithChildren, useCallback, useMemo } from "react";
import { Bet, BetList } from "./Bet";
import { TrashIcon } from "../icons/Trash";
import classNames from "classnames";
import { Chevron } from "../icons/Chevron";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { toggle, selectExpanded } from "../application-shell/ApplicationShell.slice";

type CouponControlsTabItemProps = {
  active?: boolean;
}
const CouponControlsTabItem: FC<PropsWithChildren<CouponControlsTabItemProps>> = ({ children, active }) => {
  const cn = classNames("text-center py-1 rounded-t text-xs", {
    "text-text-main bg-background-main": active,
    "text-text-control-fade font-light": !active
  })
  return (
    <button className={cn}>{children}</button>
  );
}

const CouponControlsTabs: FC = () => {
  return (
    <div className="grid grid-cols-[repeat(3,calc(100%/3))] pt-0.5">
      <CouponControlsTabItem>Prosty</CouponControlsTabItem>
      <CouponControlsTabItem active>Akumulator</CouponControlsTabItem>
      <CouponControlsTabItem>Systemowy</CouponControlsTabItem>
    </div>
  )
}

const CouponControlRow: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-between items-center">
      {children}
    </div>
  )
}

const CouponControlInput: FC = () => {
  return (
    <label htmlFor="bet_amount" className="text-text-main border border-border-fade rounded-2xl p-2.5">
      <input id="bet_amount" className="focus:outline-0 font-normal" />
      <label htmlFor="bet_amount" className="text-text-control-fade">EUR</label>
    </label>
  )
}

const CouponControls: FC = () => {
  return (
    <div>
      <CouponControlsTabs />
      <div className="bg-background-main">
        <div className="text-xs font-light px-3 grid grid-rows-3 items-center py-2.5">
          <CouponControlRow>
            <span>Stawka</span>
            <CouponControlInput />
          </CouponControlRow>
          <CouponControlRow>
            <span>Kurs całkowity</span>
            <span className="text-text-primary bg-background-primary px-2 py-1 rounded-xl font-bold">10.40</span>
          </CouponControlRow>
          <CouponControlRow>
            <span>Możliwa wygrana</span>
            <span className="font-bold">€260.00</span>
          </CouponControlRow>
        </div>
        <div className="w-full p-2.5 relative">
          <button className="bg-background-primary text-text-primary w-full rounded-2xl uppercase py-2.5">
            Postaw zakład
          </button>
        </div>
      </div>
    </div>
  );
}

const CouponHeader: FC = () => {
  const expanded = useAppSelector(selectExpanded);
  const dispatch = useAppDispatch();
  const _toggle = useCallback(() => dispatch(toggle()), [dispatch]);
  const toggleChevronClassName = useMemo(() => classNames("h-5 fill-white inline-block", {
    "rotate-270": !expanded,
    "rotate-90": expanded
  }), [expanded]);

  return (
    <div className="uppercase text-xl desktop:text-lg text-text-primary bg-background-primary text-center py-2">
      Kupon&nbsp;
      <span className="text-text-secondary">
        (3)
      </span>
      <button className="absolute right-20 desktop:hidden" onClick={_toggle}>
        <Chevron className={toggleChevronClassName} />
      </button>
      <button className="absolute right-7">
        <TrashIcon className="h-5 fill-white inline-block" />
      </button>
    </div>
  );
}

export const Coupon: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="desktop:h-full">
      <div className="desktop:h-dvh max-desktop:h-dvh p-2.5 desktop:sticky desktop:top-0">
        <div className="overflow-hidden rounded-lg border border-border-modal bg-background-modal flex flex-col h-full">
          <CouponHeader />
          <div className="overflow-auto flex-1">
            <div className="flex flex-col p-1 gap-1 text-text-control-fade bg-background-control-fade">
              {children} 
            </div>
          </div>
          <div className="shrink-0 w-full">
            <CouponControls />
          </div>
        </div>
      </div>
    </div>
  )
}

const _Coupon = () => (
  <Coupon>
    <BetList />
  </Coupon>
);

export default _Coupon;
