import React from "react";

function CardLayout({ children, style }) {
  return (
    <div
      className={`rounded-2xl border border-[#DDE5DF] bg-[#FCFEFC] p-4 shadow-sm sm:rounded-[24px] sm:p-5 md:p-6 ${style}`}
    >
      {children}
    </div>
  );
}

export default CardLayout;
