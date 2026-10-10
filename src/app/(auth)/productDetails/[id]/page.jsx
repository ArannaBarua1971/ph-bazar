import CardLayout from "@/app/components/card_design/CardLayout";
import NavigationStatus from "@/app/components/common/NavigationStatus";
import ProductStatus from "@/app/components/common/ProductStatus";
import { getData } from "@/functions/ApiCall";
import { toBanglaNumber } from "@/functions/helper";

async function page({ params }) {
  const { id } = await params;
  const productDetails = await getData(`products/${id}`);

  const diff = (
    <>
      {productDetails.today > productDetails.yesterday ? (
        <>
          <span className="font-bold text-primary-text-color"> বেড়েছে</span>·{" "}
          {productDetails.today - productDetails.yesterday}
        </>
      ) : (
        <>
          <span className="font-bold text-primary-text-color"> কমেছে</span>·{" "}
          {productDetails.yesterday - productDetails.today}
        </>
      )}
    </>
  );
  const minPrice=Math.max(...productDetails.markets.map(m=> m.min));
  const maxPrice=Math.max(...productDetails.markets.map(m=> m.max))

  return (
    <div className="product_details p-4 text-primary-text-color sm:p-6">
      <NavigationStatus category={productDetails.category} categoryNameBn={productDetails.categoryNameBn} nameBn={productDetails.nameBn}/>
      <div className="product_context mx-auto ">
        <CardLayout style={"mb-10"}>
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
                {productDetails.image}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{productDetails.nameBn}</h1>
                <p className="text-xs text-secondary-text-color">
                  প্রতি কেজি · চাল
                </p>
                <p className="mt-1 text-xs text-secondary-text-color">
                  গতকালের তুলনায় আজ দাম
                  {diff} টাকা
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-secondary-text-color/10 px-6 py-4 text-center">
              <p className="text-xs text-secondary-text-color">আজকের দাম</p>
              <p className="text-3xl font-bold">{productDetails.today}</p>
              <p className="text-xs text-secondary-text-color">টাকা / কেজি</p>

              <ProductStatus
                today={productDetails.today}
                yesterday={productDetails.yesterday}
              />
            </div>
          </div>
        </CardLayout>

        <CardLayout>
          <div className="p-5">
            <h2 className="mb-4 text-base font-semibold">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-[11px] text-secondary-text-color">
                  সর্বনিম্ন দাম
                </p>
                <p className="mt-1 text-2xl font-bold text-primary-color">
                  {toBanglaNumber(minPrice)} <span className="text-sm font-medium">টাকা</span>
                </p>
                <p className="mt-1 text-[11px] text-secondary-text-color">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-[11px] text-secondary-text-color">
                  সর্বাধিক দাম
                </p>
                <p className="mt-1 text-2xl font-bold text-seondary-color">
                  {toBanglaNumber(maxPrice)} <span className="text-sm font-medium">টাকা</span>
                </p>
                <p className="mt-1 text-[11px] text-secondary-text-color">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-[11px] text-secondary-text-color">গড় দাম</p>
                <p className="mt-1 text-2xl font-bold text-primary-color">
                  {toBanglaNumber(((maxPrice+minPrice)/2).toFixed(0))} <span className="text-sm font-medium">টাকা</span>
                </p>
                <p className="mt-1 text-[11px] text-secondary-text-color">
                  প্রতি কেজি-এর হিসাবে
                </p>
              </div>
            </div>

            <h2 className="mb-3 mt-6 text-base font-semibold">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-sm font-bold text-primary-text-color">
                    <th className="px-4 py-3 text-left">বাজার</th>
                    <th className="px-4 py-3 text-left">বিভাগ</th>
                    <th className="px-4 py-3 text-right">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-3 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.markets.map((m,index) => (
                    <tr key={index} className="border-t border-gray-300 bg-white even:bg-primary-color/8 odd:border-b-2 border-b-primary-text-color">
                      <td className="px-4 py-3 font-medium">{m.market}</td>
                      <td className="px-4 py-3 text-secondary-text-color">
                        {m.division}
                      </td>
                      <td className="px-4 py-3 text-right text-secondary-text-color">
                        {toBanglaNumber(m.min)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right text-secondary-text-color">
                        {toBanglaNumber(m.max)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-bold">
                        {toBanglaNumber(((m.min+m.max)/2).toFixed(0))} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
}

export default page;
