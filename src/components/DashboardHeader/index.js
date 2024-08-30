import React, { useRef } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom"; // Import Link
import "./header.css";

const navLinks = [
  { display: "Home", url: "/" },
  { display: "Cart", url: "#" }, // Update if you have a Cart page
  { display: "Courses", url: "/dashboard/courses" }, // Update to match dashboard route
  { display: "Profile", url: "/dashboard/profile" }, // Update if you have a Profile page
  { display: "My courses", url: "#" } // Update if you have a My Courses page
];

const Header = () => {
  const menuRef = useRef();

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
