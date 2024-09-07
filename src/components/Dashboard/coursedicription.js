import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Divider, CircularProgress, Grid, Chip, Snackbar, Alert } from "@mui/material";
import { useParams } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CourseDescription = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [purchaseType, setPurchaseType] = useState('regular');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
   
  const purchaseCourse = async () => {
    try {
      const response = await main_axios.post(`/courses/purchases/`, { courseId, type: purchaseType });
      console.log('Purchased course:', response.data);
      setSnackbarMessage('Course purchased successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchCourseDetails();
    } catch (error) {
      console.error('Error purchasing course:', error);
      setSnackbarMessage('Error purchasing course. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
            <Box sx={{ marginBottom: 2 }}>
              <Button
                variant={purchaseType === 'demo' ? 'outlined' : 'contained'}
                sx={{
                  marginRight: 2,
                  backgroundColor: purchaseType === 'regular' ? "#00b894" : "#fff",
                  color: purchaseType === 'regular' ? "#fff" : "#00b894",
                  borderRadius: 20,
                  padding: "10px 30px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: purchaseType === 'regular' ? "#019875" : "#f5f5f5" },
                }}
                onClick={() => setPurchaseType('regular')}
              >
                Enroll Now - ${course.discountedPrice}
              </Button>
              <Button
                variant={purchaseType === 'demo' ? 'outlined' : 'contained'}
                sx={{
                  backgroundColor: purchaseType === 'demo' ? "#00b894" : "#fff",
                  color: purchaseType === 'demo' ? "#fff" : "#00b894",
                  borderRadius: 20,
                  padding: "10px 30px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: purchaseType === 'demo' ? "#019875" : "#f5f5f5" },
                }}
                onClick={() => setPurchaseType('demo')}
              >
                Enroll for Demo
              </Button>
            </Box>
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
              }}
              onClick={purchaseCourse}
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
                      <Typography variant="body2" sx={{ color: "#666", marginBottom: 1 }}>
                        {freeCourse.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Duration: {freeCourse.totalDuration} minutes
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#888", textAlign: 'center' }}>
              No free courses available.
            </Typography>
          )}
        </Box>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseDescription;
