/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion, CheckCircle, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our product catalog, select your desired items, add them to the cart, and proceed to checkout. Follow the instructions to complete your purchase.",
      icon: "🛒"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a wide range of payment methods, including credit/debit cards, PayPal, and other secure payment gateways.",
      icon: "💳"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email or text message. Use the tracking number to monitor the status of your delivery.",
      icon: "📦"
    },
    {
      question: "Do you offer returns or exchanges?",
      answer: "Yes, we offer a 30-day return policy on most items. Please refer to our Returns & Exchanges policy for more details on how to return or exchange an item.",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <MessageCircleQuestion className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We've got answers! Find everything you need to know about our services below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80"
                  alt="FAQ Support"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border-4 border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">99%</p>
                    <p className="text-sm text-gray-600">Satisfied</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border-4 border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">24/7</p>
                    <p className="text-sm text-gray-600">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side  */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group rounded-2xl transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`text-3xl transition-transform duration-300 ${
                        openIndex === index ? "scale-110" : ""
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <h3
                      className={`font-semibold text-lg ${
                        openIndex === index ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-white text-green-600 rotate-180"
                        : "bg-gray-100 text-gray-600 group-hover:bg-green-100"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p
                      className={`leading-relaxed ${
                        openIndex === index ? "text-white/90" : "text-gray-700"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Our support team is here to help you 24/7
            </p>
            <Link href="/contact">
            <button className="bg-white text-green-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Support
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}