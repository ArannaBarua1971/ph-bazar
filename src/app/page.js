import { getData } from "@/functions/ApiCall";
import ProductCard from "./components/card_design/ProductCard";
import TitleHeader from "./components/common/TitleHeader";

export default async function Home() {
  const products = await getData("products");

  const priceUpProducts = products
    .filter((p) => p.today > p.yesterday)
    .slice(0, 6);
  const priceDownProducts = products
    .filter((p) => p.today < p.yesterday)
    .slice(0, 6);
  const allproducts = products.slice(0, 33);
  return (
    <div>
      <div className="priceUPsection my-8">
        <TitleHeader
          title={
            <>
              <span className="text-seondary-color me-1">▲</span>আজ দাম বেড়েছে
            </>
          }
        />
        <div className="grid grid-cols-3 gap-[17px]">
          {priceUpProducts.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>
      <div className="priceDownsection my-8">
        <TitleHeader
          title={
            <>
              <span className="text-primary-color me-1">▼</span>আজ দাম কমেছে
            </>
          }
        />
        <div className="grid grid-cols-3 gap-[17px]">
          {priceDownProducts.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>
      <div className="all_products my-8">
        <TitleHeader title="সব পণ্য" subtitle="মোট ৩৩টি পণ্য দেখানো হচ্ছে" />
        <div className="grid grid-cols-3 gap-[17px]">
          {allproducts.map((p) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
