import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Avatar, IconButton, Typography, Grid, Divider, Box, TextField, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import PaymentIcon from '@mui/icons-material/Payment';
import Swal from 'sweetalert2';

function ProfileCard() {
  const [currentTab, setCurrentTab] = useState('profile');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [editEmail, setEditEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [institution, setInstitution] = useState('Chandigarh University (CU)');
  const [language, setLanguage] = useState('C++');
  const [subscription, setSubscription] = useState('Premium Plan');
  const [paymentMode, setPaymentMode] = useState('Credit Card');

  const coursesEnrolled = [
    'Introduction to Programming',
    'Advanced JavaScript',
    'React Basics',
    'Data Structures & Algorithms'
  ];

  const sidebarItems = [
    { text: 'Profile', icon: <AccountCircleIcon />, tab: 'profile' },
    { text: 'Account Settings', icon: <LockIcon />, tab: 'accountSettings' },
    { text: 'Subscription', icon: <SubscriptionIcon />, tab: 'subscription' },
    { text: 'Payment Mode', icon: <PaymentIcon />, tab: 'paymentMode' },
    { text: 'Logout', icon: <ExitToAppIcon />, tab: 'logout' }
  ];

  const handleTabChange = (tab) => {
    if (tab === 'logout') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Logged out!', 'You have been logged out.', 'success');
          // Add actual logout logic here, e.g., redirect to login page
        }
      });
    } else {
      setCurrentTab(tab);
    }
  };

  const handleEmailEdit = () => {
    if (editEmail) {
      localStorage.setItem('userEmail', email);
    }
    setEditEmail(!editEmail);
  };

  const handlePasswordChange = () => {
    Swal.fire('Password Changed!', 'Your password has been updated.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setRetypeNewPassword('');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return (
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Institution</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setInstitution(institution)}>
                        <EditIcon />
                      </IconButton>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Language Used</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setLanguage(language)}>
                        <EditIcon />
                      </IconButton>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Courses Enrolled</Typography>
            <Typography variant="body2">
              <ul>
                {coursesEnrolled.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </Typography>
            <Divider sx={{ marginY: 2 }} />
          </CardContent>
        );
      case 'accountSettings':
        return (
          <CardContent>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleEmailEdit}>
                    <EditIcon />
                  </IconButton>
                )
              }}
              disabled={!editEmail}
            />
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Change Password</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Current Password"
              type="password"
              size="small"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="New Password"
              type="password"
              size="small"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Re-type New Password"
              type="password"
              size="small"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
          </CardContent>
        );
      case 'subscription':
        return (
          <CardContent>
            <Typography variant="h6">Subscription</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Current Plan</Typography>
            <Typography variant="body2">{subscription}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Button variant="contained" color="primary">
              Change Subscription
            </Button>
          </CardContent>
        );
      case 'paymentMode':
        return (
          <CardContent>
            <Typography variant="h6">Payment Mode</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Current Payment Method</Typography>
            <Typography variant="body2">{paymentMode}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Button variant="contained" color="primary">
              Update Payment Method
            </Button>
          </CardContent>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          width: 1200,
          height: 'auto',
          border: '1px solid #ddd',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: 240,
            borderRight: '1px solid #ddd',
            paddingTop: 2
          }}
        >
          <List>
            {sidebarItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleTabChange(item.tab)}
                sx={{
                  backgroundColor: currentTab === item.tab ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
                  borderRadius: 1,
                  marginBottom: 1,
                  '&::before': currentTab === item.tab ? {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    width: 4,
                    height: '100%',
                    backgroundColor: 'primary.main'
                  } : {}
                }}
              >
                <ListItemIcon sx={{ color: currentTab === item.tab ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Box
          sx={{
            flexGrow: 1,
            padding: 2
          }}
        >
          <Card sx={{ maxWidth: '100%', margin: 'auto', padding: 2 }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>}
              action={
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              title="iamayushanand365"
              titleTypographyProps={{ variant: 'h6' }}
              sx={{ marginBottom: 2 }}
            />
            {renderContent()}
            <CardContent sx={{ textAlign: 'center', marginTop: 2 }}>
              {/* Additional content can go here */}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileCard;
