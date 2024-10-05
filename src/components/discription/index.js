import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
  Grid,
  Chip,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Rating,
  Snackbar,
  Alert,
  List,
  ListItemText,
  ListItem,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import main_axios from "../../utilities/mainaxios";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CodeIcon from "@mui/icons-material/Code";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseDescription = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCourseDetails = async () => {
    try {
      const response = await main_axios.get(`/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseCourse = async (courseId, type) => {
    // Load Razorpay Script
    navigate("/login");
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ padding: 4, backgroundColor: "#fffcf7", minHeight: "100vh" }}>
        <Typography variant="h6" sx={{ color: "#e57373", textAlign: "center" }}>
          Course not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            border: "2px solid #ff7043",
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "#1a1a1a",
            position: "relative",
            boxShadow: "0 8px 16px rgba(255, 112, 67, 0.2)",
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Avatar
              src={course.imageUrl}
              variant="rounded"
              sx={{
                width: "70%",
                height: "auto",
                borderRadius: 4,
                mb: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff7043",
                color: "#fff",
                padding: "14px 40px",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f4511e",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                },
                mb: 3,
              }}
              onClick={() => handlePurchaseCourse(courseId, "regular")}
            >
              {`Enroll Now -  ₹${course.discountedPrice}`}
            </Button>

            <Box
              sx={{ display: "flex", alignItems: "center", color: "#f7e9e9" }}
            >
              <Typography variant="body1" sx={{ mr: 1, color: "#f7e9e9" }}>
                Rating:
              </Typography>
              <Rating
                value={4.3}
                precision={0.5}
                readOnly
                sx={{ fontSize: 20, color: "#17bf9e" }}
              />
            </Box>
          </Box>

          {/* Right Side */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}
            >
              {course.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#f7e9e9",
                textAlign: "justify",
                lineHeight: 1.6,
              }}
            >
              {course.description}
            </Typography>

            {/* Add more course details here */}
          </Box>
        </Box>

        {/* Course Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              mb: 4,
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              What you'll learn
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.whatYouLearn &&
                course.whatYouLearn.map((item, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: "#4caf50", mr: 2 }} />
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                      {item}
                    </Typography>
                  </li>
                ))}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                mt: 4,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              Course Objective
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.objective &&
                course.objective.map((obj, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <ArrowRightIcon sx={{ color: "#1a237e", mr: 2 }} />
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                      {obj}
                    </Typography>
                  </li>
                ))}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                mt: 4,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              Projects ({course.projects ? course.projects.length : 0})
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.projects &&
                course.projects.map((obj, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CodeIcon sx={{ color: "#2e7d32", mr: 2 }} />
                    <Typography variant="body1" sx={{ display: "inline" }}>
                      {obj}
                    </Typography>
                  </li>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "16px",
              padding: "32px",
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                mt: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#1b5e20",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Unlock Premium Course Features
              </Typography>
              {course.Included &&
                course.Included.map((item, index) => (
                  <Box
                    key={item._id}
                    sx={{
                      width: "100%",
                      borderRadius: "12px",
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#00695c",
                        fontWeight: "bold",
                        mb: 2,
                        borderBottom: "2px solid #00695c",
                        paddingBottom: "8px",
                      }}
                    >
                      {`You Will Receive a ${item.certification}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <AccessTimeIcon sx={{ mr: 1, color: "#4caf50" }} />
                      <strong>Learning Days:</strong> Gain{" "}
                      {item.hoursOfLearning}+ Days of comprehensive learning.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <WorkIcon sx={{ mr: 1, color: "#2196f3" }} />
                      <strong>Internship Opportunity:</strong>{" "}
                      {item.internshipOpportunity
                        ? "Yes, included! You will get a chance to gain real-world experience and enhance your skills."
                        : "Unfortunately, not included."}
                    </Typography>

                    {item.resources.map((resource, idx) => (
                      <ListItem key={idx} sx={{ pl: 0 }}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon sx={{ color: "#4caf50" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={resource}
                          sx={{
                            "& .MuiListItemText-primary": { fontWeight: 500 },
                          }}
                        />
                      </ListItem>
                    ))}

                    {index !== course.Included.length - 1 && (
                      <Divider sx={{ mt: 3 }} />
                    )}
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Separate Div for Course Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "16px",
              padding: "32px",
              mt: 4,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a5f7a",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Course Content
            </Typography>
            {course.CourseContent &&
              course.CourseContent.map((week, index) => (
                <Accordion
                  key={week._id}
                  sx={{
                    mb: 2,
                    backgroundColor: "#ffffff",
                    width: "100%",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#1a5f7a" }} />}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0f7fa",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1a5f7a" }}
                    >
                      Week {week.weekNumber}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                    {week.days.map((day, dayIndex) => (
                      <Box key={day._id} sx={{ mb: 3 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            color: "#2c3e50",
                            borderBottom: "2px solid #3498db",
                            display: "inline-block",
                          }}
                        >
                          {day.day}
                        </Typography>
                        {day.topics.map((topic, topicIndex) => (
                          <Box key={topicIndex} sx={{ ml: 3, mb: 2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                color: "#34495e",
                                mb: 0.5,
                              }}
                            >
                              {topic.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#7f8c8d",
                                pl: 2,
                                borderLeft: "2px solid #bdc3c7",
                              }}
                            >
                              {topic.description}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: "#ffd54f" }} />

      {/* Free Courses Section */}
      {course.freeCourses && course.freeCourses.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
          >
            Included Free Courses
          </Typography>
          <Grid container spacing={4}>
            {course.freeCourses.map((freeCourse) => (
              <Grid item xs={12} sm={6} md={4} key={freeCourse._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0px 6px 20px rgba(255, 183, 77, 0.3)",
                    position: "relative",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 12px 30px rgba(255, 87, 34, 0.4)",
                    },
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <Chip
                    label="Free"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontWeight: "bold",
                      fontSize: 12,
                      backgroundColor: "#4caf50",
                    }}
                  />
                  <Avatar
                    src={freeCourse.imageUrl}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, color: "#ff7043" }}
                    >
                      {freeCourse.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {freeCourse.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
                      Instructor: {freeCourse.instructor}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CourseDescription;
