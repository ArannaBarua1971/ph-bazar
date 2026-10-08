import CardLayout from "./CardLayout";

function ProductCard({data}) {

  const rateStatus= data.today>data.yesterday
  const rateValue=Math.abs(((data.today-data.yesterday)/data.yesterday)*100 ).toFixed(1)
  const toBanglaNumber = (number) =>
    String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
  return (
    <CardLayout>
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-[18px] bg-[#F1F5F1] text-4xl">
          {data.image}
        </div>

        <div>
          <h3 className="text-[18px] font-semibold text-primary-text-color">{data.nameBn}</h3>
          <p className="text-[12px] text-secondary-text-color">প্রতি কেজি</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[12px] text-primary-text-color">আজকের দাম</p>
          <p className="text-[20px] font-bold text-primary-text-color">
            {toBanglaNumber(data.today)} 
            <span className="text-[14px] ms-1 font-medium">টাকা</span> 
          </p>
        </div>

        <div className={`rounded-full bg-[#F1F5F1] px-3 py-1 flex justify-center text-[12px] font-semibold ${rateStatus?"text-seondary-color":data.today==data.yesterday?"text-primary-text-color":"text-primary-color"}`}>
          <span className="font-semibold text-[12px] me-1">{rateStatus?"▲":data.today==data.yesterday?"—":"▼"}</span>
          {
           toBanglaNumber(rateValue)
          }%
        </div>
      </div>
    </CardLayout>
  );
}

export default ProductCard;
