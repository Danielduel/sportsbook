
import type { FC, HTMLAttributes } from "react";

// source https://www.svgrepo.com/svg/521590/cross

export const CrossIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} fill="current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd" />
    </svg>
  );
}
