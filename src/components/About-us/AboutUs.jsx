import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";
import "./about.css";

const AboutUs = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
                Welcome to Technerds, your go-to platform for all things e-learning. Our mission is to make education accessible and enjoyable for everyone, regardless of their location or background. We offer a wide range of courses designed to help you achieve your educational and professional goals.
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={500} duration={2} suffix="+" />
                    </span>
                    <p className="counter__title">Courses Offered</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={20000} duration={2} suffix="+" />
                    </span>
                    <p className="counter__title">Students Enrolled</p>
                  </div>
                </div>

                <div className="d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={100} duration={2} suffix="%" />
                    </span>
                    <p className="counter__title">Student Satisfaction</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={20} duration={2} suffix="+" />
                    </span>
                    <p className="counter__title">Expert Instructors</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
