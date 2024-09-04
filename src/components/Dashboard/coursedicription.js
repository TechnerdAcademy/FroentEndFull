import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Divider, CircularProgress, Grid, Grid2 } from "@mui/material";
import { useParams } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';

const CourseDescription = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

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
              Tutor: <strong>{course.tutorName}</strong> | Duration: {course.totalDuration} minutes
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
            >
              {course.isFree ? "Enroll for Free" : `Enroll Now - $${course.discountedPrice}`}
            </Button>
            {!course.isFree && (
              <Typography variant="body2" sx={{ color: "#888", textDecoration: "line-through", marginLeft: 2 }}>
                Original Price: ${course.price}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Grid2 container spacing={4}>
          <Grid2 item xs={12}>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
              Included Free Courses
            </Typography>
            <Grid2 container spacing={4}>
              {course.freeCourses.map((freeCourse) => (
                <Grid2 item xs={12} md={6} key={freeCourse._id}>
                  <Card
                    sx={{
                      display: "flex",
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                      boxShadow: "none",
                    }}
                  >
                    <Avatar
                      src={freeCourse.imageUrl}
                      variant="rounded"
                      sx={{ width: 100, height: 100, borderRadius: 2, marginRight: 2 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ color: "#000", fontWeight: "bold" }}>
                        {freeCourse.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555", marginBottom: 1 }}>
                        {freeCourse.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888" }}>
                        Tutor: {freeCourse.tutorName} | Duration: {freeCourse.totalDuration} minutes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>

        <Divider sx={{ marginY: 4 }} />

        <Grid2 container spacing={4}>
          <Grid2 item xs={12} md={8}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
                What You'll Learn
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.6 }}>
                {course.objectiveDescription}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
                Course Details
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.6 }}>
                {course.description}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CourseDescription;
