import React from "react";

const BrazilianCoachSection = () => {
  return (
    <div className="relative py-8 sm:py-10 md:py-14 bg-[#2F2F2F] text-white overflow-hidden">
      
      {/* Top Title */}
      <div className="py-6 sm:py-8 md:py-10 flex justify-center px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase leading-[1.3]">
          Brazilian Jiu-Jitsu Coach
        </h2>
      </div>

      {/* Background Images */}
      <img
        src="/assets/blur.png"
        alt="Background"
        className="absolute -top-10 left-0 w-40 sm:w-60 md:w-auto opacity-60"
      />
      <img
        src="/assets/dollar.png"
        alt="Background"
        className="hidden md:block absolute top-1/2 -right-32 lg:-right-40 w-72 lg:w-96 opacity-10"
      />

      {/* Main Content */}
      <div className="flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-8 md:gap-10">

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src="/assets/brazilian-coach.png"
              alt="Luiz Fernando Ribeiro - Brazilian Jiu-Jitsu Coach"
              className="w-full max-w-xs sm:max-w-md md:max-w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left pt-2 sm:pt-4 md:pt-10 max-w-xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl uppercase leading-[1.3] mb-4">
              LUIZ FERNANDO RIBEIRO
            </h3>

            <p className="text-base font-bold leading-relaxed">
              Brazilian Jiu-Jitsu Coach | 28 Years of Practice | 15 Years of Teaching Experience
            </p>

            <p className="mt-3 sm:mt-4 text-base font-light leading-relaxed">
              Luiz Fernando Ribeiro is a highly experienced Brazilian Jiu-Jitsu coach with 28 years of practice and 15 years dedicated to teaching, developing athletes and teams with a strong focus on technical excellence, discipline, and performance.
            </p>

            <p className="mt-3 sm:mt-4 text-base font-light leading-relaxed">
              With a solid international competitive background, Luiz has achieved significant titles across the world’s leading federations, combining high-level competition experience with a practical and effective teaching approach for students of all levels.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrazilianCoachSection;