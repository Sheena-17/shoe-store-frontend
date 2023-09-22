import { Wrapper } from "@/components/Wrapper"
import { useRouter } from "next/router";
import { ProductCart } from "@/components/ProductCart";
import { fetchDataFromAPi } from "@/utils/api";
import useSWR from "swr";
import { useState } from "react";

const maxResult = 3;
const Category = ({category,products,slug}) => {
    const [pageIndex,setPageIndex] = useState(1);
    // const [datas,error,isLoading] =useSWR(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,fetchDataFromAPi,{
    //     fallback: products
        
    // });
    
    console.log("Caregory is ",category);
    console.log("Products are : -",products);
    console.log("slug is : - " ,slug);
    // console.log("here data is : -",datas);
    const router = useRouter();
    console.log(router);
    console.log(router.query.slug);
    return(
        <>
            <div className="w-full md:py-20">
                <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                      <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                          {category?.data?.[0]?.attributes?.name}
                      </div>
                </div>

            {/* Product grid  start*/}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                {/* <ProductCart/> */}
                {products?.data?.map((item) =><ProductCart key = {item.id} data = {item}/> )}   
            </div>
            {/* Product grid  End*/}
                    </Wrapper>
                
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const category = await fetchDataFromAPi("/api/categories?populate=*");
    const paths = category?.data?.map((c)=>({
        params: {
            slug:c.attributes.slug
        }
    }))
    console.log("path value: - ",paths);
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({params:{slug}}){
    
     const category = await fetchDataFromAPi(`/api/categories?filters[slug][$eq]=${slug}`);
     const products = await fetchDataFromAPi(`/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`);
     return {
        props: {
        category,
        products,
        slug
          }
     }
}
export default Category;