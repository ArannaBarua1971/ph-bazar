import { getData } from "@/functions/ApiCall";
import { rateValue, toBanglaNumber } from "@/functions/helper";
import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import ProductStatus from "../common/ProductStatus";
async function LatestProductUpdate() {
  const products = await getData("products");

  const allproducts = products?.slice(0, 20);
  return (
    <div className="sticky top-0 z-50 w-full overflow-hidden bg-white">
      <Marquee pauseOnHover={true}>
        {allproducts.map((p) => (
          <Link
            href={`/productDetails/${p.id}`}
            className="bg-white border-2 border-s-0 px-3 sm:px-5 py-2 border-secondary-text-color/20 text-xs sm:text-[14px] whitespace-nowrap inline-flex items-center"
            key={p.id}
          >
            {p.image} {p.nameBn}{" "}
            <span className="mx-2">{toBanglaNumber(p.today)} টাকা/কেজি</span>
            <ProductStatus today={p.today} yesterday={p.yesterday} />
          </Link>
        ))}
      </Marquee>
    </div>
  );
}

export default LatestProductUpdate;
