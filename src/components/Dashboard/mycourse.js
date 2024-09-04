import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography, Card, CardContent, CardMedia, Stack, Button, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import main_axios from '../../utilities/mainaxios';

const MyCourses = () => {
    const [id, setId] = useState("");
    const [courses, setCourses] = useState([]);

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
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMyCourses();
        }
    }, [id]);

    return (
        <Box sx={{ padding: 5, backgroundColor: "#f0f2f5", minHeight: "100vh", width: '100%' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a73e8', marginBottom: 4, textAlign: 'center' }}>
                My Courses
            </Typography>

            {courses.length === 0 ? (
                <Box sx={{ textAlign: 'center', padding: 5, backgroundColor: "#ffffff", borderRadius: 4, boxShadow: 3 }}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: '#f44336', marginBottom: 2 }} />
                    <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', marginBottom: 1 }}>
                        No Courses Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                        It seems you haven't enrolled in any courses yet. Start exploring our catalog now!
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            textTransform: 'none', 
                            padding: '10px 20px', 
                            backgroundColor: '#00b894', 
                            '&:hover': { backgroundColor: '#00976e' } 
                        }}
                        href="/dashboard/courses">
                        Browse Courses
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {courses.map((course) => (
                        <Grid item xs={12} md={6} key={course._id}>
                            <Card sx={{ display: 'flex', flexDirection: 'row', boxShadow: 6, borderRadius: 3, backgroundColor: "#ffffff", height: 'auto', overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        width: '300px',
                                        height: '100%', 
                                        borderRadius: '8px 0 0 8px', 
                                        objectFit: 'cover',
                                    }}
                                    image={course.imageUrl}
                                    alt={course.title}
                                />
                                <CardContent sx={{ width: '55%', padding: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography component="h5" variant="h5" sx={{ color: "#333", fontWeight: 'bold', marginBottom: 1 }}>
                                            {course.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                            by {course.tutorName} - {course.totalDuration}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                                            {course.description}
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                            <DateRangeIcon fontSize="small" sx={{ color: '#1a73e8' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Start Date: {new Date(course.startDate).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Divider sx={{ marginY: 2 }} />
                                    <Stack direction="row" spacing={2}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            startIcon={<LiveTvIcon />} 
                                            href={course.liveClassLink} 
                                            target="_blank" 
                                            sx={{ 
                                                minWidth: '150px', 
                                                backgroundColor: '#00b894', 
                                                '&:hover': { backgroundColor: '#00976e' } 
                                            }}>
                                            Join Live Class
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            startIcon={<PlayCircleOutlineIcon />} 
                                            href={course.playlistLink} 
                                            target="_blank" 
                                            sx={{ 
                                                minWidth: '150px', 
                                                color: '#00b894', 
                                                borderColor: '#00b894', 
                                                '&:hover': { backgroundColor: '#f0f2f5', borderColor: '#00976e', color: '#00976e' } 
                                            }}>
                                            View Playlist
                                        </Button>
                                    </Stack>
                                </CardContent>
                                <CardContent sx={{ width: '25%', padding: 2, backgroundColor: '#f1f3f4', borderRadius: '0 8px 8px 0' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                        Free Courses Included
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {course.freeCourses.map((freeCourse) => (
                                            <Grid item xs={12} key={freeCourse._id}>
                                                <Card sx={{ display: 'flex', alignItems: 'center', padding: 1, borderRadius: 2, boxShadow: 2, backgroundColor: '#ffffff' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ 
                                                            width: '80px', 
                                                            height: '80px', 
                                                            borderRadius: 2, 
                                                            objectFit: 'cover',
                                                            marginRight: 2 
                                                        }}
                                                        image={freeCourse.imageUrl}
                                                        alt={freeCourse.title}
                                                    />
                                                    <CardContent sx={{ flex: 1, padding: '0 !important' }}>
                                                        <Typography component="h6" variant="h6" sx={{ fontSize: 14, fontWeight: 'bold', marginBottom: 0.5 }}>
                                                            {freeCourse.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                                                            by {freeCourse.tutorName}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <AccessTimeIcon fontSize="small" sx={{ color: '#1a73e8' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {freeCourse.totalDuration}
                                                            </Typography>
                                                        </Stack>
                                                        <Button 
                                                            variant="text" 
                                                            color="primary" 
                                                            size="small" 
                                                            startIcon={<PlayCircleOutlineIcon />} 
                                                            href={freeCourse.playlistLink} 
                                                            target="_blank" 
                                                            sx={{ 
                                                                textTransform: 'none', 
                                                                color: '#00b894', 
                                                                '&:hover': { color: '#00976e' } 
                                                            }}>
                                                            View Playlist
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
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
