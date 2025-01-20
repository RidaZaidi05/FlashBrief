import { Grid, Card, CardContent, Typography, Box, Button, IconButton} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const DisplayResource = ({ resources, ResourceClick , RefetchedResources, showStackBar}) => {
 
  const handleResourceClick = (resource) => {
    console.log(resource);
    ResourceClick(resource);
  };

  const handleDeleteResource = async (resource) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the news?`);
    if (isConfirmed) {
      try{
        const response = await fetch(`/api/resource/${resource._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          RefetchedResources(prev => !prev);
          showStackBar(`News has been deleted.`, 'success');
        }
        else {
          showStackBar("Error Occured while deleting.", 'error');
        }
      }
      catch (error) {
        showStackBar("Server Error Occured while deleting." , 'error');
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
          spacing={4}
          sx={{
            maxWidth: '90%',
          }}
        >
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',  
                  padding: '20px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  backgroundColor: '#F5F5F5',
                  transition: 'transform 0.3s ease',
                  position: 'relative', // For positioning Delete button
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  width: '300px',
                  minHeight: '250px'
                }}
              >
                {/* Delete Icon */}
                <IconButton
                  color="error"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: '#ffcccc',
                    },
                  }}
                  onClick={() => handleDeleteResource(resource)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {/* News Title */}
                  <Typography variant="h6" textAlign="center" gutterBottom sx={{ fontWeight: 600 }}>
                    {resource.title}
                  </Typography>

                  {/* Publish Date */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign="center"
                    sx={{ marginTop: '8px' }}
                  >
                    Publish Date: {new Date(resource.publishedDate).toLocaleDateString()}
                  </Typography>

                  {/* View Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px', textAlign: 'center' }}
                    onClick={() => handleResourceClick(resource)}
                  >
                    View
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

export default DisplayResource;
