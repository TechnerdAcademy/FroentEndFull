import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "./BusinessPackageForm.css"; // Import the custom CSS

const BusinessPackageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    description: "",
    packageType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobileNumber, email, description, packageType } = formData;

    if (!name || !mobileNumber || !email || !description || !packageType) {
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
      packageType: "",
    });
  };

  return (
    <section className="business-package-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <div className="form-header">
              <h2 className="text-center mb-4">Business Package Inquiry</h2>
            </div>

            {error && <Alert color="danger">Please fill in all fields!</Alert>}
            {submitted && !error && <Alert color="success">Your inquiry has been submitted successfully!</Alert>}

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
                <Label for="packageType">Package Type</Label>
                <Input
                  type="select"
                  name="packageType"
                  id="packageType"
                  value={formData.packageType}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select Package</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
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

              <Button color="primary" type="submit" className="submit-button">
                Submit Inquiry
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BusinessPackageForm;
