import React from "react";
import Link from "next/link";
function NavigationStatus({ category, categoryNameBn, nameBn }) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-2 text-xs text-primary-text-color sm:my-6 sm:gap-3 sm:text-sm">
      <Link href="/" className="p-0 transition hover:underline">
        হোম
      </Link>
      <i className="fa-solid fa-chevron-right text-[9px] opacity-60"></i>
      <Link
        href={`/category/${category}`}
        className="p-0 transition hover:underline"
      >
        {categoryNameBn}
      </Link>
      <i className="fa-solid fa-chevron-right text-[9px] opacity-60"></i>
      <span className="break-words">{nameBn}</span>
    </div>
  );
}

export default NavigationStatus;
