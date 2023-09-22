import Link from "next/link";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";

export const ProductCart = ({data}) => {
   const  productData = data.attributes;
   const  productId = data.id;
   const imageUrl = productData.thumbnail.data.attributes.url;
   console.log("Image url is : -" ,imageUrl);
   console.log("Product .slug is : - " , productData.slug);
    return (
        <>
            <Link className = "transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer" href = {`/product/${productData.slug}`}>
              <Image width ={500} height = {500} src = {imageUrl} alt ={productData.name}/>
               <div className="p-4 text-black/[0.9]">
                    <h2 className="text-lg font-medium">{productData.name}</h2>
                    <div className = "flex items-center text-black/[0.5]">
                        <p className="mr-2 text-lg font-semibold">${productData.price}</p>
                        <p className="text-base font-medium line-through">${productData.original_price}</p>
                        <p className="ml-auto text-base font-medium text-green-500">
                        {getDiscountedPricePercentage(productData.original_price,productData.price)}
                        % off
                        </p>
                    </div>
               </div>
           </Link>
        </>
    )
}