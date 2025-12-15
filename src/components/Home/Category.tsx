/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import { ICategory } from "@/types/modal";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const CustomPrevArrow = ({ onClick }: any) => (
  <div
    className="prev-arrow absolute bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-full top-1/2 z-40 transform -translate-y-1/2 -left-4 lg:-left-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 p-2"
    onClick={onClick}
  >
    <FiChevronLeft color="white" size={24} />
  </div>
);

const CustomNextArrow = ({ onClick }: any) => (
  <div
    className="next-arrow absolute bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-full top-1/2 transform -translate-y-1/2 -right-4 lg:-right-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 p-2"
    onClick={onClick}
  >
    <FiChevronRight color="white" size={24} />
  </div>
);

const Category = () => {
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery(undefined);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (isLoading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  console.log(allCategories);

  return (
    <div className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 relative">
              Shop by Categories
              {/* <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 rounded-full"></div> */}
            </h2>
          </div>
          <p className="text-gray-400  text-sm sm:text-base max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Categories Slider */}
        <div className="relative px-4 lg:px-6">
          <Slider {...settings}>
            {allCategories?.map((category: ICategory, index: number) => (
              <div key={index} className="px-2 sm:px-3">
                <Link
                  href={`/shop?categoryId=${category.id}`}
                  className="block group py-2"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-green-500 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-36 sm:h-40 md:h-44 bg-gradient-to-br from-green-50 to-white overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-green-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        width={200}
                        height={200}
                        className="w-full h-full object-cover p-4 transform group-hover:scale-110 transition-transform duration-500"
                        src={category.image}
                        alt={category.label}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-semibold text-sm bg-green-700 px-4 py-1 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          View Shops
                        </span>
                      </div>
                    </div>

                    {/* Category Name */}
                    <div className="p-3 sm:p-4 bg-white">
                      <p className="text-center font-semibold text-gray-800 text-sm sm:text-base group-hover:text-green-600 transition-colors duration-300 truncate">
                        {category.label}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Shops
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;