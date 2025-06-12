// type ButtonProps = {
//   children: React.ReactNode;
//   type: "primary" | "transparent" | "secondary";
//   onClick?: () => void;
// };

import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "primary" | "transparent" | "secondary" | "success";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-sky-800 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-sky-700 transition duration-200 text-sm ",
    transparent:
      "py-1 hover:cursor-pointer hover:border-b-2 hover:border-purple-200 transition duration-200 uppercase text-sm font-semibold",
    secondary:
      "bg-orange-600 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-orange-500 transition duration-200 text-sm ",
    success:
      "bg-green-700 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-green-500 transition duration-200 text-sm ",
  };

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}
