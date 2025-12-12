"use client";

import FlashSaleBanner from "@/components/falshSale/FlashSaleBanner";
import FlashSaleProducts from "@/components/falshSale/FlashSaleProducts";

const FlashSaleView = () => {
  return (
    <div className="py-[25px]">
      <FlashSaleBanner />
      <FlashSaleProducts />
    </div>
  );
};

export default FlashSaleView;
