import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";

const dummyNews = [
  {
    id: 1,
    title: "Breaking: Tech Innovations in 2024",
    content:
      "The tech industry is witnessing a surge in innovations, ranging from AI advancements to space exploration. Companies are focusing on sustainable solutions, making this year a landmark for global technology.",
    publishedDate: "2024-11-28",
  },
  {
    id: 2,
    title: "Global Economy: What's Next?",
    content:
      "Experts predict major shifts in global markets. Key industries like renewable energy, healthcare, and tech are expected to see rapid transformations, driven by innovation and new policies.",
    publishedDate: "2024-11-27",
  },
  {
    id: 3,
    title: "Sports: World Cup Highlights",
    content:
      "The World Cup continues to captivate audiences with unforgettable moments, record-breaking performances, and stories of resilience. Fans are uniting across the globe to celebrate the joy of sports.",
    publishedDate: "2024-11-26",
  },
  {
    id: 4,
    title: "Climate Change: Global Efforts",
    content:
      "Countries worldwide are ramping up efforts to combat climate change through renewable energy and sustainable practices. Collaborative efforts are crucial in achieving long-term goals.",
    publishedDate: "2024-11-25",
  },
];

const NewsReader = ({ news, user, setUser }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/clearToken", { method: "POST" });
      if (response.ok) {
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #3f51b5, #2196f3)",
          padding: "7px 0",
        }}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#fff", fontSize: "1.8rem" }}
            >
              Flash Breif
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ fontSize: "1.2rem" }}
              >
                Welcome, {user.name}!
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                size="medium"
                onClick={handleLogout}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderColor: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: "center", padding: "15px 0" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#3f51b5", marginBottom: 1 }}
        >
          Flash Breif News
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#757579", fontSize: "1.2rem" }}
        >
          "Your daily dose of breaking news, insights, and stories from around
          the globe."
        </Typography>
      </Box>

      {/* Main Content */}
      <Container sx={{ marginTop: 4, flex: 1 }}>
        {news.length === 0 ? (
          // Show message when no news is available
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "250px", // Adjust as per design requirements
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontSize: "1.4rem" }}
            >
              No News to Show.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {news.map((n) => (
              <Grid item xs={12} md={6} key={n._id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                    minHeight: "250px",
                    transition: "transform 0.2s, background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#3f51b5",
                      fontSize: "1.4rem",
                    }}
                  >
                    {n.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#ff5722"
                    sx={{
                      marginBottom: 2,
                      display: "block",
                      fontSize: "1rem",
                    }}
                  >
                    Published on:{" "}
                    {new Date(n.publishedDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ fontSize: "1rem" }}
                  >
                    {n.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          padding: 2,
          backgroundColor: "#3f51b5",
          color: "#fff",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "1rem" }}>
          © 2024 Flash Breif. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsReader;
