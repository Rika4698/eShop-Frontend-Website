/* eslint-disable react/no-unescaped-entities */
"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rashid Ahmed",
    role: "Regular Customer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment:
      "EShop has completely transformed my online shopping experience! The product quality is exceptional. I've been shopping here for over a year now.",
    date: "2 weeks ago",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Fashion Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    comment:
      "I love the variety of products available! From books to fashion, everything is authentic and reasonably priced. The customer service is outstanding. Highly recommended!",
    date: "1 month ago",
    location: "Chittagong, Bangladesh",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    role: "Book Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    comment:
      "Best e-commerce platform in Bangladesh! Fast unique, secure payment, and genuine products. I recently bought a book and the entire process was smooth and hassle-free.",
    date: "3 weeks ago",
    location: "Sylhet, Bangladesh",
  },
  {
    id: 4,
    name: "Farzana Akter",
    role: "Small Business Owner",
    avatar: "https://i.pravatar.cc/150?img=48",
    rating: 5,
    comment:
      "As a vendor on EShop, I'm impressed by the platform's features. It's user-friendly and helps me reach thousands of customers. My sales have increased by 300% in just 6 months!",
    date: "1 week ago",
    location: "Rajshahi, Bangladesh",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative rounded-md overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-1 w-8 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider text-sm">
              Testimonials
            </span>
            <div className="h-1 w-8 bg-green-500 rounded-full ml-2"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Customers Say
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied
            customers about their experience with EShop
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <Card
      className="group relative bg-white dark:bg-gray-800 border-2 border-green-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Green Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      <CardContent className="p-6 relative z-10">
        {/* Quote Icon */}
        <div className="absolute -top-4 -left-4 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Quote className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4 mt-6">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          "{testimonial.comment}"
        </p>

        {/* User Info */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={50}
              height={50}
              className="rounded-full border-2 border-white dark:border-gray-800 relative z-10"
            />
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              📍 {testimonial.location} • {testimonial.date}
            </p>
          </div>
        </div>

        {/* Green Accent Line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-500 rounded-b-lg"></div>
      </CardContent>
    </Card>
  );
}