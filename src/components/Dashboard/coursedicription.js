import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
  Grid,
  Chip,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Rating,
  Snackbar,
  Alert,
  List,
  ListItemText,
  ListItem,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import main_axios from "../../utilities/mainaxios";
import WorkIcon from "@mui/icons-material/Work";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CodeIcon from "@mui/icons-material/Code";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const CourseDescription = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [purchaseType, setPurchaseType] = useState("regular");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [referralCode, setReferralCode] = useState("");
  const [code, setCouponCode] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.id;

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return new Promise((resolve) => {
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await main_axios.get(`/courses/${courseId}`);
      setCourse(response.data);
      setOriginalPrice(response.data.discountedPrice);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseCourse = async (courseId, type) => {
    // Load Razorpay Script
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.id;
    const mobileNumber = userData.mobile;
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay script. Please try again.");
      return;
    }

    try {
      // Create an order by calling the backend API
      const response = await main_axios.post("/payment/create-order", {
        userId,
        amount: course.discountedPrice,
        paymentMethod: "razorpay",
        referralCode,
      });
      const { order_id } = response.data; // This assumes `order_id` is returned by your backend

      // Razorpay Options
      const options = {
        key: "rzp_live_JKBHNOoo7yeDnK", // Replace with your Razorpay key ID
        amount: course.discountedPrice * 100, // Amount in paisa
        currency: "INR",
        name: "Technerds",
        description: course.title,
        image: course.imageUrl,
        order_id: order_id, // Razorpay order ID from the backend
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          // Additional data to be sent to the backend
          const paymentData = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "paid", // Set the payment status
            paymentId: razorpay_payment_id, // Store the payment ID
            referralCode,
          };

          // Send payment verification details along with additional fields to the backend
          try {
            await main_axios.post("/payment/verify-payment", paymentData);

            setSnackbarMessage("Course purchased successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            const response = await main_axios.post(`/courses/purchases/`, {
              courseId,
              type: type,
            });
            
            if (referralCode) {
              console.log("Referral code applied successfully!");
              await main_axios.put("/referral/increase", { code: referralCode });
              setSnackbarMessage("Referral code applied successfully!");
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              console.log("Referral code applied successfully!");
            }
            // Refetch course details after purchase
            fetchCourseDetails();
          } catch (error) {
            console.error("Error verifying payment:", error);
            setSnackbarMessage(
              "Payment verification failed. Please contact support."
            );
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        },
        prefill: {
          name: userData.name, // Replace with actual user data
          email: userData.email,
          contact: mobileNumber,
        },
        theme: {
          color: "#ff7043",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error purchasing course:", error);
      setSnackbarMessage("Error purchasing course. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ padding: 4, backgroundColor: "#fffcf7", minHeight: "100vh" }}>
        <Typography variant="h6" sx={{ color: "#e57373", textAlign: "center" }}>
          Course not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            display: "flex",
            border: "2px dotted #ff7043",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#0b0b0acf",
            position: "relative",
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Avatar
              src={course.imageUrl}
              variant="rounded"
              sx={{
                width: "60%",
                height: "auto",
                borderRadius: 4,
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff7043",
                color: "#fff",
                padding: "12px 36px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "30px",
                fontSize: "1.25rem",
                padding: "10px 16px",
                "& .MuiChip-label": {
                  fontSize: "1.25rem",
                },

                textTransform: "none",

                "&:hover": { backgroundColor: "#f4511e" },
                mb: 2,
              }}
              onClick={() => handlePurchaseCourse(courseId, "regular")}
            >
              {`Enroll Now -  ₹${course.discountedPrice}`}
            </Button>

            <Box
              sx={{ display: "flex", alignItems: "center", color: "#f7e9e9" }}
            >
              <Typography variant="body2" sx={{ mr: 1, color: "#f7e9e9" }}>
                Rating:
              </Typography>
              <Rating
                value={4.3}
                precision={0.5}
                readOnly
                sx={{ fontSize: 18, color: "#17bf9e" }}
              />
            </Box>
          </Box>

          {/* Right Side */}
          <Box sx={{ flex: 1, p: 3 }}>
            <br></br>

            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
            >
              {course.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, color: "#f7e9e9", textAlign: "justify" }}
            >
              {course.description}
            </Typography>
            {/* Add more course details here */}
          </Box>
        </Box>

        {/* New section for referral code */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              mt: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalOfferIcon sx={{ mr: 1, color: "#1a237e" }} />
              Apply Referral Code
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Referral Code"
                  variant="outlined"
                  fullWidth
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1a237e",
                      },
                      "&:hover fieldset": {
                        borderColor: "#3f51b5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#1a237e",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1a237e",
                color: "#fff",
                "&:hover": { backgroundColor: "#3f51b5" },
              }}
              onClick={async () => {
                try {
                  const response = await main_axios.post(
                    "/referral/validate",
                    { code: referralCode }  // sending the referralCode in the request body
                );
                
                
                if (response.data.status === "success" && response.data.data.isValid) {
                  setSnackbarMessage("Referral code applied successfully!");
                  setSnackbarSeverity("success");
                } else {
                  setSnackbarMessage("Invalid referral code. Please try again.");
                  setSnackbarSeverity("error");
                }
                } catch (error) {
                  console.error("Error validating referral code:", error);
                  setSnackbarMessage(
                    "Error validating referral code. Please try again."
                  );
                  setSnackbarSeverity("error");
                }
                setSnackbarOpen(true);
              }}
            >
              Apply
            </Button>
          </Box>
        </Grid>

        {/* New section for coupon code */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              mt: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ConfirmationNumberIcon sx={{ mr: 1, color: "#1a237e" }} />
              Apply Coupon Code
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Coupon Code"
                  variant="outlined"
                  fullWidth
                  value={code}
                  onChange={(e) => setCouponCode(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1a237e",
                      },
                      "&:hover fieldset": {
                        borderColor: "#3f51b5",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#1a237e",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1a237e",
                color: "#fff",
                "&:hover": { backgroundColor: "#3f51b5" },
              }}
              onClick={async () => {
                if (couponApplied) {
                  setSnackbarMessage("A coupon has already been applied.");
                  setSnackbarSeverity("warning");
                  setSnackbarOpen(true);
                  return;
                }
                try {
                  const response = await main_axios.post("coupon/validate", {
                    code,
                    courseId,
                  });
                  if (response.data.valid) {
                    setSnackbarMessage("Coupon applied successfully!");
                    setSnackbarSeverity("success");
                    const discount = response.data.coupon.discountValue;
                    setCourse((prevCourse) => ({
                      ...prevCourse,
                      discountedPrice: originalPrice * (1 - discount / 100),
                    }));
                    setCouponApplied(true);
                  } else {
                    setSnackbarMessage(
                      "Invalid coupon code. Please try again."
                    );
                    setSnackbarSeverity("error");
                  }
                } catch (error) {
                  console.error("Error validating coupon code:", error);
                  setSnackbarMessage(
                    "Error validating coupon code. Please try again."
                  );
                  setSnackbarSeverity("error");
                }
                setSnackbarOpen(true);
              }}
            >
              Apply
            </Button>
          </Box>
        </Grid>

        {/* Course Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              mb: 4,
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              What you'll learn
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.whatYouLearn &&
                course.whatYouLearn.map((item, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: "#4caf50", mr: 2 }} />
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                      {item}
                    </Typography>
                  </li>
                ))}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                mt: 4,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              Course Objective
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.objective &&
                course.objective.map((obj, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <ArrowRightIcon sx={{ color: "#1a237e", mr: 2 }} />
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                      {obj}
                    </Typography>
                  </li>
                ))}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                mt: 4,
                color: "#1a237e",
                borderBottom: "2px solid #1a237e",
                paddingBottom: "8px",
              }}
            >
              Projects ({course.projects ? course.projects.length : 0})
            </Typography>
            <Box component="ul" sx={{ pl: 3, listStyleType: "none" }}>
              {course.projects &&
                course.projects.map((obj, index) => (
                  <li
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <CodeIcon sx={{ color: "#2e7d32", mr: 2 }} />
                    <Typography variant="body1" sx={{ display: "inline" }}>
                      {obj}
                    </Typography>
                  </li>
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "16px",
              padding: "32px",
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                mt: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#1b5e20",
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Unlock Premium Course Features
              </Typography>
              {course.Included &&
                course.Included.map((item, index) => (
                  <Box
                    key={item._id}
                    sx={{
                      width: "100%",
                      borderRadius: "12px",
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#00695c",
                        fontWeight: "bold",
                        mb: 2,
                        borderBottom: "2px solid #00695c",
                        paddingBottom: "8px",
                      }}
                    >
                      {`You Will Receive a ${item.certification}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <AccessTimeIcon sx={{ mr: 1, color: "#4caf50" }} />
                      <strong>Learning Days:</strong> Gain{" "}
                      {item.hoursOfLearning}+ Days of comprehensive learning.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <WorkIcon sx={{ mr: 1, color: "#2196f3" }} />
                      <strong>Internship Opportunity:</strong>{" "}
                      {item.internshipOpportunity
                        ? "Yes, included! You will get a chance to gain real-world experience and enhance your skills."
                        : "Unfortunately, not included."}
                    </Typography>

                    {item.resources.map((resource, idx) => (
                      <ListItem key={idx} sx={{ pl: 0 }}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon sx={{ color: "#4caf50" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={resource}
                          sx={{
                            "& .MuiListItemText-primary": { fontWeight: 500 },
                          }}
                        />
                      </ListItem>
                    ))}

                    {index !== course.Included.length - 1 && (
                      <Divider sx={{ mt: 3 }} />
                    )}
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Separate Div for Course Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "16px",
              padding: "32px",
              mt: 4,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#1a5f7a",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Course Content
            </Typography>
            {course.CourseContent &&
              course.CourseContent.map((week, index) => (
                <Accordion
                  key={week._id}
                  sx={{
                    mb: 2,
                    backgroundColor: "#ffffff",
                    width: "100%",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#1a5f7a" }} />}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0f7fa",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1a5f7a" }}
                    >
                      Week {week.weekNumber}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                    {week.days.map((day, dayIndex) => (
                      <Box key={day._id} sx={{ mb: 3 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            color: "#2c3e50",
                            borderBottom: "2px solid #3498db",
                            display: "inline-block",
                          }}
                        >
                          {day.day}
                        </Typography>
                        {day.topics.map((topic, topicIndex) => (
                          <Box key={topicIndex} sx={{ ml: 3, mb: 2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                color: "#34495e",
                                mb: 0.5,
                              }}
                            >
                              {topic.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#7f8c8d",
                                pl: 2,
                                borderLeft: "2px solid #bdc3c7",
                              }}
                            >
                              {topic.description}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, backgroundColor: "#ffd54f" }} />

      {/* Free Courses Section */}
      {course.freeCourses && course.freeCourses.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
          >
            Included Free Courses
          </Typography>
          <Grid container spacing={4}>
            {course.freeCourses.map((freeCourse) => (
              <Grid item xs={12} sm={6} md={4} key={freeCourse._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0px 6px 20px rgba(255, 183, 77, 0.3)",
                    position: "relative",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 12px 30px rgba(255, 87, 34, 0.4)",
                    },
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <Chip
                    label="Free"
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontWeight: "bold",
                      fontSize: 12,
                      backgroundColor: "#4caf50",
                    }}
                  />
                  <Avatar
                    src={freeCourse.imageUrl}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, color: "#ff7043" }}
                    >
                      {freeCourse.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      {freeCourse.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
                      Instructor: {freeCourse.instructor}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CourseDescription;
