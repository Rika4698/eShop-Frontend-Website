/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NewsFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const newsData = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Books",
      title: "Top 10 Must-Read Books for Self-Improvement in 2025",
      excerpt: "Discover the most inspiring books that will transform your mindset and boost your productivity. From bestselling authors to hidden gems, find your next favorite read.",
      date: "Dec 10, 2024",
      author: "Book Club BD",
      readTime: "6 min read"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Grocery",
      title: "Organic Shopping Guide: How to Choose Fresh Groceries",
      excerpt: "Learn expert tips for selecting the freshest organic vegetables, fruits, and pantry essentials. Save money while eating healthier with our comprehensive grocery guide.",
      date: "Dec 9, 2024",
      author: "Health & Wellness",
      readTime: "5 min read"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Fruits",
      title: "Seasonal Fruits: Nutritional Benefits You Need to Know",
      excerpt: "Explore the amazing health benefits of seasonal fruits available in Bangladesh. From mangoes to lychees, discover nature's superfoods for every season.",
      date: "Dec 8, 2024",
      author: "Nutrition Expert",
      readTime: "4 min read"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
      category: "Fashion",
      title: "Fashion Trends 2025: Sustainable Style That Stands Out",
      excerpt: "Stay ahead of the fashion curve with eco-friendly clothing choices. Discover the latest trends in sustainable fashion and how to build a stylish, responsible wardrobe.",
      date: "Dec 7, 2024",
      author: "Fashion Forward",
      readTime: "7 min read"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Pet Shop",
      title: "Complete Pet Care Guide: Keep Your Furry Friends Happy",
      excerpt: "Everything you need to know about pet nutrition, grooming, and healthcare. Expert advice to ensure your pets live their best lives with proper care and love.",
      date: "Dec 6, 2024",
      author: "Pet Care Pro",
      readTime: "8 min read"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Books",
      title: "Children's Books That Inspire Creativity and Learning",
      excerpt: "The best educational and entertaining books for kids of all ages. Build your child's library with stories that spark imagination and foster a love for reading.",
      date: "Dec 5, 2024",
      author: "Kids Corner",
      readTime: "5 min read"
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Grocery",
      title: "Smart Grocery Shopping: Save Money Without Compromising Quality",
      excerpt: "Master the art of budget-friendly grocery shopping. Learn meal planning strategies, coupon tips, and how to get maximum value from your purchases.",
      date: "Dec 4, 2024",
      author: "Money Saver",
      readTime: "6 min read"
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Fruits",
      title: "Exotic Fruits to Try: Expand Your Taste Horizons",
      excerpt: "Step beyond the ordinary with exotic fruits available in Bangladesh. Discover unique flavors, nutritional benefits, and delicious ways to enjoy these tropical treats.",
      date: "Dec 3, 2024",
      author: "Foodie Guide",
      readTime: "5 min read"
    },
    {
      id: 9,
      image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Fashion",
      title: "Wardrobe Essentials: Build Your Perfect Capsule Collection",
      excerpt: "Create a versatile wardrobe with timeless pieces that never go out of style. From classic jeans to statement accessories, invest in quality fashion staples.",
      date: "Dec 2, 2024",
      author: "Style Guru",
      readTime: "6 min read"
    },
    {
      id: 10,
      image: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Pet Shop",
      title: "Choosing the Perfect Pet: A Beginner's Complete Guide",
      excerpt: "Thinking about getting a pet? Learn about different pet types, their care requirements, and how to choose the right companion for your lifestyle and family.",
      date: "Dec 1, 2024",
      author: "Pet Adoption",
      readTime: "9 min read"
    },
    {
      id: 11,
      image: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Books",
      title: "Business Books That Changed Entrepreneurs' Lives",
      excerpt: "Unlock your entrepreneurial potential with these game-changing business books. Learn from successful founders and develop strategies for business growth.",
      date: "Nov 30, 2024",
      author: "Business Insider",
      readTime: "7 min read"
    },
    {
      id: 12,
      image: "https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Grocery",
      title: "Kitchen Staples Checklist: Never Run Out of Essentials",
      excerpt: "Build the perfect pantry with our comprehensive grocery checklist. Ensure you always have essential ingredients on hand for quick, delicious meals.",
      date: "Nov 29, 2024",
      author: "Home Chef",
      readTime: "4 min read"
    }
  ];

  const categories = ['all', 'Books', 'Grocery', 'Fruits', 'Fashion', 'Pet Shop'];

  const filteredNews = activeTab === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === activeTab);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-green-50 min-h-screen">

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className={`relative max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16 md:py-24 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-white space-y-6">
              <div className="inline-block">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  🔥 Trending Stories
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Latest Trends
                <span className="block mt-2">in Your Favorite Categories</span>
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                From books to fashion, grocery tips to pet care - explore expert insights, helpful guides, and trending stories across all your favorite shopping categories.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl">
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="font-bold text-xl">Books</div>
                    <div className="text-sm text-white/80">Learn & Grow</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <div className="font-bold text-xl">Grocery</div>
                    <div className="text-sm text-white/80">Fresh Daily</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl">
                  <span className="text-2xl">🍎</span>
                  <div>
                    <div className="font-bold text-xl">Fruits</div>
                    <div className="text-sm text-white/80">Stay Healthy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative animate-min-float">
                <div className="absolute -inset-4 bg-white/20 rounded-lg blur-2xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800"
                  alt="Shopping News"
                  width={600} 
                  height={500}
                  className="relative w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl animate-bounce">
                  <div className="text-center">
                    <div className="text-3xl mb-1">✨</div>
                    <div className="text-sm font-bold text-green-600">Fresh Content</div>
                    <div className="text-xs text-gray-600">Daily Updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === category
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={600} 
                  height={500}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    {news.category}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>📅</span> {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {news.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {news.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {news.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{news.author}</span>
                  </div>

                  <button className="group/btn flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-300">
                    Read More
                    <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 pb-20">
        <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-lg p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          
          <div className="relative z-10 text-center text-white max-w-2xl mx-auto space-y-6">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-bounce inline-block">📧</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Stay in the Loop!</h2>
            <p className="text-lg text-white/90">
              Subscribe to get the latest tips, guides, and exclusive offers from Books, Grocery, Fruits, Fashion & Pet Care categories delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 max-w-md px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <Link href="/contact">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg whitespace-nowrap">
                Subscribe Now 🚀
              </button>
              </Link>
            </div>

            <p className="text-sm text-white/70 pt-4">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}