import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg01 from "../../assests/images/web-development.png";
import courseImg02 from "../../assests/images/kids-learning.png";
import courseImg03 from "../../assests/images/seo.png";
import courseImg04 from "../../assests/images/ui-ux.png";
import "./free-course.css"; // Import the CSS file

const freeCourseData = [
  {
    id: "01",
    title: "Basic Web Development Course",
    imgUrl: courseImg01,
    students: 5.3,
    rating: 1.7,
    description: "Learn the fundamentals of web development with this comprehensive course. Ideal for beginners.",
  },
  {
    id: "02",
    title: "Coding for Junior Basic Course",
    imgUrl: courseImg02,
    students: 5.3,
    rating: 1.7,
    description: "Introduce young learners to coding with fun and interactive lessons.",
  },
  {
    id: "03",
    title: "Search Engine Optimization - Basic",
    imgUrl: courseImg03,
    students: 5.3,
    rating: 1.7,
    description: "Understand the basics of SEO to improve website rankings on search engines.",
  },
  {
    id: "04",
    title: "Basic UI/UX Design - Figma",
    imgUrl: courseImg04,
    students: 5.3,
    rating: 1.7,
    description: "Learn UI/UX design principles and tools using Figma for creating user-friendly interfaces.",
  },
];

const FreeCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleBuyClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  // Adjust button style to move it upward
  const buttonStyle = {
    backgroundColor: "green", // Green background color
    color: "white",
    border: "none",
    padding: "4px 25px !important",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "transform 0.3s ease", // Smooth transition
    transform: "scale(1.1)", // Scale on hover
    position: "absolute",
    bottom: "-12px", // Moved upward from -20px to 10px
    right: "20px",
    zIndex: 999999,
  };

  return (
    <section>
      <Container>
        {selectedCourse ? (
          <div style={{ padding: "20px" }}>
            <button onClick={handleBackClick} style={{ marginBottom: "20px" }}>
              Back
            </button>
            <h2>{selectedCourse.title}</h2>
            <img
              src={selectedCourse.imgUrl}
              alt={selectedCourse.title}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }}
            />
            <p><strong>Rating:</strong> {selectedCourse.rating}k</p>
            <p><strong>Students Enrolled:</strong> {selectedCourse.students}k</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>
          </div>
        ) : (
          <>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="fw-bold">Our Courses</h2>
              </Col>
            </Row>
            <Row>
              {freeCourseData.map((item) => (
                <Col lg="3" md="4" className="mb-4" key={item.id}>
                  <div className="single__free__course">
                    <div className="free__course__img mb-5">
                      <img src={item.imgUrl} alt={item.title} className="w-100" />
                      <button
                        className="btn free__btn"
                        style={buttonStyle}
                        // onClick={() => handleBuyClick(item)}
                      >
                        Buy
                      </button>
                    </div>
                    <div className="free__course__details">
                      <h6>{item.title}</h6>
                      <div className="d-flex align-items-center gap-5">
                        <span className="d-flex align-items-center gap-2">
                          <i className="ri-user-line"></i> {item.students}k
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <i className="ri-star-fill"></i> {item.rating}k
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </section>
  );
};

export default FreeCourse;
