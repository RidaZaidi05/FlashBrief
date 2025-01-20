import PolicyIcon from '@mui/icons-material/Policy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Card, CardContent, Typography, Box, Button, IconButton } from '@mui/material';

const DisplayPolicies = ({ policies, handlePolicyClick, RefetchedPolicies, showStackBar }) => {
  const handleDelete = async (policy) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the policy: ${policy.name}?`);
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/policy/${policy._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          RefetchedPolicies((prev) => !prev);
          showStackBar(`${policy.name} has been Deleted.`, 'success');
        } else {
          const error = await response.json();
          showStackBar(error.message || 'Failed to delete policy.', 'fails');
        }
      } catch (error) {
        showStackBar('Server error while deleting policy.', 'fails');
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: '90%',
          }}
        >
          {policies.map((policy, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  position: 'relative', // For positioning the delete icon
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px', // Reduced padding for the card
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  maxWidth: '90%', // Optional: further control card width
                }}
              >
                {/* Delete Icon */}
                <IconButton
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: '#ffcccc',
                    },
                  }}
                  onClick={() => handleDelete(policy)}
                >
                  <DeleteIcon />
                </IconButton>

                <PolicyIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" textAlign="center" gutterBottom>
                    {policy.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px', textAlign: 'center' }}
                    onClick={() => handlePolicyClick(policy)}
                  >
                    Policy
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DisplayPolicies;
