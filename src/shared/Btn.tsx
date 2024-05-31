import { ReactNode } from "react";

export default function Btn({
  children,
  clickFunc,
}: {
  children: ReactNode;
  clickFunc?: () => void;
}) {
  return (
    <button
      onClick={clickFunc}
      className="flex justify-center items-center gap-3 px-3 py-2 shadow-md rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all"
    >
      {children}
    </button>
  );
}
