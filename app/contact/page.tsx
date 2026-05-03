import React from "react";
import PageWrapper from "../components/layout/PageWrapper";

import TopSection from "../components/sections/TopSection";
import ContactLocationSection from "../components/sections/ContactLocationSection";

const page = () => {
  return (
    <PageWrapper>
      <TopSection title="Contact" image="/assets/locationbg.png" />
<ContactLocationSection />
    </PageWrapper>
  );
};

export default page;
