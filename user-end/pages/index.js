import React, { useState } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import LoginForm from "@/component/LoginForm";

import SignupForm from "@/component/signupForm";

import NewsReader from "@/component/newsReader";

const LoginPage = () => {
  const [isLogin , setIsLogin]= useState(true);

  // return ( 
  //   <NewsReader />
  // )
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #3a7bd5, #00d2ff)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        {isLogin ? <LoginForm show={setIsLogin}/> : <SignupForm show={setIsLogin}/>}
      </Container>
    </Box>
  );
};

export default LoginPage;