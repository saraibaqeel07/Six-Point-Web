import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import ProgramCardSection from "../components/sections/ProgramCardSection";
import TopSection from "../components/sections/TopSection";
import EventCard from "../components/sections/EventCard";

const page = () => {
  return (
    <PageWrapper>
      <TopSection title="EVENTS & WORKSHOPS" image="/assets/locationbg.png" />
      <EventCard />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
