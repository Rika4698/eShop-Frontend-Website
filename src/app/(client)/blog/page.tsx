

import Image from "next/image";
import BlogCard from "./BlogCard";

const BlogPage = () => {
  const blogPosts = [
    {
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
      title: "10 Superfoods You Should Add to Your Diet Today",
      paragraph: "Discover the power of nutrient-dense superfoods that can boost your energy, improve immunity, and enhance overall wellness. From quinoa to blueberries, learn how these foods can transform your health.",
      readMore: "Read More",
      date: "Dec 5, 2025",
      category: "Food & Nutrition",
      tags: "healthy eating, superfoods",
    },
    {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      title: "Must-Read Books That Will Change Your Perspective",
      paragraph: "Explore our curated list of transformative books spanning fiction, self-help, and philosophy. These compelling reads will inspire you to think differently and grow personally.",
      readMore: "Read More",
      date: "Dec 4, 2025",
      category: "Books & Literature",
      tags: "reading, book recommendations",
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      title: "Winter Fashion Trends 2025: Stay Warm and Stylish",
      paragraph: "From cozy oversized coats to chic layering techniques, discover the hottest winter fashion trends. Learn how to combine comfort with elegance this season.",
      readMore: "Read More",
      date: "Nov 2, 2025",
      category: "Fashion & Style",
      tags: "winter fashion, trends",
    },
    {
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
      title: "Complete Guide to Pet Care for First-Time Owners",
      paragraph: "Everything you need to know about welcoming a new pet into your home. From nutrition and training to healthcare and creating a safe environment for your furry friend.",
      readMore: "Read More",
      date: "Dec 6, 2025",
      category: "Pet Care",
      tags: "pets, pet health",
    },
    {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      title: "Easy Meal Prep Ideas for Busy Professionals",
      paragraph: "Save time and eat healthy with these simple meal prep strategies. Learn how to prepare delicious, nutritious meals for the entire week in just a few hours.",
      readMore: "Read More",
      date: "Oct 1, 2025",
      category: "Food & Cooking",
      tags: "meal prep, cooking tips",
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      title: "The Rise of Digital Reading: E-Books vs Physical Books",
      paragraph: "Explore the ongoing debate between digital and physical books. We examine the benefits and drawbacks of each format and help you decide what works best for you.",
      readMore: "Read More",
      date: "Nov 30, 2025",
      category: "Books & Technology",
      tags: "e-books, reading",
    },
  ];

  const trendingProducts = [
    {
      name: "Organic Green Tea Collection",
      price: "850 TK",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80"
    },
    {
      name: "Premium Leather Handbag",
      price: "3,200 TK",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80"
    },
    {
      name: "Natural Shampoo Set",
      price: "650 TK",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80"
    },
    {
      name: "Bestseller Book Bundle",
      price: "1,500 TK",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80"
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Blog Page Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-5">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Our Latest Blogs</h1>
            <div className="space-y-8">
              {blogPosts.map((item, idx) => (
                <BlogCard item={item} key={idx} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 ">
            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Popular Posts</h2>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0 cursor-pointer hover:opacity-80 transition">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-lg w-20 h-20 object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 hover:text-[#7fad39] transition line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
          <div className="mt-4">
                    <Image src="/book.png" width={350} height={300} alt="" className=' h-full rounded-lg' />
                </div>

            {/* Trending Now */}
            <div className="bg-white p-6 rounded-lg shadow-md my-4">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Trending Now</h2>
              <div className="space-y-4">
                {trendingProducts.map((product, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer border border-gray-200 hover:border-[#7fad39] shadow-sm hover:shadow-md duration-200 p-4 rounded-lg bg-white flex items-center gap-4"
                  >
                    {/* Image */}
                    <div className="overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-cover group-hover:scale-110 duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-base font-medium text-gray-800 hover:text-[#7fad39] transition line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-[#7fad39] mt-1">
                        {product.price}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mt-2">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4"
                              fill="#fbbf24"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;