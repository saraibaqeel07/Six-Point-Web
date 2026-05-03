import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import BookAppSection from "../components/sections/BookAppSection";
import LocationSection from "../components/sections/LocationSection";
import TopSection from "../components/sections/TopSection";
import MembershipSection from "../components/sections/MembershipSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection title="Memberships" image="/assets/locationbg.png" />
<MembershipSection />
      <BookAppSection />
      <LocationSection />
    </PageWrapper>
  );
};

export default page;
