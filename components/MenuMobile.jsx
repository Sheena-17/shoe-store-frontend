import {BsChevronDown } from "react-icons/bs";
import React from "react";
import Link from "next/link";
const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
];
export const MenuMobile = ({showCategoryMenu,setShowCategoryMenu,setMobileMenu,categories}) => {
    return(
        <>
            <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vvh-50px)] bg-white border-t text-black"> 
                 {data.map((item) => {
                    return (
                        <React.Fragment key = {item.id}>
                            {!!item?.subMenu ? 
                            <li className="cursor-pointer py-4 px-5 border-b flex-col relative" onClick={()=>setShowCategoryMenu(!showCategoryMenu)}>
                                <div className="flex justify-between items-center">
                                {item.name}<BsChevronDown size ={14}/>  
                                </div>
                            {showCategoryMenu && <ul className="bg-black/[0.5] -mx-5 mt-4 -mb-4">
                                                 {categories.map((item)=>{
                                                    return <Link key = {item.id} href = {`/category/${item.attributes.slug}`}>
                                                        <li className="py-4 px-8 border-t flex justify-between" onClick={()=> {setShowCategoryMenu(false); setMobileMenu(false)}}>{item.attributes.name}<span className="opacity-50 text-sm">{`(${item.attributes.products.data.length})`}</span></li></Link>
                                                 })}
                                                </ul>}
                            </li>:(
                                 <li className="py-4 px-5 border-b" onClick = {() =>setMobileMenu(false)}><Link href = {item.url}>{item.name}</Link></li>
                            )}
                        </React.Fragment>
                    )
                 })}
            </ul>
        </>
    )
}