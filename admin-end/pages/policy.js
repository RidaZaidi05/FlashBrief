import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import PolicyPopup from '@/components/policy/policy-popup';
import DisplayPolicies from '@/components/policy/displayPolicy';

const Policy = () => {
  const [openModal, setOpenModal] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [refetched, setRefetched] = useState(false);
  const [clickedPolicy, setClickedPolicy] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Function to show the Snackbar
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
    setClickedPolicy(null);
  };

  const openDetailModal = (policy) => {
    setClickedPolicy(policy);
    handleOpenModal();
  };

  const fetchPolicies = () => {
    fetch('/api/policy')
      .then((res) => res.json())
      .then((data) => setPolicies(data.data))
      .catch(() => showStackBar('Failed to fetch policies', 'error'));
  };

  const fetchAttributes = async () => {
    fetch('/api/attribute')
      .then((res) => res.json())
      .then((data) => setAttributes(data.data))
      .catch(() => showStackBar('Failed to fetch attributes', 'error'));
  };

  useEffect(() => {
    fetchPolicies();
  }, [refetched]);

  useEffect(() => {
    fetchAttributes();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10vh',
          marginTop: 3,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Policy
        </Button>
      </Box>

      {policies && <DisplayPolicies policies={policies} handlePolicyClick={openDetailModal} RefetchedPolicies={setRefetched}  showStackBar={showStackBar}/>}

      {attributes.length > 0 && openModal && (
        <PolicyPopup
          open={openModal}
          openpolicy={handleOpenModal}
          closePolicy={handleCloseModal}
          RefetchedPolicies={setRefetched}
          attrs={attributes}
          policy={clickedPolicy || null}
          showStackBar={showStackBar} // Pass the showStackBar function
        />
      )}

      {/* Snackbar for notifications */}
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
      </Snackbar>
    </>
  );
};

export default Policy;