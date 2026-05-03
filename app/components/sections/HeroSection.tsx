import Image from "next/image";
import Link from "next/link";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Button from "@/app/components/elements/Button";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[660px] sm:min-h-[620px] md:min-h-[700px] lg:min-h-[808px]
      flex items-end text-white overflow-hidden
      bg-[url('/assets/bg_hero_banner.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/82 z-0"></div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/0 to-[rgba(255,255,255,0.30)] pointer-events-none"></div>

      {/* Decorative background images */}
      <Image
        src="/assets/banner_artwork_01.png"
        alt="Decorative bottom left"
        width={265}
        height={771}
        className="absolute bottom-0 left-0 pointer-events-none z-[5] 
                   w-[120px] sm:w-[180px] md:w-[220px] lg:w-auto"
      />

      <Image
        src="/assets/banner_artwork_02.png"
        alt="Decorative top right"
        width={143}
        height={179}
        className="absolute top-0 right-0 pointer-events-none z-[5]
                   w-[80px] sm:w-[110px] md:w-auto"
      />

      <Image
        src="/assets/banner_artwork_03.png"
        alt="Decorative bottom right"
        width={148}
        height={300}
        className="absolute bottom-0 right-0 pointer-events-none z-[5]
                   w-[90px] sm:w-[120px] md:w-auto"
      />

      <div className="relative z-10 mx-auto px-5 sm:px-6 md:px-10 pt-12 md:pt-0 md:pb-0 w-full max-w-7xl">
        <div className="grid md:grid-cols-2 gap-0 md:gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Image */}
          <div
            className="relative aspect-[4/5] md:aspect-auto 
           h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px]
            rounded-xl md:rounded-2xl overflow-hidden
            order-2 md:order-1"
          >
            <Image
              src="/assets/trainers.png"
              alt="Sixth Point Jiu-Jitsu instructors and students training together"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* RIGHT: Text + CTA */}
          <div
            className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-5
            order-1 md:order-2
            text-center md:text-left
            md:-translate-y-4 lg:-translate-y-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase leading-[1.2]">
              REFINED WORLD
              <br />
              CLASS JIU-JITSU
              <br />
              TRAINING
            </h1>

            <p className="text-xs sm:text-sm text-white max-w-xl leading-relaxed font-normal mx-auto md:mx-0">
              Train with discipline, precision, and purpose at Sixth Point
              Jiu-Jitsu — a premium academy focused on technical excellence,
              athlete development, and strong community values.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button href="/program" className="hidden sm:inline-flex">
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}