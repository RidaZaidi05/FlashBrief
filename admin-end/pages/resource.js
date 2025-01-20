import { Box, Button , Snackbar, Alert} from '@mui/material';
import { useState, useEffect } from 'react';
import ResourcePopup from '@/components/resource/resource-popup';
import DisplayResource from '@/components/resource/displayResource';

const Resource = () => {

  const [openModal, setOpenModal] = useState(false);
  const [policies, setPolicies] = useState(null);
  const [resources, setResources] = useState(null);
  const [refetched, setRefetched] = useState(false);
  const [clickedResource, setClickedResource] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
    setClickedResource(null);
  };

  const openDetailModal = (resource) => {
    setClickedResource(resource);
    handleOpenModal();
  };

  const fetchPolicies = async () => {
    fetch('/api/policy')
      .then((res) => res.json())
      .then((data) => setPolicies(data.data));
  };

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resource');
      const data = await response.json();
      if (data.success) {
        setResources(data.data); 
      } else {
        setError('Failed to fetch resources');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Error fetching resources');
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(()=>{
    fetchResources();
  }, [refetched])

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
          Add News
        </Button>
      </Box>

      {resources && <DisplayResource resources={resources} ResourceClick={openDetailModal}  RefetchedResources={setRefetched}  showStackBar={showStackBar}/>}

      {openModal && policies && (
        <ResourcePopup 
          open={openModal}
          openpolicy={handleOpenModal}
          closePolicy={handleCloseModal}
          RefetchedResources={setRefetched}
          pols = {policies}
          ClickedResource={clickedResource || null} 
          showStackBar={showStackBar}
        />)
      }

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

export default Resource;
