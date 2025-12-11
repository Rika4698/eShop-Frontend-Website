/* eslint-disable react/no-unescaped-entities */
"use client";

export default function Policy() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 py-20 px-4">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-block px-4 py-2 bg-emerald-500/30 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-emerald-100 text-sm font-medium">Last Updated: December 2025</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-emerald-100 text-lg md:text-xl max-w-2xl">Your privacy matters to us. Learn how EShop protects and manages your personal information.</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-16">
                
                {/* Introduction Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to <span className="font-semibold text-emerald-600">EShop</span>. We value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and protect your data when you use our website and services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Information Collection */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                    <h3 className="font-semibold text-emerald-800 mb-2">Personal Information</h3>
                                    <p className="text-sm text-gray-600">Name, email address, phone number, and shipping address</p>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                    <h3 className="font-semibold text-emerald-800 mb-2">Payment Information</h3>
                                    <p className="text-sm text-gray-600">Credit card details and billing information</p>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                    <h3 className="font-semibold text-emerald-800 mb-2">Usage Data</h3>
                                    <p className="text-sm text-gray-600">Browsing history, search queries, and interaction with our site</p>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                    <h3 className="font-semibold text-emerald-800 mb-2">Device Information</h3>
                                    <p className="text-sm text-gray-600">IP address, browser type, and operating system</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How We Use Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We use the information we collect to provide, maintain, and improve our services. Specifically:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600">Process and fulfill your orders and transactions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600">Send you order confirmations, updates, and customer support messages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600">Personalize your shopping experience and provide product recommendations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600">Detect and prevent fraud and enhance security</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Data Security */}
                <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                            <p className="text-emerald-50 leading-relaxed mb-4">
                                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Our security practices include:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-sm text-emerald-50">🔒 SSL/TLS encryption for data transmission</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-sm text-emerald-50">🛡️ Secure payment processing systems</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-sm text-emerald-50">🔐 Regular security audits and updates</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-sm text-emerald-50">👥 Restricted access to personal data</p>
                                </div>
                            </div>
                            <p className="text-emerald-100 text-sm mt-4 italic">
                                However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sharing Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sharing Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                <span className="font-semibold text-emerald-600">We do not sell, trade, or rent your personal information to third parties.</span> We may share information with trusted partners only in the following circumstances:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                    <span className="text-emerald-600 font-bold">•</span>
                                    <p className="text-gray-600"><strong>Service Providers:</strong> Third-party companies that help us operate our website, process payments, or deliver products</p>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                    <span className="text-emerald-600 font-bold">•</span>
                                    <p className="text-gray-600"><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</p>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                    <span className="text-emerald-600 font-bold">•</span>
                                    <p className="text-gray-600"><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                All parties agree to keep this information confidential and use it only for the specified purposes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cookies */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences.
                            </p>
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg mb-4">
                                <p className="text-gray-700"><strong>What are cookies?</strong> Cookies are small text files stored on your device that help us remember your preferences and improve site functionality.</p>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                You can control or disable cookies through your browser settings. However, disabling cookies may affect some features of our website.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Your Rights */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Data Rights</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You have the following rights regarding your personal information:
                            </p>
                            <div className="grid gap-4">
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Right to Access</h3>
                                        <p className="text-sm text-gray-600">Request a copy of the personal information we hold about you</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Right to Correction</h3>
                                        <p className="text-sm text-gray-600">Request corrections to any inaccurate or incomplete data</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Right to Deletion</h3>
                                        <p className="text-sm text-gray-600">Request the deletion of your personal data, subject to legal exceptions</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Right to Object</h3>
                                        <p className="text-sm text-gray-600">Object to the processing of your data under certain conditions</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">5</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Right to Portability</h3>
                                        <p className="text-sm text-gray-600">Request transfer of your data to another service provider</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Party Links */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Links</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our website may contain links to third-party websites for your convenience. We are not responsible for the content, privacy practices, or policies of these external sites. We encourage you to review the privacy policies of any linked websites before providing your personal information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Changes to Policy */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                            <p className="text-emerald-100 mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please don't hesitate to contact us:
                            </p>
                            <div className="flex flex-col gap-3">
                                <a href="mailto:support@eshop.com" className="inline-flex items-center gap-2 text-white hover:text-emerald-200 transition-colors">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold">support@eshop.com</span>
                                </a>
                                <div className="inline-flex items-center gap-2">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="font-semibold">+1 (800) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-emerald-100">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 font-medium">Your privacy is our priority at EShop</span>
                    </div>
                </div>

            </div>
        </div>
    );
}