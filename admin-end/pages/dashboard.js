import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Dashboard = () => {
  // Dummy Data
  const userStats = {
    activeUsers: 1500,
    articlesPublished: 200,
    videoViews: 5000,
    resourcesAvailable: 20,
  };

  // Dummy line chart data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users Growth",
        data: [500, 600, 700, 900, 1100, 1500],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // Dummy bar chart data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Articles Published",
        data: [50, 60, 70, 80, 90, 100],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dummy pie chart data
  const pieData = {
    labels: ["Politics", "Sports", "Entertainment"],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        radius: "60%", // Reduce the radius to shrink the pie chart
      },
    ],
  };

  return (
    <>
      <Box sx={{ padding: "20px", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            FlashBrief Admin Dashboard
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                {userStats.articlesPublished}
              </Typography>
              <Typography>Blogs Published</Typography>
              <BarChartIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                {userStats.activeUsers}
              </Typography>
              <Typography>Active Users</Typography>
              <PieChartIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                {userStats.videoViews}
              </Typography>
              <Typography>News Views</Typography>
              <NotificationsIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                {userStats.resourcesAvailable}
              </Typography>
              <Typography>Resource Available</Typography>
              <InsertDriveFileIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={4}>
          {/* Line Chart for Active Users */}
          <Grid item xs={12} sm={4} md={4}>
            <Box sx={{ marginTop: "40px", maxHeight: "500px", maxWidth: "500px" }}>
              <Typography variant="h6" gutterBottom>
                Active Users Growth (Last 6 Months)
              </Typography>
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
                height={200}
                width={350}
              />
            </Box>
          </Grid>

          {/* Bar Chart for Articles Published */}
          <Grid item xs={12} sm={4} md={4}>
            <Box sx={{ marginTop: "40px", maxHeight: "500px", maxWidth: "500px" }}>
              <Typography variant="h6" gutterBottom>
                News Published (Last 6 Months)
              </Typography>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
                height={200}
                width={350}
              />
            </Box>
          </Grid>

          {/* Pie Chart for Content Distribution */}
          <Grid item xs={12} sm={4} md={4}>
            <Box sx={{ marginTop: "40px", padding: 0, maxHeight: "400px", maxWidth: "500px" }}>
              <Typography variant="h6" gutterBottom>
                Content Distribution (Pie Chart)
              </Typography>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  layout: {
                    padding: {
                      top: -150,
                      bottom: 100,
                    },
                  },
                }}
                height={200}
                width={200}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textAlign: "center",
          marginTop: '-37px',
          padding: "15px",
        }}
      >
        <Typography variant="body2" color="inherit">
          © 2024 Information Security. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
