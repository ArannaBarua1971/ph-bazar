import { getData } from "@/functions/ApiCall";
import { rateValue, toBanglaNumber } from "@/functions/helper";
import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import ProductStatus from "../common/ProductStatus";
async function LatestProductUpdate() {
  const products = await getData("products");

  const allproducts = products.slice(0, 20);
  return (
    <Marquee  pauseOnHover={true}>
      {allproducts.map((p) => (
        <Link
          href={`/productDetails/${p.id}`}
          className="bg-white border-2 border-s-0  px-5 py-1 border-secondary-text-color/20 text-[14px]"
          key={p.id}
        >
          {p.image} {p.nameBn}{" "}
          <span className="mx-2">{toBanglaNumber(p.today)} টাকা/কেজি</span>
          <ProductStatus today={p.today}yesterday={p.yesterday}/>
        </Link>
      ))}
    </Marquee>
  );
}

export default LatestProductUpdate;
