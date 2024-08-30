// import React, { Fragment, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import loadable from "@loadable/component";
// import Loader from "../components/Loader.js"; 

// const Header = loadable(() => import("../components/Header/Header"));
// const HeroSection = loadable(() => import("../components/Hero-Section/HeroSection"));
// const CompanySection = loadable(() => import("../components/Company-section/Company"));
// const AboutUs = loadable(() => import("../components/About-us/AboutUs"));
// const ChooseUs = loadable(() => import("../components/Choose-us/ChooseUs"));
// const Features = loadable(() => import("../components/Feature-section/Features"));
// const FreeCourse = loadable(() => import("../components/Free-course-section/FreeCourse"));
// const Testimonials = loadable(() => import("../components/Testimonial/Testimonials"));
// const Newsletter = loadable(() => import("../components/Newsletter/Newsletter"));
// const Footer = loadable(() => import("../components/Footer/Footer"));

// const Home = () => {
//   return (
//     <Fragment>
//       <Suspense fallback={<Loader />}>
//         <Header />
//         <Routes>
//           <Route path="/" element={<HeroSection />} />
//           <Route path="/company" element={<CompanySection />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/choose-us" element={<ChooseUs />} />
//           <Route path="/features" element={<Features />} />
//           <Route path="/free-course" element={<FreeCourse />} />
//           <Route path="/testimonials" element={<Testimonials />} />
//           <Route path="/newsletter" element={<Newsletter />} />
//         </Routes>
//         <Footer />
//       </Suspense>
//     </Fragment>
//   );
// };

// export default Home;
