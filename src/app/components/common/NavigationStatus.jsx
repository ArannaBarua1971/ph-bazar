import React from "react";
import Link from "next/link";
function NavigationStatus({category, categoryNameBn, nameBn }) {
  return (
    <div className="text-sm text-primary-text-color my-6">
      <Link href="/" className="hover:border-b-1 p-0">হোম</Link>
      <i className="fa-solid fa-chevron-right"></i>
      <Link href={`/category/${category}`} className="hover:border-b-1 p-0">{categoryNameBn}</Link>
      <i className="fa-solid fa-chevron-right"></i> {nameBn}
    </div>
  );
}

export default NavigationStatus;
