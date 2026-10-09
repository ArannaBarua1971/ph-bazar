"use client"
import { date } from "@/functions/date";
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
    <CardLayout style="flex justify-between">
      <div className="content  ">
        <Badge
          style={
            "text-[14px] font-medium text-primary-color bg-primary-color/10 inline "
          }
        >
          {date()}
        </Badge>
        <TitleHeader
          title={"আজকের বাজারের দাম এক নজরে"}
          titleStyle={"text-[36px] font-bold mb-4"}
          subtitle={
            "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।"
          }
          subtitleStyle="w-[70%]"
        />
        <Button submit={handleSubmit} style={"mt-10 "}>
          সব পণ্য দেখুন
        </Button>
      </div>
      <div className="bannerImg">
        <img src="./bazar-hero.png" />
      </div>
    </CardLayout>
  );
}

export default HeroBanner;
