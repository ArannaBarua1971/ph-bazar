import React from "react";

function CardLayout({ children }) {
  return (
    <div className=" rounded-[24px] border border-[#DDE5DF] bg-[#FCFEFC] p-6 shadow-sm">
      {children}
    </div>
  );
}

export default CardLayout;
