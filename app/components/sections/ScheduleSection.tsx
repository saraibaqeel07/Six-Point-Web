// components/ScheduleSection.tsx
import React from "react";

const ScheduleSection = () => {
  return (
    <div className="bg-[#1D1818] text-white py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[90%] mx-auto">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase">
            SIXTH POINT JIU-JITSU
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-medium mt-3">
            Al Muneera – Abu Dhabi
          </p>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            All Levels • Recreational • Family-Friendly
          </p>
        </div>

        {/* Grid */}
       <div className="grid grid-cols-1 pt-8 md:pt-10 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">

          {/* LEFT */}
    <div className="flex flex-col gap-10 md:gap-14 h-full">

            {/* Toddlers */}
           <div className="border pb-4 h-full flex flex-col">
              <div className="inline-block bg-[#E3E2E0] py-2 px-5 text-black">
                <h3 className="text-sm md:text-base lg:text-lg font-light uppercase">
                  TODDLERS, KIDS & TEENS PROGRAM
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                
                <div className="p-4 sm:p-5 md:p-6">
                  <h4 className="text-lg font-medium  text-white mb-3">
                    Monday • Wednesday
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                    <li>15:00 – 15:30 Toddlers - Play and Learn Class</li>
                    <li>16:00 – 16:45 4-6 (Group 1)</li>
                    <li>17:00 – 17:45 7-10 (Group 1)</li>
                    <li>18:00 – 19:00 Teens 11-15 (Group 1)</li>
                  </ul>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h4 className="text-lg font-medium  text-white mb-3">
                    Tuesday • Thursday
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm md:text-base mb-6">
                    <li>16:00 – 16:45 4-6 Kids Group 2</li>
                    <li>17:00 – 17:45 7-10 Kids Group 2</li>
                  </ul>

                  <h4 className="text-lg font-medium  text-white mb-3">
                    Friday (Anti Bullying / BJJ)
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                    <li>15:00 – 15:45 5-10 Kids Group (1 & 2)</li>
                    <li>16:00 – 17:00 Teens 11-15 Group 1 & 2</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Women */}
           <div className="border pb-4 h-full flex flex-col">
              <div className="inline-block bg-[#E3E2E0] py-2 px-5 text-black">
                <h3 className="text-sm md:text-base lg:text-lg font-light uppercase">
                  WOMEN ONLY
                </h3>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h4 className="text-lg font-medium  text-white mb-4">
                  Tuesday • Thursday
                </h4>
                <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                  <li>
                    <span className="font-medium">BJJ Mobility</span>
                    <br />
                    09:00 – 09:30
                  </li>
                  <li>
                    <span className="font-medium">BJJ / Self Defense</span>
                    <br />
                    09:45 – 10:30
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT */}
        <div className="flex flex-col gap-10 md:gap-14 h-full">

            {/* Open Mat */}
          <div className="border pb-4 h-full flex flex-col">
              <div className="inline-block bg-[#E3E2E0] py-2 px-5 text-black">
                <h3 className="text-sm md:text-base lg:text-lg font-light uppercase">
                  OPEN MAT
                </h3>
              </div>

              <div className="p-4 sm:p-5 md:p-6 space-y-3 text-gray-300 text-sm md:text-base">
                <p>09:00 – 09:50 Adults Fundamentals</p>
                <p>10:00 – 11:00 Kids Mixed Age Games</p>
                <p>11:30 – 13:00 Open Mat / No Gi (Members & Friends)</p>
                <p>17:00 – 17:45 7-10 Gi (Group 1)</p>
                <p>18:00 – 19:00 Teens 11-15</p>
              </div>
            </div>

            {/* Adult */}
          <div className="border pb-4 h-full flex flex-col">
              <div className="inline-block bg-[#E3E2E0] py-2 px-5 text-black">
                <h3 className="text-sm md:text-base lg:text-lg font-light uppercase">
                  ADULT CLASSES
                </h3>
              </div>

              <div className="p-4 sm:p-5 md:p-6 space-y-6 text-gray-300 text-sm md:text-base">
                
                <div>
                  <h4 className="text-lg font-medium  text-white mb-2">
                    Monday • Wednesday • Friday
                  </h4>
                  <p>06:30 – 07:30 Adults Gi All Levels</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium  text-white mb-2">
                    Monday to Thursday
                  </h4>
                  <p>19:30 – 20:30 Adult Gi / No Gi</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium  text-white mb-2">
                    Tuesday • Thursday
                  </h4>
                  <p>18:00 – 19:00 Fundamentals Class</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium  text-white mb-2">
                    Friday
                  </h4>
                  <p>17:00 – 17:50 Fundamentals Class</p>
                  <p>18:00 – 19:00 Adult Gi – All Levels</p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ScheduleSection;