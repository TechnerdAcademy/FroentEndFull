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
                At MADAN, we are driven by a passion for innovation and a deep
                belief in the power of creativity. Founded with a vision to
                shape the future, Our mission is to bridge the gap between bold
                ideas and real-world solutions through cutting-edge technology.
                By leveraging the potential of AI, robotics, and custom
                hardware, we create products that not only push the boundaries
                of what's possible but also have a positive impact on society.
                Our team works tirelessly to turn visionary concepts into
                tangible products
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={20} duration={2} suffix="+" />
                    </span>
                    <p className="counter__title">Courses Offered</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={200} duration={2} suffix="+" />
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
                      <CountUp start={0} end={10} duration={2} suffix="+" />
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
