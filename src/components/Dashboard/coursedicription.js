import React from "react";
import { Box, Typography, Button, Card, CardContent, Grid, Avatar, Divider, Paper } from "@mui/material";
import heroImg from "../../assests/images/hero-img1.png";

const CourseDescription = () => {
  const course = {
    _id: "66cde34f89c32f07e4f99aee",
    title: "Advanced Web Development",
    description:
      "An in-depth course on modern web development techniques, including front-end frameworks and back-end services. This course is designed for developers who have a basic understanding of web development and want to take their skills to the next level.",
    price: 150,
    discountedPrice: 120,
    isFree: false,
    imageUrl: heroImg,
    objectiveDescription:
      "Gain advanced skills in web development, including the use of popular frameworks, development tools, and best practices.",
    tutorName: "John Smith",
    totalDuration: 360,
    category: "Web Development",
    freeCourses: [
      {
        title: "Introduction to HTML",
        description: "Learn the basics of HTML and how to structure web pages.",
        tutorName: "Jane Doe",
        imageUrl: heroImg,
        totalDuration: 60,
        _id: "66cde34f89c32f07e4f99aef",
      },
      {
        title: "CSS Fundamentals",
        description: "Understand the basics of CSS and how to style web pages effectively.",
        tutorName: "Emily Johnson",
        imageUrl: heroImg,
        totalDuration: 90,
        _id: "66cde34f89c32f07e4f99af0",
      },
    ],
  };

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

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "#333", fontWeight: "bold", marginBottom: 2 }}>
              Included Free Courses
            </Typography>
            <Grid container spacing={4}>
              {course.freeCourses.map((freeCourse) => (
                <Grid item xs={12} md={6} key={freeCourse._id}>
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseDescription;
