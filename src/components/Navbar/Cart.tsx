/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RxCross1 } from "react-icons/rx";

import { motion } from "framer-motion";
import CartView from "@/views/CartView";
const Cart = ({ setOpenCart, openCart }:any) => {

  return (
    <div onClick={() => setOpenCart(false)} className={`w-full fixed h-screen left-0 top-0 z-50 bg-[#0000006b]`}>
        
              
                
              
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 h-full  w-[100%] sm:w-[70%] lg:w-[80%] flex flex-col justify-between shadow-sm bg-white overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}>
     
       <div className="w-full h-screen  items-center">
            <div className="px-5 py-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
        
    <CartView/>
          </div>
      </motion.div>
    </div>
  );
};

export default Cart;
