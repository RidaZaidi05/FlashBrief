import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  OutlinedInput, 
  Alert
} from "@mui/material";


import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import StarIcon from "@mui/icons-material/Star";

const UserPopup = ({open , openUser, closeUser , showStackBar, RefetchedUser})=>{


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    userType: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleOpen = () => openUser();
  const handleClose = () => {closeUser();}

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.age || formData.age <= 0) newErrors.age = "Age must be greater than 0";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.userType) newErrors.userType = "User type is required";
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
        return;
      }
      showStackBar("User Registered Successfully", "success");
      RefetchedUser(prev => !prev);
      setFormData({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        country: "",
        userType: "",
      });
      handleClose();
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Register User</DialogTitle>
      <DialogContent
          sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxHeight: "90vh", // Ensures it doesn't overflow the viewport height
          overflowY: "auto", // Enables scrolling if content exceeds height
          }}
      >
          {error && <Alert severity="error">{error}</Alert>}
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
              <TextField
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
              />

              {/* User Type */}
              <FormControl fullWidth error={!!errors.userType}>
              <InputLabel>User Type</InputLabel>
              <Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  input={
                    <OutlinedInput
                      startAdornment={
                        <InputAdornment position="start">
                          <StarIcon />
                        </InputAdornment>
                      }
                    />
                  }
              >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="platinum">Platinum</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
              </Select>
              <Typography color="error" variant="caption">
                  {errors.userType}
              </Typography>
              </FormControl>
          </Box>

          <Box textAlign="right" sx={{ mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
              Register
              </Button>
          </Box>
          </form>
      </DialogContent>
    </Dialog>
  )

} 

export default UserPopup;