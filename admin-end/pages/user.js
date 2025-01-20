import { useState, useEffect } from "react";
import UserPopup from "@/components/user/user-popup";
import { Box,Typography, Button, Snackbar, Alert } from '@mui/material';
import DisplayUsers from "@/components/user/displayUsers";
const User = () => {
    const [openModal, setOpenModal] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [refetched, setRefetched] = useState(false);
    const [users, setUsers] = useState(null);

    const showStackBar = (message, status) => {
        setSnackbar({
        open: true,
        message: message,
        severity: status === 'success' ? 'success' : 'error',
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const fetchUsers = () => {
        fetch('/api/user')
          .then((res) => res.json())
          .then((data) => setUsers(data.users))
          .catch(() => showStackBar('Failed to fetch policies', 'error'));
    };

    useEffect(() => {
        fetchUsers();
    }, [refetched]);


  return (
    <>

        {/* <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
            marginTop: 3,
            }}
        >
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Register User
            </Button>
        </Box>

        {openModal && (
            <UserPopup
                open={openModal}
                openUser={handleOpenModal}
                closeUser={handleCloseModal}
                showStackBar={showStackBar}
                RefetchedUser={setRefetched}
            />
        )}

        <Snackbar
            open={snackbar.open}
            autoHideDuration={8000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar> */}

<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100vh' }}>
  <Typography variant="h4" gutterBottom sx={{ marginTop: '50px' , fontWeight: 600}}>
    Active Users
  </Typography>
  
  {users && <DisplayUsers users={users} />}
</Box>

        
        
    </>
  );
};

export default User;
