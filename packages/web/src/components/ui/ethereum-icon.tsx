import React, { forwardRef } from "react";

export const EthereumIcon = forwardRef<
  SVGSVGElement,
  React.SVGAttributes<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      width="320"
      height="512"
      viewBox="0 0 320 512"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      stroke="currentColor"
      strokeWidth={0}
      fill="currentColor"
      {...props}
    >
      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
    </svg>
  );
});
EthereumIcon.displayName = "EthereumIcon";
