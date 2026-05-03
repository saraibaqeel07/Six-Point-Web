import React from "react";
import { FaFacebookF, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import Button from "@/app/components/elements/Button";

const ContactLocationSection = () => {
  return (
    <div className="relative py-10 md:py-16 bg-[#1D1818] text-white">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1D1818]/90 z-0"></div>

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* HEADING */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
            Ready to start your Jiu-Jitsu journey?
          </h2>
          <p className="mt-4 text-base font-light max-w-xl">
            Our training philosophy is built around six core pillars that guide
            every class and every athlete.
          </p>
        </div>

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16 items-start">
          
          {/* LEFT */}
          <div className="flex-1 w-full space-y-8">
            
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
                LOCATION
              </h2>
              <p className="mt-3 text-base font-light">
                Train with us in Abu Dhabi.
              </p>
            </div>

            <div className="space-y-5 text-sm sm:text-base">
              
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-full bg-[#504C4B] flex-shrink-0">
                  <img
                    src="/assets/location.png"
                    alt="Location Icon"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </div>
                <p className="font-light leading-relaxed">
                  44 Al Raha Blvd – Al Rahah – Al Muneera – Retail 06 – Abu Dhabi
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-full bg-[#504C4B] flex-shrink-0">
                  <img
                    src="/assets/phone.png"
                    alt="Phone Icon"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </div>
                <p className="font-light">+000 0000 0000</p>
              </div>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 text-xl sm:text-2xl">
              <a className="p-2 sm:p-3 rounded-full bg-[#504C4B] hover:bg-[#3b3a39] transition">
                <FaFacebookF />
              </a>
              <a className="p-2 sm:p-3 rounded-full bg-[#504C4B] hover:bg-[#3b3a39] transition">
                <FaTiktok />
              </a>
              <a className="p-2 sm:p-3 rounded-full bg-[#504C4B] hover:bg-[#3b3a39] transition">
                <FaLinkedin />
              </a>
              <a className="p-2 sm:p-3 rounded-full bg-[#504C4B] hover:bg-[#3b3a39] transition">
                <FaYoutube />
              </a>
            </div>

          </div>

          {/* RIGHT (FORM) */}
          <div className="flex-1 w-full">
            <form className="flex flex-col gap-4 md:gap-5">
              
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border border-white py-3 px-3 text-sm sm:text-base focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-white py-3 px-3 text-sm sm:text-base focus:outline-none"
              />

              <textarea
                placeholder="Message"
                rows={5}
                className="w-full bg-transparent border border-white py-3 px-3 text-sm sm:text-base focus:outline-none"
              />

              {/* BUTTON (visible on mobile now) */}
              <Button href="#" className="inline-flex justify-center">
                Submit
              </Button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactLocationSection;