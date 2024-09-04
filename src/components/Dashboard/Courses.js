import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Function to fetch courses data
  const fetchCourses = async () => {
    try {
      const response = await main_axios.get('/courses/');
      console.log('Fetched courses:', response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Call fetchCourses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Box sx={{ padding: 5, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 6, textAlign: 'center' }}>
        Explore Our Courses
      </Typography>
      <Grid container spacing={4}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Link to={`/dashboard/course-description/${course._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ 
                  borderRadius: 12, 
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)', 
                  overflow: 'hidden', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.15)',
                  }
                }}>
                  <Avatar
                    src={course.imageUrl}
                    variant="rounded"
                    sx={{
                      width: '100%',
                      height: 180, // Reduced height
                      borderRadius: 0,
                      backgroundColor: '#f0f4f3', // Light green background
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ 
                    padding: 3, // Adjusted padding
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1 
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 1 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 1 }}>
                      <strong>Tutor:</strong> {course.tutorName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 1 }}>
                      <strong>Duration:</strong> {course.totalDuration}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 1 }}>
                      <strong>Category:</strong> {course.category}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 3 }}>
                      {course.subtitle}
                    </Typography>
                    {course.freeCourses && course.freeCourses.length > 0 && (
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#00b894' }}>
                          Free Courses Included:
                        </Typography>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                          {course.freeCourses.map((freeCourse) => (
                            <Grid item xs={6} key={freeCourse._id}>
                              <Chip label={freeCourse.title} size="small" sx={{ backgroundColor: '#f0f4f3', color: '#333', fontWeight: '500' }} />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        width: '40%',
                        marginTop: 'auto', // Push button to the bottom
                        padding: '8px',
                        backgroundColor: '#00b894', // Theme color
                        color: '#fff',
                        borderRadius: 25,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#009b77' }, // Slightly darker green on hover
                      }}
                    >
                      {course.isFree ? 'Enroll for Free' : `Enroll Now - $${course.discountedPrice}`}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#666', textAlign: 'center' }}>
              No courses available at the moment.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CourseList;
