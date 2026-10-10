import { rateValue, toBanglaNumber } from "@/functions/helper";
import React from "react";

function ProductStatus({ today, yesterday }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap text-xs sm:text-sm ${
        today > yesterday
          ? "text-seondary-color"
          : today === yesterday
            ? "text-primary-text-color"
            : "text-primary-color"
      }`}
    >
      <span className="me-1 text-[10px] font-semibold sm:text-[12px]">
        {today > yesterday ? "▲" : today === yesterday ? "—" : "▼"}
      </span>
      {toBanglaNumber(rateValue(today, yesterday))}%
    </span>
  );
}

export default ProductStatus;
