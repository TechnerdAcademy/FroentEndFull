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
    <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 4, textAlign: 'center' }}>
        Explore Our Courses
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Link to={`/description/${course._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                  <Avatar
                    src={course.imageUrl}
                    variant="square"
                    sx={{
                      width: '100%',
                      height: 160,
                      objectFit: 'cover',
                      borderRadius: 0,
                    }}
                  />
                  <CardContent sx={{ padding: 2 }}>
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
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 2 }}>
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
                              <Chip label={freeCourse.title} size="small" sx={{ backgroundColor: '#f0f4f3', color: '#333' }} />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        marginTop: 'auto',
                        backgroundColor: '#00b894',
                        color: '#fff',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#009b77' },
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
