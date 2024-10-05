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
    const [visibleCourses, setVisibleCourses] = useState({});

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
            const initialVisibility = response.data.reduce((acc, course) => {
                acc[course._id] = true;
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
        <Box sx={{ padding: 4, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a3e72', marginBottom: 4, textAlign: 'center', letterSpacing: '0.05em' }}>
                My Learning Journey
            </Typography>

            {courses.length === 0 ? (
                <Box sx={{ textAlign: 'center', padding: 6, backgroundColor: "#fff", borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: '#1a3e72', marginBottom: 3 }} />
                    <Typography variant="h5" sx={{ color: '#333', marginBottom: 2, fontWeight: 600 }}>
                        Your Course Library is Empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3, maxWidth: '600px', margin: '0 auto', textAlign: 'justify' }}>
                        It looks like you haven't enrolled in any courses yet. Explore our diverse catalog to find courses that align with your interests and career goals. Start your learning journey today!
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#1a3e72', 
                            '&:hover': { backgroundColor: '#102a4c' },
                            padding: '10px 20px',
                            fontSize: '1rem'
                        }}
                        href="/dashboard/courses">
                        Discover Courses
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {courses.map((course) => (
                        <Grid item xs={12} md={6} lg={4} key={course._id}>
                            <Card sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
                                borderRadius: 3, 
                                backgroundColor: "#fff",
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 200, borderRadius: '12px 12px 0 0', objectFit: 'cover' }}
                                    image={course.imageUrl}
                                    alt={course.title}
                                />
                                <CardContent sx={{ padding: 3 }}>
                                    <Typography component="h5" variant="h6" sx={{ color: "#1a3e72", fontWeight: 'bold', marginBottom: 1 }}>
                                        {course.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: 2 }}>
                                        Instructor: {course.tutorName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3, textAlign: 'justify' }}>
                                        {course.description}
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
                                        <DateRangeIcon fontSize="small" sx={{ color: '#1a3e72' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Starts: {new Date(course.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Button 
                                            variant="contained" 
                                            startIcon={<LiveTvIcon />} 
                                            href={course.liveClassLink} 
                                            target="_blank" 
                                            sx={{ 
                                                flexGrow: 1, 
                                                backgroundColor: '#1a3e72', 
                                                '&:hover': { backgroundColor: '#102a4c' },
                                                padding: '10px 0'
                                            }}>
                                            Live Class
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            startIcon={<PlayCircleOutlineIcon />} 
                                            href={course.playlistLink} 
                                            target="_blank" 
                                            sx={{ 
                                                flexGrow: 1, 
                                                borderColor: '#1a3e72', 
                                                color: '#1a3e72', 
                                                '&:hover': { borderColor: '#102a4c', color: '#102a4c' },
                                                padding: '10px 0'
                                            }}>
                                            Playlist
                                        </Button>
                                    </Stack>
                                </CardContent>
                                <Divider sx={{ marginY: 2 }} />
                                <CardContent sx={{ padding: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1a3e72' }}>
                                            Included Free Courses
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleToggleVisibility(course._id)}
                                            sx={{ color: '#1a3e72' }}
                                        >
                                            {visibleCourses[course._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </Stack>
                                    {visibleCourses[course._id] && (
                                        <Stack spacing={3} sx={{ marginTop: 2 }}>
                                            {course.freeCourses.map((freeCourse) => (
                                                <Card key={freeCourse._id} sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    padding: 2, 
                                                    borderRadius: 2, 
                                                    backgroundColor: '#f7f9fc',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#e3e8f0',
                                                        transform: 'translateX(5px)'
                                                    }
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 80, height: 80, borderRadius: 2, marginRight: 3 }}
                                                        image={freeCourse.imageUrl}
                                                        alt={freeCourse.title}
                                                    />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#1a3e72' }}>
                                                            {freeCourse.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                                            Instructor: {freeCourse.tutorName}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                                            <AccessTimeIcon fontSize="small" sx={{ color: '#1a3e72' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Duration: {freeCourse.totalDuration} Days
                                                            </Typography>
                                                        </Stack>
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            startIcon={<PlayCircleOutlineIcon />} 
                                                            href={freeCourse.playlistLink} 
                                                            target="_blank" 
                                                            sx={{ 
                                                                color: '#1a3e72', 
                                                                borderColor: '#1a3e72', 
                                                                '&:hover': { color: '#102a4c', borderColor: '#102a4c' },
                                                                padding: '5px 15px'
                                                            }}>
                                                            Start Learning
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
