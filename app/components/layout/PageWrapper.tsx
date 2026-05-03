import React from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      {children}
      <Footer />
    </>
  );
};

export default PageWrapper;
