"use client"

import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineEmail, MdOutlineLocalPhone} from "react-icons/md";
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {

    return (
        <footer className="bg-white boxShadow rounded-xl w-full p-6 sm:p-9 container mx-auto">
            <div
                className="flex justify-between gap-[30px] flex-col sm:flex-row flex-wrap w-full">
                <div className="w-full sm:w-[25%] ">
                    <div className="flex -ml-3 ">
                    <Image src="/logo.png" width={50} height={50} alt="logo"
                         className="w-[70px] md:w-[80px] mb-[10px]"/>
                         <div>
                          <h2 className="md:text-3xl text-[22px] font-bold text-green-800">
                 E<span className="md:text-2xl text-[20px] text-green-500">Shop</span> 
                 </h2>
              <p className="text-[12px] md:text-sm text-gray-400 flex">
                     Online Shopping
                 </p>
                 </div>
                 </div>
                    <div className="flex flex-col gap-[10px] text-primary">
                                            <span><a
                                                className="text-[0.9rem] flex items-center gap-[8px] cursor-pointer">
                                                <IoLocationOutline className="text-[1.2rem]"/>
                                                Dhaka, Bangladesh.
                                            </a></span>
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] hover:text-green-400 cursor-pointer">
                                                <MdOutlineEmail className="text-[1.1rem]"/>
                                               EShop@gmail.com
                                            </a></span>
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] hover:text-green-400 cursor-pointer">
                                                <MdOutlineLocalPhone className="text-[1.1rem]"/>
                                                 +8801555899684
                                            </a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Services</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                       <Link href={'/all-products'}> <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                       Products</p></Link>
                       <Link href={'/shop'}> <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">
                       Shop</p></Link>
                     <Link href={'/news'}>   <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">News</p></Link>
                    <Link href={'/blog'}>    <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Blog
                    </p></Link>
                      
                    </div>
                </div>


                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Company</h3>
                    <div className="flex text-black flex-col gap-[10px]">
                      <Link href={'/contact'}>  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Contact</p></Link>
                    <Link href={''}>    <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">FAQ</p></Link>
                      <Link href={'/conditions'}>  <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">Terms and Conditions</p></Link>
                     <Link href={'/about-us'}>   <p className="text-[0.9rem] text-text hover:text-primary cursor-pointer transition-all duration-200">About</p></Link>
                        
                    </div>
                </div>


                <div className="">
                <h3 className="text-[1.2rem] font-semibold text-text mb-2">Join a
                Newsletter</h3>
                    
                <div className="w-full">
                   
                    <div className="flex gap-[2px] w-full flex-col text-text relative">
                        <label className="text-[0.9rem]">Your Email</label>
                        <input type="email"
                               className="py-3 px-4 pr-[90px] w-full rounded-md border border-primary outline-none"
                               placeholder="Email address"/>

                        <button
                            className="px-4 h-[67%] rounded-r-md bg-[#80b500] text-white absolute top-[24px] right-0">Submit
                        </button>
                    </div>
                </div>
                <div className=" flex justify-start mt-5">
                 <div className="flex items-center flex-wrap gap-[10px] text-text">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full text-white bg-[#80b500] transition-all duration-300">
                        <CgFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-white bg-[#80b500] transition-all duration-300">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-white bg-[#80b500] transition-all duration-300">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full text-white bg-[#80b500] transition-all duration-300">
                        <BsLinkedin/>
                    </a>
                </div></div>
                </div>

                <div className="w-full">
               


                <div
                    className="border-t border-gray-200 pt-[20px] flex items-center w-full flex-wrap gap-[20px] justify-center">
                    <p className="text-[0.8rem] sm:text-[0.9rem] text-gray-600">© 2025 EShop All Rights
                        Reserved. </p>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
                    