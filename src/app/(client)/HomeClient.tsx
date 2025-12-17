"use client"
import BestDeal from "@/components/Home/BestDeal";
import BundleSet from "@/components/Home/BundleSet";
import Category from "@/components/Home/Category";
import FlashSale from "@/components/Home/FlashSaleProduct";
import WhyChooseUs from "@/components/Home/WhyChoseUs";
import HomeProducts from "@/components/HomePage/Products";
import RecentProduct from "@/components/MostViewsProducts/RecentProduct";
import Banner from "@/components/shared/Banner";
import useUserDetails from "@/hooks/useUser";

export default function HomeClient() {
    const { userData } = useUserDetails();
    return (
     <div className="w-full mt-[30px] z-10">
            <Banner />
            <Category/>
            <HomeProducts/>
            <FlashSale/>
            <BestDeal/>
            {userData?.userData.role === "CUSTOMER"? <RecentProduct/> :""}
            {/* <RecentProduct/> */}
            <BundleSet/>
            <WhyChooseUs/>

     
        </div>
    );
}