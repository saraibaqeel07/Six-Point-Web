import React from "react";
import Button from "@/app/components/elements/Button";

const BookAppSection = () => {
  return (
    <div className="relative bg-[#2F2F2F] text-white py-12 md:py-20 overflow-hidden">
      
      {/* BACKGROUND IMAGES (fixed & safe) */}
      <img
        src="/assets/dollar1.png"
        alt="Decorative"
        className="absolute top-0 left-0 w-32 sm:w-40 md:w-52 opacity-60"
      />

      <img
        src="/assets/dollar2.png"
        alt="Decorative"
        className="hidden md:block absolute top-0 right-0 w-auto h-full opacity-60"
      />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
          
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3] mb-4">
              BOOK THROUGH <br /> OUR APP
            </h2>

            <p className="text-base font-light mb-4 max-w-xl mx-auto lg:mx-0">
              For a seamless experience, all class bookings and memberships are
              managed through our mobile app.
            </p>

            <ul className="text-base font-light space-y-2 mb-6 max-w-xl mx-auto lg:mx-0">
              <li>• Live class availability coming soon</li>
              <li>• Easy booking & cancellation</li>
              <li>• Membership and wallet access</li>
            </ul>

            <Button href="#" className="hidden sm:inline-flex">
              Download App / Scan QR Code
            </Button>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">
            
            {/* PHONE */}
            <img
              src="/assets/mobile.png"
              alt="Mobile App"
              className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] lg:max-w-[300px] z-10"
            />

            {/* CIRCLE (fixed positioning) */}
            <img
              src="/assets/circle.png"
              alt="Decorative circle"
              className="absolute -bottom-6 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 w-48 sm:w-64 md:w-72 opacity-80"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookAppSection;