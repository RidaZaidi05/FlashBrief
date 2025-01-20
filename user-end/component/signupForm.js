import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Paper,
  Autocomplete,
  Alert
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import StarIcon from "@mui/icons-material/Star";

const countries = [
  "United States",
  "Canada",
  "Pakistan",
  "India",
  "Australia",
  "United Kingdom",
  "Germany",
  "France",
  "China",
  "Japan",
  "Russia",
  "Brazil",
  "South Africa",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Finland",
  "Denmark",
  "Switzerland",
  "New Zealand",
  "South Korea",
  "Argentina",
  "Colombia",
  "Poland",
  "Turkey",
  "Saudi Arabia",
  "United Arab Emirates",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Indonesia",
  "Vietnam",
  "Thailand",
  "Malaysia",
  "Singapore",
  "Philippines",
  "Bangladesh",
  "Sri Lanka",
  "Portugal",
  "Greece",
  "Belgium",
  "Ireland",
  "Austria",
  "Hungary",
  "Ukraine",
  "Israel",
  "Morocco",
  "Algeria",
  "Iceland",
  "Romania",
  "Kazakhstan",
  "Uzbekistan",
  "Afghanistan",
  "Iran",
  "Iraq",
  "Syria",
  "Lebanon",
  "Jordan",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
];

const SignupForm = ({ show }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    userType: "Basic",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Age must be greater than 0";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error registering user");
        setLoading(false);
        return;
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        country: "",
        userType: "Basic",
      });
      setLoading(false);
      show((prev) => !prev)
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };

  const handleCountryChange= (newValue)=>{
    if(newValue){
        setFormData({ ...formData, country : newValue });
        setErrors({});
    }
  }

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3a7bd5" }}
      >
        User Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            marginBottom: "16px",
            marginTop: "16px",
          }}
        >

        {error && (
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
        )}
          {/* Name */}
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* <TextField
            label="Country"
            name="country"
            fullWidth
            value={formData.country}
            onChange={handleInputChange}
            error={!!errors.country}
            helperText={errors.country}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PublicIcon />
                </InputAdornment>
              ),
            }}
          /> */}

          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option}
            value={formData.country}
            name="country"
            onChange={(event, newValue) =>
              handleCountryChange(newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                placeholder="Select a country"
                fullWidth
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Box>

        {/* Remaining Fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Age */}
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            value={formData.age}
            onChange={handleInputChange}
            error={!!errors.age}
            helperText={errors.age}
            inputProps={{ min: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Gender */}
          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <WcIcon />
                    </InputAdornment>
                  }
                />
              }
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <Typography color="error" variant="caption">
              {errors.gender}
            </Typography>
          </FormControl>

          {/* Country */}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            backgroundColor: "#3a7bd5",
            "&:hover": {
              backgroundColor: "#3a5dbb",
            },
            marginTop: "30px",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign up"}
        </Button>
      </form>

      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: "#3a7bd5",
          cursor: "pointer", // Adds a pointer cursor to indicate it is clickable
        }}
        onClick={() => show((prev) => !prev)} // Redirect to login page
      >
        Already have an account?{" "}
        <span style={{ fontWeight: "bold" }}>Login</span>
      </Typography>
    </Paper>
  );
};

export default SignupForm;
