import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import ProgramCardSection from "../components/sections/ProgramCardSection";
import TopSection from "../components/sections/TopSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection title="Programs" image="/assets/locationbg.png" />
      
      <ProgramCardSection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
