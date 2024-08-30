import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Box, Button, Chip } from '@mui/material';
import heroimg from '../../assests/images/hero-img1.png';
import img2 from '../../assests/images/branding.png';

const CourseList = () => {
  const courses = [
    {
      _id: "66cde34f89c32f07e4f99aee",
      title: "Advanced Web Development",
      subtitle: "Take your web development skills to the next level.",
      price: 150,
      discountedPrice: 120,
      isFree: false,
      imageUrl: heroimg,
      freeCourses: [
        { title: "Introduction to HTML", _id: "66cde34f89c32f07e4f99aef" },
        { title: "CSS Fundamentals", _id: "66cde34f89c32f07e4f99af0" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99af1",
      title: "JavaScript Mastery",
      subtitle: heroimg,
      price: 200,
      discountedPrice: 150,
      isFree: false,
      imageUrl: img2,
      freeCourses: [
        { title: "Introduction to JavaScript", _id: "66cde34f89c32f07e4f99af2" },
        { title: "Advanced JavaScript", _id: "66cde34f89c32f07e4f99af3" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99af4",
      title: "React for Beginners",
      subtitle: "Learn the fundamentals of React and build modern web applications.",
      price: 100,
      discountedPrice: 80,
      isFree: false,
      imageUrl: 'https://example.com/course-image-3.jpg',
      freeCourses: [
        { title: "JavaScript Basics", _id: "66cde34f89c32f07e4f99af5" },
        { title: "Building Components in React", _id: "66cde34f89c32f07e4f99af6" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99af7",
      title: "Node.js Essentials",
      subtitle: "Master backend development with Node.js.",
      price: 180,
      discountedPrice: 140,
      isFree: false,
      imageUrl: 'https://example.com/course-image-4.jpg',
      freeCourses: [
        { title: "Introduction to Node.js", _id: "66cde34f89c32f07e4f99af8" },
        { title: "Express.js Basics", _id: "66cde34f89c32f07e4f99af9" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99afa",
      title: "Full Stack Development",
      subtitle: "Become a full stack web developer.",
      price: 250,
      discountedPrice: 200,
      isFree: false,
      imageUrl: 'https://example.com/course-image-5.jpg',
      freeCourses: [
        { title: "HTML & CSS Basics", _id: "66cde34f89c32f07e4f99afb" },
        { title: "JavaScript & React", _id: "66cde34f89c32f07e4f99afc" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99afd",
      title: "Python for Data Science",
      subtitle: "Learn Python programming and apply it to data science.",
      price: 220,
      discountedPrice: 180,
      isFree: false,
      imageUrl: 'https://example.com/course-image-6.jpg',
      freeCourses: [
        { title: "Python Basics", _id: "66cde34f89c32f07e4f99afe" },
        { title: "Data Analysis with Pandas", _id: "66cde34f89c32f07e4f99aff" }
      ]
    },
    {
      _id: "66cde34f89c32f07e4f99b00",
      title: "Machine Learning A-Z",
      subtitle: "Master machine learning with Python.",
      price: 300,
      discountedPrice: 250,
      isFree: false,
      imageUrl: 'https://example.com/course-image-7.jpg',
      freeCourses: [
        { title: "Introduction to Machine Learning", _id: "66cde34f89c32f07e4f99b01" },
        { title: "Building ML Models", _id: "66cde34f89c32f07e4f99b02" }
      ]
    }
  ];

  return (
    <Box sx={{ padding: 5, backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 5, textAlign: 'center' }}>
        Explore Our Courses
      </Typography>
      <Grid container spacing={5}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
              <Avatar
                src={course.imageUrl}
                variant="rounded"
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 0,
                  backgroundColor: '#ecf0f1',
                }}
              />
              <CardContent sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 1 }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d', marginBottom: 3 }}>
                  {course.subtitle}
                </Typography>
                {course.freeCourses.length > 0 && (
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                      Free Courses Included:
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: 1 }}>
                      {course.freeCourses.map((freeCourse) => (
                        <Grid item xs={6} key={freeCourse._id}>
                          <Chip label={freeCourse.title} size="small" sx={{ backgroundColor: '#ecf0f1', color: '#34495e', fontWeight: '500' }} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    marginTop: 2,
                    padding: '10px',
                    backgroundColor: '#2980b9',
                    color: '#fff',
                    borderRadius: 25,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#1abc9c' },
                  }}
                >
                  {course.isFree ? 'Enroll for Free' : `Buy Now - $${course.discountedPrice}`}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
