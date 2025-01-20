import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DisplayUsers = ({ users }) => {
  // Define columns
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "userType", headerName: "User Type", width: 150 },
  ];

  // Prepare rows
  const rows = users.map((user, index) => ({
    id: index + 1, // Unique identifier for each row
    ...user,
  }));

  return (
    <Box
      sx={{
        height: 600,
        width: "76%",
        backgroundColor: "#fff",
        padding: 3,
        margin: "0 auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-columnHeader': {
            fontWeight: 'bold', 
            backgroundColor:'#f5f5f5',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold', 
          },
        }}
      />
    </Box>
  );
};

export default DisplayUsers;
