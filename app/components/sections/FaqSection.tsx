// components/FaqSection.tsx
'use client'; // ← important for Next.js App Router + useState

import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
// or replace with text arrows: ▼ / ►

const faqItems = [
  {
    question: "How Do I Book A Class?",
    answer:
      "It Is Possible To Book Via Website, App, Phone Call, And At The Club.",
  },
  {
    question: "Can Beginners Join?",
    answer:
      "Yes. We Offer A Dedicated Beginners Program Suitable For All Fitness Levels.",
  },
  {
    question: "How Long Is Each Class?",
    answer: "1 Hour (One Hour)",
  },
  {
    question: "Do I Need To Bring My Own Gi?",
    answer:
      "For your first few classes you can borrow one from the academy. After that we recommend purchasing your own.",
  },
  {
    question: "What Should I Bring To My First Class?",
    answer:
      "Comfortable athletic wear (rashguard & shorts for no-gi, or borrow a gi), water bottle, and a positive attitude!",
  },
];

const FaqSection = () => {
const [openIndexes, setOpenIndexes] = useState<number[]>([]);
const toggleFaq = (index: number) => {
  setOpenIndexes((prev) =>
    prev.includes(index)
      ? prev.filter((i) => i !== index) // close if already open
      : [...prev, index] // open new
  );
};
  return (
    <div className="bg-[#1D1818] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
    

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`
                border  overflow-hidden
                transition-all duration-300
              `}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none "
              >
                <h3 className="text-base sm:text-lg font-light ">
                  {item.question}
                </h3>
                <BiChevronDown
                  className={`
                    w-6 h-6 transition-transform duration-300
                    ${openIndexes.includes(index) ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              </button>

              {/* Answer - shown only when open */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndexes.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed ">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;