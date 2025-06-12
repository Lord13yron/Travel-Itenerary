import type { ReactNode } from "react";

type tooltipProps = {
  children: ReactNode;
  tooltipName: string;
  position: "top" | "bottom" | "left" | "right";
};

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  children,
  tooltipName,
  position,
}: tooltipProps) {
  const tooltipPosition = positionClasses[position] || positionClasses.top;

  return (
    <div className="contents group">
      <div className="relative">
        {children}
        {/* <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 -translate-x-1/2 mb-2  whitespace-nowrap z-10"> */}
        <div
          className={`absolute ${tooltipPosition}
            w-max max-w-xs px-2 py-1 rounded text-white bg-gray-800 text-xs 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 
            pointer-events-none`}
        >
          {tooltipName}
        </div>
      </div>
    </div>
  );
}
