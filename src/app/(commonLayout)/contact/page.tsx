/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Clock, MessageSquare } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#7fad39] to-[#5d8829] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Let's Connect
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 -mt-10 pb-16">
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
          <Card className="border-t-4 border-t-[#7fad39] hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-8 text-center">
              <div className="mx-auto w-16 h-16 bg-[#7fad39]/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-[#7fad39]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Mon-Sat 9:00 AM - 8:00 PM</p>
              <p className="text-[#7fad39] font-medium"> +8801555899684</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#7fad39] hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-8 text-center">
              <div className="mx-auto w-16 h-16 bg-[#7fad39]/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-[#7fad39]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">We'll respond within 24 hours</p>
              <p className="text-[#7fad39] font-medium">support_eshop@gmail.com</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#7fad39] hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-8 text-center">
              <div className="mx-auto w-16 h-16 bg-[#7fad39]/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-[#7fad39]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-2">Come say hello at our office</p>
              <p className="text-[#7fad39] font-medium">Mirpur 1, Dhaka</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form & Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-[#7fad39]/5 to-transparent">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-[#7fad39]" />
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input 
                        placeholder="Full Name" 
                        required 
                        className="h-12 border-gray-300 focus:border-[#7fad39] focus:ring-[#7fad39]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="h-12 border-gray-300 focus:border-[#7fad39] focus:ring-[#7fad39]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+880 123-456-7890"
                      className="h-12 border-gray-300 focus:border-[#7fad39] focus:ring-[#7fad39]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject *</label>
                    <Input
                      placeholder="How can we help you?"
                      required
                      className="h-12 border-gray-300 focus:border-[#7fad39] focus:ring-[#7fad39]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message *</label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={6}
                      className="border-gray-300 focus:border-[#7fad39] focus:ring-[#7fad39] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#7fad39] hover:bg-[#6a9632] text-white font-semibold text-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#7fad39]/5 to-transparent">
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7fad39]/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[#7fad39]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Office Address</h4>
                    <p className="text-gray-600 text-sm">
                      House 45, Road 12<br />
                      Mirpur 1, Dhaka 1216<br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7fad39]/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[#7fad39]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600 text-sm">
                      Hotline: +8801555899684<br />
                      Office: +880 987-654-3210
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7fad39]/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[#7fad39]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Addresses</h4>
                    <p className="text-gray-600 text-sm">
                      General: EShop@gmail.com<br />
                      Support: support_eshop@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7fad39]/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#7fad39]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 9:00 AM - 8:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#7fad39]/5 to-transparent">
                <CardTitle className="text-xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-4 justify-center">
                  <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Map */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#7fad39]/5 to-transparent">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-[#7fad39]" />
              <CardTitle className="text-2xl">Find Us on Map</CardTitle>
            </div>
            <CardDescription className="text-base">
              Visit our office at Mirpur, Dhaka for a personalized shopping experience
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[450px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.249416641494!2d90.34659825!3d23.798593999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1f2ca7ea815%3A0xd448000766cc5ff9!2sMirpur%201%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1765283809959!5m2!1sen!2sbd"
                style={{ border: 0 }}
                className="w-full h-full rounded-b-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;