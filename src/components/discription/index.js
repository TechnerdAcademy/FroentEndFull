import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Divider, CircularProgress, Grid, Grid2 ,Chip, AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Importing icon
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseDescription = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEnrollClick = () => {
    navigate("/login"); // Navigate to login page on click
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <Typography variant="h6" sx={{ color: "#888", textAlign: 'center' }}>
          Course not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Avatar
              src={course.imageUrl}
              variant="rounded"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
              {course.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777", marginBottom: 3 }}>
              {course.description}
            </Typography>
         
            <Typography variant="body2" sx={{ color: "#555", marginBottom: 2 }}>
              Category: {course.category}
            </Typography>
            <Button
        variant="contained"
        sx={{
          backgroundColor: "#00b894",
          color: "#fff",
          borderRadius: 20,
          padding: "10px 30px",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          "&:hover": { backgroundColor: "#019875" },
          marginBottom: 2,
        }}
        onClick={handleEnrollClick} // Call navigate on click
      >
        {course.isFree ? "Enroll for Free" : `Enroll Now - ₹${course.discountedPrice}`}
      </Button>
      {!course.isFree && (
        <Typography variant="body2" sx={{ color: "#888", textDecoration: "line-through", marginLeft: 2 }}>
          Original Price: ₹{course.price}
        </Typography>
      )}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Box>
      <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
        Included Free Courses
      </Typography>
      {course.freeCourses && course.freeCourses.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between',
          }}
        >
          {course.freeCourses.map((freeCourse) => (
            <Card
              key={freeCourse._id}
              sx={{
                flex: '1 1 calc(33.333% - 8px)', // 3 items per row
                borderRadius: 4,
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                position: "relative",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                },
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
                  padding: "0 8px",
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', padding: 2 }}>
                <Avatar
                  src={freeCourse.imageUrl}
                  variant="rounded"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <CardContent sx={{ padding: 0 }}>
                  <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold", marginBottom: 1 }}>
                    {freeCourse.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", marginBottom: 1 }}>
                    {freeCourse.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    Tutor: {freeCourse.tutorName} | {freeCourse.totalDuration} mins
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 4 }}>
          <ErrorOutlineIcon sx={{ fontSize: 64, color: "#888", marginBottom: 2 }} />
          <Typography variant="h6" sx={{ color: "#888", fontSize: 24, textAlign: 'center' }}>
            Oops! No free courses available at the moment.
          </Typography>
        </Box>
      )}
    </Box>


        <Divider sx={{ marginY: 4 }} />

        <Box>
        <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Objectives</Typography>
          <ul>
            {course.objective && course.objective.map((obj, index) => (
              <li key={index}>
                <Typography variant="body1">{obj}</Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
        </Box>

        <Divider sx={{ marginY: 4 }} />
        <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>What You'll Learn</Typography>
          <ul>
            {course.whatYouLearn && course.whatYouLearn.map((item, index) => (
              <li key={index}>
                <Typography variant="body1">{item}</Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>


        <Divider sx={{ marginY: 4 }} />
        <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Projects</Typography>
          <ul>
          {course.projects && course.projects.map((project, index) => (
              <li key={index}>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {project}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Course Content</Typography>
          {course.CourseContent && course.CourseContent.map((week, index) => (
            <Accordion key={week._id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Week {week.weekNumber}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {week.days.map((day, dayIndex) => (
                  <Box key={day._id} sx={{ marginBottom: '15px' }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>{day.day}</strong>
                    </Typography>
                    {day.topics.map((topic) => (
                      <Box key={topic.id} sx={{ marginLeft: '15px' }}>
                        <Typography variant="body2">
                          <strong>{topic.title}</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {topic.description.join(' ')}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      </Box>

   
    </Box>
  );
};

export default CourseDescription;
