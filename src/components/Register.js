import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { Link,useHistory,Redirect } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const history = useHistory();

  const handleInputChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleInputChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const formdata = {
    username: Username,
    password: Password,
    confirmPassword:ConfirmPassword
  }
  const data={
    username: Username,
    password: Password
  }
  const register = async () => {
    let isValid=validateInput(formdata)
    if(isValid){
      setIsLoading(true);
    try{

     let res= await axios.post(`${config.endpoint}/auth/register`, data);
      
      console.log(res);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(res.data.success===true){
        enqueueSnackbar('Registered successfully',{variant:'success'})
        setIsSuccessful(true);
        }
  }


    catch(error){
      if (error.response) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        enqueueSnackbar('Username is already taken',{variant:'error'})
      } else {
        // Something happened in setting up the request that triggered an Error
        enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON',{variant:'error'})
      }
    }
    setIsLoading(false);
  }else{
    if(!formdata.username)
{
  enqueueSnackbar("Username is a required field")
  
}
if(formdata.username.length<6){
  enqueueSnackbar("Username must be at least 6 characters")
 
}
if(!formdata.password){
  enqueueSnackbar("Password is a required field")

}
if(formdata.password.length<6){
  enqueueSnackbar("Password must be at least 6 characters")

}
if(formdata.password!==formdata.confirmPassword){
  enqueueSnackbar("Passwords do not match")
  
}

  }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (formdata) => {
    if(!formdata.username||formdata.username.length<6||!formdata.password||formdata.password.length<6||formdata.password!==formdata.confirmPassword){
      return false
    }else{
      return true
    }

  };

  return (
    
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
      {isSuccessful?(<Redirect to="/login" />):(
        <Stack spacing={2} className="form" >
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInputChangeUsername}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleInputChangePassword}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleInputChangeConfirmPassword}
          />{isLoading?(
            <Box dispaly="flex" justifyContent="center" alignItems="center" height={"auto"}>
            <CircularProgress color="success" />
            </Box> 
          ):(
           <Button className="button" variant="contained" onClick={register}>
            Register Now
           </Button>)}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/Login">Login here</Link>

          </p>
        </Stack>
         )}
      </Box>
      <Footer />
     
    </Box>
  
  );

};

export default Register;
