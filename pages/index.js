import { HeroBanner } from "@/components/HeroBanner";
import { ProductCart } from "@/components/ProductCart";
import { Wrapper } from "@/components/Wrapper";
import { fetchDataFromAPi } from "@/utils/api";
import { useState,useEffect } from "react";
const Home =({products}) => {
  console.log("response from api is: - ",products);
  const [data,setData] = useState(null);
  return (
    <>
    <main>
      <HeroBanner/>
      <Wrapper>

        {/* heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
         <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Cushing for your Miles
         </div>
         <div className="text-md md:text-xl">
              A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running.
         </div>
        </div>
        {/* heading and paragraph end */}

        {/* Product grid  start*/}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((item) =><ProductCart key = {item.id} data = {item}/> )}    
        </div>
          {/* Product grid  End*/}

      </Wrapper>
    </main>
    </>
  )
}

export async function getStaticProps() {
  const products  = await fetchDataFromAPi("/api/products?populate=*");
  return {
    props: {products: products}
  }
}
export default Home;