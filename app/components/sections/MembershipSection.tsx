// components/MembershipSection.tsx
import React from 'react';
import { BiCheck } from 'react-icons/bi';
// or just use text ✓ if you don't want extra dependency

const plans = [
  {
    name: "Founders Platinum",
    price: "£3",
    period: "/month",
    features: [
      "Digital Progress Tracker",
      "Encrypted cloud backups",
      "Invite training partners",
      "3 months free access",
      "£5/month after 3 months",
    ],
    isHighlighted: true, // can be used for special styling if you want
  },
  {
    name: "Standard Monthly",
    price: "£75",
    period: "/month",
    features: [
      "Unlimited classes",
      "Gi & No-Gi training",
      "Access to all open mats",
      "Progress tracking",
      "Community events",
    ],
  },
  {
    name: "Annual Plan",
    price: "£750",
    period: "/year",
    features: [
      "Save £150 vs monthly",
      "Unlimited access",
      "Priority class booking",
      "Free academy t-shirt",
      "Invited to seminars",
    ],
  },
  {
    name: "Kids / Teens",
    price: "£55",
    period: "/month",
    features: [
      "Age-appropriate classes",
      "Anti-bullying focus",
      "Fun & fundamentals",
      "Parent viewing area",
      "Progress reports",
    ],
  },
  {
    name: "Drop-in",
    price: "£25",
    period: "/class",
    features: [
      "Single class access",
      "No commitment",
      "Try before subscribing",
      "Gi & No-Gi available",
      "Friendly welcome",
    ],
  },
  {
    name: "Family Plan",
    price: "£140",
    period: "/month",
    features: [
      "2 adults + 2 kids",
      "Best family value",
      "All programs included",
      "Shared progress tracking",
      "Sibling discount built-in",
    ],
  },
  {
    name: "Premium Private",
    price: "£180",
    period: "/month",
    features: [
      "Unlimited classes",
      "4 private sessions/mo",
      "Personalized program",
      "Video analysis",
      "Competition coaching",
    ],
  },
];

const MembershipSection = () => {
  return (
    <div className="bg-[#1D1818] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight uppercase">
            MEMBERSHIP OPTIONS
          </h2>
          <p className="ext-sm sm:text-base md:text-lg text-gray-300 mt-3">
            Six Points Jiu-Jitsu offers structured membership packages to suit different training needs.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                rounded-none overflow-hidden shadow-lg flex flex-col h-full`}

            >
              {/* Top silver/gray header */}
              <div className="bg-[#DDDBD8] text-black pt-5 px-6 text-center">
                <h3 className="text-sm py-2 px-3 font-light bg-white w-fit  uppercase">
                  {plan.name}
                </h3>
              </div>

              {/* Price area */}
              <div className="flex gap-3 bg-[#DDDBD8] text-black pt-4 pb-10 px-6 text-center">
                <div className="text-4xl md:text-5xl font-extrabold">
                  {plan.price}
                </div>
                <div className="flex items-end text-lg font-medium mt-1 opacity-90">
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <div className="bg-[#605D5D] flex flex-col flex-1 p-6">
                <ul className="space-y-3 pb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <BiCheck className="w-5 h-5 bg-black rounded-full flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="text-center bg-[#DDDBD8] text-black  mt-5 mt-auto">
                  <button
                    className={`
                     py-4  font-medium text-base uppercase transition-all
                  `}
                  >
                    BOOK A CLASS 
                  </button>
                </div>

              </div>


            </div>
          ))}
        </div>

                <div className="mt-10 md:mt-14 py-5 sm:py-6 px-4 text-center bg-white text-black">
          <p className="text-base sm:text-lg md:text-xl font-medium">
            <strong>Note:</strong> All classes must be booked through the mobile app.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MembershipSection;