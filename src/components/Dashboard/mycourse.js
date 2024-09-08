import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography, Card, CardContent, CardMedia, Stack, Button, Divider, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import main_axios from '../../utilities/mainaxios';

const MyCourses = () => {
    const [id, setId] = useState("");
    const [courses, setCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState({}); // State to toggle visibility for each course

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setId(user.id);
        }
    }, []);
    
    const fetchMyCourses = async () => {
        try {
            const response = await main_axios.get(`/courses/purchases/user/${id}`);
            console.log('Fetched courses:', response.data);
            setCourses(response.data);
            // Initialize visibility state for each course
            const initialVisibility = response.data.reduce((acc, course) => {
                acc[course._id] = true; // Default to visible
                return acc;
            }, {});
            setVisibleCourses(initialVisibility);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMyCourses();
        }
    }, [id]);

    const handleToggleVisibility = (courseId) => {
        setVisibleCourses(prevState => ({
            ...prevState,
            [courseId]: !prevState[courseId]
        }));
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004d40', marginBottom: 3, textAlign: 'center' }}>
                My Courses
            </Typography>

            {courses.length === 0 ? (
                <Box sx={{ textAlign: 'center', padding: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1 }}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: '#004d40', marginBottom: 2 }} />
                    <Typography variant="h6" sx={{ color: '#666', marginBottom: 1 }}>
                        No Courses Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
                        It seems you haven't enrolled in any courses yet. Explore our catalog to find something interesting!
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00251a' } }}
                        href="/dashboard/courses">
                        Browse Courses
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {courses.map((course) => (
                        <Grid item xs={12} md={6} lg={4} key={course._id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2, backgroundColor: "#fff" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 160, borderRadius: '4px 4px 0 0', objectFit: 'cover' }}
                                    image={course.imageUrl}
                                    alt={course.title}
                                />
                                <CardContent>
                                    <Typography component="h5" variant="h6" sx={{ color: "#333", fontWeight: 'bold', marginBottom: 1 }}>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        by {course.tutorName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                                        {course.description}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                        <DateRangeIcon fontSize="small" sx={{ color: '#004d40' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Start Date: {new Date(course.startDate).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            startIcon={<LiveTvIcon />} 
                                            href={course.liveClassLink} 
                                            target="_blank" 
                                            sx={{ flexGrow: 1, marginRight: 1, backgroundColor: '#004d40', '&:hover': { backgroundColor: '#00251a' } }}>
                                            Join Live Class
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            startIcon={<PlayCircleOutlineIcon />} 
                                            href={course.playlistLink} 
                                            target="_blank" 
                                            sx={{ flexGrow: 1, borderColor: '#004d40', color: '#004d40', '&:hover': { borderColor: '#00251a', color: '#00251a' } }}>
                                            View Playlist
                                        </Button>
                                    </Stack>
                                </CardContent>
                                <Divider sx={{ marginY: 2 }} />
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                            Free Courses Included
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleToggleVisibility(course._id)}
                                            sx={{ color: '#004d40' }}
                                        >
                                            {visibleCourses[course._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </Stack>
                                    {visibleCourses[course._id] && (
                                        <Stack spacing={2}>
                                            {course.freeCourses.map((freeCourse) => (
                                                <Card key={freeCourse._id} sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 60, height: 60, borderRadius: 1, marginRight: 2 }}
                                                        image={freeCourse.imageUrl}
                                                        alt={freeCourse.title}
                                                    />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                                                            {freeCourse.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                                                            by {freeCourse.tutorName}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <AccessTimeIcon fontSize="small" sx={{ color: '#004d40' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {freeCourse.totalDuration}
                                                            </Typography>
                                                        </Stack>
                                                        <Button 
                                                            variant="outlined" 
                                                            color="primary" 
                                                            size="small" 
                                                            startIcon={<PlayCircleOutlineIcon />} 
                                                            href={freeCourse.playlistLink} 
                                                            target="_blank" 
                                                            sx={{ marginTop: 1, color: '#004d40', borderColor: '#004d40', '&:hover': { color: '#00251a', borderColor: '#00251a' } }}>
                                                            View Playlist
                                                        </Button>
                                                    </Box>
                                                </Card>
                                            ))}
                                        </Stack>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyCourses;
