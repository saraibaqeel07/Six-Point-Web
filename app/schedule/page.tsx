import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import TopSection from "../components/sections/TopSection";
import ScheduleSection from "../components/sections/ScheduleSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection title="Schedule" image="/assets/locationbg.png" />
      <ScheduleSection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
