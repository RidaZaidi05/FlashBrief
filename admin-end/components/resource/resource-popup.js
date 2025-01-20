import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  IconButton,
  TextareaAutosize
} from '@mui/material';

const ResourcePopup = ({open , openpolicy, closePolicy , pols , RefetchedResources, ClickedResource, showStackBar}) => {

  const [resource, setResource] = useState({
    title: '',
    content: '',
    publishedDate: '',
  });

  const [policies , setPolicies] = useState(['']);
  const [logicalOperators, setLogicalOperators] = useState([]);
  const [negations, setNegations] = useState([false]); 

  const [error, setError] = useState('');
  const handleOpen = () => openpolicy();
  const handleClose = () => {resetForm(); closePolicy();}

  useEffect(()=>{
    handleOpen();
    if(ClickedResource){
        const r = {
            title: ClickedResource.title,
            content: ClickedResource.content,
            publishedDate: new Date(ClickedResource.publishedDate).toISOString().split('T')[0]
        }
        setResource(r);
        setNegations(ClickedResource.negations);
        setPolicies(ClickedResource.policies);
        setLogicalOperators(ClickedResource.logicalOperators);
    }
  },[])

  const resetForm = ()=>{
    setResource({
      title: '',
      content: '',
      publishedDate: '',
    }); 
    setPolicies(['']);
    setLogicalOperators([]);
    setNegations([]);
    setError('');
  }

  const handleResourceChange = (field, value) => {
    setResource((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPolicy = () => {
    const newPolicies = [...policies, '']
    setPolicies([...policies, '']);

    if (newPolicies.length > 2) {
      setLogicalOperators([...logicalOperators, '']);
    }
    else if(newPolicies.length === 2){
      const arr = [''];
      setLogicalOperators(arr)
    }
    else{
        const arr = [];
        setLogicalOperators(arr)
    }
    setNegations([...negations, false]); 
  };

  const removeCondition = (index) => {
    var updatedOperators;
    if(index === 0){
      if(logicalOperators.length > 0){
        updatedOperators = logicalOperators.slice(1);
      }
    }
    else{
      updatedOperators = logicalOperators.filter((_, i) => i !== index-1);
    }
    const updatedPolicies = policies.filter((_, i) => i !== index);
    // const updatedOperators = logicalOperators.filter((_, i) => i !== index-1);
    const updatedNegations = negations.filter((_, i) => i !== index);

    setPolicies(updatedPolicies);
    setLogicalOperators(updatedOperators);
    setNegations(updatedNegations);
  };

  const handleLogicalOperatorChange = (index, value) => {
    const updatedOperators = [...logicalOperators];
    updatedOperators[index-1] = value;
    setLogicalOperators(updatedOperators);
  };
  
  const handleNegationChange = (index, checked) => {
    const updatedNegations = [...negations];
    updatedNegations[index] = checked;
    setNegations(updatedNegations);
  };

  const validateForm = () => {
    console.log(resource);
    if (!resource.title || !resource.content || !resource.publishedDate) {
        setError('All Resource Details are required!');
        return;
    }

    if(policies && policies.length > 0){

      for (let i = 0; i < policies.length; i++) {
          if (!policies[i]) {
            setError(`Policy at index ${i+1} is missing.`);
            return false;
          }
      }
    }
    if(logicalOperators &&  logicalOperators.length >0 ){

      for (let i = 0; i < logicalOperators.length; i++) {
        if (!logicalOperators[i]) {
          setError(`Logical operator at index ${i+1} is missing.`);
          return false;
        }
      }
    }
    
    setError('');
    return true;
  };

  const handleAddResource = async () => {

    if (!validateForm()) {
        return;
    }
    
    const ResourceToAdd={
        title : resource.title,
        content: resource.content,
        publishedDate: resource.publishedDate,
        policies, logicalOperators, negations
    }

    console.log(ResourceToAdd);

    try {
      const response = await fetch('/api/resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ResourceToAdd),
      });

      if (response.ok) {
        showStackBar('Resource saved successfully' , 'success');
        RefetchedResources(prev => !prev);
        handleClose();
      } else {
        console.error('Failed to add resource');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateResource = async () => {

    if (!validateForm()) {
        return;
    }
    
    const ResourceToUpdate={
        id : ClickedResource._id,
        title : resource.title,
        content: resource.content,
        publishedDate: resource.publishedDate,
        policies, logicalOperators, negations
    }

    try {
      const response = await fetch('/api/resource', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ResourceToUpdate),
      });

      if (response.ok) {
        showStackBar('Resource updated successfully' , 'success');
        RefetchedResources(prev => !prev);
        handleClose();
      } else {
        console.error('Failed to add resource');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
            <Box sx={{ mb:2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Enter the details of the news:
                </Typography>

                {/* Error Message */}
                {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                )}

                <Grid container spacing={2}>
                    {/* Resource Name */}
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            label="News Title"
                            placeholder="Enter news title"
                            value={resource.title}
                            onChange={(e) => handleResourceChange('title', e.target.value)}
                        />
                    </Grid>

                    {/* Resource Type */}
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3} 
                        maxRows={4} 
                        label="News Content"
                        placeholder="Enter news content"
                        value={resource.content}
                        onChange={(e) => handleResourceChange('content', e.target.value)}
                      />
                    </Grid>


                    {/* Resource Size */}
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Publish Date"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        value={resource.publishedDate}
                        onChange={(e) => handleResourceChange('publishedDate', e.target.value)}
                      />
                    </Grid>

                </Grid>
            </Box>

            <Box sx={{  mt: 4}}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Users matching these policies will belong to the news Set:
                </Typography>

                {policies.map((policy, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 1 }}>

                        <Grid container item xs={12} spacing={2} >
                            {index > 0 && (
                                <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel>Logical Operator</InputLabel>
                                    <Select
                                    value={logicalOperators[index-1]}
                                    onChange={(e) =>
                                        handleLogicalOperatorChange(index, e.target.value)
                                    }
                                    >
                                    <MenuItem value="and">AND</MenuItem>
                                    <MenuItem value="or">OR</MenuItem>
                                    </Select>
                                </FormControl>
                                </Grid>
                            )}
                        </Grid>

                        <Grid item xs={1} sx={{ mr:4 }}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={negations[index]}
                                    onChange={(e) =>
                                    handleNegationChange(index, e.target.checked)
                                    }
                                    color="primary"
                                />
                                }
                                label="Negate"
                                
                            />
                        </Grid>

                        <Grid item xs={8} >
                            <FormControl fullWidth>
                                <InputLabel>Policy</InputLabel>
                                <Select
                                  value={policies[index]}
                                  onChange={(e) => {
                                    const p = [...policies];
                                    p[index] = e.target.value;
                                    setPolicies(p);
                                  }}
                                >
                                    {pols.map((pol) => (
                                        <MenuItem key={pol._id} value={pol._id}>
                                            {pol.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={1}>
                            <IconButton
                                color="error" 
                                onClick={() => removeCondition(index)}
                                sx={{ backgroundColor: '#ffff'}} 
                            >
                                <DeleteIcon sx={{ fontSize: '30px' }} />
                            </IconButton>
                        </Grid>

                    </Grid>
                ))}
 
                <Button variant="text" onClick={addPolicy}>
                    + Add Policy
                </Button>
            </Box>

            <Box textAlign="right" sx={{ mt: 3 }}>
                <Button onClick={handleClose} sx={{ mr: 1 }}>
                     Cancel
                </Button>
                
                {!ClickedResource ? 
                    <Button variant="contained" color="primary" onClick={handleAddResource}>
                        Add Resource
                    </Button> : 
                    <Button variant="contained" color="primary" onClick={handleUpdateResource}>
                        Update Resource
                    </Button>
                }

            </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcePopup;