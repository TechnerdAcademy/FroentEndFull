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
    <Box sx={{ padding: 5, backgroundColor: "#eef2f6", minHeight: "100vh" }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#2d3748', 
          marginBottom: 6, 
          textAlign: 'center',
          letterSpacing: 1.5,
        }}
      >
        Explore Our Courses
      </Typography>
      <Grid container spacing={4}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Link to={`/dashboard/course-description/${course._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                }}>
                  <Avatar
                    src={course.imageUrl}
                    variant="square"
                    sx={{
                      width: '100%',
                      height: 280, 
                      borderRadius: 0,
                      backgroundColor: '#e2e8f0',
                      objectFit: 'cover', // Ensures the image covers the entire area while keeping its aspect ratio
                    }}
                  />
                  <CardContent sx={{ 
                    padding: 3, // Adjusted padding
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1 
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2d3748', marginBottom: 1 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4a5568', marginBottom: 1 }}>
  <strong>Duration:</strong> {course.totalDuration} Days
</Typography>

                    <Typography variant="body2" sx={{ color: '#4a5568', marginBottom: 1 }}>
                      <strong>Category:</strong> {course.category}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4a5568', marginBottom: 3 }}>
                      {course.subtitle}
                    </Typography>
                    {course.freeCourses && course.freeCourses.length > 0 && (
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#38b2ac' }}>
                          Free Courses Included:
                        </Typography>
                        <Grid container spacing={1} sx={{ marginTop: 1 }}>
                          {course.freeCourses.map((freeCourse) => (
                            <Grid item xs={6} key={freeCourse._id}>
                              <Chip 
                                label={freeCourse.title} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: '#e6fffa', 
                                  color: '#2c7a7b', 
                                  fontWeight: '500' 
                                }} 
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        width: '60%',
                        marginTop: 'auto', // Push button to the bottom
                        padding: '10px',
                        backgroundColor: '#38b2ac', // Theme color
                        color: '#fff',
                        borderRadius: 25,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        alignSelf: 'flex-start', // Align button to the left
                      }}
                    >
                      {course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#4a5568', textAlign: 'center' }}>
              No courses available at the moment.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CourseList;
