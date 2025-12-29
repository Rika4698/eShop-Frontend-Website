"use client";

export default function Conditions() {
  return (
    <div className="w-full relative bg-green-50 ">
      
      {/* Gradient Header */}
      <div className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-10  shadow-md border border-green-700">
        <div className="max-w-7xl mx-auto pl-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            Terms & Conditions
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Please read these terms carefully before using EShop.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 space-y-8 text-gray-700 pb-20">

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            1. Introduction
          </h2>
          <p className="mt-2">
            Welcome to <strong className="text-green-600 font-bold">EShop</strong> — your trusted digital marketplace.
            By using our platform, you agree to comply with our Terms and
            Conditions. If you do not accept any part of these terms, please
            discontinue using the site immediately.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            2. Usage License
          </h2>
          <p className="mt-2">
           <strong className="text-green-600 font-bold">EShop</strong> grants you a limited, personal, and non-transferable license to
            browse and use the platform. This does not allow you to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Copy or modify any content on the website</li>
            <li>Use the website for commercial resale without permission</li>
            <li>Distribute or publicly display platform materials</li>
            <li>Attempt to extract or reverse-engineer site functionality</li>
          </ul>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            3. Product Information & Pricing
          </h2>
          <p className="mt-2">
            While we strive to ensure accuracy, <strong>EShop</strong> cannot
            guarantee that all product descriptions, pricing, and availability
            details are error-free. We reserve the right to correct any
            inaccuracies without prior notice.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            4. User Responsibilities
          </h2>
          <p className="mt-2">
            By using <strong className="text-green-600 font-bold">EShop</strong>, you agree to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide accurate account information</li>
            <li>Maintain confidentiality of your login details</li>
            <li>Avoid engaging in fraudulent or abusive actions</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            5. Returns & Refunds
          </h2>
          <p className="mt-2">
            Refund and return eligibility varies based on the seller and product
            type. Please review the return policy listed under each item before
            making a purchase.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            6. Disclaimer
          </h2>
          <p className="mt-2">
            All services and materials on <strong>EShop</strong> are provided{" "}
            <em>“as-is”</em>. We make no guarantees regarding accuracy,
            reliability, or suitability for specific purposes.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            7. Limitation of Liability
          </h2>
          <p className="mt-2">
            EShop shall not be held liable for any indirect, incidental, or
            consequential damages arising from the use of our services,
            including loss of data, financial loss, or business interruption.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            8. External Links
          </h2>
          <p className="mt-2">
            Our platform may contain links to third-party websites. EShop is not
            responsible for their content, availability, or privacy practices.
            Visiting external sites is at your own discretion.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            9. Updates to Terms
          </h2>
          <p className="mt-2">
            These Terms may be updated periodically. Continued use of the
            platform implies acceptance of the revised terms. We encourage you
            to review this page regularly.
          </p>
        </section>

        {/* Section */}
        <section>
          <h2 className="text-xl font-semibold text-green-700">
            10. Contact Us
          </h2>
          <p className="mt-2">
            For any questions regarding these Terms & Conditions, reach us at:{" "}
            <strong className="text-green-700">support_eshop@gmail.com</strong>
          </p>
        </section>

        <p className="text-gray-500 text-sm pt-4 ">
          Last updated: December 9, 2025
        </p>
      </div>
    </div>
  );
}
