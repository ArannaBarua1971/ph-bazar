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
      <span className="font-bold text-primary-text-color">
        {productDetails.today > productDetails.yesterday
          ? "বেড়েছে"
          : productDetails.today < productDetails.yesterday
            ? "কমেছে"
            : "অপরিবর্তিত"}
      </span>
      {productDetails.today !== productDetails.yesterday && (
        <>
          {" "}
          ·{" "}
          {toBanglaNumber(
            Math.abs(productDetails.today - productDetails.yesterday),
          )}
        </>
      )}
    </>
  );

  const minPrice = Math.min(...productDetails.markets.map((m) => m.min));
  const maxPrice = Math.max(...productDetails.markets.map((m) => m.max));
  const avgPrice = productDetails.markets.length
    ? productDetails.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      productDetails.markets.length
    : 0;

  return (
    <div className="product_details mx-auto w-full max-w-7xl px-3 py-4 text-primary-text-color sm:px-6 sm:py-6 lg:px-8">
      <NavigationStatus
        category={productDetails.category}
        categoryNameBn={productDetails.categoryNameBn}
        nameBn={productDetails.nameBn}
      />

      <div className="product_context mx-auto mt-4 space-y-5 sm:mt-6 sm:space-y-6">
        <CardLayout style="!mb-0 !p-3 sm:!p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl sm:h-24 sm:w-24 sm:text-4xl">
                {productDetails.image}
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-xl font-bold sm:text-2xl">
                  {productDetails.nameBn}
                </h1>
                <p className="mt-1 text-xs text-secondary-text-color sm:text-sm">
                  প্রতি কেজি · {productDetails.categoryNameBn}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-secondary-text-color sm:text-sm">
                  গতকালের তুলনায় আজ দাম {diff} টাকা
                </p>
              </div>
            </div>

            <div className="w-full rounded-xl bg-secondary-text-color/10 px-4 py-4 text-center sm:w-auto sm:min-w-[180px] sm:px-6">
              <p className="text-xs text-secondary-text-color">আজকের দাম</p>
              <p className="my-1 text-3xl font-bold sm:text-4xl">
                {toBanglaNumber(productDetails.today)}
              </p>
              <p className="text-xs text-secondary-text-color">টাকা / কেজি</p>
              <div className="mt-2">
                <ProductStatus
                  today={productDetails.today}
                  yesterday={productDetails.yesterday}
                />
              </div>
            </div>
          </div>
        </CardLayout>
 
        <CardLayout style="!p-3 sm:!p-5 mt-6">
          <h2 className="mb-4 text-base font-semibold sm:text-lg">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-secondary-text-color">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-bold text-primary-color sm:text-2xl">
                {toBanglaNumber(minPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-secondary-text-color">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-secondary-text-color">সর্বাধিক দাম</p>
              <p className="mt-1 text-xl font-bold text-seondary-color sm:text-2xl">
                {toBanglaNumber(maxPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-secondary-text-color">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-xs text-secondary-text-color">গড় দাম</p>
              <p className="mt-1 text-xl font-bold text-primary-color sm:text-2xl">
                {toBanglaNumber(avgPrice.toFixed(0))}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-secondary-text-color">
                বাজারগুলোর গড় দাম, প্রতি কেজি
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-6 text-base font-semibold sm:text-lg">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200 ">
            <table className="w-full min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 font-bold text-primary-text-color">
                  <th className="px-3 py-3 text-left sm:px-4">বাজার</th>
                  <th className="px-3 py-3 text-left sm:px-4">বিভাগ</th>
                  <th className="px-3 py-3 text-right sm:px-4">সর্বনিম্ন</th>
                  <th className="px-3 py-3 text-right sm:px-4">সর্বাধিক</th>
                  <th className="px-3 py-3 text-right sm:px-4">গড়</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.markets.map((m, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 even:bg-primary-color/5"
                  >
                    <td className="px-3 py-3 font-medium sm:px-4">
                      {m.market}
                    </td>
                    <td className="px-3 py-3 text-secondary-text-color sm:px-4">
                      {m.division}
                    </td>
                    <td className="px-3 py-3 text-right text-secondary-text-color sm:px-4">
                      {toBanglaNumber(m.min)} টাকা
                    </td>
                    <td className="px-3 py-3 text-right text-secondary-text-color sm:px-4">
                      {toBanglaNumber(m.max)} টাকা
                    </td>
                    <td className="px-3 py-3 text-right font-bold sm:px-4">
                      {toBanglaNumber(((m.min + m.max) / 2).toFixed(0))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardLayout>
      </div>
    </div>
  );
}

export default page;
