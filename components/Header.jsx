
import { useState, useEffect } from "react";
import { Wrapper } from "./Wrapper";
import Link from "next/link";
import { Menu } from "./Menu";
import { IdMdHeartEmpty, IoMdHeartDislike, IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { MenuMobile } from "./MenuMobile";
import { fetchDataFromAPi } from "@/utils/api";
import { useSelector } from "react-redux";

export const Header = () => {
    const [show, setShow] = useState("translate-y-0");
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null);

    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetchDataFromAPi('/api/categories?populate=*');
        console.log("Response of Categories Api call is: - ", response);
        setCategories(response.data);
    }

    const controlNavbar = () => {
        setLastScrollY(window.scrollY);
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        }
    })
    return (
        <>
            <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
                <Wrapper className="h-[60px] flex justify-between items-center">
                    <Link href="/">
                        <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
                    </Link>
                    <Menu showCategoryMenu={showCategoryMenu} setShowCategoryMenu={setShowCategoryMenu} categories={categories} />
                    {mobileMenu &&
                        <MenuMobile showCategoryMenu={showCategoryMenu} setShowCategoryMenu={setShowCategoryMenu} setMobileMenu={setMobileMenu} categories={categories} />}

                    <div className="flex items-center gap-2 text-black">

                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor: pointer relative">
                            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
                            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px=[5px]">51</div>
                        </div>
                        <Link href="/cart">
                            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor: pointer relative">
                                <BsCart className="text-[15px] md:text-[20px]" />
                                {cartItems.length > 0 && <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px=[5px]">{cartItems.length}</div>
}
                            </div>
                        </Link>


                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor: pointer relative -mr-2">
                            {mobileMenu ? (
                                <VscChromeClose className="text-[16px]" onClick={() => setMobileMenu(false)} />
                            ) : (<BiMenuAltRight className="text-[16px]" onClick={() => setMobileMenu(true)} />
                            )
                            }

                        </div>
                    </div>
                </Wrapper>
            </header>
        </>
    )
}