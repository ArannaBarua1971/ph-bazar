import { rateValue, toBanglaNumber } from "@/functions/helper";
import CardLayout from "./CardLayout";
import Link from "next/link";
function ProductCard({ data }) {
  const rateStatus = data.today > data.yesterday;

  return (
    <Link href={`/productDetails/${data.id}`} className="block h-full">
      <CardLayout style="h-full !p-3 sm:!p-5">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F1] text-3xl sm:h-20 sm:w-20 sm:rounded-[18px] sm:text-4xl">
            {data.image}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-base font-semibold text-primary-text-color sm:text-[18px]">
              {data.nameBn}
            </h3>
            <p className="mt-1 text-[11px] text-secondary-text-color sm:text-[12px]">
              প্রতি কেজি
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 sm:mt-5">
          <div className="min-w-0">
            <p className="text-[11px] text-primary-text-color sm:text-[12px]">
              আজকের দাম
            </p>
            <p className="text-lg font-bold text-primary-text-color sm:text-[20px]">
              {toBanglaNumber(data.today)}
              <span className="ms-1 text-xs font-medium sm:text-[14px]">
                টাকা
              </span>
            </p>
          </div>

          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-[#F1F5F1] px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-[12px] ${
              rateStatus
                ? "text-seondary-color"
                : data.today === data.yesterday
                  ? "text-primary-text-color"
                  : "text-primary-color"
            }`}
          >
            <span className="me-1 text-[10px] font-semibold sm:text-[12px]">
              {rateStatus ? "▲" : data.today === data.yesterday ? "—" : "▼"}
            </span>
            {toBanglaNumber(rateValue(data.today, data.yesterday))}%
          </div>
        </div>
      </CardLayout>
    </Link>
  );
}

export default ProductCard;
