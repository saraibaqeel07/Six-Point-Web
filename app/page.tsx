import React from "react";
import PageWrapper from "./components/layout/PageWrapper";
import HeroSection from "./components/sections/HeroSection";
import TeamSection from "./components/sections/TeamSection";
import BrazilianCoachSection from "./components/sections/BrazilianCoachSection";
import PhilosophySection from "./components/sections/PhilosophySection";
import BookAppSection from "./components/sections/BookAppSection";
import LocationSection from "./components/sections/LocationSection";

const page = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <TeamSection />
      <BrazilianCoachSection />
      <PhilosophySection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
