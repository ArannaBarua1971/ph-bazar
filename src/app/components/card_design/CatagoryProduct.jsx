"use client";

import { useState } from "react";
import CardLayout from "./CardLayout";
import ProductCard from "./ProductCard";
import { toBanglaNumber } from "@/functions/helper";

function CatagoryProduct({ ProductInfo, requireProducts }) {
  const [sort, setSort] = useState("default");
  const products = [...requireProducts].sort((a, b) => {
    if (sort == "down") return a.today - b.today;
    if (sort == "up") return b.today - a.today;
  });

  return (
    <main className="mt-4 px-3 py-3 text-primary-text-color sm:mt-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6">
        <CardLayout style="!rounded-xl !p-3 !shadow-none sm:!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl sm:h-12 sm:w-12 sm:text-3xl">
              {ProductInfo.icon}
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold sm:text-lg">
                {ProductInfo.nameBn}
              </h1>
              <p className="mt-1 text-xs leading-relaxed text-secondary-text-color sm:text-sm">
                {toBanglaNumber(requireProducts.length)}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
        </CardLayout>

        <CardLayout style="!rounded-xl !px-3 !py-3 !shadow-none sm:!px-4 ">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end sm:gap-3">
            <span className="text-xs text-secondary-text-color sm:text-sm">
              সাজান
            </span>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="max-w-full rounded-lg border border-[#D6DED8] bg-transparent px-2 py-2 text-xs outline-none focus:border-primary-color sm:text-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="down">দাম: কম থেকে বেশি</option>
              <option value="up">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </CardLayout>

        <p className="text-xs text-secondary-text-color sm:text-sm ">
          মোট {toBanglaNumber(requireProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CatagoryProduct;
