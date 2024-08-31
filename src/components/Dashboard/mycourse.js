import React from 'react';
import { Box, Typography, Grid2, Card, CardContent, CardMedia, Stack, Button, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const MyCourses = () => {
  const courses = [
    {
      "_id": "66d2ecf8be51f3e9cc45f33e",
      "title": "Mastering Node.js: From Basics to Advanced",
      "description": "A complete course on Node.js that covers everything from the basics to advanced topics, including real-world projects.",
      "objective": "Gain a thorough understanding of Node.js, including its core concepts, and build scalable and efficient applications using Node.js. This course will also cover best practices, debugging, and performance optimization.",
      "whatYouLearn": "You will learn how to set up and configure a Node.js environment, understand asynchronous programming, work with Node.js modules, build RESTful APIs, handle databases, manage user authentication, and deploy Node.js applications. Additionally, you will explore advanced topics such as error handling, testing, and security measures.",
      "price": 3600,
      "discountedPrice": 3200,
      "isFree": false,
      "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099047088-th.jpeg",
      "objectiveDescription": "This course aims to provide an in-depth knowledge of Node.js, covering all essential aspects from the basics to more advanced topics. Students will engage in hands-on projects that demonstrate real-world use cases and best practices in Node.js development.",
      "tutorName": "Ayush Anand",
      "totalDuration": "40 Hour",
      "category": "Backend Development",
      "liveClassLink": "https://example.com/live-class-link",
      "playlistLink": "https://example.com/playlist-link",
      "startDate": "2024-09-26T00:00:00.000Z",
      "liveClassTime": "10:00 AM - 12:00 PM IST",
      "freeCourses": [
        {
          "title": "Introduction to JavaScript",
          "startDate": "2024-09-26T00:00:00.000Z",
          "description": "A free course that introduces JavaScript, covering basic concepts and fundamental skills necessary for web development.",
          "tutorName": "Emily Davis",
          "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099130632-th%20%281%29.jpeg",
          "totalDuration": "5 Hour",
          "playlistLink": "https://example.com/javascript-playlist-link",
          "_id": "66d2ecf8be51f3e9cc45f33f"
        },
        {
          "title": "Getting Started with C++",
          "startDate": "2024-09-26T00:00:00.000Z",
          "description": "A free course on C++ programming that covers the essentials, including syntax, control structures, and object-oriented programming principles.",
          "tutorName": "Emily Davis",
          "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099237414-th%20%282%29.jpeg",
          "totalDuration": "7 Hour",
          "playlistLink": "https://example.com/cplusplus-playlist-link",
          "_id": "66d2ecf8be51f3e9cc45f340"
        }
      ],
      "courseId": "66d2ecf8be51f3e9cc45f33e",
      "createdAt": "2024-08-31T10:14:16.612Z",
      "updatedAt": "2024-08-31T10:14:16.612Z",
      "__v": 0
    },
    {
        "_id": "66d2ecf8be51f3e9cc45f33e",
        "title": "Mastering Node.js: From Basics to Advanced",
        "description": "A complete course on Node.js that covers everything from the basics to advanced topics, including real-world projects.",
        "objective": "Gain a thorough understanding of Node.js, including its core concepts, and build scalable and efficient applications using Node.js. This course will also cover best practices, debugging, and performance optimization.",
        "whatYouLearn": "You will learn how to set up and configure a Node.js environment, understand asynchronous programming, work with Node.js modules, build RESTful APIs, handle databases, manage user authentication, and deploy Node.js applications. Additionally, you will explore advanced topics such as error handling, testing, and security measures.",
        "price": 3600,
        "discountedPrice": 3200,
        "isFree": false,
        "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099047088-th.jpeg",
        "objectiveDescription": "This course aims to provide an in-depth knowledge of Node.js, covering all essential aspects from the basics to more advanced topics. Students will engage in hands-on projects that demonstrate real-world use cases and best practices in Node.js development.",
        "tutorName": "Ayush Anand",
        "totalDuration": "40 Hour",
        "category": "Backend Development",
        "liveClassLink": "https://example.com/live-class-link",
        "playlistLink": "https://example.com/playlist-link",
        "startDate": "2024-09-26T00:00:00.000Z",
        "liveClassTime": "10:00 AM - 12:00 PM IST",
        "freeCourses": [
          {
            "title": "Introduction to JavaScript",
            "startDate": "2024-09-26T00:00:00.000Z",
            "description": "A free course that introduces JavaScript, covering basic concepts and fundamental skills necessary for web development.",
            "tutorName": "Emily Davis",
            "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099130632-th%20%281%29.jpeg",
            "totalDuration": "5 Hour",
            "playlistLink": "https://example.com/javascript-playlist-link",
            "_id": "66d2ecf8be51f3e9cc45f33f"
          },
          {
            "title": "Getting Started with C++",
            "startDate": "2024-09-26T00:00:00.000Z",
            "description": "A free course on C++ programming that covers the essentials, including syntax, control structures, and object-oriented programming principles.",
            "tutorName": "Emily Davis",
            "imageUrl": "https://tecknerds.s3.ap-south-1.amazonaws.com/1725099237414-th%20%282%29.jpeg",
            "totalDuration": "7 Hour",
            "playlistLink": "https://example.com/cplusplus-playlist-link",
            "_id": "66d2ecf8be51f3e9cc45f340"
          }
        ],
        "courseId": "66d2ecf8be51f3e9cc45f33e",
        "createdAt": "2024-08-31T10:14:16.612Z",
        "updatedAt": "2024-08-31T10:14:16.612Z",
        "__v": 0
      }
  ];

  return (
    <Box sx={{ padding: 5, backgroundColor: "#f0f2f5", minHeight: "100vh", width: '100%' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 3, textAlign: 'center' }}>
        My Courses
      </Typography>

      <Grid2 container spacing={2}>
        {courses.map((course) => (
          <Card key={course._id} sx={{ width: '100%', marginBottom: 4, boxShadow: 3, backgroundColor: "#fff", borderRadius: 2 }}>
            <Grid2 container spacing={0}>
              <Grid2 item xs={12} md={3}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={course.imageUrl}
                  alt={course.title}
                  sx={{ borderRadius: '8px 0 0 8px', width: '100%', objectFit: 'cover', minHeight: '200px' }}
                />
              </Grid2>
              <Grid2 item xs={12} md={9}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography component="h5" variant="h5" sx={{ color: "#333", fontWeight: 'bold' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    by {course.tutorName} - {course.totalDuration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {course.description}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                    <DateRangeIcon fontSize="small" sx={{ color: '#00b894' }} />
                    <Typography variant="body2" color="text.secondary">
                      Start Date: {new Date(course.startDate).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Divider sx={{ marginBottom: 2 }} />

                  <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
                    <Button variant="contained" color="primary" startIcon={<LiveTvIcon />} href={course.liveClassLink} target="_blank">
                      Join Live Class
                    </Button>
                    <Button variant="outlined" color="secondary" startIcon={<PlayCircleOutlineIcon />} href={course.playlistLink} target="_blank">
                      View Playlist
                    </Button>
                  </Stack>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Free Courses Included
                  </Typography>

                  <Grid2 container spacing={2}>
                    {course.freeCourses.map((freeCourse) => (
                      <Grid2 item xs={12} sm={6} key={freeCourse._id}>
                        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: 1 }}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={freeCourse.imageUrl}
                            alt={freeCourse.title}
                            sx={{ width: 80, height: 80, borderRadius: 2, marginRight: 2 }}
                          />
                          <CardContent sx={{ padding: '0 !important', flex: 1 }}>
                            <Typography component="h6" variant="h6" sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 1 }}>
                              {freeCourse.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                              by {freeCourse.tutorName} - {freeCourse.totalDuration}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 1 }}>
                              <AccessTimeIcon fontSize="small" sx={{ color: '#00b894' }} />
                              <Typography variant="body2" color="text.secondary">
                                Duration: {freeCourse.totalDuration}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 1 }}>
                              <DateRangeIcon fontSize="small" sx={{ color: '#00b894' }} />
                              <Typography variant="body2" color="text.secondary">
                                Start Date: {new Date(freeCourse.startDate).toLocaleDateString()}
                              </Typography>
                            </Stack>
                            <Button variant="text" color="primary" size="small" startIcon={<PlayCircleOutlineIcon />} href={freeCourse.playlistLink} target="_blank">
                              View Playlist
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid2>
                    ))}
                  </Grid2>
                </CardContent>
              </Grid2>
            </Grid2>
          </Card>
        ))}
      </Grid2>
    </Box>
  );
};

export default MyCourses;
