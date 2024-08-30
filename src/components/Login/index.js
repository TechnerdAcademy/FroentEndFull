import React, { useState } from "react";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser, FaMobileAlt } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const navigate = useNavigate();


  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    return mobileRegex.test(mobile);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError("");
      const response = await axios.post("http://localhost:4001/v1/auth/login", { email, password });
      console.log("Login successful", response.data);
      const { tokens } = response.data;
      localStorage.setItem("users", JSON.stringify({ email, password }));
      localStorage.setItem("accessToken", tokens.access.token);
      localStorage.setItem("accessTokenExpires", tokens.access.expires);
      localStorage.setItem("refreshToken", tokens.refresh.token);
      localStorage.setItem("refreshTokenExpires", tokens.refresh.expires);
      toast.success("Login successful!");
      navigate('/dashboard')
    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return;
      }
      if (!validateMobile(mobile)) {
        setMobileError("Invalid mobile number");
        return;
      }
      setEmailError("");
      setMobileError("");

      const response = await axios.post("http://localhost:4001/v1/auth/register", {
        name,
        email,
        mobile,
        password,
      });
      console.log("Registration successful", response.data);
      const { tokens } = response.data;
      localStorage.setItem("userData", JSON.stringify({ name, email, mobile, password }));
      localStorage.setItem("token", tokens.access.token);
      localStorage.setItem("rToken", tokens.refresh.token);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      if (!validateEmail(email)) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError("");
      const response = await axios.post("/api/forgot-password", { email });
      console.log("Password reset email sent", response.data);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Forgot password error", error);
      toast.error("Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMobile("");
    setName("");
    setEmailError("");
    setMobileError("");
    setLoading(false);
  };

  const pageStyle = {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  };

  const iconStyle = {
    fontSize: '2.5rem', 
    marginRight: '10px',
    color: '#17bf9e', 
  };

  const textStyle = {
    color: '#343a40',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const tabLinkStyle = {
    fontWeight: '600',
    transition: 'color 0.3s ease-in-out',
    color: '#343a40',
  };

  const activeTabStyle = {
    color: '#007bff',
    borderBottom: '3px solid #007bff',
  };

  const formContainerStyle = {
    maxWidth: '450px',
    width: '100%',
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    color: '#495057',
    fontWeight: '500',
    marginBottom: '0.5rem',
  };

  const inputGroupStyle = {
    position: 'relative',
  };

  const inputStyle = {
    borderRadius: '5px',
    borderColor: '#ced4da',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const buttonStyle = {
    borderRadius: '50px',
    padding: '0.5rem 1rem', // Decreased padding
    fontSize: '0.8rem', // Decreased font size
    fontWeight: '600',
    borderColor: '#007bff',
    color: '#fff',
    backgroundColor: '#007bff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyleHover = {
    backgroundColor: '#0056b3',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  };

  const eyeIconStyle = {
    cursor: 'pointer',
    color: '#343a40', 
  };

  return (
    <div style={pageStyle}>
      <ToastContainer />
      <div style={headerStyle}>
        <i className="ri-pantone-line" style={iconStyle}></i>
        <span style={textStyle}>Technerds</span>
      </div>
      <div style={formContainerStyle}>
        <Nav tabs className="justify-content-center">
          <NavItem className="w-33 text-center">
            <NavLink
              style={{ ...tabLinkStyle, ...(activeTab === "1" ? activeTabStyle : {}) }}
              onClick={() => toggleTab("1")}
            >
              Sign In
            </NavLink>
          </NavItem>
          <NavItem className="w-33 text-center">
            <NavLink
              style={{ ...tabLinkStyle, ...(activeTab === "2" ? activeTabStyle : {}) }}
              onClick={() => toggleTab("2")}
            >
              Sign Up
            </NavLink>
          </NavItem>
          <NavItem className="w-33 text-center">
            <NavLink
              style={{ ...tabLinkStyle, ...(activeTab === "3" ? activeTabStyle : {}) }}
              onClick={() => toggleTab("3")}
            >
              Forgot Password
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Form>
              <FormGroup style={formGroupStyle}>
                <Label for="signInEmail" style={labelStyle}>
                  Email
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineMail /></InputGroupText>
                  <Input
                    type="email"
                    name="email"
                    id="signInEmail"
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                {emailError && <div style={{ color: "red", marginTop: "0.5rem" }}>{emailError}</div>}
              </FormGroup>
              <FormGroup style={formGroupStyle}>
                <Label for="signInPassword" style={labelStyle}>
                  Password
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineLock /></InputGroupText>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="signInPassword"
                    placeholder="Enter your password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupText style={eyeIconStyle} onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <div style={buttonContainerStyle}>
                <Button
                  color="primary"
                  style={buttonStyle}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Sign In"}
                </Button>
                <Button
                  color="secondary"
                  style={cancelButtonStyle}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </TabPane>
          <TabPane tabId="2">
            <Form>
              <FormGroup style={formGroupStyle}>
                <Label for="signUpName" style={labelStyle}>
                  Name
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><FaUser /></InputGroupText>
                  <Input
                    type="text"
                    name="name"
                    id="signUpName"
                    placeholder="Enter your name"
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup style={formGroupStyle}>
                <Label for="signUpEmail" style={labelStyle}>
                  Email
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineMail /></InputGroupText>
                  <Input
                    type="email"
                    name="email"
                    id="signUpEmail"
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                {emailError && <div style={{ color: "red", marginTop: "0.5rem" }}>{emailError}</div>}
              </FormGroup>
              <FormGroup style={formGroupStyle}>
                <Label for="signUpMobile" style={labelStyle}>
                  Mobile
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><FaMobileAlt /></InputGroupText>
                  <Input
                    type="text"
                    name="mobile"
                    id="signUpMobile"
                    placeholder="Enter your mobile number"
                    style={inputStyle}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </InputGroup>
                {mobileError && <div style={{ color: "red", marginTop: "0.5rem" }}>{mobileError}</div>}
              </FormGroup>
              <FormGroup style={formGroupStyle}>
                <Label for="signUpPassword" style={labelStyle}>
                  Password
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineLock /></InputGroupText>
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="signUpPassword"
                    placeholder="Enter your password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroupText style={eyeIconStyle} onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup style={formGroupStyle}>
                <Label for="confirmPassword" style={labelStyle}>
                  Confirm Password
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineLock /></InputGroupText>
                  <Input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputGroupText style={eyeIconStyle} onClick={toggleConfirmPasswordVisibility}>
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <div style={buttonContainerStyle}>
                <Button
                  color="primary"
                  style={buttonStyle}
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Sign Up"}
                </Button>
                <Button
                  color="secondary"
                  style={cancelButtonStyle}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </TabPane>
          <TabPane tabId="3">
            <Form>
              <FormGroup style={formGroupStyle}>
                <Label for="forgotPasswordEmail" style={labelStyle}>
                  Email
                </Label>
                <InputGroup style={inputGroupStyle}>
                  <InputGroupText><AiOutlineMail /></InputGroupText>
                  <Input
                    type="email"
                    name="email"
                    id="forgotPasswordEmail"
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                {emailError && <div style={{ color: "red", marginTop: "0.5rem" }}>{emailError}</div>}
              </FormGroup>
              <div style={buttonContainerStyle}>
                <Button
                  color="primary"
                  style={buttonStyle}
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Reset Password"}
                </Button>
                <Button
                  color="secondary"
                  style={cancelButtonStyle}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default LoginPage;
