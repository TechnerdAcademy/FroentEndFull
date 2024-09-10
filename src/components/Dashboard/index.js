import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Progress,
} from "reactstrap";
import {
  FaBook,
  FaChartLine,
  FaGraduationCap,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import main_axios from "../../utilities/mainaxios";

const Dashboard = () => {
  const cardHeight = { minHeight: "250px" }; // Set minimum height for all cards
  const [courseCount, setCourseCount] = useState(""); // Initialize with 0
  const [playlist ,setPlaylist] = useState([]); // Initialize with empty string
  const [userid, setUserid] = useState("");

  useEffect(() => {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserid(user.id);
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (userid) {
      const fetchCourseCount = async () => {
        try {
          const { data } = await main_axios.get(`/courses/count/${userid}`);
          console.log('API Response:', data);
          setCourseCount(data.count); 
        } catch (error) {
          console.error('Error fetching course count:', error);
        }
      };

      fetchCourseCount();
    } else {
      console.error('User ID is not set');
    }
  }, [userid]);

  useEffect(() => {
    if (userid) {
      const fetchPlaylist = async () => {
        try {
          const { data } = await main_axios.get(`/courses/playlistlink/${userid}`);
          console.log('API Response:', data); 
          const filteredPlaylist = data.filter(link => link !== "");
          setPlaylist(filteredPlaylist);
        } catch (error) {
          console.error('Error fetching course count:', error);
        }
      };

      fetchPlaylist();
    } else {
      console.error('User ID is not set');
    }
  }, [userid]);

  useEffect(() => {
    if (userid) {
      const fetchlivelist = async () => {
        try {
          const { data } = await main_axios.get(`/courses/liveclasslink/${userid}`);
          console.log('API Response:', data); // Debugging: log the API response
           // Update state with the correct data property
        } catch (error) {
          console.error('Error fetching course count:', error);
        }
      };

      fetchlivelist();
    } else {
      console.error('User ID is not set');
    }
  }, [userid]);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2 className="text-left">Welcome to Your Dashboard</h2>
          <p className="lead text-left">
            Here’s an overview of your courses and progress.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm="12" md="6" lg="4">
          <Card className="mb-4" style={cardHeight}>
            <CardBody className="text-left">
              <FaBook
                size={40}
                className="mb-2"
                style={{ color: "#17a2b8" }}
              />
              <CardTitle tag="h5">Total Courses Enrolled</CardTitle>
              <CardText>You are enrolled in:</CardText>
              <h3>{courseCount} Courses</h3> {/* Display course count */}
            </CardBody>
          </Card>
        </Col>

        <Col sm="12" md="6" lg="4">
          <Card className="mb-4" style={cardHeight}>
            <CardBody className="text-left">
              <FaChartLine
                size={40}
                className="mb-2"
                style={{ color: "#17a2b8" }}
              />
              <CardTitle tag="h5">Overall Progress</CardTitle>
              <CardText>Your overall course completion.</CardText>
              <Progress value={70} color="info" />
            </CardBody>
          </Card>
        </Col>

        <Col sm="12" md="6" lg="4">
      <Card className="mb-4" style={cardHeight}>
        <CardBody className="text-left">
          <FaGraduationCap
            size={40}
            className="mb-2"
            style={{ color: "#17a2b8" }}
          />
          <CardTitle tag="h5">Playlist Links of Enrolled Courses</CardTitle>
          
          {/* Display each playlist link as a clickable item */}
          {playlist.length > 0 ? (
            <ul>
              {playlist.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    link {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No playlist available.</p>
          )}
        </CardBody>
      </Card>
    </Col>

        <Col sm="12" md="6" lg="4">
          <Card className="mb-4" style={cardHeight}>
            <CardBody className="text-left">
              <FaEnvelope
                size={40}
                className="mb-2"
                style={{ color: "#17a2b8" }}
              />
              <CardTitle tag="h5">Messages/Announcements</CardTitle>
              <CardText>You have 2 new messages:</CardText>
              <ul>
                <li>New announcement from Math teacher</li>
                <li>Reminder for Science Quiz</li>
              </ul>
            </CardBody>
          </Card>
        </Col>

        <Col sm="12" md="6" lg="4">
          <Card className="mb-4" style={cardHeight}>
            <CardBody className="text-left">
              <FaClock
                size={40}
                className="mb-2"
                style={{ color: "#17a2b8" }}
              />
              <CardTitle tag="h5">Live Class/Session Link</CardTitle>
              <CardText>Your next class Link is:</CardText>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
