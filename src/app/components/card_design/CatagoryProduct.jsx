"use client";

import { useState } from "react";
import CardLayout from "./CardLayout";
import ProductCard from "./ProductCard";
import { toBanglaNumber } from "@/functions/helper";

function CatagoryProduct({ ProductInfo, requireProducts }) {
  const [sort, setSort] = useState("default");
  const products=[...requireProducts].sort((a,b)=>{
    if(sort=="down") return a.today-b.today;
    if(sort=="up") return b.today-a.today;
  })

  return (
    <main className="px-3 py-3 text-primary-text-color sm:px-6 mt-6">
      <div className="mx-auto space-y-6">
        <CardLayout style="!rounded-xl !p-4 !shadow-none">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center text-2xl">
              {ProductInfo.icon}
            </div>
            <div>
              <h1 className="text-lg font-bold">{ProductInfo.nameBn}</h1>
              <p className="text-xs text-secondary-text-color">
                {toBanglaNumber(requireProducts.length)}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
        </CardLayout>

        <CardLayout style="!rounded-xl !px-4 !py-3 !shadow-none">
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-secondary-text-color">সাজান</span>
            <select onChange={(e)=>setSort(e.target.value)} className="rounded-lg border border-[#D6DED8] bg-transparent px-2 py-1.5 text-xs outline-none">
              <option value={"default"}>ডিফল্ট</option>
              <option value={"down"}> দাম: কম থেকে বেশি</option>
              <option value={"up"}>দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </CardLayout>

        <p className="text-xs text-secondary-text-color">
          মোট {toBanglaNumber(requireProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CatagoryProduct;
