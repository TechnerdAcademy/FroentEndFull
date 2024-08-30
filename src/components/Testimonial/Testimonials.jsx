import React from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import img from "../../assests/images/testimonial01.png";
import "./testimonial.css";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="testimonial__wrapper d-flex justify-content-between align-items-center">
              <div className="testimonial__img w-50">
                <img src={img} alt="" className="w-100" />
              </div>

              <div className="testimonial__content w-50">
                <h2 className="mb-4">Our Students' Voice</h2>

                <Slider {...settings}>
                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Comprehensive and Practical Courses
                      </h6>
                      <p>
                        The courses offered here are practical and directly applicable to real-world scenarios. The instructors are highly knowledgeable, making learning both easy and enjoyable.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Rajesh Kumar</h6>
                        <p>Mumbai, Maharashtra</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Exceptional Support and Guidance
                      </h6>
                      <p>
                        The support team is always available to help with any challenges. Their guidance has been invaluable, and the learning experience has been extremely rewarding.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Priya Sharma</h6>
                        <p>Bangalore, Karnataka</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Great Value for Professional Development
                      </h6>
                      <p>
                        This platform offers great value for anyone looking to advance their career. The certifications are recognized and respected, helping me secure a better position in my field.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Amit Patel</h6>
                        <p>Ahmedabad, Gujarat</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        Highly Engaging and Interactive Learning
                      </h6>
                      <p>
                        The interactive elements of the courses kept me engaged throughout. The blend of theory and practical application was perfect for mastering new skills quickly.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Anjali Verma</h6>
                        <p>Delhi, India</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                        A Transformative Learning Experience
                      </h6>
                      <p>
                        The learning experience here has been transformative. The courses are well-structured, and the instructors are top-notch. I feel more confident in my professional abilities.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Sneha Mehta</h6>
                        <p>Pune, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
