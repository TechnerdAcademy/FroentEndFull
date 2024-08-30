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

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CompanySection />
        <AboutUs />
        <ChooseUs />
        <Features />
        <FreeCourse />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
