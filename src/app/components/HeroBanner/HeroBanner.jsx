"use client";
import { date } from "@/functions/helper";
import CardLayout from "../card_design/CardLayout";
import Badge from "../common/Badge";
import TitleHeader from "../common/TitleHeader";
import Button from "../common/Button";
function HeroBanner() {
  const handleSubmit = () => {
    document.getElementById("allproduct")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <CardLayout style="mt-6 flex flex-col items-center justify-between gap-8 overflow-hidden p-4 sm:p-6 md:flex-row md:p-8">
      <div className="content w-full min-w-0 md:w-1/2">
        <Badge style="inline text-[12px] font-medium text-primary-color bg-primary-color/10 sm:text-[14px]">
          {date()}
        </Badge>
        <TitleHeader
          title={"আজকের বাজারের দাম এক নজরে"}
          titleStyle="mb-4 text-2xl font-bold sm:text-3xl md:text-[36px]"
          subtitle={
            "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।"
          }
          subtitleStyle="w-full text-sm sm:text-base md:w-[90%]"
        />
        <Button submit={handleSubmit} style="mt-6 sm:mt-10">
          সব পণ্য দেখুন
        </Button>
      </div>
      <div className="bannerImg flex w-full justify-center md:w-1/2">
        <img
          src="./bazar-hero.png"
          alt="আজকের বাজার"
          className="h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    </CardLayout>
  );
}

export default HeroBanner;
