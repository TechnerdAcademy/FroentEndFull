import React, { useEffect, useState } from "react";
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
  const [playlist, setPlaylist] = useState([]); // Initialize with empty string
  const [userid, setUserid] = useState("");

  useEffect(() => {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserid(user.id);
    } else {
      console.error("No user found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (userid) {
      const fetchCourseCount = async () => {
        try {
          const { data } = await main_axios.get(`/courses/count/${userid}`);
          console.log("API Response:", data);
          setCourseCount(data.count);
        } catch (error) {
          console.error("Error fetching course count:", error);
        }
      };

      fetchCourseCount();
    } else {
      console.error("User ID is not set");
    }
  }, [userid]);

  useEffect(() => {
    if (userid) {
      const fetchPlaylist = async () => {
        try {
          const { data } = await main_axios.get(
            `/courses/playlistlink/${userid}`
          );
          console.log("API Response:", data);
          const filteredPlaylist = data.filter(
            (course) => course.playlistLink !== ""
          );
          setPlaylist(filteredPlaylist);
        } catch (error) {
          console.error("Error fetching course count:", error);
        }
      };

      fetchPlaylist();
    } else {
      console.error("User ID is not set");
    }
  }, [userid]);
  const [liveclasslink, setLiveclasslink] = useState([]);

  useEffect(() => {
    if (userid) {
      const fetchlivelist = async () => {
        try {
          const { data } = await main_axios.get(
            `/courses/liveclasslink/${userid}`
          );
          console.log("API Response:", data);
          // Filter based on liveClassLink field being non-empty
          const filteredList = data.filter(
            (course) => course.liveClassLink !== ""
          );
          setLiveclasslink(filteredList);
        } catch (error) {
          console.error("Error fetching live class links:", error);
        }
      };

      fetchlivelist();
    } else {
      console.error("User ID is not set");
    }
  }, [userid]);
 const [announsment , setAnnouncement] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await main_axios.get(`/announcement/`);
        console.log("API Response Announsment:", data);
        setAnnouncement(data)
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
  
    fetchData();  // Call the async function
  
  }, []);  // Empty dependency array to run only on mount
  

  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Define total time (in seconds) for 28 days
    const totalDurationInSeconds = 28 * 24 * 60 * 60;

    // Update every second
    const intervalTime = 1000; // 1 second

    // Calculate increment per second to reach 100% in 28 days
    const incrementPerSecond = 100 / totalDurationInSeconds;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + incrementPerSecond;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, intervalTime);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

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
              <FaBook size={40} className="mb-2" style={{ color: "#17a2b8" }} />
              <CardTitle tag="h5">Total Courses Enrolled</CardTitle>

              {courseCount > 0 ? (
                <h3>
                  {" "}
                  <CardText>You are enrolled in:</CardText>
                  {courseCount} Courses
                </h3> // Display course count
              ) : (
                <h3>Please enroll in a course</h3> // Display message if courseCount is 0
              )}
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
              <Progress value={progress} color="info">
                {Math.round(progress)}%
              </Progress>
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
                  {playlist.map((course, index) => (
                    <li key={index}>
                      <a
                        href={course.playlistLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{course.title}: </strong> {index + 1}
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
              {announsment.length > 0 ? (
              <ul>
                {announsment.map((announcement, index) => (
                  <li key={index}>
                    {announcement.title}: 
                  </li>
                ))}
            
              </ul>
              ) : (
                <p>No new messages/announcements.</p>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col sm="12" md="6" lg="4">
      <Card className="mb-4" style={cardHeight}>
        <CardBody className="text-left">
          <FaClock size={40} className="mb-2" style={{ color: "#17a2b8" }} />
          <CardTitle tag="h5">Live Class/Session Link</CardTitle>

          {liveclasslink.length > 0 ? (
            <ul>
              {liveclasslink.map((course, index) => (
                <li key={index}>
                  <a
                    href={course.liveClassLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{course.title}: </strong> {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No live classes available.</p>
          )}
        </CardBody>
      </Card>
    </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
