import clsx from "clsx";
import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const PrimaryButton = ({ ...props }: PrimaryButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      className={clsx(
        "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600",
        props.className ?? ""
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
