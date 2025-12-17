import BestDeal from "@/components/Home/BestDeal";
import BundleSet from "@/components/Home/BundleSet";
import Category from "@/components/Home/Category";
import FlashSale from "@/components/Home/FlashSaleProduct";
import HomeProducts from "@/components/HomePage/Products";
import RecentProduct from "@/components/MostViewsProducts/RecentProduct";
import Banner from "@/components/shared/Banner";

export default function Home() {
    return (
     <div className="w-full mt-[30px] z-10">
            <Banner />
            <Category/>
            <HomeProducts/>
            <FlashSale/>
            <BestDeal/>
            <RecentProduct/>
            <BundleSet/>

     
        </div>
    );
}