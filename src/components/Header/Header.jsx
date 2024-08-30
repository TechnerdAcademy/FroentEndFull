import React, { useRef, useState } from "react";
import { Container } from "reactstrap";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./header.css";

const navLinks = [
  { display: "Home", url: "/" },
  { display: "About", url: "/about-us" },
  { display: "Courses", url: "/free-course" },
  { display: "Login", url: "/login" }, // Link to /login
  { display: "Why Choose Us", url: "/choose-us" }
];

const Header = () => {
  const menuRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className="d-flex align-items-center gap-1">
              <i className="ri-pantone-line"></i> Technerds.
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.url}>
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-phone-line"></i> +91 9693329842
              </p>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
