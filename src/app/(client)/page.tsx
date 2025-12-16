import Category from "@/components/Home/Category";
import FlashSale from "@/components/Home/FlashSaleProduct";
import HomeProducts from "@/components/HomePage/Products";
import Banner from "@/components/shared/Banner";

export default function Home() {
    return (
     <div className="w-full mt-[30px] z-10">
            <Banner />
            <Category/>
            <HomeProducts/>
            <FlashSale/>

     
        </div>
    );
}