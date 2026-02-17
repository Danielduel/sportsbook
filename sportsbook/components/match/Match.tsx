import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

type CellProps = PropsWithChildren<{
  fullWidth?: boolean;
}>
const Cell: FC<CellProps> = ({ children, fullWidth }) => {
  const cn = classNames("first:border-r first:pr-2 border-background-accent", {
    "flex-1": fullWidth
  })
  return (
    <div className={cn}>
      {children}
    </div>
  );
}

const OddsItem: FC = () => {
  return (
    <button className="not-first:ml-2 text-sm py-3 px-4 inline-block bg-background-accent rounded">
      2.52
    </button>
  )
}

const OddsExtraItem: FC = () => {
  return (
    <button className="not-first:ml-2 text-sm py-2 px-2 inline-block bg-background-main border border-background-accent rounded box-border w-12 h-12">
      59+
    </button> 
  )
}

export const Match: FC = () => {
  return (
    <li className="bg-background-main flex flex-row gap-4 w-full justify-center leading-none py-1 not-first:border-t border-background-accent">
      <Cell>
        <span className="text-xs">
          21:15 <br />
          07/01/26
        </span>
      </Cell>
      <Cell fullWidth>
        <span className="text-sm">
          Newcastle United<br />
          Leeds
        </span>
      </Cell>
      <Cell>
        {([0, 1, 2]).map(() => <OddsItem />)}
        <OddsExtraItem />
      </Cell>
    </li>
  );
}
