import React from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import img from "../../assests/images/testimonial01.png";
import "./testimonial.css";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: false,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };

  const testimonialsData = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      title: "Comprehensive and Practical Courses",
      feedback:
        "The courses offered here are practical and directly applicable to real-world scenarios. The instructors are highly knowledgeable, making learning both easy and enjoyable.",
    },
    {
      name: "Priya Sharma",
      location: "Bangalore, Karnataka",
      title: "Exceptional Support and Guidance",
      feedback:
        "The support team is always available to help with any challenges. Their guidance has been invaluable, and the learning experience has been extremely rewarding.",
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad, Gujarat",
      title: "Great Value for Professional Development",
      feedback:
        "This platform offers great value for anyone looking to advance their career. The certifications are recognized and respected, helping me secure a better position in my field.",
    },
    {
      name: "Anjali Verma",
      location: "Delhi, India",
      title: "Highly Engaging and Interactive Learning",
      feedback:
        "The interactive elements of the courses kept me engaged throughout. The blend of theory and practical application was perfect for mastering new skills quickly.",
    },
    {
      name: "Sneha Mehta",
      location: "Pune, Maharashtra",
      title: "A Transformative Learning Experience",
      feedback:
        "The learning experience here has been transformative. The courses are well-structured, and the instructors are top-notch. I feel more confident in my professional abilities.",
    },
    {
      name: "Manpreet Singh",
      location: "Chandigarh, Punjab",
      title: "Excellent Learning Platform",
      feedback:
        "I highly recommend this platform for anyone looking to expand their skills. The courses are detailed, and the instructors are very supportive.",
    },
    {
      name: "Simran Kaur",
      location: "Kharar, Punjab",
      title: "Top-Notch Instructors",
      feedback:
        "The instructors are very knowledgeable and provide excellent feedback. The course material is up-to-date and very relevant to the current industry standards.",
    },
    {
      name: "Ravi Sharma",
      location: "Patna, Bihar",
      title: "Effective and Engaging",
      feedback:
        "The interactive nature of the courses made learning fun and engaging. I was able to apply what I learned immediately in my job.",
    },
    {
      name: "Harpreet Singh",
      location: "Mohali, Punjab",
      title: "Career Growth Made Easy",
      feedback:
        "This platform provided me with the tools I needed to advance my career. The courses are well-structured and easy to follow.",
    },
    {
      name: "Neha Thakur",
      location: "Lucknow, Uttar Pradesh",
      title: "Professional Growth and Development",
      feedback:
        "The knowledge I gained here has been instrumental in my career development. The courses are well-designed, and the learning process is very smooth.",
    },
    {
      name: "Aditya Raj",
      location: "Bihar, India",
      title: "High-Quality Content",
      feedback:
        "The content is of very high quality and highly applicable to real-world scenarios. The platform offers a great learning experience.",
    },
    {
      name: "Rohit Gupta",
      location: "Delhi, India",
      title: "Innovative Teaching Methods",
      feedback:
        "The teaching methods used here are innovative and make learning very enjoyable. I highly recommend this platform to anyone looking to enhance their skills.",
    },
    {
      name: "Amanpreet Kaur",
      location: "Amritsar, Punjab",
      title: "User-Friendly Platform",
      feedback:
        "The platform is user-friendly, and the course structure is very well thought out. The support team is always available to help.",
    },
    {
      name: "Sakshi Mehra",
      location: "Gurugram, Haryana",
      title: "Great Learning Experience",
      feedback:
        "I had a great learning experience here. The instructors are very helpful, and the content is detailed and easy to understand.",
    },
    {
      name: "Ravi Pratap",
      location: "Chandigarh, Punjab",
      title: "Helpful and Supportive Environment",
      feedback:
        "The instructors and support team are very helpful. They provided me with all the guidance I needed to succeed in my career.",
    },
  ];

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
                  {testimonialsData.map((testimonial, index) => (
                    <div key={index}>
                      <div className="single__testimonial">
                        <h6 className="mb-3 fw-bold">{testimonial.title}</h6>
                        <p>{testimonial.feedback}</p>

                        <div className="student__info mt-4">
                          <h6 className="fw-bold">{testimonial.name}</h6>
                          <p>{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
