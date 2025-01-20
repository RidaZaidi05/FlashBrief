import React, { useState, useEffect } from 'react';
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
  Autocomplete, 
} from '@mui/material';

// Assuming `countries` is an array of country names
const countries = [
  "United States", "Canada", "Pakistan", "India", "Australia", "United Kingdom", "Germany", "France", 
  "China", "Japan", "Russia", "Brazil", "South Africa", "Mexico", "Italy", "Spain", "Netherlands", 
  "Sweden", "Norway", "Finland", "Denmark", "Switzerland", "New Zealand", "South Korea", "Argentina", 
  "Colombia", "Poland", "Turkey", "Saudi Arabia", "United Arab Emirates", "Egypt", "Nigeria", 
  "Kenya", "Ghana", "Indonesia", "Vietnam", "Thailand", "Malaysia", "Singapore", "Philippines", "Bangladesh", 
  "Sri Lanka", "Portugal", "Greece", "Belgium", "Ireland", "Austria", "Hungary", "Ukraine", 
  "Israel", "Morocco", "Algeria", "Iceland", "Romania", "Kazakhstan", "Uzbekistan", "Afghanistan", "Iran", "Iraq", "Syria", "Lebanon", 
  "Jordan", "Qatar", "Kuwait", "Oman", "Bahrain"
];

const PolicyPopup = ({open , openpolicy, closePolicy, RefetchedPolicies, policy , attrs , showStackBar}) => {

  const [conditions, setConditions] = useState([
    { attribute: '', operator: '', value: '' },
  ]);
  const [logicalOperators, setLogicalOperators] = useState([]);
  const [negations, setNegations] = useState([false]); 
  const [policyName, setPolicyName] = useState('');
  
  const [error, setError] = useState('');

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const attributes = attrs; 

  const handleOpen = () => openpolicy();
  const handleClose = () => {resetForm(); closePolicy();}

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = [...conditions];

    updatedConditions[index] = {
      ...updatedConditions[index],
      [field]: value,
    };

    setConditions(updatedConditions);
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

  const handleAttributeChange = (index , value)=> {
    
    const updatedConditions = [...conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      ['attribute']: value,
      ['value']: '',
    };
    setConditions(updatedConditions);

    const selectedAttr = attributes.find(attr => attr.name === value);
    const updatedSelectedAttributes = [...selectedAttributes];
    updatedSelectedAttributes[index] = selectedAttr;  
    setSelectedAttributes(updatedSelectedAttributes);
  }

  const addCondition = () => {
    const newConditions = [...conditions, { attribute: '', operator: '', value: '' }]
    setConditions([
      ...conditions,
      { attribute: '', operator: '', value: '' },
    ]);

    if (newConditions.length > 2) {
      setLogicalOperators([...logicalOperators, '']);
    }else if (newConditions.length === 2) {
      const arr = [''];
      setLogicalOperators(arr)
    }else{
      const arr = [];
      setLogicalOperators(arr)
    }
    const updatedSelectedAttributes = [...selectedAttributes, null];
    setSelectedAttributes(updatedSelectedAttributes);
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
    const updatedConditions = conditions.filter((_, i) => i !== index);
    const updatedNegations = negations.filter((_, i) => i !== index);

    setConditions(updatedConditions);
    setLogicalOperators(updatedOperators);
    setNegations(updatedNegations);
  };

  const validateForm = () => {
    if (!policyName) {
      setError('Name is required');
      return false;
    }

    if(conditions.length === 0){
      setError('Policy is required');
      return false;
    }

    for (let condition of conditions) {
      if (!condition.attribute || !condition.operator || !condition.value) {
        setError('All fields in the conditions must be filled');
        return false;
      }
    }
    
    for (let i = 0; i < logicalOperators.length; i++) {
      if (!logicalOperators[i]) {
        setError(`Logical operator at index ${i+1} is missing.`);
        return false;
      }
    }
    
    setError('');
    return true;
  };

  const resetForm = () => {
    setConditions([{ attribute: '', operator: '', value: '' }]);
    setLogicalOperators(['']);
    setNegations(['']);
    setPolicyName('');
    setSelectedAttributes([]);
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch('/api/policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: policyName,
          conditions,
          logicalOperators,
          negations,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showStackBar('Policy Set saved successfully','success');
        handleClose();
        RefetchedPolicies(prev => !prev);
      } else {
        setError('Failed to save Policy Set');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error saving Policy Set');
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch('/api/policy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: policy._id,
          name: policyName,
          conditions,
          logicalOperators,
          negations,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showStackBar('Policy Set Updated successfully','success');
        handleClose();
        RefetchedPolicies(prev => !prev);
      } else {
        setError('Failed to save Policy Set');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error saving Policy Set');
    }
  };

  useEffect(() => {

    handleOpen();
    
    if (policy) {
      setPolicyName(policy.name);
      setNegations(policy.negations);
      setLogicalOperators(policy.logicalOperators);
      setConditions(policy.conditions);
      const selectAttrs = policy.conditions.map(c => attributes?.find(attr => attr.name === c.attribute))
      setSelectedAttributes(selectAttrs);
    }
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Policy Set</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ mb: 3, mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2, width: '70%' }}>
              <TextField
                value={policyName || ''}
                label="Name"
                variant="outlined"
                onChange={(e) =>
                  setPolicyName(e.target.value)
                }
              />
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Users matching these conditions will belong to the Policy Set:
            </Typography>

            {conditions.map((condition, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 1 }}>

                <Grid container item xs={12} spacing={2}>
                  {index > 0 && (
                    <Grid item xs={2}>
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

                <Grid item xs={1}>
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

                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Attribute</InputLabel>
                    <Select
                      value={condition.attribute}
                      onChange={(e) => {
                        handleAttributeChange(index,e.target.value);
                      }}
                    >
                      {attributes.filter(a => a.name !== "userType").map((attr) => (
                        <MenuItem key={attr._id} value={attr.name}>
                          {attr.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2}>
                  {
                    selectedAttributes[index] ? 
                    (
                      selectedAttributes[index]?.type === "number" ? 
                      (
                        <FormControl fullWidth>
                          <InputLabel>Operator</InputLabel>
                          <Select
                            value={condition.operator}
                            onChange={(e) =>
                              handleConditionChange(index, 'operator', e.target.value)
                            }
                          >
                            <MenuItem value="equals">Equals</MenuItem>
                            <MenuItem value="not_equals">Not Equals</MenuItem>
                            <MenuItem value="greater_than">Greater Than</MenuItem>
                            <MenuItem value="less_than">Less Than</MenuItem>
                          </Select>
                        </FormControl>
                      ):
                      (
                        <FormControl fullWidth>
                          <InputLabel>Operator</InputLabel>
                          <Select
                            value={condition.operator}
                            onChange={(e) =>
                              handleConditionChange(index, 'operator', e.target.value)
                            }
                          >
                            <MenuItem value="equals">Equals</MenuItem>
                            <MenuItem value="not_equals">Not Equals</MenuItem>
                          </Select>
                        </FormControl>
                      )
                    ):
                    (
                      <FormControl fullWidth>
                        <InputLabel>Operator</InputLabel>
                        <Select
                          value={condition.operator}
                          onChange={(e) =>
                            handleConditionChange(index, 'operator', e.target.value)
                          }
                        >
                          <MenuItem value="" disabled>
                            No Operators Available
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )
                  }
                </Grid>

                <Grid item xs={3}>
                  {selectedAttributes[index]?.name === 'gender' ? 
                  (
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  ) : selectedAttributes[index]?.name === 'country' ? 
                  (
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option) => option}
                      value={condition.value || ''}
                      onChange={(event, newValue) => handleConditionChange(index, 'value', newValue)}
                      renderInput={(params) => <TextField {...params} label="Country" placeholder="Select a country" fullWidth />}
                      isOptionEqualToValue={(option, value) => option === value}
                    />
                  ):  
                  (
                    <TextField
                      fullWidth
                      placeholder="Value"
                      type={selectedAttributes[index]?.type === 'number' ? 'number' : 'text'}
                      value={condition.value}
                      onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    />
                  )}
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

            <Button variant="text" onClick={addCondition}>
              + Add Condition
            </Button>

          </Box>

          <Box textAlign="right">
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            {!policy ? 
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save Policy Set
              </Button> : 
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Policy Set
              </Button>
            }
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PolicyPopup;
