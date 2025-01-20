import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useRouter } from "next/router";
import { useUser } from "@/store/context";

const LoginForm = ({show}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate empty fields
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "same-origin",
      });

      const data = await res.json();

      if (res.status === 200) {
        setError("");
        setUser(data.user);
        router.push("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

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
        User Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && (
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
          )}
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <EmailOutlinedIcon sx={{ color: "gray", marginRight: 1 }} />
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon sx={{ color: "gray", marginRight: 1 }} />
              ),
            }}
          />

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
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </form>
      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: "#3a7bd5",
          cursor: "pointer", // Adds a pointer cursor to indicate it is clickable
        }}
        onClick={() => show(prev=> !prev)} // Redirect to login page
      >
        Don't have an account?{" "}
        <span style={{ fontWeight: "bold" }}>SignUp</span>
      </Typography>
    </Paper>
  );
};

export default LoginForm;
