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
                At Technerds, we pride ourselves on delivering excellence in everything we do. Our experienced team, commitment to quality, customer-centric approach, and innovative solutions set us apart. Choosing us means choosing a partner dedicated to your success.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
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
