import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Divider, CircularProgress, Grid, Chip, AccordionSummary, Accordion, AccordionDetails, Rating } from "@mui/material";
import { useParams } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseDescription = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate("/login");
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await main_axios.get(`/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',  }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ padding: 4, backgroundColor: "#fffcf7", minHeight: "100vh" }}>
        <Typography variant="h6" sx={{ color: "#e57373", textAlign: 'center' }}>
          Course not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        
    
      <Box sx={{ display: 'flex', border: '2px dotted #ff7043', borderRadius: 2, overflow: 'hidden', backgroundColor:"#0b0b0acf" }}>
        {/* Left Side */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 ,  }}>
          <Avatar
            src={course.imageUrl}
            variant="rounded"
            sx={{
              width: '60%',
              height: 'auto',
              borderRadius: 4,
             
              mb: 2
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff7043",
              color: "#fff",
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "30px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#f4511e" },
              mb: 2
            }}
            onClick={handleEnrollClick}
          >
            {course.isFree ? "Register for Free" : `Register Now - ₹${course.discountedPrice}`}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center'  , color: "#f7e9e9"}}>
            <Typography variant="body2" sx={{ mr: 1 , color: "#f7e9e9" }}>Rating:</Typography>
            <Rating
              value={4} // Fake rating value
              precision={0.5}
              readOnly
              sx={{ fontSize: 18, color: '#17bf9e' }}
            />
          </Box>
        </Box>

        {/* Right Side */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: "#fff" }}>
            {course.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: "#f7e9e9" }}>
            {course.description}
          </Typography>
          {/* Add more course details here */}
        </Box>
      </Box>
        {/* Course Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
              What you'll learn
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: 'disc', color: "#6a1b9a" }}>
              {course.whatYouLearn && course.whatYouLearn.map((item, index) => (
                <li key={index}>
                  <Typography variant="body1" sx={{ mb: 1 }}>{item}</Typography>
                </li>
              ))}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
              Course Objective
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: 'disc', color: "#333" }}>
              {course.objective && course.objective.map((obj, index) => (
                <li key={index}>
                  <Typography variant="body1" sx={{ mb: 1 }}>{obj}</Typography>
                </li>
              ))}
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
              Projects
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: 'disc', color: "#2e7d32" }}>
              {course.projects && course.projects.map((obj, index) => (
                <li key={index}>
                  <Typography variant="body1" sx={{ mb: 1 }}>{obj}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
              Course Content
            </Typography>
            {course.CourseContent && course.CourseContent.map((week, index) => (
              <Accordion key={week._id} sx={{ mb: 2, backgroundColor: "#f8f9fb" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#ff7043" }} />}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>Week {week.weekNumber}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {week.days.map((day, dayIndex) => (
                    <Box key={day._id} sx={{ mb: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: "#ab47bc" }}>{day.day}</Typography>
                      {day.topics.map((topic, topicIndex) => (
                        <Box key={topicIndex} sx={{ ml: 3, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#8e24aa" }}>{topic.title}</Typography>
                          <Typography variant="body2" sx={{ color: "#777" }}>{topic.description}</Typography>
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
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
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
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0px 12px 30px rgba(255, 87, 34, 0.4)" },
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <Chip
                    label="Free"
                    color="primary"
                    sx={{ position: "absolute", top: 10, right: 10, fontWeight: "bold", fontSize: 12, backgroundColor: "#4caf50" }}
                  />
                  <Avatar
                    src={freeCourse.imageUrl}
                    variant="rounded"
                    sx={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: 4 }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#ff7043" }}>
                      {freeCourse.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {freeCourse.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
                      Instructor: {freeCourse.instructor}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#ff7043", color: "#fff", mt: 2, "&:hover": { backgroundColor: "#f4511e" } }}
                      onClick={() => navigate(`/courses/${freeCourse._id}`)}
                    >
                      View Course
                    </Button>
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
