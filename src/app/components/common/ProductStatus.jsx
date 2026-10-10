import { rateValue, toBanglaNumber } from "@/functions/helper";
import React from "react";

function ProductStatus({today,yesterday}) {
  return (
    <span
      className={`${today > yesterday ? "text-seondary-color" : today == yesterday ? "text-primary-text-color" : "text-primary-color"}`}
    >
      <span className="font-semibold text-[12px] me-1">
        {today > yesterday ? "▲" : today ==yesterday ? "—" : "▼"}
      </span>
      {toBanglaNumber(rateValue(today,yesterday))}%
    </span>
  );
}

export default ProductStatus;
