import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Accelerate your learning process with our expertly crafted courses. Designed for efficiency, our programs help you grasp complex concepts quickly, ensuring you stay ahead in your career.",
    icon: "ri-draft-line",
  },

  {
    title: "All-Time Support",
    desc: "Our dedicated support team is available around the clock to assist you with any queries or challenges. Whether it's technical support or academic advice, we're here to help you succeed.",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "Earn industry-recognized certifications that validate your skills and knowledge. Our certifications open doors to new opportunities and help you stand out in a competitive job market.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section className="features">
      <Container>
        <Row className="text-center">
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index} className="mb-4">
              <div className="single__feature">
                <div className="icon mb-3">
                  <i className={item.icon}></i>
                </div>
                <h6 className="feature-title">{item.title}</h6>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
