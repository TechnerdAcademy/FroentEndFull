import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactPlayer from "react-player";

import chooseImg from "../../assests/images/why-choose-us.png";
import "./choose-us.css";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Why Choose Us</h2>
              <p>
                At MADAN, we are committed to empowering your learning journey
                with top-notch tech education. Our platform is built on three
                pillars: expert instructors, comprehensive support, and
                unmatched flexibility. With a focus on student satisfaction, we
                ensure that every course is designed and delivered by
                industry-leading professionals who bring real-world experience
                to the classroom. Whether you're learning to code, diving into
                AI, or exploring data science, our resources are tailored to
                meet your goals. With 24/7 support and a vibrant learning
                community, MADAN is your trusted partner for advancing your tech
                career. Your success is our mission.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=DMkh1n_MPxw"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="Why Choose Us" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    className="ri-play-circle-line"
                    onClick={() => setShowVideo(true)}
                    aria-label="Play Video"
                    role="button"
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
