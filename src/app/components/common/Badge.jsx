import React from "react";

function Badge({ children, style }) {
  return (
    <div
      className={`inline-flex max-w-full items-center rounded-2xl px-2 py-1 text-xs sm:px-3 sm:text-sm ${style}`}
    >
      {children}
    </div>
  );
}

export default Badge;
