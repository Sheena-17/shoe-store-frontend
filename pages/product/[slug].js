
import React from 'react';
import { Wrapper } from '@/components/Wrapper';
import { ProductDetailCarousel } from '@/components/ProductDetailsCarousel';
import { IoMdHeartEmpty } from 'react-icons/io';
import { RelatedProducts } from '@/components/RelatedProducts';
import { fetchDataFromAPi } from '@/utils/api';
import { getDiscountedPricePercentage } from '@/utils/helper';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { ToastContainer,toast} from "react-toastify";    
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({product,products}) => {
     const p = product?.data?.[0]?.attributes;
     const [selectedSize,setSelectedSize] = useState();
     const [showError,setShowError] = useState(false);
     const dispatch = useDispatch();

   
     const notify = () => {
          toast.success("Success. Check your Cart !",{
               position: "bottom-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
          });
     }
     console.log("Product data is : - " ,product);
     console.log("Products Data is : - ",products);
    return (
        <>
            <div className='w-full md:py-20'>
               <ToastContainer/>
                <Wrapper>
                    <div className= "flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                        {/* left column start */}
                        <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                            <ProductDetailCarousel images = {p?.image?.data} />
                        </div>
                        {/* left column end */}

                        {/* right column start */}
                        <div className='flex-[1] py-3'>
                            {/* product Title */}
                            <div className='text-[34px] font-semibold mb-2 leading-tight'>
                                    {p.name}
                            </div>
                            {/* Product subtitle */}
                           <div className='text-lg font-semibold mb-5'>
                           {p.subtitle}
                           </div>
                           {/* Product Price  */}
                           <div className='text-lg font-semibold'>
                            MRP : &#8377;{p.price}
                           </div>
                           <div className='text-lg font-semibold line-through'>
                            &#8377;{p.original_price}
                           </div>
                           <p className="ml-auto text-base font-medium text-green-500">
                        {getDiscountedPricePercentage(p.original_price,p.price)}
                        % off
                        </p>
                           {/*  */}
                           <div className='text-md font-medium text-black/[0.5]'>
                           incl. of taxes
                           </div>
                           <div className='text-md font-medium text-black/[0.5] mb-20'>
                                  {`(Also include all applicable duties)`}
                           </div>

                           {/* Product Size Range Start */}
                            <div className='mb-10'>
                                {/* Heading Start */}
                                <div className='flex justify-between mb-2'>
                                    <div className='text-md font-semibold'>
                                        Select Size
                                    </div>
                                    <div className='text-md font-medium text-black/[0.5] cursor pointer'>
                                         Select Guide
                                    </div>
                                </div>
                                {/* Heading End */}
                                {/* Size Start */}

                                <div id = "sizesGrid" className='grid grid-cols-3 gap-2'>
                                   {p.size.data.map((item,i)=>(
                                         <div key = {i} className={`border rounded-md text-center py-3 font-medium ${item.enabled?'hover:border-black cursor-pointer':'cursor-not-allowed bg-black/[0.1] opacity-50'} ${selectedSize === item.size ? "border-black":""}`} 
                                         onClick={()=>{setSelectedSize(item.size);setShowError(false);}}>
                                        {item.size}
                                    </div>
                                   )
                                   )}
                                     
                                </div>
                             {/* Size End */}
                             {/* Show Error Start */}
                             {showError && <div className='text-red-600 mt-1'>
                                Size Selection is Required
                             </div>}
                             
                             {/* Show error end */}
                            </div>
                             {/* Product Size Range End  */}
                             <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium translation-tranform active:scale-95 mb-3' onClick = {()=>{
                              if(!selectedSize){
                                   setShowError(true);
                                   document.getElementById("sizesGrid").scrollIntoView({
                                        block: "center",
                                        behaviour: "smooth"
                                   })
                              }else{
                                   dispatch(addToCart({...product?.data?.[0],selectedSize,oneQuantityPrice: p.price}));
                                   notify();
                              }
                             }}>
                                Add to Cart
                             </button>
                             <button className='w-full py-4 rounded-full border border-black text-lg font-medium translation-tranform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
                             Wishlist <IoMdHeartEmpty size = {20}/>
                             </button>
                           <div>
                               <div className='text-lg font-bold mb-5'>
                                     Product Details
                               </div>
                               <div className='markdown text-md mb-5'>
                                    <ReactMarkdown>{p.description}</ReactMarkdown>
                               </div>
                           </div>
                        </div>
                        {/* right column end */}
                    </div>
                     <RelatedProducts products = {products}/>
                </Wrapper>
            </div>
        </>
    )
}
export default ProductDetails;

export async function getStaticPaths(){
     const products = await fetchDataFromAPi("/api/products?populate=*");
     const paths = products.data.map((p)=>({
          params: {
               slug:p.attributes.slug,
          },
     }));
     return {
          paths,
          fallback: false,
     }
}
export async function getStaticProps({params:{slug}}){
     const product = await fetchDataFromAPi(`/api/products?populate=*&filters[slug][$eq]=${slug}`)
     const products = await fetchDataFromAPi(`/api/products?populate=*&[filters][slug][$ne]=${slug}`);
     return {
          props : {
               product,
               products,
          }
     }
}


