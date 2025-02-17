import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeroSection from "../components/Hero-Section/HeroSection";
import CompanySection from "../components/Company-section/Company";
import AboutUs from "../components/About-us/AboutUs";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import FreeCourse from "../components/Free-course-section/FreeCourse";
import Testimonials from "../components/Testimonial/Testimonials";
import Buisnesspackage from "../components/buisness-package/index";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      
        <AboutUs />
        <ChooseUs />
        <Features />
        <FreeCourse />
        <Testimonials />
        {/* <Buisnesspackage/> */}
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
