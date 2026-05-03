import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import ProgramCardSection from "../components/sections/ProgramCardSection";
import TopSection from "../components/sections/TopSection";
import FaqSection from "../components/sections/FaqSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection
        title="Frequently Asked Questions"
        image="/assets/locationbg.png"
      />
      <FaqSection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
