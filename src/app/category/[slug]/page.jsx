import CatagoryProduct from "@/app/components/card_design/CatagoryProduct";
import { getData } from "@/functions/ApiCall";

async function page({params}) {
  const {slug}=await params;
  const ProductInfo=await getData(`categories/${slug}`)
  const allProducts=await getData("products")
  const requireProducts=allProducts.filter(p=>{
    if(p.category==slug){
      return p;
    }
  })
  return (
    <CatagoryProduct ProductInfo={ProductInfo} requireProducts={requireProducts} />
  );
}

export default page;