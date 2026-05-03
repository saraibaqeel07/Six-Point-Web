import React from "react";
import PageWrapper from "../components/layout/PageWrapper";

import TopSection from "../components/sections/TopSection";
import PolicySection from "../components/sections/PolicySection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection
        title="FOUNDERS GOLD MEMBERSHIP AGREEMENT"
        image="/assets/locationbg.png"
      />
      <PolicySection />
    </PageWrapper>
  );
};

export default page;
