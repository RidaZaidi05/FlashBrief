import React, { useState, useEffect } from 'react';
import NewsReader from './newsReader';
import { CircularProgress, Box, Typography } from "@mui/material";
import { useUser } from '@/store/context';

const FileAccessControl = () => {
  const { user, setUser } = useUser();
  const [files, setFiles] = useState([]);
  const [policies, setPolices] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [AccessibleFiles , setAccessibleFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resource');
      const data = await response.json();
      if (data.success) {
        console.log(data.data)
        setFiles(data.data); 
      } else {
        setError('Failed to fetch resources');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Error fetching resources');
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/api/policy');
      const data = await response.json();
      if (data.success) {
        setPolices(data.data); 
      } else {
        setError('Failed to fetch resources');
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Error fetching resources');
    }
  };

  const fetchUser = ()=>{
    fetch(`/api/user/${user.id}`).then(res=>res.json()).then(data=>setSelectedUser(data.user));
  }

  useEffect(() => {
    if(user){
      console.log("check" , user);
      fetchUser();
    }
    fetchResources();
    fetchPolicies();
  }, [user]);

  useEffect(() => {
    if (selectedUser && files.length > 0 && policies.length > 0) {
      onAllDataLoaded();
    }
  }, [selectedUser, files, policies]);


  useEffect(() => {
    if(AccessibleFiles){
      setLoading(false);
    }
  }, [AccessibleFiles]);

  const onAllDataLoaded = () => {
    const accessibleFiles = files.filter(file => handleAccessCheck(file));
    setAccessibleFiles(accessibleFiles);
  };

  const evaluateConditions = (user, policy) => {
    const { conditions, logicalOperators, negations } = policy;
    
    const compareValues = (attribute, operator, value) => {
      var userValue = user[attribute];
      if (attribute !== 'age') {
        userValue = userValue.toLowerCase();
        value = value.toLowerCase();
      }
      switch (operator) {
        case 'equals':
          return userValue == value;
        case 'less_than':
          const lessThanUserValue = typeof userValue === 'number' ? userValue : Number(userValue);
          const lessThanValue = typeof value === 'number' ? value : Number(value);
          return lessThanUserValue < lessThanValue;
        
        case 'greater_than':
          const greaterThanUserValue = typeof userValue === 'number' ? userValue : Number(userValue);
          const greaterThanValue = typeof value === 'number' ? value : Number(value);
          return greaterThanUserValue > greaterThanValue;          
        case 'not_equals':
          return userValue != value;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    };
  
    // Evaluate each condition
    const conditionResults = conditions.map((condition, index) => {
      const result = compareValues(condition.attribute, condition.operator, condition.value);
      console.log(result);
      return negations[index] ? !result : result;
    });
  
    // Combine results using logical operators
    const evaluateLogicalOperators = (results, logicalOperators) => {
      let combinedResult = results[0];
      for (let i = 0; i < logicalOperators.length; i++) {
        const operator = logicalOperators[i].toLowerCase();
        if (operator === 'and') {
          combinedResult = combinedResult && results[i + 1];
        } else if (operator === 'or') {
          combinedResult = combinedResult || results[i + 1];
        } else {
          throw new Error(`Unknown logical operator: ${operator}`);
        }
      }
      return combinedResult;
    };
  
    return evaluateLogicalOperators(conditionResults, logicalOperators);
  };

  const check_policy= (policy, negation, user)=>{
    const found_policy = policies.find((p)=> p._id === policy);
    var result = evaluateConditions(user, found_policy);
    if(negation === true)
    {
      result= !result;
    }
    return result;
  }

  
  const handleAccessCheck = (file) => {
    const {policies, logicalOperators, negations} =file;
    var result = true;
    if(policies.length === 1){
      result = check_policy(policies[0], negations[0], selectedUser);
    }
    else if(policies.length > 1){
      result = check_policy(policies[0], negations[0], selectedUser);
      for(let i=1 ; i <policies.length ; i++){
        const operator = logicalOperators[i-1].toLowerCase();
        if(operator === 'and'){
          result = result && check_policy(policies[i], negations[i], selectedUser)
        }
        else if(operator === 'or'){
          result = result || check_policy(policies[i], negations[i], selectedUser)
        }
      }
    }
    return result;
  };

  

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <NewsReader news={AccessibleFiles}  setUser={setUser} user={selectedUser}/>
      )}
    </>
  );
};

export default FileAccessControl;
