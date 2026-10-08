import { getData } from "@/functions/ApiCall";



export default async function Home() {
  const data = await getData("products");
  return 
  <div>


  </div>;
}
