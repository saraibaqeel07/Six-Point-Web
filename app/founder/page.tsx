import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import TopSection from "../components/sections/TopSection";
import TimeTableSection from "../components/sections/TimeTableSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection
        title="Founders Platinum"
        image="/assets/locationbg.png"
      />
      <TimeTableSection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
