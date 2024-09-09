import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "./BusinessPackageForm.css"; // Import the custom CSS

const BusinessPackageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobileNumber, email, description } = formData;

    if (!name || !mobileNumber || !email || !description) {
      setError(true);
      return;
    }

    setError(false);
    setSubmitted(true);
    console.log("Form Data Submitted:", formData);

    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      description: "",
    });
  };

  return (
    <section className="business-package-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <div className="form-header text-center">
              <h1 className="stunning-heading mb-4">
                Create, Innovate, Elevate
              </h1>
              <h3 className="subheading">
                Custom Business Solutions for Your Unique Needs
              </h3>
              <p className="pp">
                At Technerds, we provide comprehensive solutions for your business needs. Whether you're looking to create a
                stunning website, design captivating flyers, produce logo introduction videos, or craft introductory papers for your business, we have the right package for you.
              </p>

            </div>

            {error && <Alert color="danger">Please fill in all fields!</Alert>}
            {submitted && !error && <Alert color="success">Your request has been submitted successfully!</Alert>}

            <Form onSubmit={handleSubmit} className="business-package-form">
              <FormGroup>
                <Label for="name">Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormGroup>

              <FormGroup>
                <Label for="mobileNumber">Mobile Number</Label>
                <Input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Provide a brief description of your project"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </FormGroup>

              <Button color="primary" type="submit" className="submit-button w-100">
                Submit Your Request
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BusinessPackageForm;
